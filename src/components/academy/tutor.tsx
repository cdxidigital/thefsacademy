'use client';

import {useEffect,useRef,useState,type FormEvent} from 'react';
import Link from '@/lib/next-compat';
import {useSearchParams} from '@/lib/next-compat';
import {ArrowUpRight,BookOpen,Check,ClipboardCheck,ExternalLink,MessageCircle,ShieldCheck,Trash2} from 'lucide-react';
import {useAcademy,PageHeading,ErrorPanel,ButtonLink,Loading} from './ui';
import {request,type Me,type Source,type ApiError} from '@/lib/academy/types';
import {DEFAULT_TUTOR_ROLE,TUTOR_PERSONAS,tutorPersona,type GuideMode,type PracticeChoice,type TutorHistoryTurn,type TutorRole} from '@/lib/academy/tutor-personas';

type LessonLink = {id:string;title:string;url:string};
type Practice = {scenarioId:string;lessonId:string;prompt:string;options:string[];stage:'question'|'feedback';selectedIndex?:number;correct?:boolean;countsForCertificate:false};
type AssessmentFeedback = {questionId:string;feedback:string;sourceIds:string[]};
type TutorResponse = {
  role:TutorRole; tutorTitle:string;
  mode:'ai'|'lesson-guide'|'assessment-guide'|'support-guide';
  answer:string; sources:Source[]; lessonLinks:LessonLink[]; externalProcessing:boolean;
  notice?:string; aiConsentRequired?:boolean; allowanceReached?:boolean; assessmentOverride?:boolean;
  practice?:Practice; assessment?:{feedback:AssessmentFeedback[]};
};
type Message = {
  id:number; role:'user'|'guide'; text:string; sources?:Source[]; lessonLinks?:LessonLink[];
  mode?:TutorResponse['mode']; notice?:string; tutorRole?:TutorRole; assessmentOverride?:boolean;
  practice?:Practice; feedback?:AssessmentFeedback[];
};
type OwnResult = {assessmentId:string};
const ICONS = {foundations_tutor:BookOpen,practice_coach:MessageCircle,assessment_tutor:ClipboardCheck};
function countValue(value:unknown) {const parsed=Number(value);return Number.isFinite(parsed)?Math.max(0,parsed):0;}
function internalLink(url:string) {return /^\/(learn|assessment)\/[A-Za-z0-9-]+$/.test(url)||['/progress','/support','/privacy'].includes(url);}
function ownResults(value:unknown):OwnResult[] {return Array.isArray(value)?value.filter((item):item is OwnResult=>Boolean(item)&&typeof item==='object'&&typeof item.assessmentId==='string'):[];}

