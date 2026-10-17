'use client';

import Link from '@/lib/next-compat';
import {useEffect, useState, type KeyboardEvent, type ReactNode} from 'react';
import {ArrowRight, ArrowUpRight, BookOpen, ChevronDown, Download, FileText, HeartHandshake, LifeBuoy, Lock, MessageCircle, Phone, Search, ShieldCheck, Trash2} from 'lucide-react';
import {ButtonLink, ErrorPanel, Loading, PageHeading, useAcademy} from './ui';
import {request, type ApiError, type Source, type Worksheet} from '@/lib/academy/types';

type ResourceWorksheet = Pick<Worksheet, 'id' | 'title'> & Partial<Pick<Worksheet, 'instructions' | 'prompts'>> & {locked?: boolean};
type GlossaryEntry = {id: string; term: string; definition: string};
type ResourceResponse = {toolkitAvailable: boolean; worksheets: ResourceWorksheet[]; glossary: GlossaryEntry[]; sources: Source[]};
type ResourceTab = 'worksheets' | 'glossary' | 'sources';
const RESOURCE_TABS: {id: ResourceTab; label: string}[] = [
  {id: 'worksheets', label: 'Worksheets'},
  {id: 'glossary', label: 'Glossary'},
  {id: 'sources', label: 'Trusted sources'},
];

function safeExternalUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
  } catch {
    return null;
  }
}

function ExternalSource({href, children, className = 'text-link'}: {href: string; children: ReactNode; className?: string}) {
  const url = safeExternalUrl(href);
  if (!url) return <span>{children}</span>;
  return <a href={url} className={className} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={15} aria-hidden="true"/><span className="sr-only"> (opens in a new tab)</span></a>;
}

