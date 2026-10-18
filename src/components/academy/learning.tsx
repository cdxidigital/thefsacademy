'use client';
import Link from '@/lib/next-compat';
import {useEffect,useRef,useState,type FormEvent} from 'react';
import {useRouter} from '@/lib/next-compat';
import {ArrowRight,ArrowUpRight,BookOpen,Check,CheckCircle,ChevronLeft,ChevronRight,Clock,Download,ExternalLink,Flag,GraduationCap,Headphones,Heart,Lock,MessageCircle,RotateCcw,ShieldCheck,Sparkles,Target,Trophy} from 'lucide-react';
import {useAcademy,ButtonLink,ModuleCard,PageHeading,SectionHeading,Loading,ErrorPanel,Breadcrumb,FeatureCheck} from './ui';
import {request,post,openPrivateHtml,type Lesson,type Module,type Source,type Me,type Progress,type ApiError} from '@/lib/academy/types';
import {moduleArt} from '@/lib/academy/display';
import {shuffleQuestionOptions} from '@/lib/academy/assessment-options';

// A request started for one lesson/check must never update a later route.
function useActionScope(key:string) {
 const scope=useRef(0);
 const inFlight=useRef(false);
 useEffect(()=>{
  scope.current+=1;inFlight.current=false;
  return()=>{scope.current+=1;inFlight.current=false;};
 },[key]);
 return {scope,inFlight};
}
function accessRecovery(failure:ApiError):{href:string;label:string}|null {
 const code=failure.data&&typeof failure.data==='object'?(failure.data as {code?:unknown}).code:null;
 const next = typeof window==='undefined'?'':`${window.location.pathname}${window.location.search}`;
 const withNext=(href:string)=>next.startsWith('/')&&!next.startsWith('//')?`${href}?next=${encodeURIComponent(next)}`:href;
 if(code==='demo_expired'||code==='learner_session_changed')return {href:'/demo',label:'Refresh or restart your demo'};
 if(failure.status===401)return {href:withNext('/login'),label:'Sign in to continue'};
 if(failure.status===402||code==='membership_required')return {href:'/pricing',label:'Explore membership'};
 if(code==='onboarding_required'||code==='agreement_required')return {href:withNext('/onboarding'),label:'Complete your learner welcome'};
 if(code==='orientation_required')return {href:'/learn/orientation',label:'Complete orientation'};
 if(code==='prerequisites_required'||failure.status===404)return {href:'/progress',label:failure.status===404?'Back to your learning path':'See your remaining learning'};
 return null;
}
function scrollLearningTop(focusMain=false) {
 if(focusMain)document.getElementById('main')?.focus({preventScroll:true});
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.dataset.motion==='off';
 window.scrollTo({top:0,behavior:reduced?'auto':'smooth'});
}
export function Dashboard(){const{me,catalog,loading}=useAcademy();if(loading||!catalog)return <Loading/>;if(!me?.profile)return <WelcomeProfile/>;const completed=me.progress?.completedLessonIds||[];const lessons=catalog.modules.flatMap(m=>m.lessons);const coreLessons=catalog.modules.filter(module=>module.kind==='core').flatMap(module=>module.lessons);const coreCompleted=coreLessons.filter(lesson=>completed.includes(lesson.id)).length;const demo=me.billing?.mode==='demo';const activeAssessment=typeof me.profile.activeAssessmentId==='string'?me.profile.activeAssessmentId:null;const next=lessons.find(l=>!completed.includes(l.id));const current=catalog.modules.find(m=>m.id===next?.moduleId)||catalog.modules[0];const firstName=String(me.profile.displayName||'curious human').split(' ')[0];const xp=me.progress?.xp||0;return <section className="page-section dashboard"><PageHeading kicker="YOUR LEARNING SPACE" title={<>Welcome back, <em>{firstName}.</em></>} description={demo?'Explore a separate Academy Plus demo with sample progress. Continue learning to try the full course experience.':'Make a little space for yourself. Your next chapter is waiting.'} action={<div className="xp-pill"><Sparkles size={17}/>{xp} {demo?'demo XP':'XP'}<span>Level {me.progress?.level||Math.floor(xp/300)+1}</span></div>}/>{activeAssessment&&<div className="notice"><p>You have an assessed knowledge check open. Return to finish it or leave the assessment when you want full tutor guidance again.</p><ButtonLink href={`/assessment/${encodeURIComponent(activeAssessment)}`} variant="outline">Return to my assessment<ArrowRight size={17}/></ButtonLink></div>}<div className="dashboard-grid"><div className="continue-card"><img src={`/images/${moduleArt[current.id]?.image||'connection'}.webp`} alt=""/><div className="continue-shade"/><div className="continue-content"><span className="eyebrow">{completed.length?'PICK UP WHERE YOU LEFT OFF':'A GOOD PLACE TO BEGIN'}</span><h2>{current.title}</h2><p>{next?.title||'You have explored every written lesson. Revisit a favourite.'}</p><div className="course-meta"><span><BookOpen size={14}/>{next?.durationMinutes||current.lessons[0]?.durationMinutes||15} minute lesson</span><span><Sparkles size={14}/>25 XP per new completion</span></div><ButtonLink href={!me.progress?.orientationCompleted?'/learn/orientation':next?`/learn/${next.id}`:'/progress'}>{!me.progress?.orientationCompleted||next?(completed.length?'Continue learning':'Start learning'):'See your path'}<ArrowRight size={18}/></ButtonLink></div></div><div className="dashboard-side"><div className="panel progress-panel"><div className="panel-top"><span className="eyebrow">YOUR FOUNDATIONS</span><Flag size={18}/></div><strong>{coreCompleted}<span>/ {coreLessons.length} lessons</span></strong><div className="progress-track" role="progressbar" aria-label="Foundation lessons completed" aria-valuemin={0} aria-valuemax={coreLessons.length} aria-valuenow={coreCompleted}><span style={{width:`${coreCompleted/Math.max(1,coreLessons.length)*100}%`}}/></div><p>A little understanding adds up.</p><Link className="text-link" href="/progress">See your progress<ArrowUpRight size={16}/></Link></div><div className="panel gentle-goal"><Heart size={20}/><div><strong>Your pace is a good pace.</strong><p>{String(me.profile.weeklyGoal||3)} lessons a week is your intention. There’s no penalty for life happening.</p></div></div></div></div><div className="stat-grid"><div className="stat-card"><BookOpen size={21}/><strong>{completed.length}</strong><span>chapters completed</span></div><div className="stat-card"><CheckCircle size={21}/><strong>{me.progress.passedAssessmentIds?.filter(id=>id.endsWith('-TEST')).length||0}</strong><span>modules assessed</span></div><div className="stat-card"><Sparkles size={21}/><strong>{xp}</strong><span>private learning XP</span></div><div className="stat-card"><GraduationCap size={21}/><strong>{demo?'Sample':me.certificate?.issued?'Earned':'In progress'}</strong><span>completion certificate</span></div></div><SectionHeading kicker="YOUR NEXT CHAPTERS" title={<>Stay <em>curious.</em></>} href="/library"/><div className="course-grid featured">{catalog.modules.slice(0,4).map(m=><ModuleCard key={m.id} module={m} compact/>)}</div><div className="dashboard-bottom"><Link className="panel action-panel" href="/tutor"><MessageCircle size={25}/><div><h3>Something on your mind?</h3><p>Find a clearer explanation with your lesson guide.</p></div><ArrowUpRight size={20}/></Link><Link className="panel action-panel" href="/resources"><BookOpen size={25}/><div><h3>Take the learning with you.</h3><p>Explore private worksheets, definitions and sources.</p></div><ArrowUpRight size={20}/></Link></div></section>}
function WelcomeProfile(){const{identity}=useAcademy();return <section className="page-section"><div className="empty-state welcome-profile"><Sparkles size={35}/><span className="eyebrow">LET’S MAKE THIS YOURS</span><h1>A little space.<br/><em>Just for you.</em></h1><p>Set up your learner profile to save progress, collect milestones and find your own pace.</p><ButtonLink href={identity?'/onboarding':'/signup?next=/onboarding'}>{identity?'Set up my profile':'Create your learner profile'}<ArrowRight size={18}/></ButtonLink>{!identity&&<ButtonLink href="/login?next=/onboarding" variant="outline">I already have an account<ArrowRight size={18}/></ButtonLink>}</div></section>}
export function Onboarding(){
 const{me,identity,loading,refresh}=useAcademy();
 const router=useRouter();
 const[name,setName]=useState('');
 const[goal,setGoal]=useState(3);
 const[adult,setAdult]=useState(false);
 const[ack,setAck]=useState(false);
 const[busy,setBusy]=useState(false);
 const inFlight=useRef(false);
 const[saved,setSaved]=useState(false);
 const[error,setError]=useState('');
 const currentAgreement=Boolean(me?.profile&&typeof me.policyVersion==='string'&&me.profile.acceptedVersion===me.policyVersion);
 useEffect(()=>{
  if(!loading&&currentAgreement&&!busy&&!saved)router.replace('/dashboard');
 },[loading,currentAgreement,busy,saved,router]);
 useEffect(()=>{
  const proposed=me?.profile?.displayName||identity?.name||'';
  if(proposed&&!proposed.includes('@'))setName(proposed);
  const existingGoal=Number(me?.profile?.weeklyGoal);
  if([2,3,5].includes(existingGoal))setGoal(existingGoal);
 },[me?.profile?.displayName,me?.profile?.weeklyGoal,identity?.name]);
 async function submit(e:FormEvent){
  e.preventDefault();
  if(inFlight.current)return;
  inFlight.current=true;let savedOnServer=saved;
  setBusy(true);setError('');
  try{
   if(!savedOnServer)await post('/api/profile',{displayName:name.trim(),adultConfirmed:adult,educationAcknowledged:ack,weeklyGoal:goal});
   savedOnServer=true;
   // The server acknowledgement is durable; browser storage is an optional convenience.
   setSaved(true);
   try{sessionStorage.setItem('fsa:adult:v1','yes')}catch{}
   await refresh();
   router.push(me?.progress?.orientationCompleted?'/dashboard':'/learn/orientation');
  }catch(e){setError(savedOnServer?'Your profile is saved. Your learning space could not refresh. Select Continue to try loading it again.':(e as Error).message)}finally{inFlight.current=false;setBusy(false)}
 }
 if(loading||(currentAgreement&&!saved))return <Loading label="Opening your learning space…"/>;
 if(!identity)return <section className="page-section"><div className="empty-state welcome-profile"><Sparkles size={35}/><span className="eyebrow">YOUR LEARNER PROFILE</span><h1>Sign in to<br/><em>make this yours.</em></h1><p>Progress is saved to your account, so there is a way back to it.</p><ButtonLink href="/signup?next=/onboarding">Create your learner profile<ArrowRight size={18}/></ButtonLink><ButtonLink href="/login?next=/onboarding" variant="outline">I already have an account<ArrowRight size={18}/></ButtonLink></div></section>;
 return <section className="onboarding-layout"><div className="onboarding-image"><img src="/images/night-campus.webp" alt="The Academy courtyard at night"/><div><span className="eyebrow">YOUR NEXT CHAPTER</span><h2>Come as you are.<br/><em>Learn as you like.</em></h2></div></div><form className="onboarding-form" onSubmit={submit}><span className="eyebrow">WELCOME TO YOUR ACADEMY</span><h1>Let’s make<br/><em>this your space.</em></h1><p>Just the essentials. Your private life stays yours.</p><label className="field">What should we call you?<input value={name} onChange={e=>setName(e.target.value)} minLength={1} maxLength={80} disabled={busy||saved} required autoComplete="nickname" placeholder="Your name or a nickname"/></label><fieldset className="goal-options"><legend>A little intention for your week</legend><div>{[[2,'Easy does it','2 lessons'],[3,'A little momentum','3 lessons'],[5,'Feeling curious','5 lessons']].map(([v,t,s])=><label key={v} className={goal===v?'selected':''}><input type="radio" disabled={busy||saved} name="goal" value={v} checked={goal===v} onChange={()=>setGoal(Number(v))}/><strong>{t}</strong><span>{s}</span></label>)}</div><small>Flexible, always. No lost streaks or catch-up pressure.</small></fieldset><label className="check-field"><input type="checkbox" disabled={busy||saved} checked={adult} onChange={e=>setAdult(e.target.checked)} required/><span>I confirm that I am 18 years or older.</span></label><label className="check-field"><input type="checkbox" disabled={busy||saved} checked={ack} onChange={e=>setAck(e.target.checked)} required/><span>I understand this is non-accredited adult education, and have read the <Link href="/terms">terms</Link> and <Link href="/privacy">privacy information</Link>.</span></label>{error&&<ErrorPanel message={error}/>}<button className="button primary full" disabled={busy||!adult||!ack||!name.trim()}>{busy?(saved?'Opening your learning…':'Creating your space…'):saved?'Continue to my learning':'Make yourself at home'}<ArrowRight size={18}/></button><p className="microcopy"><Lock size={13}/>Your account stores learning progress, not personal reflections.</p></form></section>}