export default function Tutor() {
  const {catalog,me,loading,loadError,refresh}=useAcademy();
  const requestedLesson=useSearchParams().get('lesson');
  const [topic,setTopic]=useState({query:requestedLesson,lesson:requestedLesson??'C01-L01'});
  const [role,setRole]=useState<TutorRole>(DEFAULT_TUTOR_ROLE);
  const [selectedAssessment,setSelectedAssessment]=useState('');
  // A new same-route ?lesson must take effect even after a dropdown selection.
  const candidate=topic.query===requestedLesson?topic.lesson:requestedLesson??'C01-L01';
  const allLessons=catalog?.modules.flatMap(module=>module.lessons)??[];
  const lessonId=allLessons.some(lesson=>lesson.id===candidate)?candidate:'C01-L01';
  const results=ownResults(me?.progress?.assessmentResults);
  const assessmentId=results.some(result=>result.assessmentId===selectedAssessment)?selectedAssessment:'';
  const identityKey=String(me?.user?.userId??me?.profile?.userId??'signed-out');
  const demoKey=me?.demo?.active?me.demo.expiresAt:'real';
  const conversationKey=[identityKey,demoKey,role,role==='assessment_tutor'?assessmentId:lessonId].join(':');

  if(loading) return <Loading label="Opening your tutors…"/>;
  if(loadError||!catalog) return <section className="page-section"><ErrorPanel message={loadError||'The course could not load.'} retry={()=>{void refresh();}}/><ButtonLink href="/library">Back to the course library<ArrowUpRight size={17}/></ButtonLink></section>;
  if(!me?.profile) return <section className="page-section"><PageHeading kicker="YOUR LEARNING TUTORS" title={<>A little space.<br/><em>For your questions.</em></>} description="Set up your adult learner profile to explore the course with three distinct learning guides."/><ButtonLink href={me?.user?'/onboarding':'/signup?next=/tutor'}>{me?.user?'Set up my learner profile':'Create my learner profile'}<ArrowUpRight size={17}/></ButtonLink></section>;

  return <section className="page-section tutor-page">
    <PageHeading kicker="THREE WAYS TO FIND YOUR NEXT STEP" title={<>A little clarity.<br/><em>In your own way.</em></>} description="An explanation, room to practise, or a clear next step. Choose a tutor for what you need today. Your private life never needs to be part of the question."/>
    <div className="tutor-personas" role="group" aria-label="Choose your tutor">
      {TUTOR_PERSONAS.map(persona=>{const Icon=ICONS[persona.id];return <button key={persona.id} type="button" className={`tutor-persona ${role===persona.id?'selected':''}`} aria-pressed={role===persona.id} onClick={()=>setRole(persona.id)}>
        <span className="tutor-persona-icon"><Icon size={23}/></span><span className="tutor-persona-content"><strong>{persona.title}</strong><span className="tutor-persona-character">{persona.character}</span><span>{persona.description}</span><small>{persona.scope}</small></span><span className="tutor-persona-selected" aria-hidden="true">{role===persona.id&&<Check size={15}/>}</span>
      </button>;})}
    </div>
    <p className="tutor-role-note">{me.demo?.active?'Demonstration uses written curriculum guides. No external AI calls or paid replies.':me.tutor?.mode==='ai'?'All three tutors are ready in their own voices, using the written course. Leave the AI box ticked and ask. Two-choice options stay exact, so those buttons always match the lesson.':'These tutors currently use written curriculum guidance. Live AI is not connected.'} Changing tutor, lesson or learner starts a fresh conversation.</p>
    <TutorSession key={conversationKey} role={role} lessonId={lessonId} assessmentId={assessmentId} me={me} results={results} onLesson={lesson=>setTopic({query:requestedLesson,lesson})} onAssessment={setSelectedAssessment}/>
  </section>;
}