function downloadBlankWorksheet(worksheet: ResourceWorksheet) {
  if (!worksheet.instructions || !Array.isArray(worksheet.prompts)) return;
  // Deliberately accepts only the supplied worksheet. The private scratchpad is never read here.
  const text = [
    'FLESHSESH ACADEMY — BLANK WORKSHEET',
    `${worksheet.id} · ${worksheet.title}`,
    worksheet.instructions,
    'Use fictional adults or leave any prompt blank. No personal disclosure or sexual activity is required.',
    ...worksheet.prompts.map((prompt, index) => `${index + 1}. ${prompt}\n\n__________________________________________________\n`),
    'This file contains the blank prompts only. Private notes entered in the Academy are not included.',
    'Keep this download somewhere appropriate for your device. Anyone with access to the file may be able to read it.',
  ].join('\n\n');
  const url = URL.createObjectURL(new Blob([text], {type: 'text/plain;charset=utf-8'}));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `Fleshsesh_Academy_${worksheet.id.replace(/[^a-zA-Z0-9_-]/g, '')}_Blank_Worksheet.txt`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function WorksheetCard({worksheet, available, unlockHref, unlockLabel}: {worksheet: ResourceWorksheet; available: boolean; unlockHref: string; unlockLabel: string}) {
  const [notes, setNotes] = useState('');
  const {toast} = useAcademy();
  const canOpen = available && !worksheet.locked && Array.isArray(worksheet.prompts) && typeof worksheet.instructions === 'string';
  if (!canOpen) {
    return <article className="resource-card panel">
      <span className="eyebrow">{worksheet.id} · PRIVATE WORKSHEET</span>
      <h3>{worksheet.title}</h3>
      <p>A guided exercise you can complete with a fictional example.</p>
      <ButtonLink href={unlockHref} variant="outline" className="small"><Lock size={15} aria-hidden="true"/>{unlockLabel}</ButtonLink>
    </article>;
  }
  return <details className="resource-card panel worksheet-card">
    <summary>
      <span className="eyebrow">{worksheet.id} · OPTIONAL EXERCISE</span>
      <h3>{worksheet.title}</h3>
      <span className="text-link">Open worksheet<ChevronDown size={17} aria-hidden="true"/></span>
    </summary>
    <div className="worksheet-content">
      <p>{worksheet.instructions}</p>
      <ol>{worksheet.prompts?.map((prompt, index) => <li key={`${worksheet.id}-${index}`}>{prompt}</li>)}</ol>
      <label className="field" htmlFor={`notes-${worksheet.id}`}>
        Your optional scratchpad
        <textarea id={`notes-${worksheet.id}`} rows={5} maxLength={6000} autoComplete="off" spellCheck={false} value={notes} onChange={event => setNotes(event.target.value)} aria-describedby={`notes-privacy-${worksheet.id}`} placeholder="Use a fictional example, or leave this blank."/>
      </label>
      <p className="small-text muted" id={`notes-privacy-${worksheet.id}`}>Unsaved. These notes stay in this page’s memory and are not submitted. Changing sections, filtering worksheets or reloading can clear them.</p>
      <div className="resource-actions">
        <button className="button small outline" onClick={() => {downloadBlankWorksheet(worksheet); toast('Your blank worksheet is ready. Private notes were not included.');}}><Download size={16} aria-hidden="true"/>Download blank worksheet</button>
        <button className="text-link" disabled={!notes} onClick={() => {setNotes(''); toast('This scratchpad has been cleared.');}}><Trash2 size={14} aria-hidden="true"/>Clear notes</button>
      </div>
    </div>
  </details>;
}

export function Resources() {
  const {catalog, me, identity, loading: academyLoading, loadError, refresh} = useAcademy();
  const [tab, setTab] = useState<ResourceTab>('worksheets');
  const [query, setQuery] = useState('');
  const [data, setData] = useState<ResourceResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accessIssue, setAccessIssue] = useState<'signin' | 'welcome' | null>(null);
  const [retry, setRetry] = useState(0);
  const learnerKey = me?.user?.userId || identity?.email || '';
  const hasProfile = Boolean(me?.profile);
  // Recheck access after a plan change, purchase, policy update or demo switch.
  const accessKey = JSON.stringify([me?.billing?.mode, me?.billing?.tier, me?.billing?.entitlements, me?.profile?.acceptedVersion, me?.policyVersion]);

  useEffect(() => {
    const controller = new AbortController();
    setData(null);
    setError('');
    setAccessIssue(null);
    if (!learnerKey || !hasProfile) {
      setLoading(false);
      return () => controller.abort();
    }
    setLoading(true);
    request<ResourceResponse>('/api/resources', {signal: controller.signal})
      .then(result => {if (!controller.signal.aborted) setData(result);})
      .catch((failure: ApiError) => {
        if (controller.signal.aborted) return;
        if (failure.status === 401) setAccessIssue('signin');
        else if (failure.status === 403) setAccessIssue('welcome');
        else setError(failure.message);
      })
      .finally(() => {if (!controller.signal.aborted) setLoading(false);});
    return () => controller.abort();
  }, [learnerKey, hasProfile, accessKey, retry]);

  function selectTab(next: ResourceTab) {setTab(next); setQuery('');}
  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, current: number) {
    let next = current;
    if (event.key === 'ArrowRight') next = (current + 1) % RESOURCE_TABS.length;
    else if (event.key === 'ArrowLeft') next = (current + RESOURCE_TABS.length - 1) % RESOURCE_TABS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = RESOURCE_TABS.length - 1;
    else return;
    event.preventDefault();
    selectTab(RESOURCE_TABS[next].id);
    document.getElementById(`resource-tab-${RESOURCE_TABS[next].id}`)?.focus();
  }

  const search = query.trim().toLocaleLowerCase('en-AU');
  const worksheets = (data?.worksheets || catalog?.worksheets || []).filter(item => `${item.title} ${item.id}`.toLocaleLowerCase('en-AU').includes(search));
  const glossary = (data?.glossary || catalog?.glossary || []).filter(item => `${item.term} ${item.definition}`.toLocaleLowerCase('en-AU').includes(search));
  const sources = (data?.sources || catalog?.sources || []).filter(item => `${item.title} ${item.publisher || ''} ${item.id}`.toLocaleLowerCase('en-AU').includes(search));
  const count = tab === 'worksheets' ? worksheets.length : tab === 'glossary' ? glossary.length : sources.length;
  const unlockHref = !learnerKey || accessIssue === 'signin' ? '/signup' : !hasProfile || accessIssue === 'welcome' ? '/onboarding' : '/pricing';
  const unlockLabel = !learnerKey || accessIssue === 'signin' ? 'Create a learner profile' : !hasProfile || accessIssue === 'welcome' ? 'Complete your welcome' : 'Explore toolkit access';

  return <section className="page-section resources-page">
    <PageHeading kicker="A LITTLE CLARITY, TO KEEP" title={<>Useful tools.<br/><em>Your own way.</em></>} description="Make space for a thought, find the right word, or follow an idea back to its source." action={<ButtonLink href="/support" variant="outline"><LifeBuoy size={17} aria-hidden="true"/>Find support</ButtonLink>}/>
    <div className="notice resource-privacy"><ShieldCheck size={20} aria-hidden="true"/><p>Every exercise is optional. Use fictional adults and share only what you choose. Scratchpad notes are not saved or sent; downloads contain blank prompts only.</p></div>
    <div className="tabs" role="tablist" aria-label="Resource collections">{RESOURCE_TABS.map((item, index) => <button key={item.id} id={`resource-tab-${item.id}`} role="tab" className={tab === item.id ? 'active' : ''} aria-selected={tab === item.id} aria-controls={`resource-panel-${item.id}`} tabIndex={tab === item.id ? 0 : -1} onClick={() => selectTab(item.id)} onKeyDown={event => navigateTabs(event, index)}>{item.label}</button>)}</div>
    <div className="resource-toolbar">
      <label className="search-box"><Search size={18} aria-hidden="true"/><span className="sr-only">Search {RESOURCE_TABS.find(item => item.id === tab)?.label}</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={tab === 'worksheets' ? 'Find a worksheet…' : tab === 'glossary' ? 'Find a word or idea…' : 'Find a topic or publisher…'}/></label>
      <p className="small-text muted" aria-live="polite">{count} {tab === 'sources' ? 'references' : tab === 'glossary' ? 'definitions' : 'worksheets'}</p>
    </div>
    {error && <ErrorPanel message={error} retry={() => setRetry(value => value + 1)}/>}
    {loadError && !catalog && <ErrorPanel message={loadError} retry={() => void refresh()}/>}
    {RESOURCE_TABS.filter(item => item.id !== tab).map(item => <div key={item.id} id={`resource-panel-${item.id}`} role="tabpanel" aria-labelledby={`resource-tab-${item.id}`} hidden/>)}
    <div id={`resource-panel-${tab}`} role="tabpanel" aria-labelledby={`resource-tab-${tab}`} tabIndex={0}>
      {academyLoading && !catalog ? <Loading label="Opening your resource library…"/> : <>
        {tab === 'worksheets' && <>
          {loading && <Loading label="Checking your toolkit access…"/>}
          {!loading && !data?.toolkitAvailable && <div className="notice"><FileText size={19} aria-hidden="true"/><p>{!learnerKey || accessIssue === 'signin' ? 'Create a learner profile to explore the toolkit. The glossary, source register and support directory are available here without signing in.' : !hasProfile || accessIssue === 'welcome' ? 'Complete your learner welcome to check toolkit access. Definitions and source links are open below.' : 'Worksheets are included with eligible membership or the toolkit. Definitions, source links and urgent support remain open.'}</p></div>}
          <div className="resource-grid">{worksheets.map(worksheet => <WorksheetCard key={`${learnerKey}-${worksheet.id}`} worksheet={worksheet} available={Boolean(data?.toolkitAvailable)} unlockHref={unlockHref} unlockLabel={unlockLabel}/>)}</div>
        </>}
        {tab === 'glossary' && <dl className="resource-grid glossary-grid">{glossary.map(entry => <div className="resource-card panel" key={entry.id}><dt className="glossary-term"><strong>{entry.term}</strong></dt><dd>{entry.definition}</dd></div>)}</dl>}
        {tab === 'sources' && <>
          <p className="small-text muted">Follow the course’s reference register back to its publishers. References support education; personal health decisions belong with a qualified clinician.</p>
          <div className="resource-grid source-grid">{sources.map(source => <article className="resource-card panel" key={source.id}><span className="eyebrow">{source.id} · {source.publisher || 'COURSE REFERENCE'}</span><h3>{source.title}</h3><ExternalSource href={source.url}>Read the source</ExternalSource></article>)}</div>
        </>}
        {count === 0 && !loading && <div className="empty-state"><Search size={25} aria-hidden="true"/><h2>No matches just yet.</h2><p>Try a broader word, or browse the whole collection.</p>{query && <button className="button outline" onClick={() => setQuery('')}>Clear search</button>}</div>}
      </>}
    </div>
  </section>;
}