type OrientationData={title:string;content:string[];acknowledgements:string[];activity:string;durationMinutes?:number};
export function Orientation() {
 const {refresh,me}=useAcademy();const router=useRouter();
 const [data,setData]=useState<OrientationData|null>(null);
 const [checks,setChecks]=useState<boolean[]>([]);
 const [error,setError]=useState('');const [busy,setBusy]=useState(false);const [saved,setSaved]=useState(false);const [retry,setRetry]=useState(0);
 const {scope,inFlight}=useActionScope('orientation');
 useEffect(()=>{
  const controller=new AbortController();setError('');
  request<{orientation:OrientationData}>('/api/orientation',{signal:controller.signal})
   .then(({orientation})=>{if(!controller.signal.aborted){setData(orientation);setChecks(orientation.acknowledgements.map(()=>false));}})
   .catch(failure=>{if(!controller.signal.aborted)setError(failure.message);});
  return()=>controller.abort();
 },[retry]);
 async function complete() {
  if(inFlight.current||!data||(!saved&&(!checks.length||!checks.every(Boolean))))return;
  inFlight.current=true;const activeScope=scope.current;let savedOnServer=saved;
  setBusy(true);setError('');
  try {
   if(!savedOnServer)await post('/api/orientation',{});
   if(scope.current!==activeScope)return;
   savedOnServer=true;setSaved(true);
   await refresh();
   if(scope.current===activeScope)router.push('/learn/C01-L01');
  }catch(failure){if(scope.current===activeScope)setError(savedOnServer?'Your orientation is saved. Select Continue to retry opening your learning space.':(failure as Error).message);}
  finally{if(scope.current===activeScope){inFlight.current=false;setBusy(false);}}
 }
 if(!me?.profile)return <WelcomeProfile/>;
 if(error&&!data)return <section className="page-section"><ErrorPanel message={error} retry={()=>setRetry(value=>value+1)}/><ButtonLink href="/library">Back to the course library<ArrowRight size={18}/></ButtonLink></section>;
 if(!data)return <Loading/>;
 return <section className="page-section lesson-page"><Breadcrumb items={[{label:'Your learning',href:'/dashboard'},{label:'Learning on your terms'}]}/><div className="reading-layout"><article className="reading-surface"><span className="eyebrow">BEFORE YOUR FIRST CHAPTER</span><h1>Learning on<br/><em>your terms.</em></h1><div className="reading-meta"><BookOpen size={15}/>Orientation<span>{data.durationMinutes?`${data.durationMinutes} minutes · `:''}Go at your own pace</span></div><div className="lesson-prose">{data.content.map((paragraph,index)=><p key={index}>{paragraph}</p>)}</div><div className="reflection-box"><Heart size={20}/><h3>A small place to begin</h3><p>{data.activity}</p></div><h3>Feel comfortable finding your way?</h3><div className="orientation-checks">{data.acknowledgements.map((acknowledgement,index)=><label className="check-field" key={index}><input type="checkbox" checked={checks[index]||false} disabled={busy||saved} onChange={event=>{const checked=event.target.checked;setChecks(previous=>previous.map((value,position)=>position===index?checked:value));}}/><span>{acknowledgement}</span></label>)}</div>{error&&<ErrorPanel message={error}/>}<button className="button primary full" onClick={complete} disabled={busy||(!saved&&(!checks.length||!checks.every(Boolean)))}>{busy?'Saving…':saved?'Continue to my first chapter':'I’m ready for my first chapter'}<ArrowRight size={18}/></button></article><aside className="reading-aside"><div className="panel"><ShieldCheck size={27}/><h3>You’re in control.</h3><p>Pause, skip a private exercise, or return another day. All activities can use fictional adults.</p><Link href="/support" className="text-link">Find support<ArrowUpRight size={16}/></Link></div></aside></div></section>;
}
function TeachingVoice({script}:{script:string}) {
 const [playing,setPlaying]=useState(false);
 useEffect(()=>()=>{window.speechSynthesis?.cancel();},[script]);
 function toggle() {
  const synth=window.speechSynthesis;
  if (!synth) return;
  if (playing) { synth.cancel(); setPlaying(false); return; }
  synth.cancel();
  const utter=new SpeechSynthesisUtterance(script);
  utter.lang='en-AU';
  utter.rate=0.94;
  const voice=synth.getVoices().find(item=>/en[-_]AU/i.test(item.lang))||synth.getVoices().find(item=>/^en/i.test(item.lang));
  if (voice) utter.voice=voice;
  utter.onend=()=>setPlaying(false);
  utter.onerror=()=>setPlaying(false);
  setPlaying(true);
  synth.speak(utter);
 }
 return <button type="button" className="button small outline teaching-play" onClick={toggle}>{playing?'Stop the teaching':'Play the teaching'}</button>;
}
function CitedText({text}:{text:string}){return <>{text.split(/(\[[A-Z]\d+(?:,\s*[A-Z]\d+)*\])/g).map((part,i)=>/^\[[A-Z]\d/.test(part)?<span className="inline-citations" key={i}>{part.replace(/[\[\]]/g,'').split(/,\s*/).map(id=><a href={`#source-${id}`} key={id} aria-label={`View source ${id}`}>{id}</a>)}</span>:part)}</>}
type LessonPayload={lesson:Lesson;module:Omit<Module,'lessons'>&Partial<Pick<Module,'lessons'>>;sources:Source[];nextLessonId:string|null;previousLessonId:string|null;teaching?:{beats:string[];spoken:string;video:string;poster:string;image:string;caption:string};scenario?:{prompt:string;options:string[]}};
export function LessonView({id}:{id:string}) {
 const {me,refresh,toast,catalog}=useAcademy();
 const {scope,inFlight}=useActionScope(id);
 const [data,setData]=useState<LessonPayload|null>(null);
 const [error,setError]=useState('');
 const [recovery,setRecovery]=useState<ReturnType<typeof accessRecovery>>(null);
 const [busy,setBusy]=useState(false);
 const [saved,setSaved]=useState(false);
 const [syncNotice,setSyncNotice]=useState('');
 const [retry,setRetry]=useState(0);
 const [showReflection,setShowReflection]=useState(false);
 const [reflection,setReflection]=useState('');
 const [scenarioChoice,setScenarioChoice]=useState<number|null>(null);
 const [scenarioNote,setScenarioNote]=useState<{lessonId:string;choice:number;correct:boolean;feedback:string}|null>(null);
 const [fontSize,setFontSize]=useState(17);
 useEffect(()=>{
  const controller=new AbortController();
  setData(null);setError('');setRecovery(null);setSaved(false);setBusy(false);setSyncNotice('');setShowReflection(false);setReflection('');setScenarioChoice(null);setScenarioNote(null);
  request<LessonPayload>(`/api/lessons/${encodeURIComponent(id)}`,{signal:controller.signal})
   .then(value=>{if(!controller.signal.aborted)setData(value);})
   .catch((failure:ApiError)=>{if(!controller.signal.aborted){setError(failure.message);setRecovery(accessRecovery(failure));}});
  return()=>controller.abort();
 },[id,retry]);
 async function mark() {
  if(inFlight.current||saved||me?.progress?.completedLessonIds?.includes(id)||data?.lesson.id!==id)return;
  inFlight.current=true;const activeScope=scope.current;
  setBusy(true);setError('');setRecovery(null);setSyncNotice('');
  try {
   await post<{completed:true;progress:Progress}>('/api/progress',{lessonId:id});
   if(scope.current!==activeScope)return;
   setSaved(true);
   toast('Chapter completion saved. Learning XP is awarded once per lesson.');
   void refresh().catch(()=>{if(scope.current===activeScope)setSyncNotice('Your chapter is saved. Progress totals could not refresh; use the page’s retry control or reload to update them.');});
  }catch(failure){if(scope.current===activeScope){setError((failure as ApiError).message);setRecovery(accessRecovery(failure as ApiError));}}
  finally{if(scope.current===activeScope){inFlight.current=false;setBusy(false);}}
 }
 if(error&&!data)return <section className="page-section"><ErrorPanel message={error} retry={()=>setRetry(value=>value+1)}/><ButtonLink href={recovery?.href||'/library'}>{recovery?.label||'Back to the course library'}<ArrowRight size={18}/></ButtonLink></section>;
 if(!data||data.lesson.id!==id)return <Loading label="Opening your chapter…"/>;
 const{lesson,sources}=data;const module=catalog?.modules.find(m=>m.id===data.module.id)||data.module;const done=saved||me?.progress?.completedLessonIds?.includes(id);return <section className="page-section lesson-page"><Breadcrumb items={[{label:'Your learning',href:'/dashboard'},{label:module.title,href:`/courses/${module.id}`},{label:`Lesson ${lesson.order||(module.lessons?.findIndex(l=>l.id===id)??0)+1||1}`} ]}/><div className="reading-layout"><article className="reading-surface"><div className="reading-topline"><span className="eyebrow">{module.id} / {moduleArt[module.id]?.tag||'YOUR NEXT CHAPTER'}</span><div className="reading-controls"><button onClick={()=>setFontSize(s=>Math.max(15,s-2))} aria-label="Smaller lesson text" disabled={fontSize<=15}>A−</button><button onClick={()=>setFontSize(s=>Math.min(24,s+2))} aria-label="Larger lesson text" disabled={fontSize>=24}>A+</button></div></div><h1>{lesson.title}</h1><div className="reading-meta"><Clock size={15}/>About {lesson.durationMinutes} min<span>Film, image, short listen</span>{done&&<span className="reading-done"><CheckCircle size={14}/>Completed</span>}</div>{data.teaching&&<div className="lesson-stage"><video className="lesson-film" src={data.teaching.video} poster={data.teaching.poster} controls playsInline muted loop preload="metadata" aria-label={`${lesson.title} film`}/><figure className="lesson-still"><img src={data.teaching.image} alt={data.teaching.caption}/><figcaption>{data.teaching.caption}</figcaption></figure></div>}{data.teaching&&<div className="lesson-listen"><Headphones size={18} aria-hidden="true"/><div><strong>Listen</strong><span>A short spoken teaching. Your private life can stay out of it.</span><TeachingVoice key={lesson.id} script={data.teaching.spoken}/></div></div>}{data.teaching?.beats?.length?<ul className="lesson-beats">{data.teaching.beats.map(beat=><li key={beat}>{beat}</li>)}</ul>:null}<details className="objectives"><summary>What you’ll take away<ChevronRight size={16}/></summary><ul>{lesson.objectives?.map((o,i)=><li key={i}>{o}</li>)}</ul></details><details className="lesson-full"><summary>The longer note, if you want it</summary><div className="lesson-prose" style={{fontSize}}>{lesson.content.split('\n\n').map((p,i)=><p key={i}><CitedText text={p}/></p>)}</div></details>{data.scenario&&<section className="scenario-box"><span className="eyebrow">LET’S TRY A FICTIONAL SCENARIO</span><h3>{data.scenario.prompt}</h3><div className="scenario-options">{data.scenario.options.map((option,i)=><button key={i} onClick={()=>{const lessonId=id;const choice=i;setScenarioChoice(choice);void post<{correct:boolean;feedback:string}>(`/api/lessons/${encodeURIComponent(lessonId)}/scenario`,{choiceIndex:choice}).then(note=>setScenarioNote({lessonId,choice,correct:note.correct,feedback:note.feedback})).catch((failure:ApiError)=>setError(failure.message));}} aria-pressed={scenarioChoice===i} className={scenarioChoice===i?'selected':''}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}</div>{scenarioNote&&scenarioNote.lessonId===id&&scenarioNote.choice===scenarioChoice&&<div className="scenario-feedback" role="status"><strong>{scenarioNote.correct?'That’s a thoughtful choice.':'Let’s look at that choice.'}</strong><p>{scenarioNote.feedback}</p></div>}</section>}<section className="reflection-box"><div><Heart size={20}/><span className="eyebrow">A MOMENT FOR YOURSELF</span></div><h3>Pause. Think. Keep it yours.</h3><p>{lesson.reflection?.prompt}</p><p className="small-text">Optional and unassessed. Use a fictional example. Anything typed here stays in this page’s memory and disappears when you leave or refresh.</p><button className="text-link" aria-expanded={showReflection} aria-controls="lesson-private-reflection" onClick={()=>setShowReflection(v=>!v)}>{showReflection?'Close private space':'Open a private thinking space'}<ChevronRight size={16}/></button><div id="lesson-private-reflection" hidden={!showReflection}>{showReflection&&<><textarea value={reflection} onChange={e=>setReflection(e.target.value)} maxLength={5000} rows={5} placeholder="You can also just think about it. Nothing to submit." autoComplete="off" spellCheck={false} aria-label="Optional private reflection"/><button className="text-link" disabled={!reflection} onClick={()=>setReflection('')}>Clear my reflection</button></>}</div></section><section className="lesson-sources"><span className="eyebrow">WHERE THIS LEARNING COMES FROM</span>{sources?.map(source=><a key={source.id} id={`source-${source.id}`} href={source.url} target="_blank" rel="noopener noreferrer"><span>{source.id}</span><div><strong>{source.title}</strong><small>{source.publisher}</small></div><ExternalLink size={14}/></a>)}</section>{error&&<ErrorPanel message={error}/>} {error&&recovery&&<ButtonLink href={recovery.href} variant="outline">{recovery.label}</ButtonLink>}{syncNotice&&<div className="notice" role="status"><p>{syncNotice}</p></div>}<div className="lesson-complete"><div><strong>{done?'A chapter to feel good about.':'Ready to keep this learning?'}</strong><p>{done?'Your completion is saved.':'Mark it complete, then check your understanding.'}</p></div><button className={`button ${done?'outline':'primary'}`} disabled={busy||done} onClick={mark}>{busy?'Saving…':done?'Completed':'Mark as complete'}<Check size={18}/></button></div><div className="lesson-actions"><ButtonLink href={`/assessment/${lesson.assessmentId||id+'-CHECK'}`} variant="outline">Check my understanding<ArrowRight size={17}/></ButtonLink>{data.nextLessonId&&<Link className="text-link" href={`/learn/${data.nextLessonId}`}>Next lesson<ArrowRight size={17}/></Link>}</div></article><aside className="reading-aside"><div className="panel chapter-nav"><span className="eyebrow">IN THIS CHAPTER</span><h3>{module.title}</h3>{module.lessons?.map((l,i)=><Link key={l.id} className={l.id===id?'active':''} aria-current={l.id===id?'page':undefined} href={`/learn/${l.id}`}><span>{me?.progress?.completedLessonIds?.includes(l.id)?<Check size={13}/>:i+1}</span><div>{l.title}</div></Link>)}<Link href={`/assessment/${module.assessmentId}`}><GraduationCap size={16}/><div>Chapter knowledge check</div></Link></div><div className="panel guide-invite"><Sparkles size={25}/><h3>Let’s make it clearer.</h3><p>Ask your lesson guide about an idea in this chapter.</p><Link className="text-link" href={`/tutor?lesson=${id}`}>Ask a question<ArrowUpRight size={15}/></Link></div><p className="aside-note">Take a break whenever you need one.<br/><Link href="/support">Support is here.</Link></p></aside></div></section>}
type Question={id:string;prompt:string;options:string[];critical?:boolean;optionOrder?:number[]};
type AssessmentData={
 assessment:{id:string;title?:string;kind?:string;passingScore:number;moduleId?:string|null;instructions?:string|null;countsForCertificate?:boolean;criticalQuestionIds?:string[]};
 questions:Question[];sources?:Source[];planning?:{case?:string;task?:string};
};
type AssessmentResult={assessmentId:string;score:number;total:number;passingScore:number;passed:boolean;criticalPassed:boolean;attemptId:string;countsForCertificate:boolean;progress:Progress;feedback:{questionId:string;correct:boolean;selectedIndex:number;correctIndex:number;feedback:string;sourceIds?:string[]}[]};
export function Assessment({id}:{id:string}) {
 const {refresh,me}=useAcademy();
 const router=useRouter();
 const {scope,inFlight}=useActionScope(id);
 const resultRef=useRef<HTMLDivElement>(null);
 const [started,setStarted]=useState(false);
 const [data,setData]=useState<AssessmentData|null>(null);
 const [answers,setAnswers]=useState<Record<string,number>>({});
 const [error,setError]=useState('');
 const [recovery,setRecovery]=useState<ReturnType<typeof accessRecovery>>(null);
 const [syncNotice,setSyncNotice]=useState('');
 const [busy,setBusy]=useState(false);
 const [result,setResult]=useState<AssessmentResult|null>(null);
 const [retry,setRetry]=useState(0);
 useEffect(()=>{
  const controller=new AbortController();
  setData(null);setResult(null);setAnswers({});setStarted(me?.profile?.activeAssessmentId===id);setError('');setRecovery(null);setSyncNotice('');setBusy(false);
  request<AssessmentData>(`/api/assessments/${encodeURIComponent(id)}`,{signal:controller.signal})
   .then(value=>{if(!controller.signal.aborted)setData({...value,questions:shuffleQuestionOptions(value.questions)});})
   .catch((failure:ApiError)=>{if(!controller.signal.aborted){setError(failure.message);setRecovery(accessRecovery(failure));}});
  return()=>controller.abort();
  // Profile refreshes must not reset answers or reopen a completed attempt.
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[id,retry]);
 useEffect(()=>{
  if(!result)return;
  resultRef.current?.focus({preventScroll:true});
  scrollLearningTop();
 },[result]);
 function refreshSavedState(activeScope:number,message:string) {
  void refresh().catch(()=>{if(scope.current===activeScope)setSyncNotice(message);});
 }
 async function begin() {
  if(inFlight.current||!data||data.assessment.id!==id)return;
  inFlight.current=true;const activeScope=scope.current;
  setBusy(true);setError('');setRecovery(null);setSyncNotice('');
  try {
   await post(`/api/assessments/${encodeURIComponent(id)}/start`,{});
   if(scope.current!==activeScope)return;
   setStarted(true);
   refreshSavedState(activeScope,'Your assessment is open. Account details could not refresh; your answers can still be submitted here.');
  }catch(failure){if(scope.current===activeScope){setError((failure as Error).message);setRecovery(accessRecovery(failure as ApiError));}}
  finally{if(scope.current===activeScope){inFlight.current=false;setBusy(false);}}
 }
 async function leave() {
  if(inFlight.current)return;
  inFlight.current=true;const activeScope=scope.current;
  setBusy(true);setError('');setRecovery(null);
  try {
   await post(`/api/assessments/${encodeURIComponent(id)}/end`,{});
   if(scope.current!==activeScope)return;
   // Ending the assessment succeeded even if a subsequent dashboard refresh fails.
   void refresh().catch(()=>{});
   router.push('/progress');
  }catch(failure){if(scope.current===activeScope){setError((failure as Error).message);setRecovery(accessRecovery(failure as ApiError));}}
  finally{if(scope.current===activeScope){inFlight.current=false;setBusy(false);}}
 }
 async function submit(event:FormEvent) {
  event.preventDefault();
  if(inFlight.current||result||!data||data.assessment.id!==id)return;
  if(data.questions.some(question=>!Number.isInteger(answers[question.id]))){setError('Choose one answer for every question before submitting.');return;}
  inFlight.current=true;const activeScope=scope.current;
  const submittedAnswers={...answers};
  setBusy(true);setError('');setRecovery(null);setSyncNotice('');
  try {
   const saved=await post<AssessmentResult>(`/api/assessments/${encodeURIComponent(id)}`,{answers:submittedAnswers});
   if(scope.current!==activeScope)return;
   setResult(saved);
   refreshSavedState(activeScope,'Your result is saved. Progress totals could not refresh; reload or use the page’s retry control to update them.');
  }catch(failure){if(scope.current===activeScope){setError((failure as Error).message);setRecovery(accessRecovery(failure as ApiError));}}
  finally{if(scope.current===activeScope){inFlight.current=false;setBusy(false);}}
 }
 if(error&&!data)return <section className="page-section"><ErrorPanel message={error} retry={()=>setRetry(value=>value+1)}/><ButtonLink href={recovery?.href||'/progress'}>{recovery?.label||'See your learning path'}<ArrowRight size={17}/></ButtonLink></section>;
 if(!data||data.assessment.id!==id)return <Loading label="Preparing your knowledge check…"/>;
 const practice=data.assessment.kind==='lesson_practice';
 const criticalCount=data.assessment.criticalQuestionIds?.length||data.questions.filter(question=>question.critical).length;
 const instructions=<><p>{data.assessment.instructions||'Choose one response for each question. You’ll receive explanations after submitting.'}</p><p className="small-text">{data.assessment.passingScore} of {data.questions.length} correct to pass.{criticalCount>0&&<> {id==='PLAN01'?'All six applied planning decisions need to be correct.':'Every safety-critical item must also be correct.'}</>} {practice?'This lesson practice is recorded separately and does not count toward the completion certificate.':'This check contributes to your learning record.'}</p></>;
 if(!started&&!practice)return <section className="page-section assessment-page"><Breadcrumb items={[{label:'Your learning',href:'/progress'},{label:'Knowledge check'}]}/><PageHeading kicker="A MOMENT TO BRING IT TOGETHER" title={<>Ready to check your<br/><em>understanding?</em></>} description={`${data.questions.length} questions. No timer. Unlimited retries.`}/><div className="panel assessment-start"><GraduationCap size={29}/><h2>{data.assessment.title||'Your learning, in practice.'}</h2>{instructions}<p>While this assessed check is open, your guide can explain the process but will not suggest answers.</p>{error&&<ErrorPanel message={error}/>} {error&&recovery&&<ButtonLink href={recovery.href} variant="outline">{recovery.label}</ButtonLink>}<button className="button primary" disabled={busy} onClick={begin}>{busy?'Opening…':'Begin knowledge check'}<ArrowRight size={17}/></button></div></section>;
 const answered=data.questions.filter(question=>Number.isInteger(answers[question.id])).length;
 return <section className="page-section assessment-page">
  <Breadcrumb items={[{label:'Your learning',href:'/dashboard'},{label:'Knowledge check'}]}/>
  <PageHeading kicker={id==='CAP01'?'FOUNDATIONS CAPSTONE':id==='PLAN01'?'APPLIED PLANNING CASE':'MAKE IT STICK'} title={<>Let’s check your<br/><em>understanding.</em></>} description={`${data.questions.length} questions. No timer. Unlimited retries. A chance to learn, not a reason to worry.`}/>
  {result&&<div ref={resultRef} tabIndex={-1} className={`assessment-result ${result.passed?'passed':'revisit'}`} role="status"><div className="result-icon">{result.passed?<Trophy size={30}/>:<BookOpen size={30}/>}</div><div><span className="eyebrow">{result.passed?'NICE WORK':'ANOTHER CHANCE TO UNDERSTAND'}</span><h2>{result.passed?'That learning is yours.':'Let’s revisit a few ideas.'}</h2><p>{result.score} of {result.total} correct. Your result is saved.{!result.passed&&' Read the explanations below, then try again whenever you’re ready.'}</p>{!result.criticalPassed&&<p>{id==='PLAN01'?'All six applied planning decisions need to be correct.':'Every safety-critical item also needs to be correct.'}</p>}</div></div>}
  {syncNotice&&<div className="notice" role="status"><p>{syncNotice}</p></div>}
  <form onSubmit={submit} className="assessment-form" aria-busy={busy}>
   {!practice&&<button type="button" className="text-link assessment-exit" disabled={busy} onClick={leave}>Leave this assessment for now<ArrowUpRight size={15}/></button>}
   {!result&&<div className="panel assessment-instructions"><h2>{data.assessment.title||'Your knowledge check'}</h2>{instructions}</div>}
   {(data.planning?.case||id==='PLAN01')&&<div className="panel"><span className="eyebrow">A FICTIONAL CASE</span><p>{data.planning?.case||'Read the fictional scenario included in each question. Choose the option that best protects choice, communication, health and privacy.'}</p>{data.planning?.task&&<p>{data.planning.task}</p>}</div>}
   {data.questions.map((question,index)=>{
    const item=result?.feedback.find(feedback=>feedback.questionId===question.id);
    const selected=item?.selectedIndex??answers[question.id];
    return <fieldset className="question-card" key={question.id} disabled={busy||Boolean(result)}><legend><span className="question-number">{String(index+1).padStart(2,'0')}</span>{question.prompt}</legend>{question.critical&&<p className="small-text">Safety-critical question</p>}<div className="answer-options">{(question.optionOrder||question.options.map((_,choice)=>choice)).map((choice,displayIndex)=><label key={choice} className={`${selected===choice?'selected':''} ${result&&item?.correctIndex===choice?'correct-answer':''}`}><input type="radio" name={question.id} value={choice} checked={selected===choice} onChange={()=>{if(!inFlight.current&&!result)setAnswers(previous=>({...previous,[question.id]:choice}));}} disabled={busy||Boolean(result)}/><span className="answer-letter">{String.fromCharCode(65+displayIndex)}</span><span>{question.options[choice]}</span>{result&&item?.correctIndex===choice&&<><CheckCircle size={18} aria-hidden="true"/><span className="sr-only">Correct answer</span></>}</label>)}</div>{result&&item&&<div className={`question-feedback ${item.correct?'good':''}`}><strong>{item.correct?'Understood.':'Worth another look.'}</strong><p>{item.feedback}</p></div>}</fieldset>;
   })}
   {error&&<ErrorPanel message={error}/>} {error&&recovery&&<ButtonLink href={recovery.href} variant="outline">{recovery.label}</ButtonLink>}
   <div className="assessment-submit">{!result?<><p aria-live="polite">{answered} / {data.questions.length} answered</p><button className="button primary" disabled={busy||answered<data.questions.length}>{busy?'Checking your answers…':'Check my understanding'}<ArrowRight size={18}/></button></>:<><button type="button" className="button outline" disabled={busy} onClick={()=>{if(inFlight.current)return;setResult(null);setAnswers({});setData(current=>current?{...current,questions:shuffleQuestionOptions(current.questions)}:current);setStarted(false);setError('');setSyncNotice('');scrollLearningTop(true);}}><RotateCcw size={16}/>Try again</button><ButtonLink href={data.assessment.moduleId?`/courses/${data.assessment.moduleId}`:'/progress'}>{result.passed?'Keep learning':'Back to the learning'}<ArrowRight size={17}/></ButtonLink></>}</div>
  </form>
 </section>;
}
export function ProgressPage() {
 const {me,catalog,loading,refresh,toast}=useAcademy();
 const [busy,setBusy]=useState(false);const [error,setError]=useState('');const [syncNotice,setSyncNotice]=useState('');const [certificateReady,setCertificateReady]=useState(false);
 const {scope,inFlight}=useActionScope('progress');
 if(loading||!catalog)return <Loading/>;
 if(!me?.profile)return <WelcomeProfile/>;
 const demo=me.billing?.mode==='demo';
 const completed=me.progress?.completedLessonIds||[];
 const passed=me.progress?.passedAssessmentIds||[];
 const core=catalog.modules.filter(module=>module.kind==='core');
 const coreLessonCount=core.reduce((total,module)=>total+module.lessons.length,0);
 const remainingLessons=core.reduce((total,module)=>total+module.lessons.filter(lesson=>!completed.includes(lesson.id)).length,0);
 const remainingChecks=core.filter(module=>!passed.includes(module.assessmentId)).length;
 const remainingRequirements=[
  ...(!me.progress?.orientationCompleted?['orientation']:[]),
  ...(remainingLessons?[`${remainingLessons} foundation ${remainingLessons===1?'lesson':'lessons'}`]:[]),
  ...(remainingChecks?[`${remainingChecks} module ${remainingChecks===1?'check':'checks'}`]:[]),
  ...(!passed.includes('CAP01')?['the capstone']:[]),
  ...(!passed.includes('PLAN01')?['the applied case']:[]),
 ];
 const issued=Boolean(me.certificate?.issued)||certificateReady;
 const xp=me.progress?.xp||0;
 const badges=[
  {id:'first',name:'First chapter',text:'Complete your first lesson',earned:completed.length>0,icon:BookOpen},
  {id:'consent',name:'A clear beginning',text:'Pass Consent & autonomy',earned:passed.includes('C01-TEST'),icon:Heart},
  {id:'curious',name:'Curiosity in motion',text:'Complete 10 lessons',earned:completed.length>=10,icon:CompassIcon},
  {id:'foundation',name:'Strong foundations',text:`Pass all ${core.length} core modules`,earned:core.length>0&&core.every(module=>passed.includes(module.assessmentId)),icon:Flag},
  {id:'complete',name:'Your next chapter',text:'Meet every completion criterion',earned:Boolean(me.certificate?.eligible)||issued,icon:GraduationCap},
 ];
 async function certificate() {
  if(inFlight.current||demo||issued||!me?.certificate?.eligible)return;
  inFlight.current=true;const activeScope=scope.current;
  setBusy(true);setError('');setSyncNotice('');
  try {
   await post<{downloadUrl:string}>('/api/certificate',{});
   if(scope.current!==activeScope)return;
   setCertificateReady(true);
   toast('Your completion certificate is issued. Use Download my certificate to save it.');
   void refresh().catch(()=>{if(scope.current===activeScope)setSyncNotice('Your certificate is issued and the download is ready. Account details could not refresh.');});
  }catch(failure){if(scope.current===activeScope)setError((failure as Error).message);}
  finally{if(scope.current===activeScope){inFlight.current=false;setBusy(false);}}
 }
 return <section className="page-section">
  <PageHeading kicker={demo?'YOUR DEMO LEARNING RECORD':'YOUR PROGRESS, FOR YOUR EYES'} title={<>Look how far<br/><em>curiosity takes you.</em></>} description={demo?'Explore sample milestones and continue learning in this separate demo record. These are not certified achievements.':'Every milestone reflects learning. No comparisons, rankings or expectations about your private life.'} action={<div className="xp-pill"><Sparkles size={18}/>{xp} {demo?'demo XP':'XP'}<span>Level {me.progress?.level||Math.floor(xp/300)+1}</span></div>}/>
  <div className="badge-grid">{badges.map(badge=><div className={`badge-card ${badge.earned?'earned':''}`} key={badge.id}><div><badge.icon size={28}/></div><strong>{badge.name}</strong><p>{badge.text}</p><span>{badge.earned?(demo?'DEMO MILESTONE':'EARNED'):'STILL TO EXPLORE'}</span></div>)}</div>
  <SectionHeading kicker="ONE CHAPTER AT A TIME" title={<>Your foundations <em>path.</em></>}/>
  <div className="path-list"><Link href="/learn/orientation" className="path-row"><div className={`path-marker ${me.progress?.orientationCompleted?'done':''}`}>{me.progress?.orientationCompleted?<Check size={16}/>:<ShieldCheck size={17}/>}</div><div><small>START HERE</small><h3>Learning on your terms</h3></div><span>{me.progress?.orientationCompleted?'Orientation complete':'Orientation'}</span><ArrowUpRight size={18}/></Link>{core.map((module,index)=>{const count=module.lessons.filter(lesson=>completed.includes(lesson.id)).length;return <Link href={`/courses/${module.id}`} className="path-row" key={module.id}><div className={`path-marker ${passed.includes(module.assessmentId)?'done':''}`}>{passed.includes(module.assessmentId)?<Check size={16}/>:String(index+1).padStart(2,'0')}</div><div><small>FOUNDATIONS {index+1}</small><h3>{module.title}</h3></div><div className="path-status"><span>{count}/{module.lessons.length} lessons</span><span>{passed.includes(module.assessmentId)?'Knowledge check passed':'Knowledge check to complete'}</span></div><ArrowUpRight size={18}/></Link>;})}<Link href="/assessment/CAP01" className="path-row"><div className={`path-marker ${passed.includes('CAP01')?'done':''}`}><GraduationCap size={19}/></div><div><small>BRING IT TOGETHER</small><h3>Foundations capstone</h3></div><span>{passed.includes('CAP01')?'Passed':'10/12 + all critical items'}</span><ArrowUpRight size={18}/></Link><Link href="/assessment/PLAN01" className="path-row"><div className={`path-marker ${passed.includes('PLAN01')?'done':''}`}><Target size={19}/></div><div><small>APPLY YOUR UNDERSTANDING</small><h3>Fictional planning case</h3></div><span>{passed.includes('PLAN01')?'Passed':'6/6 applied decisions'}</span><ArrowUpRight size={18}/></Link></div>
  <div className="certificate-section"><div className="certificate-illustration"><img className="certificate-preview-logo" src="/brand/flat-wordmark-dark.png" width={1984} height={604} alt="fleshsesh academy"/><GraduationCap size={36}/><span>fleshsesh academy</span><h3>A chapter<br/><em>worth recognising.</em></h3><div/><small>{demo?'DEMONSTRATION · NOT VALID':'ASSESSED CERTIFICATE OF COMPLETION'}</small></div><div><span className="eyebrow">{demo?'A LOOK AT THE COMPLETION EXPERIENCE':'YOUR LEARNING, RECOGNISED'}</span><h2>Understanding<br/><em>you can take with you.</em></h2><p>Complete orientation, all {coreLessonCount} foundation lessons, the {core.length} module checks, capstone and applied case to earn your certificate.</p><p className="small-text">Non-accredited adult education. Not an AQF qualification, professional licence or guarantee of someone’s behaviour.</p>
   {demo?<><div className="notice"><p>This demo can show a sample certificate. It does not issue a real completion record or certify the sample progress.</p></div><button type="button" className="button primary" onClick={()=>{void openPrivateHtml('/api/demo/certificate','fleshsesh_academy_sample.html').catch(failure=>setError((failure as Error).message));}}>Preview sample certificate<ExternalLink size={18}/></button></>:<>
    {!issued&&!me.certificate?.eligible&&<div className="certificate-requirements"><p className="small-text">Still to complete: {new Intl.ListFormat('en-AU',{style:'long',type:'conjunction'}).format(remainingRequirements)}.</p></div>}
    {error&&<ErrorPanel message={error}/>}{syncNotice&&<p className="small-text" role="status">{syncNotice}</p>}
    {issued?<><button type="button" className="button primary" onClick={()=>{void openPrivateHtml('/api/certificate?download=1','fleshsesh_academy_certificate.html').catch(failure=>setError((failure as Error).message));}}>Download my certificate<Download size={18}/></button><p className="small-text">Opens an HTML certificate. Use your browser’s print dialog to save it as a PDF.</p></>:<button className="button primary" disabled={busy||!me.certificate?.eligible} onClick={certificate}>{busy?'Preparing certificate…':me.certificate?.eligible?'Issue my certificate':'Your certificate is ahead of you'}<GraduationCap size={18}/></button>}
   </>}
  </div></div>
 </section>;
}
function CompassIcon({size}:{size:number}){return <Sparkles size={size}/>}