function TutorSession({role,lessonId,assessmentId,me,results,onLesson,onAssessment}:{role:TutorRole;lessonId:string;assessmentId:string;me:Me;results:OwnResult[];onLesson:(id:string)=>void;onAssessment:(id:string)=>void}) {
  const {catalog,refresh}=useAcademy();
  const persona=tutorPersona(role);
  const Icon=ICONS[role];
  const [mode,setMode]=useState<GuideMode>(persona.defaultMode);
  const [input,setInput]=useState('');
  const [messages,setMessages]=useState<Message[]>([]);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const [errorLink,setErrorLink]=useState<{url:string;title:string}|null>(null);
  const [usageNotice,setUsageNotice]=useState('');
  const [consentChoice,setConsentChoice]=useState<boolean|null>(null);
  const bottom=useRef<HTMLDivElement>(null);
  const requestController=useRef<AbortController|null>(null);
  const inFlight=useRef(false);
  const mounted=useRef(false);
  const messageId=useRef(0);
  const demo=me.demo?.active===true||me.billing?.mode==='demo';
  const activeAssessment=typeof me.profile?.activeAssessmentId==='string'?me.profile.activeAssessmentId:null;
  const aiAvailable=!demo&&!activeAssessment&&me.tutor?.mode==='ai';
  const storedConsent=me.tutor?.externalProcessingConsent===true;
  const consent=consentChoice??(aiAvailable||storedConsent);
  const monthlyLimit=countValue(me.tutor?.monthlyLimit);
  const remaining=Math.max(0,monthlyLimit-countValue(me.tutor?.monthlyUsed));
  const extraQuestions=countValue(me.tutor?.extraQuestions);
  const aiReady=aiAvailable&&consent&&(remaining>0||extraQuestions>0);
  const bucket=typeof me.tutor?.bucket==='string'?me.tutor.bucket:'';
  const resetDate=/^\d{4}-\d{2}$/.test(bucket)?new Date(`${bucket}-01T00:00:00Z`):null;
  if(resetDate) resetDate.setUTCMonth(resetDate.getUTCMonth()+1);
  const resetLabel=resetDate&&Number.isFinite(resetDate.getTime())?new Intl.DateTimeFormat('en-AU',{day:'numeric',month:'long',timeZone:'Australia/Perth'}).format(resetDate):null;
  const latestPracticeMessage=messages.filter(message=>message.role==='guide'&&message.practice).at(-1);
  const pendingPractice=latestPracticeMessage?.practice?.stage==='question'?latestPracticeMessage.practice:null;
  const ownAssessmentTitle=(id:string)=>catalog?.modules.find(module=>module.assessmentId===id)?.title??(id==='CAP01'?'Capstone':id==='PLAN01'?'Applied planning':id);

  useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;requestController.current?.abort();};},[]);
  useEffect(()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.motion==='off';
    bottom.current?.scrollIntoView({behavior:reduced?'auto':'smooth',block:'nearest'});
  },[messages,busy,error]);

  async function send(event?:FormEvent,textOverride?:string,modeOverride?:GuideMode,practiceOverride?:PracticeChoice) {
    event?.preventDefault();
    const question=(textOverride??input).trim();
    if(inFlight.current||!question) return;
    if(question.length>1200){setError('Keep your question to 1,200 characters or fewer.');return;}
    const chosenMode=modeOverride??mode;
    if(modeOverride) setMode(modeOverride);
    const typedChoice=/^(?:option\s*)?([ab12])[.!]?$/i.exec(question);
    const practice=practiceOverride??(role==='practice_coach'&&pendingPractice&&typedChoice?{scenarioId:pendingPractice.scenarioId,choiceIndex:['a','1'].includes(typedChoice[1].toLowerCase())?0:1}:undefined);
    const history:TutorHistoryTurn[]=messages.slice(-4).map(message=>({role:message.role==='user'?'user':'assistant',content:message.text.slice(0,500)}));
    const body={message:question,role,...(role==='assessment_tutor'?{assessmentId:assessmentId||undefined}:{lessonId}),...(aiAvailable?{consentToAI:consent}:{}),mode:chosenMode,history,practice};
    // Stay within the API's byte limit, including multilingual text and JSON escaping.
    while(history.length&&new TextEncoder().encode(JSON.stringify(body)).length>5800) history.shift();
    if(new TextEncoder().encode(JSON.stringify(body)).length>6000){setError('This question is too large to send. Please shorten it a little.');return;}
    inFlight.current=true;setBusy(true);setError('');setErrorLink(null);setUsageNotice('');setInput('');
    const userMessageId=++messageId.current;
    setMessages(previous=>[...previous,{id:userMessageId,role:'user',text:question}]);
    const controller=new AbortController();requestController.current=controller;
    try {
      const data=await request<TutorResponse>('/api/tutor',{method:'POST',signal:controller.signal,body:JSON.stringify(body)});
      if(!mounted.current) return;
      if(typeof data.answer!=='string'||!data.answer.trim()) throw new Error('The tutor returned an incomplete response. Please try again.');
      if(role==='practice_coach'&&data.practice?.stage==='feedback')setMode('explain');
      setMessages(previous=>[...previous,{
        id:++messageId.current,role:'guide',text:data.answer,mode:data.mode,tutorRole:data.role,
        sources:(data.sources??[]).filter(source=>typeof source.url==='string'&&source.url.startsWith('https://')),
        lessonLinks:(data.lessonLinks??[]).filter(link=>typeof link.url==='string'&&internalLink(link.url)),
        notice:data.notice,practice:data.practice,feedback:data.assessment?.feedback,assessmentOverride:data.assessmentOverride,
      }]);
      // A saved reply and a usage refresh are separate outcomes; never invite a
      // duplicate paid question just because refreshing the totals failed.
      if(data.externalProcessing||data.allowanceReached||(aiAvailable&&consent!==storedConsent)) void refresh().catch(()=>{if(mounted.current)setUsageNotice('Your reply is ready. Usage totals could not refresh; reload the page to update the allowance.');});
    } catch(failure) {
      if(!mounted.current) return;
      const problem=failure as ApiError;
      const details=problem.data&&typeof problem.data==='object'?problem.data as {code?:string}:{};
      setMessages(previous=>previous.filter(message=>message.id!==userMessageId));setInput(question);setError(problem.message);
      if(problem.status===402)setErrorLink({url:'/pricing',title:'See membership options'});
      if(['agreement_required','onboarding_required'].includes(details.code??''))setErrorLink({url:'/onboarding',title:'Review your learner agreement'});
      if(['demo_expired','learner_session_changed'].includes(details.code??''))setErrorLink({url:'/demo',title:'Review or restart your learner session'});
    } finally {
      inFlight.current=false;
      if(mounted.current)setBusy(false);
      if(requestController.current===controller)requestController.current=null;
    }
  }

  return <div className={`tutor-layout tutor-role-${role}`}>
    <aside className="tutor-settings panel">
      <div className="guide-avatar"><Icon size={25}/></div><h2>{persona.title}</h2><p className="tutor-personality">{persona.character}</p>
      <span className="mode-badge"><span className="status-dot"/>{demo?'Demo curriculum guide':activeAssessment?'Assessment process only':aiReady?'Ready · course knowledge':'Curriculum guide'}</span>
      <p>{persona.description}</p>
      {activeAssessment&&<div className="tutor-assessment-notice"><ClipboardCheck size={18}/><p>A marked assessment is open. Every tutor is limited to process guidance until you submit or close it. <Link href={`/assessment/${activeAssessment}`}>Return to assessment.</Link></p></div>}
      {role==='assessment_tutor'?<label className="field">Which submitted assessment?<select value={assessmentId} onChange={event=>onAssessment(event.target.value)}><option value="">Latest attempt / overall progress</option>{results.map(result=><option key={result.assessmentId} value={result.assessmentId}>{ownAssessmentTitle(result.assessmentId)}</option>)}</select></label>:<>
        <label className="field">What are we exploring?<select value={lessonId} onChange={event=>onLesson(event.target.value)}>{catalog?.modules.map(module=><optgroup key={module.id} label={module.title}>{module.lessons.map(lesson=><option value={lesson.id} key={lesson.id}>{lesson.title}</option>)}</optgroup>)}</select></label>
        <label className="field">How would you like to learn?<select value={mode} onChange={event=>setMode(event.target.value as GuideMode)} disabled={busy}>{role==='practice_coach'&&<option value="scenario">Try a two-choice situation</option>}<option value="explain">{role==='practice_coach'?'Explore the reasoning':'Explain an idea'}</option><option value="recap">Recap the key ideas</option></select></label>
      </>}
      {aiAvailable&&<>
        <label className="check-field"><input type="checkbox" checked={consent} onChange={event=>setConsentChoice(event.target.checked)} disabled={busy}/><span>Use AI explanations when allowance is available. I agree to send my question, a short recent conversation and lesson context to the Academy AI service. I will avoid personal or sensitive details.</span></label>
        <p className="small-text">Untick this if you want the written lesson instead. Your choice is saved when you ask. Two-choice practice still uses the course’s exact options.</p>
        <div className="tutor-privacy"><MessageCircle size={18}/><p><strong>{remaining} of {monthlyLimit} included AI replies left.</strong><br/>{extraQuestions} purchased replies available.{resetLabel&&<> Monthly allowance resets {resetLabel}.</>}</p></div>
        {remaining===0&&extraQuestions===0&&<p className="small-text">Written guidance and practice remain available.</p>}
      </>}
      {role==='assessment_tutor'&&<p className="small-text">This tutor only uses your saved progress and the published rules. It will not reveal an answer key or another learner’s record.</p>}
      <div className="tutor-privacy"><ShieldCheck size={18}/><p>Conversation stays in this page’s memory and is not saved to your learner profile. A short recent context may accompany a follow-up. <Link href="/privacy">Privacy details.</Link></p></div>
      <button type="button" className="text-link" disabled={busy} onClick={()=>{setMessages([]);setError('');setErrorLink(null);setUsageNotice('');setInput('');}}><Trash2 size={14}/>Clear this conversation</button>
      <Link href="/support" className="text-link">Looking for personal support?<ArrowUpRight size={15}/></Link>
    </aside>
    <div className="chat-panel">
      <div className="chat-panel-header"><span><Icon size={18}/>{persona.title}</span><small>{demo?'Demonstration · no AI usage':activeAssessment?'Marked assessment in progress':aiReady?`${persona.character} · course knowledge`:'Written curriculum guidance'}</small></div>
      <div className="chat-history" role="log" aria-label={`${persona.title} conversation`} aria-live="polite" aria-relevant="additions text">
        {!messages.length&&<div className="chat-welcome"><div className="guide-avatar"><Icon size={30}/></div><h2>{persona.welcome}</h2><p>{persona.introduction}</p><div className="prompt-grid">{persona.prompts.map(prompt=><button key={prompt.text} type="button" onClick={()=>{void send(undefined,prompt.text,prompt.mode);}} disabled={busy}>{prompt.text}<ArrowUpRight size={14}/></button>)}</div></div>}
        {messages.map(message=>{const ReplyIcon=ICONS[message.tutorRole??role];return <div key={message.id} className={`chat-message ${message.role}`}>
          <div className="chat-speaker">{message.role==='guide'?<><ReplyIcon size={14}/>{message.mode==='support-guide'?'Support information':message.assessmentOverride?'Assessment process':tutorPersona(message.tutorRole??role).title}<span className="tutor-reply-kind">{message.mode==='ai'?'AI reply':'Course guide'}</span></>:'YOU'}</div>
          <div className="chat-message-text">{message.text.split('\n').map((line,index)=><p key={index}>{line||'\u00a0'}</p>)}</div>
          {message.practice&&<div className={`tutor-practice ${message.practice.stage==='feedback'?'has-feedback':''}`} role="group" aria-label="Ungraded practice choices">
            {message.practice.options.map((option,index)=><button type="button" key={index} className={message.practice?.stage==='feedback'&&message.practice.selectedIndex===index?'chosen':''} disabled={busy||message.practice?.stage==='feedback'||message.id!==latestPracticeMessage?.id} onClick={()=>{void send(undefined,`I choose ${index===0?'A':'B'}.`,'scenario',{scenarioId:message.practice!.scenarioId,choiceIndex:index});}}><span>{index===0?'A':'B'}</span>{option}{message.practice?.stage==='feedback'&&message.practice.selectedIndex===index&&<Check size={15}/>}</button>)}
            <small>Fictional, optional and ungraded. No assessment or completion record changes.</small>
          </div>}
          {Boolean(message.feedback?.length)&&<details className="tutor-feedback"><summary>Approved explanations for your submitted assessment ({message.feedback!.length})</summary><p className="small-text">These are the explanations released on submission. Selected answers are not retained, so this is not a reconstruction of your item-by-item mistakes.</p>{message.feedback?.map(item=><div key={item.questionId}><strong>{item.questionId}</strong><p>{item.feedback}</p></div>)}</details>}
          {message.notice&&<p className="small-text">{message.notice}</p>}
          {Boolean(message.lessonLinks?.length)&&<div className="chat-sources">{message.lessonLinks?.map(link=><Link key={link.id} href={link.url}><BookOpen size={12}/>{link.title}<ArrowUpRight size={11}/></Link>)}</div>}
          {Boolean(message.sources?.length)&&<details className="tutor-source-details"><summary>{message.sources!.length} course {message.sources!.length===1?'source':'sources'}</summary><div className="chat-sources">{message.sources?.map(source=><a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer"><BookOpen size={12}/>{source.id} · {source.title}<ExternalLink size={11}/></a>)}</div></details>}
        </div>;})}
        {busy&&<div className="guide-thinking" role="status"><span/><span/><span/>{role==='assessment_tutor'?'Checking your saved course records…':role==='practice_coach'?'Finding the practice guidance…':'Finding a clear explanation…'}</div>}
        {error&&<ErrorPanel message={error}/>}
        {errorLink&&<Link className="text-link" href={errorLink.url}>{errorLink.title}<ArrowUpRight size={14}/></Link>}
        {usageNotice&&<p className="small-text" role="status">{usageNotice}</p>}<div ref={bottom}/>
      </div>
      <form className="chat-composer" onSubmit={send}>
        <label className="sr-only" htmlFor="tutor-question">Your educational question</label>
        <textarea id="tutor-question" value={input} onChange={event=>setInput(event.target.value)} rows={2} maxLength={1200} disabled={busy} placeholder={pendingPractice?'Choose A or B, or ask another question…':role==='assessment_tutor'?'What would you like to check?':'What would you like to understand?'} aria-describedby="tutor-input-help" onKeyDown={event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.nativeEvent.isComposing){event.preventDefault();void send();}}}/>
        <button className="icon-button send-button" type="submit" disabled={busy||!input.trim()} aria-label="Send question"><ArrowUpRight size={23}/></button>
      </form>
      <p className="chat-disclaimer" id="tutor-input-help">Up to 1,200 characters. Shift + Enter for a new line. Educational guidance, not diagnosis, treatment, legal advice or emergency support. <Link href="/support">Find personal support.</Link></p>
    </div>
  </div>;
}