// Support details checked against each service's own site on 17 October 2026.
// Deliberately do not hard-code QLife hours: its current schedule differs from the older course pack.
export function Support() {
  const {me,catalog} = useAcademy();
  const live = (me?.billing?.mode ?? catalog?.mode) === 'live';
  const demo = me?.billing?.mode === 'demo';
  return <section className="page-section support-page">
    <PageHeading kicker="YOU CAN PAUSE HERE" title={<>A little support.<br/><em>A next step.</em></>} description="You do not need the right words, a course result or a membership to seek help. These independent Australian services are open to you."/>
    <div className="panel urgent-support">
      <div><span className="eyebrow">IMMEDIATE DANGER OR A MEDICAL EMERGENCY</span><h2>In Australia, call 000.</h2><p>Ask for police, fire or ambulance. If you are outside Australia, contact your local emergency service.</p></div>
      <a href="tel:000" className="button primary"><Phone size={19} aria-hidden="true"/>Call 000</a>
      <ExternalSource href="https://www.healthdirect.gov.au/contact-us">Emergency and health guidance</ExternalSource>
    </div>
    <div className="resource-grid support-grid">
      <article className="resource-card panel"><HeartHandshake size={24} aria-hidden="true"/><span className="eyebrow">VIOLENCE, PRESSURE OR ABUSE</span><h2>1800RESPECT</h2><p>National support for people affected by domestic, family or sexual violence. Phone and text support are available around the clock.</p><div className="resource-actions"><a className="button outline" href="tel:1800737732"><Phone size={16} aria-hidden="true"/>1800 737 732</a><a className="text-link" href="sms:0458737732"><MessageCircle size={16} aria-hidden="true"/>Text 0458 737 732</a></div><ExternalSource href="https://1800respect.org.au/texting-1800respect">Contact options and what to expect</ExternalSource></article>
      <article className="resource-card panel"><LifeBuoy size={24} aria-hidden="true"/><span className="eyebrow">A HEALTH QUESTION</span><h2>healthdirect</h2><p>Speak with a registered nurse about a health concern, 24 hours a day. They can help you work out an appropriate next step.</p><a className="button outline" href="tel:1800022222"><Phone size={16} aria-hidden="true"/>1800 022 222</a><ExternalSource href="https://www.healthdirect.gov.au/contact-us">Health advice and access options</ExternalSource></article>
      <article className="resource-card panel"><MessageCircle size={24} aria-hidden="true"/><span className="eyebrow">LGBTIQ+ PEER SUPPORT</span><h2>QLife</h2><p>Peer support and referral for questions about sexuality, gender, bodies, feelings or relationships. Check QLife’s website for current opening hours.</p><a className="button outline" href="tel:1800184527"><Phone size={16} aria-hidden="true"/>1800 184 527</a><ExternalSource href="https://www.qlife.org.au/get-help">Webchat and current service hours</ExternalSource></article>
      <article className="resource-card panel"><ShieldCheck size={24} aria-hidden="true"/><span className="eyebrow">INTIMATE IMAGES OR ONLINE HARM</span><h2>eSafety</h2><p>Find reporting routes and practical information about image-based abuse and other serious online harm. You do not need to upload images to the Academy.</p><ExternalSource href="https://www.esafety.gov.au/report" className="button outline">Find reporting help</ExternalSource><ExternalSource href="https://www.esafety.gov.au/key-topics/image-based-abuse">Understand image-based abuse</ExternalSource></article>
    </div>
    <div className="panel prose support-academy">
      <span className="eyebrow">USING YOUR ACADEMY</span><h2>Make learning comfortable.</h2>
      <details><summary>I need to take a break.</summary><p>Pause whenever you choose. Saved lesson progress stays in your account. Private scratchpad notes are unsaved, so clear them before leaving a shared device. Quick exit changes the page; it does not erase browser history or downloads.</p></details>
      <details><summary>I have a billing or account question.</summary><p>Open your account to review your profile, export your learning record or manage a connected subscription. {demo?'Demo mode cannot access your real billing or account records. Leave the demo to manage your own account.':live?'A connected membership can be managed through the secure billing portal.':'Payment collection is disabled during the beta.'} For an unresolved issue, contact your beta organiser; this preview does not offer a staffed live support inbox.</p><ButtonLink href="/account" variant="outline">Open my account<ArrowRight size={16} aria-hidden="true"/></ButtonLink></details>
      <details><summary>A lesson or question does not feel right.</summary><p>You can stop, revisit its source and leave the assessment. No personal disclosure is needed to complete the course. If you raise a concern with your beta organiser, the lesson or question ID and a brief description are enough; do not send intimate images or private histories.</p><ButtonLink href="/resources" variant="outline">Browse learning resources<BookOpen size={16} aria-hidden="true"/></ButtonLink></details>
      <p className="small-text muted">The Academy is an education service. It does not monitor emergencies or provide individual diagnosis, therapy or legal decisions. Service details above were checked on 17 October 2026; use each provider’s site for current information.</p>
    </div>
  </section>;
}

