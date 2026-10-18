'use client';
import {useEffect,useState,type FormEvent} from 'react';
import Link from '@/lib/next-compat';
import {ArrowRight,BookOpen,Check,Compass,FileText,GraduationCap,LogOut,MessageCircle,RotateCcw,ShieldCheck,Sparkles,Trophy} from 'lucide-react';
import {ButtonLink,ErrorPanel,PageHeading,useAcademy} from './ui';
import {post,request,openPrivateHtml} from '@/lib/academy/types';
import './demo.css';

type DemoStatus={authenticated:boolean;active:boolean;expired:boolean;expiresAt:string|null;tier:'plus'};
type DemoResult={redirectTo:string};
const highlights=[
 {icon:BookOpen,title:'The complete library',description:'Open every core module and elective, including member lessons.'},
 {icon:Trophy,title:'Progress that responds',description:'Complete a lesson, earn XP and see your demo dashboard change.'},
 {icon:Check,title:'A ready-to-try assessment',description:'The C02 module check is unlocked. Submit answers and review your feedback.'},
 {icon:MessageCircle,title:'Your learning guides',description:'Explore curriculum-grounded explanations and practice without using paid AI questions.'},
 {icon:FileText,title:'Member worksheets',description:'Open the toolkit and try the reflection and planning resources.'},
 {icon:GraduationCap,title:'Certificate preview',description:'View a clearly marked sample. Demo activity never creates a real credential.'},
];

