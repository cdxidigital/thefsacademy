'use client';
import Link from '@/lib/next-compat';
import {useRouter} from '@/lib/next-compat';
import {useCallback,useRef,useState,type FormEvent} from 'react';
import {ArrowRight,ArrowUpRight,BookOpen,Check,ChevronDown,Download,ExternalLink,LogOut,MessageCircle,ShieldCheck,Sparkles,Trash2} from 'lucide-react';
import {useAcademy,ButtonLink,PageHeading,FeatureCheck,ErrorPanel,Modal,Loading} from './ui';
import {post,request,type ApiError} from '@/lib/academy/types';
import {SecureAccountForm, AcademySignOut} from './secure-account';
export function Pricing(){const{checkout,identity,me,catalog}=useAcademy();const router=useRouter();const[annual,setAnnual]=useState(false);const demo=me?.billing?.mode==='demo';const pilot=(me?.billing?.mode??catalog?.mode)!=='live';const subscriptionStatus=String(me?.billing?.subscriptionStatus||'');const existingSubscription=Boolean(subscriptionStatus&&!['canceled','incomplete_expired'].includes(subscriptionStatus));function choose(product:string,label:string,amount:number){if(demo){router.push('/library');return;}if(existingSubscription){router.push('/account');return;}checkout(product,label,amount);}return <section className="page-section pricing-page"><PageHeading kicker="A LITTLE INVESTMENT IN YOU" title={<>More understanding.<br/><em>On your terms.</em></>} description="Begin for free. Learn one topic at a time. Or give your curiosity room to grow with a membership."/><div className="pricing-switch" role="group" aria-label="Membership billing period"><button className={!annual?'active':''} onClick={()=>setAnnual(false)} aria-pressed={!annual}>Monthly</button><button className={annual?'active':''} onClick={()=>setAnnual(true)} aria-pressed={annual}>Yearly <span>Save 2 months</span></button></div><div className="pricing-grid"><article className="price-card"><span className="eyebrow">A GOOD FIRST CHAPTER</span><h2>Explore</h2><p>Let’s see where curiosity takes you.</p><div className="price">Free<small>always a place to begin</small></div><ButtonLink href={identity?(me?.profile?'/dashboard':'/onboarding'):'/signup'} variant="outline">{identity&&me?.profile?'Back to my learning':'Start exploring'}<ArrowUpRight size={17}/></ButtonLink><ul className="check-list"><FeatureCheck>Consent foundation: 3 full lessons</FeatureCheck><FeatureCheck>Orientation and course previews</FeatureCheck><FeatureCheck>Glossary and trusted sources</FeatureCheck><FeatureCheck>Private learning progress</FeatureCheck><FeatureCheck>No payment card required</FeatureCheck></ul></article><article className="price-card recommended"><div className="price-ribbon"><Sparkles size={13}/>THE EVERYDAY ACADEMY</div><span className="eyebrow">ROOM TO GROW</span><h2>Academy</h2><p>Your whole learning journey, together.</p><div className="price">A${annual?190:19}<small>/{annual?'year':'month'}</small></div><p className="billing-note">{annual?'A$190 billed yearly · A$15.83/month equivalent':'A$19 billed monthly'}</p><button className="button primary full" onClick={()=>choose(annual?'academy_yearly':'academy_monthly',`Academy · ${annual?'Yearly':'Monthly'}`,annual?190:19)}>{demo?'Included in your demo':existingSubscription?'Manage membership':'Choose Academy'}<ArrowUpRight size={17}/></button><ul className="check-list"><FeatureCheck>All 48 written lessons and 18 modules</FeatureCheck><FeatureCheck>All knowledge checks and assessments</FeatureCheck><FeatureCheck>10 optional private worksheets</FeatureCheck><FeatureCheck>50 AI tutor replies each month*</FeatureCheck><FeatureCheck>Private XP and learning milestones</FeatureCheck><FeatureCheck>{demo?'Sample certificate preview':'Eligible completion certificate included'}</FeatureCheck></ul><div className="price-footer">Everything you need for the foundations.</div></article><article className="price-card"><span className="eyebrow">A LITTLE MORE SUPPORT</span><h2>Academy <em>Plus</em></h2><p>More room for the questions that matter.</p><div className="price">A${annual?290:29}<small>/{annual?'year':'month'}</small></div><p className="billing-note">{annual?'A$290 billed yearly · A$24.17/month equivalent':'A$29 billed monthly'}</p><button className="button outline full" onClick={()=>choose(annual?'plus_yearly':'plus_monthly',`Academy Plus · ${annual?'Yearly':'Monthly'}`,annual?290:29)}>{demo?'Explore your Plus demo':existingSubscription?'Manage membership':'Choose Plus'}<ArrowUpRight size={17}/></button><ul className="check-list"><FeatureCheck>Everything in Academy</FeatureCheck><FeatureCheck>200 AI tutor replies each month*</FeatureCheck><FeatureCheck>Choose your weekly learning intention</FeatureCheck><FeatureCheck>More space for examples and recaps</FeatureCheck><FeatureCheck>All 6 elective deep dives included</FeatureCheck><FeatureCheck>No extra charge for assessments</FeatureCheck></ul></article></div><div className="pricing-fineprint"><p>All prices in Australian dollars. Total prices include applicable taxes. Annual plans renew yearly; monthly plans renew monthly. Cancel future renewal in your account.</p><p>{demo?<><strong>Plus demo:</strong> these are proposed prices. Your separate demo has included course access, no payment collection and no live AI replies. </>:pilot?<><strong>Beta:</strong> paid memberships are not active. </>:me?.billing?.checkoutAvailable!==true?<><strong>Checkout is currently unavailable.</strong> </>:null}*AI reply allowances apply when the connected AI service is enabled. The curriculum-based lesson guide remains available. Current teaching content is written; video and audio courses are not included.</p></div><div className="micro-purchases"><div><span className="eyebrow">A TOPIC, NOT A COMMITMENT</span><h2>Just one chapter?<br/><em>That’s good too.</em></h2><p>Pay for the module you want. No subscription, money wallet or surprise top-ups. Members already have every released module.</p></div><Link className="micro-purchase-card" href="/library"><BookOpen size={25}/><h3>Single module</h3><p>A topic of your choice, its lessons and knowledge check.</p><strong>A$7 <span>once</span></strong><span className="text-link">Find your topic<ArrowUpRight size={17}/></span></Link><button className="micro-purchase-card" onClick={()=>demo?router.push('/tutor'):checkout('tutor_pack','50 additional AI tutor replies',5)}><MessageCircle size={25}/><h3>A few more questions</h3><p>{demo?'Your demo uses the curriculum guides. AI reply purchases are unavailable in demo mode.':'50 extra AI replies when your included monthly allowance runs out.'}</p><strong>A$5 <span>once</span></strong><span className="text-link">{demo?'Explore the demo guides':'Explore a tutor booster'}<ArrowUpRight size={17}/></span></button></div><div className="value-strip"><span><Check size={17}/>Free assessment retries</span><span><Check size={17}/>No paid XP</span><span><Check size={17}/>No certificate add-on fee</span><span><Check size={17}/>No pressure to upgrade</span></div><div className="faq"><span className="eyebrow">GOOD QUESTIONS</span><h2>A little <em>clarity.</em></h2>{[
 ['Can I cancel my membership?','Yes. Use Manage membership in your account to stop future renewal. Access continues until the end of your paid period. Any rights under Australian Consumer Law remain available.'+(pilot?' During the beta, no membership is charged.':'')],
 ['Are the certificates accredited?','No. You can earn an assessed Certificate of Completion after meeting the course criteria. It is non-accredited adult education, not an AQF qualification, professional registration or licence.'],
 ['Will a single module count toward my learning?','Yes. Your recorded learning stays attached to your profile. A single module does not by itself meet the full foundations certificate requirements.'],
 ['Do I have to share personal experiences?','No. Every activity can use fictional adults. Reflection is optional, unassessed and not sent to our server. You never need to share a sexual history or intimate images.'],
 ['What can the tutor help with?','The lesson guide finds explanations and sources in the course. When AI is connected, its allowance supports educational questions and fictional scenarios. It cannot provide diagnosis, treatment, emergency monitoring, legal opinions or erotic roleplay.'],
 ['What happens if I take a break?','Your saved learning remains on your profile. XP is private and does not decay. You will not lose a streak or pay to catch up.']
 ].map(([q,a])=><details key={q}><summary>{q}<ChevronDown size={18}/></summary><p>{a}</p></details>)}</div></section>}
