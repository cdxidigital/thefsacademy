export type LessonSummary = { id:string; title:string; durationMinutes:number; moduleId:string; assessmentId?:string; order?:number };
export type Module = { id:string; title:string; kind:'core'|'elective'; summary:string; durationMinutes:number; lessons:LessonSummary[]; assessmentId:string; lessonCount:number; questionCount?:number; passingScore?:number; prerequisites?:string[] };
export type Source = {id:string; title:string; url:string; publisher?:string};
export type Worksheet = {id:string; title:string; instructions:string; prompts:string[]};
export type Catalog = {course?:{title:string;[key:string]:unknown};modules:Module[];orientation?:{id:string;title:string;content?:string[];acknowledgements?:string[];activity?:string};glossary?:{id:string;term:string;definition:string}[];worksheets?:Worksheet[];sources?:Source[];[key:string]:unknown};
export type Progress = {completedLessonIds:string[];passedAssessmentIds:string[];xp:number;orientationCompleted?:boolean;level?:number;[key:string]:unknown};
export type DemoInfo = {active:true;expiresAt:string;source:'isolated-demo';tier:'plus'};
export type Me = {user:null|{userId?:string;displayName?:string;email?:string};demo?:DemoInfo|null;profile:null|{displayName?:string;weeklyGoal?:number;adultConfirmed?:boolean;[key:string]:unknown};progress:Progress;billing?:{mode:string;tier?:string;checkoutAvailable?:boolean;[key:string]:unknown};tutor?:{mode?:string;remaining?:number;[key:string]:unknown};certificate?:{eligible?:boolean;issued?:{id:string;displayName:string;courseVersion:string;issuedAt:string}|null;demoOnly?:boolean;sampleUrl?:string;[key:string]:unknown};[key:string]:unknown};
export type Lesson = LessonSummary & {content:string;objectives:string[];sourceIds:string[];sections?:{text:string;id:string}[];reflection?:{prompt:string};scenarioId?:string;topicNote?:string;moduleAssessmentId?:string};
export type ApiError = Error & {status?:number;data?:unknown};
let expectedLearner:string|null=null;
let latestMeRequest=0;
// Client consistency only. Authentication and learner isolation remain server checks.
export function resetLearnerExpectation(){latestMeRequest+=1;expectedLearner=null;}
function academyUrl(path:string){
 if(typeof window==='undefined'||!path.startsWith('/'))return path;
 const host=window.location.hostname.toLowerCase();
 const pathBased=host==='preview.grok.genai.mil'||host==='preview.grok.mil'||host==='preview.grokgsac.com';
 const match=pathBased?/^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i.exec(window.location.pathname):null;
 return match?match[0]+path:path;
}
export async function request<T=Record<string,unknown>>(path:string,init?:RequestInit):Promise<T>{
 const meRequest=path==='/api/me'?++latestMeRequest:null;
 const requestHeaders=new Headers(init?.headers);
 if(init?.body&&!requestHeaders.has('Content-Type'))requestHeaders.set('Content-Type','application/json');
 if(expectedLearner)requestHeaders.set('X-Academy-Learner',expectedLearner);
 if(typeof window!=='undefined'){
  try{const token=window.sessionStorage.getItem('grok-auth.bearer-token');if(token&&!requestHeaders.has('Authorization'))requestHeaders.set('Authorization',`Bearer ${token}`);}catch{}
 }
 const response=await fetch(academyUrl(path),{credentials:'same-origin',...init,headers:requestHeaders});
 const raw:unknown=await response.json().catch(()=>({error:'The service could not respond. Please try again.'}));
 const data=(raw&&typeof raw==='object'?raw:{}) as Record<string,unknown>;
 const nestedError=data.error&&typeof data.error==='object'?(data.error as Record<string,unknown>).message:null;
 if(!response.ok){const error=new Error(typeof data.error==='string'?data.error:typeof data.message==='string'?data.message:typeof nestedError==='string'?nestedError:'Something went wrong. Please try again.') as ApiError;error.status=response.status;error.data=data;throw error;}
 if(meRequest!==null&&meRequest===latestMeRequest&&typeof window!=='undefined'){const user=data.user as {userId?:unknown}|null;expectedLearner=typeof user?.userId==='string'?user.userId:null;}
 return data as T;
}
export const post=<T=Record<string,unknown>>(path:string,body:unknown)=>request<T>(path,{method:'POST',body:JSON.stringify(body)});
export async function openPrivateHtml(path:string,filename:string){
 const headers=new Headers();
 if(typeof window!=='undefined'){
  try{const token=window.sessionStorage.getItem('grok-auth.bearer-token');if(token)headers.set('Authorization',`Bearer ${token}`);}catch{}
 }
 const response=await fetch(academyUrl(path),{credentials:'same-origin',headers});
 if(!response.ok){
  const raw:unknown=await response.json().catch(()=>null);
  const data=raw&&typeof raw==='object'?raw as Record<string,unknown>:null;
  const nested=data?.error&&typeof data.error==='object'?(data.error as Record<string,unknown>).message:null;
  throw new Error(typeof data?.error==='string'?data.error:typeof nested==='string'?nested:'That document could not be opened.');
 }
 const blob=new Blob([await response.arrayBuffer()],{type:'text/html'});
 const url=URL.createObjectURL(blob);
 const popup=window.open(url,'_blank','noopener,noreferrer');
 if(!popup){
  const anchor=document.createElement('a');
  anchor.href=url;anchor.download=filename;anchor.click();
 }
 window.setTimeout(()=>URL.revokeObjectURL(url),60000);
}
export const EMPTY_PROGRESS:Progress={completedLessonIds:[],passedAssessmentIds:[],xp:0};