export function DemoPage(){
 const {identity,me}=useAcademy();
 const [adult,setAdult]=useState(false),[acknowledged,setAcknowledged]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState(''),[expired,setExpired]=useState(false);
 useEffect(()=>{if(!me?.demo?.expiresAt){setExpired(false);return;}const delay=new Date(me.demo.expiresAt).getTime()-Date.now();setExpired(delay<=0);if(delay<=0)return;const timer=setTimeout(()=>setExpired(true),Math.min(delay+50,2147483647));return()=>clearTimeout(timer)},[me?.demo?.expiresAt]);
 const active=Boolean(me?.demo?.active&&!expired&&new Date(me.demo.expiresAt).getTime()>Date.now());
 async function start(event:FormEvent){
  event.preventDefault();if(busy)return;setBusy(true);setError('');
  try{const result=await post<DemoResult>('/api/demo',{action:'start',adultConfirmed:adult,educationAcknowledged:acknowledged});window.location.assign(result.redirectTo)}
  catch(cause){setError((cause as Error).message);setBusy(false)}
 }
 return <section className="page-section demo-page"><PageHeading kicker="YOUR ACADEMY PLUS DEMO" title={<>Take the whole<br/><em>experience for a spin.</em></>} description="A private demonstration of the member experience, with sample progress and room to explore."/><div className="demo-intro-grid"><div className="demo-visual"><img src="/images/night-campus.webp" alt="The Academy courtyard at night"/><div className="demo-visual-content"><span className="demo-pass"><Sparkles size={15}/>ACADEMY PLUS · DEMO</span><h2>Meet Alex.<br/>Your demo learner.</h2><p>Six sample lessons completed.<br/>One module check passed.<br/>Your next discovery is up to you.</p><div className="demo-stat-row"><span><strong>18</strong>modules to explore</span><span><strong>48</strong>written lessons</span><span><strong>2h</strong>per demo session</span></div></div></div><div className="panel demo-start-card"><span className="eyebrow">ALL THE CURIOSITY. ZERO CHECKOUT.</span><h2>{active?'Your demo is ready.':'Make yourself at home.'}</h2><p>The demo uses its own learner record. Your usual profile, subscription and learning progress stay separate.</p>{active?<div className="demo-entry-actions"><ButtonLink href="/dashboard">Open my demo dashboard<ArrowRight size={17}/></ButtonLink><ButtonLink href="/assessment/C02-TEST" variant="outline">Try the unlocked assessment<Check size={17}/></ButtonLink></div>:identity?<form onSubmit={start}><label className="check-field"><input type="checkbox" checked={adult} onChange={event=>setAdult(event.target.checked)} required/><span>I confirm that I am 18 or older.</span></label><label className="check-field"><input type="checkbox" checked={acknowledged} onChange={event=>setAcknowledged(event.target.checked)} required/><span>I understand this is non-accredited adult education and that demo progress is a sample, not a learning credential.</span></label>{error&&<ErrorPanel message={error}/>}<button className="button primary full" type="submit" disabled={busy||!adult||!acknowledged}>{busy?'Preparing your demo…':'Enter my Plus demo'}<ArrowRight size={17}/></button></form>:<div className="demo-entry-actions"><a className="button primary full" href="/login?next=/demo" target="_top">Sign in to open the demo<ArrowRight size={17}/></a><p className="microcopy">Use your secure Academy account to keep this demonstration private to you. No shared password or payment details.</p></div>}<div className="demo-reassurance"><ShieldCheck size={20}/><p>No charges, live AI spending or genuine certificate issuance. Reset or exit the demo at any time.</p></div><p className="microcopy">Demo access expires after two hours. Resetting or exiting deletes this demo record; it does not alter your own account.</p></div></div><div className="demo-feature-grid">{highlights.map(item=><article className="panel demo-feature" key={item.title}><item.icon size={24}/><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>{active&&<div className="demo-shortcuts"><ButtonLink href="/learn/C03-L01" variant="outline">Open a member lesson<BookOpen size={17}/></ButtonLink><ButtonLink href="/resources" variant="outline">Try the member toolkit<FileText size={17}/></ButtonLink><ButtonLink href="/tutor" variant="outline">Meet your guides<MessageCircle size={17}/></ButtonLink><button type="button" className="button outline" onClick={()=>{void openPrivateHtml('/api/demo/certificate','fleshsesh_academy_sample.html').catch(cause=>setError((cause as Error).message));}}>Preview sample certificate<GraduationCap size={17}/></button></div>}<p className="demo-return"><Link href="/library"><Compass size={16}/>Just browsing? Explore the course library.</Link></p></section>
}

export function DemoBanner(){
 const {identity,me}=useAcademy();
 const [status,setStatus]=useState<DemoStatus|null>(null),[busy,setBusy]=useState<string|null>(null),[error,setError]=useState('');
 useEffect(()=>{if(!identity){setStatus(null);return;}let active=true;request<DemoStatus>('/api/demo').then(value=>{if(active)setStatus(value)}).catch(()=>{});return()=>{active=false}},[identity?.email,me?.user?.userId]);
 const expiresAt=me?.demo?.expiresAt||status?.expiresAt;
 useEffect(()=>{if(!expiresAt)return;const delay=new Date(expiresAt).getTime()-Date.now();if(delay<=0){setStatus(previous=>({...previous,authenticated:true,active:false,expired:true,expiresAt,tier:'plus'}));return;}const timer=setTimeout(()=>setStatus(previous=>({...previous,authenticated:true,active:false,expired:true,expiresAt,tier:'plus'})),Math.min(delay+50,2147483647));return()=>clearTimeout(timer)},[expiresAt]);
 const expired=Boolean(status?.expired||(expiresAt&&new Date(expiresAt).getTime()<=Date.now()));
 if(!me?.demo?.active&&!status?.active&&!expired)return null;
 async function action(kind:'reset'|'exit'){
  if(busy)return;setBusy(kind);setError('');
  try{const result=await post<DemoResult>('/api/demo',{action:kind});window.location.assign(result.redirectTo)}
  catch(cause){setError((cause as Error).message);setBusy(null)}
 }
 return <aside className={`demo-banner ${expired?'demo-expired':''}`} aria-label="Academy demonstration session"><div className="demo-banner-inner"><div className="demo-banner-copy"><Sparkles size={19}/><div><strong>{expired?'Demo session ended':'Academy Plus demo'}</strong><p>{expired?'Restart your demo or exit to return to your own account.':'You’re exploring a separate sample learner. Progress here is for demonstration.'}</p></div></div><div className="demo-banner-actions"><Link href="/demo">Demo guide</Link>{!expired&&<button type="button" onClick={()=>action('reset')} disabled={Boolean(busy)}><RotateCcw size={15}/>{busy==='reset'?'Resetting…':'Reset demo'}</button>}{expired&&<Link href="/demo">Restart demo<ArrowRight size={15}/></Link>}<button type="button" onClick={()=>action('exit')} disabled={Boolean(busy)}><LogOut size={15}/>{busy==='exit'?'Exiting…':'Exit demo'}</button></div>{error&&<div className="demo-banner-error" role="alert">{error} <Link href="/demo">Open demo setup</Link></div>}</div></aside>
}
