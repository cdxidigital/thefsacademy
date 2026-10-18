'use client';
import Link from '@/lib/next-compat';
import {lazy,Suspense,useCallback,useEffect,useMemo,useRef,useState} from 'react';
import {useRouter} from '@/lib/next-compat';
import {ArrowRight,ArrowUpRight,BookOpen,Check,ChevronDown,Compass,CreditCard,ExternalLink,Flag,GraduationCap,Heart,LayoutDashboard,Lock,LogOut,Menu,MessageCircle,Settings,ShieldCheck,Sparkles,UserRound,X} from 'lucide-react';
import {AcademyContext,Brand,ButtonLink,Modal,Loading,ErrorPanel} from './ui';
import {Landing,Library,Course,About} from './marketing';
import {MotionDirector} from './motion';
import {DemoPage,DemoBanner} from './demo';
import {Dashboard,Onboarding,Orientation,LessonView,Assessment,ProgressPage} from './learning';
import {Pricing,AuthPage,Account} from './membership';
import {request,post,resetLearnerExpectation,type Catalog,type Me} from '@/lib/academy/types';
const Tutor=lazy(()=>import('./tutor'));
const BusinessPlanner=lazy(()=>import('./business'));
const Resources=lazy(()=>import('./resources').then(m=>({default:m.Resources})));
const Support=lazy(()=>import('./resources').then(m=>({default:m.Support})));
const Legal=lazy(()=>import('./resources').then(m=>({default:m.Legal})));
type Purchase={product:string;label:string;amount:number};
const learnerNav=[{href:'/dashboard',title:'My learning',icon:LayoutDashboard},{href:'/library',title:'Explore topics',icon:Compass},{href:'/tutor',title:'My tutors',icon:MessageCircle},{href:'/progress',title:'My progress',icon:Flag},{href:'/resources',title:'My resources',icon:BookOpen}];
export default function AcademyApp({route,identity}:{route:string;identity:{name:string;email:string}|null}){
 const [retryKey,setRetryKey]=useState(0);
 const [catalog,setCatalog]=useState<Catalog|null>(null);const[me,setMe]=useState<Me|null>(null);const[loading,setLoading]=useState(true);const[loadError,setLoadError]=useState('');const[meError,setMeError]=useState('');const[menuOpen,setMenuOpen]=useState(false);const[academyOpen,setAcademyOpen]=useState(false);const[ageGate,setAgeGate]=useState(false);const[ageGateChecked,setAgeGateChecked]=useState(false);const menuButton=useRef<HTMLButtonElement>(null);const academyMenu=useRef<HTMLDivElement>(null);const[toastMessage,setToastMessage]=useState('');const[purchase,setPurchase]=useState<Purchase|null>(null);const[checkoutBusy,setCheckoutBusy]=useState(false);const[checkoutError,setCheckoutError]=useState('');const[renewalConsent,setRenewalConsent]=useState(false);const router=useRouter();
 const learnerEpoch=useRef(0);
 const latestMeRequest=useRef(0);
 const refresh=useCallback(async()=>{
  const epoch=learnerEpoch.current;
  const sequence=++latestMeRequest.current;
  const current=()=>epoch===learnerEpoch.current&&sequence===latestMeRequest.current;
  try {
   const data=await request<Me>('/api/me');
   if(!current())return;
   setMe({...data,progress:data.progress||{completedLessonIds:[],passedAssessmentIds:[],xp:0}});
   setMeError('');
  }catch(error){
   // Superseded failures must not replace a newer success or trigger a false
   // "save failed" notice in a caller that already received its durable result.
   if(!current())return;
   setMeError((error as Error).message);
   throw error;
  }
 },[]);
 const toast=useCallback((message:string)=>setToastMessage(message),[]);
 const checkout=useCallback((product:string,label:string,amount:number)=>{setPurchase({product,label,amount});setRenewalConsent(false);setCheckoutError('');},[]);
 const closePurchase=useCallback(()=>{if(!checkoutBusy)setPurchase(null)},[checkoutBusy]);
 useEffect(()=>{
  const epoch=++learnerEpoch.current;
  const sequence=++latestMeRequest.current;
  resetLearnerExpectation();
  setLoading(true);setLoadError('');setMe(null);setMeError('');
  Promise.allSettled([request<Catalog>('/api/catalog'),request<Me>('/api/me')]).then(([course,account])=>{
   if(epoch!==learnerEpoch.current)return;
   if(course.status==='fulfilled')setCatalog(course.value);
   else setLoadError(course.reason?.message||'The course library could not load.');
   // Initial/retry reads share the same ordering as explicit refreshes.
   if(sequence===latestMeRequest.current){
    if(account.status==='fulfilled')setMe({...account.value,progress:account.value.progress||{completedLessonIds:[],passedAssessmentIds:[],xp:0}});
    else if(identity)setMeError(account.reason?.message||'Your progress could not load.');
   }
   setLoading(false);
  });
  try{if(sessionStorage.getItem('fsa:adult:v1')!=='yes')setAgeGate(true)}catch{setAgeGate(true)}
  setAgeGateChecked(true);
  return()=>{
   // Invalidate both view writes and the request helper's learner expectation.
   learnerEpoch.current+=1;latestMeRequest.current+=1;resetLearnerExpectation();
  };
 },[identity?.email,retryKey]);
 useEffect(()=>{setMenuOpen(false);setAcademyOpen(false);setPurchase(null);setCheckoutError('');setRenewalConsent(false)},[route]);
 useEffect(()=>{if(!academyOpen)return;function close(event:MouseEvent){if(!academyMenu.current?.contains(event.target as Node))setAcademyOpen(false);}function onKey(event:KeyboardEvent){if(event.key==='Escape')setAcademyOpen(false);}document.addEventListener('mousedown',close);document.addEventListener('keydown',onKey);return()=>{document.removeEventListener('mousedown',close);document.removeEventListener('keydown',onKey);}},[academyOpen]);
 useEffect(()=>{if(!menuOpen)return;function closeOnEscape(event:KeyboardEvent){if(event.key==='Escape'){setMenuOpen(false);menuButton.current?.focus();}}document.addEventListener('keydown',closeOnEscape);return()=>document.removeEventListener('keydown',closeOnEscape)},[menuOpen]);
 useEffect(()=>{if(!toastMessage)return;const id=setTimeout(()=>setToastMessage(''),5500);return()=>clearTimeout(id)},[toastMessage]);
 useEffect(()=>{if(me?.profile){try{sessionStorage.setItem('fsa:adult:v1','yes')}catch{}setAgeGate(false)}},[me?.profile]);
 const acceptAge=useCallback(()=>{try{sessionStorage.setItem('fsa:adult:v1','yes')}catch{}setAgeGate(false)},[]);
 const context=useMemo(()=>({catalog,me,identity,loading,loadError,refresh,toast,checkout}),[catalog,me,identity,loading,loadError,refresh,toast,checkout]);
 const segment=route.split('/')[1]||'';const detailId=route.split('/')[2];const isApp=['dashboard','learn','assessment','tutor','progress','resources','account','business'].includes(segment);const noFooter=['learn','assessment','tutor','onboarding'].includes(segment);const isSubscription=!!purchase&&/_(monthly|yearly)$/.test(purchase.product);const isYearly=purchase?.product.endsWith('_yearly');const live=me?.billing?.mode==='live'&&me?.billing?.checkoutAvailable===true;const catalogDependent=['library','courses','dashboard','progress','tutor','resources'].includes(segment);
 async function pay(){if(!purchase)return;setCheckoutBusy(true);setCheckoutError('');try{const product=purchase.product.startsWith('module:')?'module':purchase.product==='tutor_booster'?'tutor_pack':purchase.product;const result=await post<{url:string}>('/api/billing/checkout',{product,moduleId:purchase.product.startsWith('module:')?purchase.product.split(':')[1]:undefined,renewalConsent});if(!result.url||!/^https:\/\//.test(result.url))throw new Error('A secure checkout link is not yet available.');window.location.assign(result.url)}catch(e){setCheckoutError((e as Error).message)}finally{setCheckoutBusy(false)}}
 let page;
 if(route==='/')page=<Landing ready={ageGateChecked&&!ageGate} retryCatalog={()=>setRetryKey(value=>value+1)}/>;
 else if(segment==='library')page=<Library/>;
 else if(segment==='pricing')page=<Pricing/>;
 else if(segment==='courses')page=<Course id={detailId||'C01'}/>;
 else if(segment==='about')page=<About/>;
 else if(segment==='demo')page=<DemoPage/>;
 else if(segment==='login'||segment==='signup')page=<AuthPage mode={segment}/>;
 else if(segment==='onboarding')page=<Onboarding/>;
 else if(segment==='dashboard')page=<Dashboard/>;
 else if(segment==='learn')page=detailId==='orientation'?<Orientation/>:<LessonView id={detailId||'C01-L01'}/>;
 else if(segment==='assessment')page=<Assessment id={detailId||'C01-TEST'}/>;
 else if(segment==='progress')page=<ProgressPage/>;
 else if(segment==='tutor')page=<Tutor/>;
 else if(segment==='account')page=<Account/>;
 else if(segment==='resources')page=<Resources/>;
 else if(segment==='support')page=<Support/>;
 else if(segment==='privacy'||segment==='terms')page=<Legal type={segment}/>;
 else if(segment==='business')page=<BusinessPlanner/>;
 else page=<Landing ready={ageGateChecked&&!ageGate} retryCatalog={()=>setRetryKey(value=>value+1)}/>;
 return <AcademyContext.Provider value={context}><div className={`academy ${isApp?'learner-app':''} route-${segment||'home'}`}><a href="#main" className="skip-link">Skip to content</a><header className={`site-header ${route==='/'?'over-hero':''}`}><div className="header-inner"><Brand glossy/><nav className="main-nav" aria-label="Main navigation"><div className="nav-menu" ref={academyMenu}><button type="button" className={segment==='library'||segment==='courses'?'active':''} aria-expanded={academyOpen} aria-controls="academy-topics" onClick={()=>setAcademyOpen(open=>!open)}>The Academy<ChevronDown size={13}/></button>{academyOpen&&<div id="academy-topics" className="nav-dropdown" role="menu"><Link href="/library" role="menuitem">Explore topics</Link><Link href="/courses/C01" role="menuitem">Consent & autonomy · free</Link><Link href="/tutor" role="menuitem">Meet the tutors</Link><Link href="/resources" role="menuitem">Workbook & sources</Link><Link href="/about" role="menuitem">Our approach</Link></div>}</div><Link className={segment==='about'?'active':''} href="/about">Our approach</Link><Link className={segment==='pricing'?'active':''} href="/pricing">Membership</Link><Link className={segment==='demo'?'active':''} href="/demo">Try the demo</Link></nav><div className="header-actions"><a className="quick-exit" href="https://www.google.com" aria-label="Quick exit: open Google" title="Opens Google. Does not clear browsing history." onClick={e=>{e.preventDefault();window.location.replace('https://www.google.com')}}><ExternalLink size={13}/><span>Quick exit</span></a>{identity?<><Link className="header-account" href="/account" aria-label="Your account"><UserRound size={18}/></Link><ButtonLink href={me?.profile?'/dashboard':'/onboarding'} variant="small primary">My learning<ArrowUpRight size={15}/></ButtonLink></>:<><Link className="login-link" href="/login">Log in</Link><ButtonLink href="/signup" variant="small primary">Start free<ArrowUpRight size={15}/></ButtonLink></>}<button ref={menuButton} className="icon-button mobile-menu" aria-controls="academy-mobile-nav" aria-label={menuOpen?'Close navigation':'Open navigation'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(v=>!v)}>{menuOpen?<X/>:<Menu/>}</button></div></div>{menuOpen&&<nav id="academy-mobile-nav" className="mobile-nav" aria-label="Mobile navigation" onClick={event=>{if((event.target as HTMLElement).closest('a'))setMenuOpen(false)}}><Link href="/library">Explore the Academy</Link><Link href="/about">Our approach</Link><Link href="/pricing">Membership</Link><Link href="/demo">Try Academy Plus demo</Link><Link href={identity?'/dashboard':'/login'}>{identity?'My learning':'Log in'}</Link><Link href="/support">Support</Link></nav>}</header>{isApp&&<nav className="learner-nav" aria-label="Learner navigation"><div>{learnerNav.map(n=><Link key={n.href} href={n.href} className={route.startsWith(n.href)?'active':''}><n.icon size={17}/>{n.title}</Link>)}<Link href="/account" className={`learner-account ${segment==='account'?'active':''}`}><Settings size={17}/><span>Account</span></Link></div></nav>}<DemoBanner/><main id="main" tabIndex={-1}>{loadError&&catalogDependent?<section className="page-section"><ErrorPanel message={loadError} retry={()=>setRetryKey(value=>value+1)}/></section>:(isApp||segment==='onboarding')&&meError&&!me?<section className="page-section"><ErrorPanel message={meError} retry={()=>refresh().catch(()=>{})}/></section>:<>{loadError&&!catalogDependent&&segment!==''&&<div className="page-section compact-section"><ErrorPanel message={`The course library could not load. This page remains available. ${loadError}`} retry={()=>setRetryKey(value=>value+1)}/></div>}{isApp&&meError&&me&&<div className="page-section compact-section"><ErrorPanel message={`Your last loaded learning record is still available. Totals could not refresh: ${meError}`} retry={()=>refresh().catch(()=>{})}/></div>}<Suspense key={`${route}:${me?.user?.userId||identity?.email||'visitor'}`} fallback={<Loading/>}>{page}</Suspense></>}</main>{!noFooter&&<footer className="site-footer"><div className="footer-main"><div className="footer-brand"><Brand glossy/><p>Curiosity. Confidence. Connection.</p><small>Inclusive education for a more curious, confident and connected you.</small></div><div><strong>Stay curious</strong><Link href="/library">Explore the Academy</Link><Link href="/pricing">Membership</Link><Link href="/about">Our approach</Link></div><div><strong>Your space</strong><Link href="/dashboard">My learning</Link><Link href="/tutor">My tutors</Link><Link href="/progress">My progress</Link><Link href="/demo">Try the demo</Link></div><div><strong>A little support</strong><Link href="/support">Find support</Link><Link href="/privacy">Privacy & your data</Link><Link href="/terms">Terms of learning</Link></div></div><div className="footer-bottom"><span>© 2026 fleshsesh academy.</span><p>Adult education, 18+. Non-accredited completion certificates.<br/>{me?.billing?.mode==='live'?'Lessons, films and spoken teachings · Learn at your own pace.':'Public beta · Lessons, films and spoken teachings · Specialist release reviews pending.'}</p><span className="footer-signoff">SEXUALITY<br/>CONSENT · COMMUNICATION<br/>WELLBEING</span></div></footer>}<MotionDirector routeKey={route} ready={ageGateChecked&&(!ageGate||['privacy','terms','support'].includes(segment))}/><div className={`toast ${toastMessage?'show':''}`} role="status" aria-live="polite">{toastMessage&&<><Check size={18}/><span>{toastMessage}</span><button className="icon-button" onClick={()=>setToastMessage('')} aria-label="Dismiss notification"><X size={15}/></button></>}</div>{ageGate&&!['privacy','terms','support'].includes(segment)&&<Modal title="Adult learning space" onClose={acceptAge} closeable={false}><div className="age-brand"><img src="/brand/wordmark-lockup-light.png" width={819} height={319} alt="fleshsesh academy"/><span className="age-declaration">18+</span></div><span className="eyebrow">CURIOSITY. CONFIDENCE. CONNECTION.</span><h2>Made for adults.<br/><em>Designed for you.</em></h2><p>fleshsesh academy is a consent-focused learning space about bodies, connection and sexual wellbeing. Please confirm that you’re 18 or older.</p><button className="button primary full" onClick={acceptAge}>I’m 18 or older. Let’s explore.<ArrowRight size={18}/></button><a className="age-leave" href="https://www.google.com">I’m under 18 · Leave the Academy</a><p className="microcopy">This is an age declaration, not identity verification. <Link href="/privacy">Your privacy</Link> matters here.</p></Modal>}{purchase&&<Modal title="Review Academy access" onClose={closePurchase} closeable={!checkoutBusy}><span className="eyebrow">{live?'MAKE ROOM FOR YOUR LEARNING':'YOUR NEXT CHAPTER, COMING SOON'}</span><h2>{purchase.label.split(' · ')[0]}</h2><div className="checkout-total"><span>Total in AUD</span><strong>A${purchase.amount}<small>{isSubscription?` / ${isYearly?'year':'month'}`:' once'}</small></strong></div><p>{!live?'This is the proposed launch price. Nothing is billed during the beta, and no card details are collected.':isSubscription?`Billed ${isYearly?'annually':'monthly'}. Renews at A$${purchase.amount} each ${isYearly?'year':'month'} until cancelled. Manage future renewal in your account. Access continues to the end of the paid period.`:'A single purchase for the named learning benefit. No recurring charge or automatic repurchase.'}</p>{!live&&<div className="notice"><ShieldCheck size={21}/><div><strong>Explore the beta at no charge.</strong><p>Paid checkout is not active yet. The beta includes the written lessons, short films and spoken teachings. No payment details are collected here.</p></div></div>}{live&&isSubscription&&<label className="check-field"><input type="checkbox" checked={renewalConsent} onChange={e=>setRenewalConsent(e.target.checked)}/><span>I agree to the recurring price and billing period above.</span></label>}{checkoutError&&<ErrorPanel message={checkoutError}/>}<div className="checkout-actions">{!identity?<ButtonLink href="/signup">Create my free profile<ArrowRight size={17}/></ButtonLink>:!me?.profile?<ButtonLink href="/onboarding">Set up my learner profile<ArrowRight size={17}/></ButtonLink>:live?<button className="button primary full" onClick={pay} disabled={checkoutBusy||(isSubscription&&!renewalConsent)}>{checkoutBusy?'Opening secure checkout…':'Continue to secure checkout'}<CreditCard size={18}/></button>:<ButtonLink href="/library">Explore the Academy<ArrowRight size={17}/></ButtonLink>}</div><p className="microcopy">{live?'Payment handled by the connected provider. Your card details are never collected in this form.':'Proposed launch pricing. Live payments need provider connection and business acceptance.'}</p></Modal>}</div></AcademyContext.Provider>
}