export function Legal({type}: {type: 'privacy' | 'terms'}) {
  const {me} = useAcademy();
  const isLive = me?.billing?.mode === 'live';
  const demo = me?.billing?.mode === 'demo';
  const privacy = type === 'privacy';
  return <section className="page-section legal-page">
    <PageHeading kicker={privacy ? 'YOUR INFORMATION, EXPLAINED' : 'CLEAR EXPECTATIONS'} title={privacy ? <>Privacy.<br/><em>With room for choice.</em></> : <>Learning here.<br/><em>On clear terms.</em></>} description={privacy ? 'A plain-language explanation of the current Academy’s account records, optional AI processing and your controls.' : 'How adult learning, course completion and the proposed paid offers work.'}/>
    <nav className="tabs" aria-label="Policies"><Link href="/privacy" className={privacy ? 'active' : ''} aria-current={privacy ? 'page' : undefined}>Privacy</Link><Link href="/terms" className={!privacy ? 'active' : ''} aria-current={!privacy ? 'page' : undefined}>Learning terms</Link></nav>
    <article className="panel prose legal-content">
      <p className="eyebrow">BETA EDITION · 17 OCTOBER 2026</p>
      {privacy ? <>
        <h2>Your profile and learning record</h2>
        <p>Sign-in uses this Academy’s own account service. Passwords are hashed and are not stored in the learning database. Google or X sign-in is handled by those providers; the Academy keeps only the verified account id, name and email. You can choose a separate learner display name.</p>
        <p>The application stores your profile, learning intention, consent acknowledgements, lesson completion, assessment scores and attempts, course access, tutor usage counters and any issued completion record in a Cloudflare-hosted database. These records let you resume learning, check assessments and manage access. Sexual history, intimate photographs and private worksheet answers are not required.</p>
        <h2>Trying the subscribed demo</h2>
        <p>The optional Academy Plus demo uses a temporary, separate learning record. It begins with labelled sample progress, lets you try lessons and checks, and offers a sample certificate marked as not valid. Resetting or leaving the demo does not change your real learning, profile or billing. Payment, real certificate issuance, account export and account deletion are unavailable within the demo.</p>
        <h2>Private reflections stay optional</h2>
        <p>Scratchpad text stays in the current page’s memory. The Academy does not save or submit it. Blank worksheet downloads exclude your notes. Your own downloads, browser history, extensions or a shared device can still reveal activity, so avoid entering anything you would be uncomfortable leaving on that device.</p>
        <h2>Choosing an AI tutor</h2>
        <p>The curriculum guides process your question and short conversation context within the Academy service without sending them to an external AI service. If the AI tutor is enabled and you opt in, The Academy AI service receives your question, approved course excerpts and source details, plus up to four recent conversation messages of at most 500 characters each. The Academy does not retain tutor message text in its application database; it records usage totals and your processing choice.</p>
        <p>External processing is subject to the provider’s own data controls and retention. Technical or security records may also be kept by the services operating the site. This is not a promise of anonymity or zero logs. Avoid names, account credentials, intimate images and unnecessary personal details.</p>
        <h2>Payments and marketing</h2>
        <p>If paid checkout is enabled, Stripe handles payment-card entry on its hosted checkout. The Academy stores payment customer/subscription identifiers and access status, not card details. Payment-provider records are managed separately. This beta does not use your learning record or tutor questions for retail targeting.</p>
        <h2>Your controls</h2>
        <p>Use your account to update your learner name and learning intention, export your Academy record, or delete the profile and its associated progress, assessment history and completion record. During this beta no payment is collected, so deletion only removes the learning record. When a paid membership is connected later, deletion is meant to cancel that renewal first. It does not delete your secure sign-in account.</p>
        <ButtonLink href="/account" variant="outline">Open account controls<ArrowRight size={16} aria-hidden="true"/></ButtonLink>
        <p><ExternalSource href="https://www.oaic.gov.au/privacy/your-privacy-rights">Australian privacy information</ExternalSource></p>
      </> : <>
        <h2>An adult learning space</h2>
        <p>The Academy is for adults aged 18 and over. Its admission policy is separate from the legal age of consent in any jurisdiction. You may use fictional examples, skip private reflection and pause whenever you need. Completion never requires a partner, sexual activity, an intimate image or a personal sexual history.</p>
        <p>Keep your account for your own learning, respect other people’s privacy and use the content for education. Do not attempt to access another learner’s records or alter assessment results.</p>
        <h2>Curriculum and completion</h2>
        <p>The current written curriculum is a beta authoring edition awaiting clinical and legal release review. It supports education and informed questions; it does not provide individual diagnosis, treatment, therapy or legal decisions. Only formats actually available in the learning player are included.</p>
        <p>The Academy’s assessed Certificate of Completion records the stated course requirements. It is non-accredited adult education, not an AQF qualification, VET Statement of Attainment, professional licence or guarantee of a person’s future conduct. The core award requires orientation, all core lessons and module checks, the capstone and the applied planning assessment.</p>
        <h2>Access, prices and renewals</h2>
        <p>{demo ? 'The subscribed demo does not collect payments or create a recurring subscription. Displayed prices describe the planned paid offers.' : isLive ? 'Review the offer and secure checkout before committing to a purchase.' : 'The beta does not collect payments. Membership and individual-purchase prices shown during beta describe the planned offers.'} Prices are in Australian dollars. A paid checkout shows the amount, billing interval and access period before you confirm.</p>
        <p>A recurring membership renews at the stated monthly or annual interval until cancelled. When a subscription is connected, manage or cancel it from your account’s billing portal; check the displayed end date for remaining access. Individual module passes and toolkit purchases are separate one-time offers. Their stated access period and included material apply; they do not automatically create a membership.</p>
        <p>AI questions are subject to the allowance stated for the offer and to actual service availability. A paid tier does not imply an unlimited tutor or a staffed clinician. Free consent essentials and independent urgent support are available without a paid membership.</p>
        <h2>Consumer rights</h2>
        <p>Nothing in these terms removes rights under Australian Consumer Law. A subscription cancellation and a remedy for a faulty or misdescribed service are different matters. Applicable consumer guarantees continue to apply; there is no blanket “no refunds” rule.</p>
        <p><ExternalSource href="https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees">Consumer rights and guarantees</ExternalSource></p>
        <p><ExternalSource href="https://www.accc.gov.au/consumers/problem-with-a-product-or-service-you-bought/repair-replace-refund-cancel">Refunds, cancellation and remedies</ExternalSource></p>
        <h2>Your information and support</h2>
        <p>The <Link href="/privacy" className="text-link">privacy page</Link> explains saved learning records, optional AI processing, export and deletion. The <Link href="/support" className="text-link">support directory</Link> links to independent Australian services and explains the current beta’s account-help options.</p>
      </>}
      <div className="notice"><p>These pages describe the current beta. The operator’s formal contact details, final paid-service policies and specialist release review must be completed before public paid enrolment. No lawyer-reviewed compliance or external accreditation is claimed.</p></div>
    </article>
  </section>;
}