export function AuthPage({mode}:{mode:'login'|'signup'}){const{identity,me}=useAcademy();return <section className="auth-layout"><div className="auth-art"><img src="/images/academy-hero.webp" alt="Open terracotta sculpture"/><div><span className="eyebrow">FLESHSESH ACADEMY</span><h2>More understanding.<br/>More confidence.<br/><em>More you.</em></h2></div></div><div className="auth-card"><div className="auth-brand-lockup"><img src="/brand/glossy-master.png" width={1299} height={393} alt="fleshsesh academy"/></div><span className="eyebrow">{mode==='login'?'YOUR CHAPTER IS WAITING':'EVERY JOURNEY STARTS SOMEWHERE'}</span><h1>{mode==='login'?<>Welcome<br/><em>back.</em></>:<>A new chapter.<br/><em>All yours.</em></>}</h1><p>{mode==='login'?'Step back into your learning. Your progress is right where you left it.':'Create your learner profile and start exploring. No card, no pressure.'}</p>{identity?<><div className="signed-in-summary"><Check size={18}/><span>You’re securely signed in.</span></div><ButtonLink href={me?.profile?'/dashboard':'/onboarding'} className="full">{me?.profile?'Go to my learning':'Set up my learner profile'}<ArrowRight size={17}/></ButtonLink></>:<SecureAccountForm mode={mode}/>}<p className="microcopy">Passwords are hashed by the sign-in service and are never stored with your lessons. Your learner profile and progress stay separate from that password.</p><div className="auth-divider"/><ul className="check-list"><FeatureCheck>A private space for your progress</FeatureCheck><FeatureCheck>Consent foundation, free to explore</FeatureCheck><FeatureCheck>Your pace, from any device</FeatureCheck></ul><p className="auth-switch">{mode==='login'?'New to the Academy?':'Already have a learner profile?'} <Link href={mode==='login'?'/signup':'/login'}>{mode==='login'?'Make yourself at home':'Welcome back'}</Link></p><p className="small-text">For adults 18+. By creating an Academy profile, you agree to our <Link href="/terms">terms</Link> and acknowledge our <Link href="/privacy">privacy information</Link>.</p></div></section>}
export function Account() {
  const {me, identity, loading, refresh, toast} = useAcademy();
  const [draft, setDraft] = useState<{displayName:string; weeklyGoal:number}|null>(null);
  const [busy, setBusy] = useState('');
  const inFlight = useRef(false);
  const [error, setError] = useState('');
  const [syncNotice, setSyncNotice] = useState('');
  const [sessionChanged, setSessionChanged] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteText, setDeleteText] = useState('');
  const name = draft?.displayName ?? String(me?.profile?.displayName || '');
  const goal = draft?.weeklyGoal ?? Number(me?.profile?.weeklyGoal || 3);
  const demo = me?.billing?.mode === 'demo';
  const pilot = me?.billing?.mode !== 'live';
  const hasCustomer = me?.billing?.hasCustomer === true;
  const tier = String(me?.billing?.tier || 'explore');
  const planName = tier === 'plus' ? 'Academy Plus' : tier === 'academy' ? 'Academy' : 'Explore';
  const periodEnd = typeof me?.billing?.periodEnd === 'string' ? new Date(me.billing.periodEnd) : null;
  const periodEndLabel = periodEnd && Number.isFinite(periodEnd.getTime())
    ? new Intl.DateTimeFormat('en-AU', {day:'numeric', month:'long', year:'numeric', timeZone:'Australia/Perth'}).format(periodEnd)
    : null;
  const cancelAtPeriodEnd = me?.billing?.cancelAtPeriodEnd === true;
  const subscriptionStatus = String(me?.billing?.subscriptionStatus || '');
  const billingNeedsAttention = ['past_due','unpaid','incomplete'].includes(subscriptionStatus);
  const periodEnded = Boolean(periodEnd && periodEnd.getTime() < Date.now());
  const policyCurrent = !me?.profile || me.profile.acceptedVersion === me.policyVersion;
  const closeDelete = useCallback(() => { if (busy !== 'delete') setDeleteOpen(false); }, [busy]);

  function showError(failure:unknown) {
    const error = failure as ApiError;
    const code = error.data && typeof error.data === 'object' ? (error.data as {code?:unknown}).code : null;
    setSessionChanged(code === 'demo_expired' || code === 'learner_session_changed');
    setError(error.message);
  }
  async function save(event: FormEvent) {
    event.preventDefault();
    if (inFlight.current || !me?.profile || !policyCurrent) return;
    inFlight.current = true;
    setBusy('save'); setError(''); setSyncNotice('');
    try {
      // Updating preferences must not silently accept a new learner-policy version.
      await post('/api/profile', {displayName:name.trim(), weeklyGoal:goal});
      toast(demo ? 'Your demo preferences have been updated.' : 'Your profile has been updated.');
      try { await refresh(); setDraft(null); }
      catch { setSyncNotice('Your preferences are saved. Account details could not refresh; use the page’s retry control or reload to update them.'); }
    } catch (failure) { showError(failure); }
    finally { inFlight.current = false; setBusy(''); }
  }
  async function portal() {
    if (inFlight.current || demo || !hasCustomer) return;
    inFlight.current = true;
    setBusy('billing'); setError('');
    try {
      const data = await post<{url:string}>('/api/billing/portal', {});
      if (typeof data.url !== 'string' || !data.url.startsWith('https://billing.stripe.com/')) throw new Error('The secure billing portal could not be opened. Please try again.');
      window.location.assign(data.url);
    } catch (failure) { showError(failure); }
    finally { inFlight.current = false; setBusy(''); }
  }
  async function exportData() {
    if (inFlight.current || demo || !me?.profile) return;
    inFlight.current = true;
    setBusy('export'); setError('');
    try {
      const data = await request('/api/account/export');
      const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {type:'application/json'}));
      const link = document.createElement('a');
      link.href = url; link.download = 'my-fleshsesh-academy-data.json';
      document.body.appendChild(link); link.click(); link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast('Your learning data export is ready.');
    } catch (failure) { showError(failure); }
    finally { inFlight.current = false; setBusy(''); }
  }
  async function remove() {
    if (inFlight.current || demo || deleteText !== 'DELETE MY ACCOUNT') return;
    inFlight.current = true;
    setBusy('delete'); setError('');
    try {
      await post('/api/account/delete', {confirmation:deleteText});
      // A full reload discards all client-held profile/progress after deletion.
      window.location.assign('/');
    } catch (failure) { showError(failure); }
    finally { inFlight.current = false; setBusy(''); }
  }
  if (loading) return <Loading/>;

  return <section className="page-section account-page">
    <PageHeading kicker="YOUR ACCOUNT" title={<>Your space.<br/><em>Your choices.</em></>} description="Keep your profile comfortable, manage membership and stay in control of your data."/>
    {error && !deleteOpen && <ErrorPanel message={error}/>}
    {error && sessionChanged && <ButtonLink href="/demo" variant="outline">Refresh or restart your demo</ButtonLink>}
    {syncNotice && <div className="notice" role="status"><p>{syncNotice}</p></div>}
    {!policyCurrent && <div className="notice"><p>Complete the updated learner agreement before changing your profile.</p><ButtonLink href="/onboarding" variant="outline">Review learner welcome</ButtonLink></div>}
    {demo && <div className="notice"><ShieldCheck size={20}/><p>You’re editing a separate demo profile. Your real preferences, learning record and billing are unchanged. Use the demo controls to reset or leave this experience.</p></div>}
    <div className="account-grid">
      <form className="panel account-panel" onSubmit={save}>
        <span className="eyebrow">LEARNER PROFILE</span><h2>Make yourself at home.</h2>
        <label className="field">Display name<input value={name} onChange={event=>setDraft({displayName:event.target.value,weeklyGoal:goal})} minLength={1} maxLength={80} required placeholder="Your name or nickname" disabled={!!busy || !me?.profile}/></label>
        <label className="field">Sign-in email<input value={identity?.email || ''} readOnly/><small>Your sign-in email is managed by your secure account. It is not your public learner name.</small></label>
        <label className="field">Weekly learning intention<select value={goal} onChange={event=>setDraft({displayName:name,weeklyGoal:Number(event.target.value)})} disabled={!!busy || !me?.profile}><option value={2}>2 lessons · easy does it</option><option value={3}>3 lessons · a little momentum</option><option value={5}>5 lessons · feeling curious</option></select></label>
        <button className="button primary" disabled={!!busy || !me?.profile || !policyCurrent || !name.trim()}>{busy==='save'?'Saving…':'Save my preferences'}<Check size={17}/></button>
        {!me?.profile && <ButtonLink href="/onboarding">Create learner profile</ButtonLink>}
      </form>
      <div>
        <div className="panel account-panel">
          <span className="eyebrow">YOUR MEMBERSHIP</span>
          <div className="account-plan"><h2>{demo ? 'Academy Plus' : pilot && !hasCustomer ? 'Academy beta' : planName}</h2><span className="tag">{demo ? 'Demo · no charges' : pilot && !hasCustomer ? 'No charges' : billingNeedsAttention ? 'Billing needs attention' : cancelAtPeriodEnd ? 'Renewal cancelled' : 'Account access'}</span></div>
          <p>{demo ? 'Explore the included lessons, assessments, worksheets and curriculum guides. This temporary demonstration has no subscription, payment card or live AI replies.' : pilot && !hasCustomer ? 'Explore the current written Academy during the beta. No payment is collected.' : billingNeedsAttention ? 'The payment provider reports a billing issue. Open Manage membership to review the status and available access.' : hasCustomer ? 'Manage renewals, invoices and payment details securely.' : 'Your free learner profile is ready. Choose membership when you want to explore more.'}</p>
          {!demo && periodEndLabel && <p className="small-text">{periodEnded ? `The last reported billing period ended ${periodEndLabel}. Review current access and renewal details in Manage membership.` : cancelAtPeriodEnd && tier!=='explore' ? `Current access continues until ${periodEndLabel}. Future renewal is cancelled.` : `Current billing period ends ${periodEndLabel}. Review renewal details in Manage membership.`}</p>}
          {!demo && hasCustomer && <button className="button outline" onClick={portal} disabled={!!busy}>{busy==='billing'?'Opening…':'Manage membership'}<ExternalLink size={16}/></button>}
          <Link href="/pricing" className="text-link">Explore plans<ArrowUpRight size={16}/></Link>
        </div>
        <div className="panel account-panel"><span className="eyebrow">YOUR DATA, YOUR CALL</span><h3>A clear view of your learning.</h3><p>{demo?'Demo records are separate from your own account. Leave the demo to export or delete your real learning data.':'Export your profile, progress and assessment records. Private reflection notes are never sent to the Academy.'}</p>{demo?<ButtonLink href="/demo" variant="outline">View demo controls<ArrowRight size={16}/></ButtonLink>:<button className="button outline" disabled={!!busy || !me?.profile} onClick={exportData}><Download size={16}/>{busy==='export'?'Preparing…':'Export my learning data'}</button>}</div>
      </div>
    </div>
    <div className="account-bottom"><div><ShieldCheck size={22}/><div><strong>Ready to take a break?</strong><p>Your saved learning will be here when you return.</p></div></div><AcademySignOut/></div>
    {!demo && me?.profile && <div className="delete-account"><button className="text-link" disabled={!!busy} onClick={()=>{setDeleteText('');setError('');setDeleteOpen(true);}}><Trash2 size={14}/>Delete my learner profile and progress</button><p>{pilot && !hasCustomer ? 'This removes your Academy learning record. It does not delete your secure sign-in account, and no payment is on file to cancel.' : 'Deleting your Academy profile also cancels any linked recurring subscription. It does not delete your secure sign-in account.'}</p></div>}
    {!demo && deleteOpen && <Modal title="Delete learner profile" onClose={closeDelete} closeable={busy!=='delete'}>
      <span className="eyebrow">A PERMANENT GOODBYE</span><h2>Delete your<br/><em>Academy profile?</em></h2>
      <p>{pilot && !hasCustomer ? 'This permanently removes your Academy profile, progress, assessment history and completion certificate. No payment is collected in this beta, so there is no renewal to cancel. Export your data first if you want a copy.' : 'This permanently removes your Academy profile, progress, assessment history and completion certificate. Any linked recurring subscription will be cancelled before the profile is deleted. Export your data first if you want a copy.'}</p>
      <p className="small-text">Your secure sign-in account stays intact. The payment provider retains transaction records it is required to keep.</p>
      <label className="field">Type DELETE MY ACCOUNT to confirm<input value={deleteText} onChange={event=>setDeleteText(event.target.value)} autoComplete="off" spellCheck={false} disabled={busy==='delete'}/></label>
      {error && <ErrorPanel message={error}/>}
      <button className="button danger full" onClick={remove} disabled={deleteText!=='DELETE MY ACCOUNT' || !!busy}>{busy==='delete'?'Deleting…':pilot && !hasCustomer?'Permanently delete profile':'Cancel renewal & permanently delete profile'}</button>
    </Modal>}
  </section>;
}
