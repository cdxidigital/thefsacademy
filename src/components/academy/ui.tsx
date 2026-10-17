'use client';
import Link from '@/lib/next-compat';
import {createContext,useContext,useEffect,useRef,type ReactNode} from 'react';
import {ArrowUpRight,ArrowRight,BookOpen,Check,Clock,Lock,X,LoaderCircle,ChevronRight} from 'lucide-react';
import {moduleArt} from '@/lib/academy/display';
import type {Catalog,Me,Module} from '@/lib/academy/types';
export type AcademyContextValue={catalog:Catalog|null;me:Me|null;identity:{name:string;email:string}|null;loading:boolean;loadError:string;refresh:()=>Promise<void>;toast:(message:string)=>void;checkout:(product:string,label:string,amount:number)=>void};
export const AcademyContext=createContext<AcademyContextValue|null>(null);
export function useAcademy(){const context=useContext(AcademyContext);if(!context)throw new Error('Missing academy context');return context;}
export function Brand({compact=false,glossy=false}:{compact?:boolean;glossy?:boolean}){return <Link href="/" className={`brand brand-image ${glossy?'brand-glossy':'brand-flat'} ${compact?'compact':''}`} aria-label="fleshsesh academy home"><img src={glossy?'/brand/glossy-master.png':'/brand/flat-wordmark-light.png'} alt="fleshsesh academy" width={glossy?1299:1984} height={glossy?393:604}/></Link>}
export function ButtonLink({href,children,variant='primary',className=''}:{href:string;children:ReactNode;variant?:string;className?:string}){return <Link href={href} className={`button ${variant} ${className}`}>{children}</Link>}
export function Loading({label='Finding your next chapter…'}:{label?:string}){return <div className="loading" role="status"><LoaderCircle size={25} className="spin"/><p>{label}</p></div>}
export function ErrorPanel({message,retry}:{message:string;retry?:()=>void}){return <div className="notice error" role="alert"><strong>Let’s try that again.</strong><p>{message}</p>{retry&&<button className="button small outline" onClick={retry}>Try again</button>}</div>}
export function Modal({title,children,onClose,closeable=true}:{title:string;children:ReactNode;onClose:()=>void;closeable?:boolean}){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{const previous=document.activeElement as HTMLElement|null;const old=document.body.style.overflow;document.body.style.overflow='hidden';
 const timer=setTimeout(()=>ref.current?.querySelector<HTMLElement>('button,a,input,select,textarea')?.focus(),0);
 function onKey(e:KeyboardEvent){if(e.key==='Escape'&&closeable)onClose();if(e.key==='Tab'){const els=Array.from(ref.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),select,textarea,[tabindex="0"]')||[]);const first=els[0],last=els[els.length-1];if(!first){e.preventDefault();return;}if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}}
 document.addEventListener('keydown',onKey);return()=>{clearTimeout(timer);document.body.style.overflow=old;document.removeEventListener('keydown',onKey);previous?.focus();};
 },[onClose,closeable]);
 return <div className="modal-scrim" onMouseDown={e=>{if(e.target===e.currentTarget&&closeable)onClose()}}><div ref={ref} className="modal" role="dialog" aria-modal="true" aria-label={title}>{closeable&&<button onClick={onClose} className="icon-button modal-close" aria-label="Close dialog"><X/></button>}{children}</div></div>
}
export function ModuleCard({module,compact=false}:{module:Module;compact?:boolean}){
 const {me}=useAcademy();const art=moduleArt[module.id]||moduleArt.C01;
 const done=module.lessons?.filter(l=>me?.progress?.completedLessonIds?.includes(l.id)).length||0;
 const count=module.lessonCount||module.lessons?.length||0;
 return <Link href={`/courses/${module.id}`} className={`course-card ${compact?'compact-card':''}`}>
 <div className={`course-art ${art.tone}`}><img src={`/images/${art.image}.webp`} alt="" loading="lazy"/><span className="course-number">{module.id.replace('C','0').replace('E','E/')}</span><span className="course-pill">{module.id==='C01'?'Free to explore':module.kind==='elective'?'Deep dive':'Foundations'}</span><div className="course-image-title"><span>{art.tag}</span><h3>{art.short}</h3></div><span className="course-arrow"><ArrowUpRight size={20}/></span></div>
 <div className="course-info"><div className="course-meta"><span><BookOpen size={13}/>{count} lessons</span><span><Clock size={13}/>{module.durationMinutes} min</span>{done>0&&<span className="accent">{done}/{count} complete</span>}</div>{!compact&&<p>{module.summary}</p>}{done>0&&<div className="progress-track"><span style={{width:`${done/Math.max(1,count)*100}%`}}/></div>}</div>
 </Link>
}
export function PageHeading({kicker,title,description,action}:{kicker?:string;title:ReactNode;description?:string;action?:ReactNode}){return <div className="page-heading"><div>{kicker&&<span className="eyebrow">{kicker}</span>}<h1>{title}</h1>{description&&<p>{description}</p>}</div>{action}</div>}
export function SectionHeading({kicker,title,description,href,label='Explore all courses'}:{kicker:string;title:ReactNode;description?:string;href?:string;label?:string}){return <div className="section-heading"><div><span className="eyebrow">{kicker}</span><h2>{title}</h2>{description&&<p>{description}</p>}</div>{href&&<Link className="text-link" href={href}>{label}<ArrowUpRight size={18}/></Link>}</div>}
export function FeatureCheck({children}:{children:ReactNode}){return <li><Check size={17}/><span>{children}</span></li>}
export function Breadcrumb({items}:{items:{label:string;href?:string}[]}){return <nav className="breadcrumb" aria-label="Breadcrumb">{items.map((item,i)=><span key={i}>{i>0&&<ChevronRight size={13}/>} {item.href?<Link href={item.href}>{item.label}</Link>:<span aria-current="page">{item.label}</span>}</span>)}</nav>}
export function AuthRequired(){return <div className="empty-state"><Lock size={28}/><h2>A little space of your own.</h2><p>Sign in to save your progress and return to your learning from any device.</p><ButtonLink href="/signup">Create your learner profile<ArrowRight size={17}/></ButtonLink></div>}
