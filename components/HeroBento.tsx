"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";
import { SignalMark, SparkMark } from "./Brand";
import type { IconName } from "@/lib/content";
import "./hero-workspace.css";
import { VadalIntelligence } from "./VadalIntelligence";
import "./hero-polish.css";
import "./vadal-ai-finish.css";
import { ListeningExperience } from "./ListeningExperience";

const VIEWS: { tab: string; icon: IconName; title: string; description: string }[] = [
  { tab: "Vadal AI", icon: "spark", title: "Intelligence in every interaction.", description: "Meet Vadal.ai / Your workforce, connected" },
  { tab: "Listen", icon: "chat", title: "Every voice. A clearer picture.", description: "Continuous listening / All teams" },
  { tab: "Survey", icon: "pulse", title: "Small questions. Real understanding.", description: "Engagement pulse / September 2026" },
  { tab: "Analyse", icon: "chart", title: "See what’s moving your people.", description: "People analytics / This quarter" },
  { tab: "Recognise", icon: "heart", title: "Make great work feel seen.", description: "Recognition / Across your organisation" },
  { tab: "Act", icon: "checks", title: "Good insights deserve a next step.", description: "Action planning / Engineering" },
  { tab: "Ask", icon: "spark", title: "Your next decision starts here.", description: "Vadal AI / Grounded in your workforce data" },
];

function Insight({ children, label = "Vadal intelligence" }: { children: ReactNode; label?: string }) {
  return <div className="hw-insight"><SparkMark size={21} /><div><span className="hw-eyebrow">{label}</span><p>{children}</p></div></div>;
}
function Avatar({ initials, tone = "violet" }: { initials: string; tone?: string }) {
  return <span className={`hw-avatar hw-avatar--${tone}`}>{initials}</span>;
}
function Trend({ id }: { id: string }) {
  return <svg className="hw-trend" viewBox="0 0 480 100" role="img" aria-label="Engagement rises from 74 to 82 over six months">
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#23c3b1" stopOpacity=".2"/><stop offset="1" stopColor="#23c3b1" stopOpacity="0"/></linearGradient></defs>
    {[20,50,80].map(y=><path key={y} d={`M0 ${y}H480`} stroke="#eaeef0" strokeDasharray="3 5"/>)}
    <path d="M0 82 C40 82 45 58 90 62 S155 85 195 51 S250 60 300 36 S355 48 395 23 S440 27 480 10 L480 100 H0Z" fill={`url(#${id})`}/>
    <path d="M0 82 C40 82 45 58 90 62 S155 85 195 51 S250 60 300 36 S355 48 395 23 S440 27 480 10" fill="none" stroke="#16a998" strokeWidth="3"/>
  </svg>;
}
function Listening() {
  return <ListeningExperience />;
}
function Survey({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return <div className="hw-scene"><div className="hw-survey-card"><div className="hw-between"><span className="hw-tag">Weekly check-in</span><span className="hw-muted">03 / 04</span></div><div className="hw-question-progress"><span/><span/><span/><span/></div><h3>My workload feels manageable.</h3><p className="hw-muted">Think about your experience this week.</p><div className="hw-responses" role="group" aria-label="Your workload response">{["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"].map((name,i)=><button type="button" key={name} aria-label={name} aria-pressed={value===i} className={value===i?"is-selected":""} onClick={()=>onChange(i)}><svg width="27" height="27" viewBox="0 0 28 28" fill="none" aria-hidden="true"><circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5"/><circle cx="10" cy="11" r="1" fill="currentColor"/><circle cx="18" cy="11" r="1" fill="currentColor"/><path d={["M9 20 Q14 12 19 20","M10 19 Q14 15 18 19","M10 18H18","M9 16 Q14 22 19 16","M8 15 Q14 25 20 15Z"][i]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg><span>{i+1}</span></button>)}</div><div className="hw-scale"><span>Strongly disagree</span><span>Strongly agree</span></div><div className="hw-survey-foot"><span><Icon name="lock" size={14}/>Anonymous response</span><span className="hw-selected-response" aria-live="polite">{["Strongly disagree","Disagree","Neutral","Agree","Strongly agree"][value]} selected <Icon name="check" size={14}/></span></div></div><div className="hw-participation"><div className="hw-avatar-stack"><Avatar initials="AK"/><Avatar initials="SM" tone="teal"/><Avatar initials="JR" tone="amber"/></div><div><b>74% participation</b><span>9,240 people heard. Every channel included.</span></div><span className="hw-mini-bars" aria-hidden="true">{[25,42,33,62,52,75,90].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</span></div></div>;
}
function Analytics({ id }: { id: string }) {
  return <div className="hw-scene"><div className="hw-analytics-card"><div className="hw-between"><div><span className="hw-eyebrow">Engagement score</span><div className="hw-score">82<span>/ 100</span></div></div><span className="hw-tag hw-tag--teal">↗ 8 points in 6 months</span></div><Trend id={id}/><div className="hw-scale"><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span></div></div><div className="hw-drivers"><span className="hw-eyebrow">Behind the score</span>{[{title:"Recognition",score:84,tone:"teal"},{title:"Career growth",score:61,tone:"violet"},{title:"Workload",score:52,tone:"amber"}].map(d=><div key={d.title}><span>{d.title}</span><div className={`hw-meter hw-meter--${d.tone}`}><i style={{width:`${d.score}%`}}/></div><b>{d.score}</b></div>)}</div><Insight>Recognition is a strength. Workload is the clearest opportunity to improve.</Insight></div>;
}
function Recognition() {
  const [liked, setLiked] = useState(false);
  return <div className="hw-scene">
    <div className="hw-recognition-card" data-celebrating={liked}>
      <div className="hw-confetti" aria-hidden="true">{Array.from({length: 9}, (_, i) => <i key={`${liked}-${i}`} style={{left:`${8+i*10}%`,animationDelay:`${i*45}ms`}}/>)}</div>
      <div className="hw-between"><span className="hw-tag hw-tag--amber"><Icon name="heart" size={13}/>Living our values</span><span className="hw-muted">Today, 10:24</span></div>
      <div className="hw-recipient"><Avatar initials="RM" tone="teal"/><div><span className="hw-muted">A little appreciation for</span><h3>Rohan Mehta</h3></div><span className="hw-appreciation" aria-hidden="true">✦</span></div>
      <blockquote>“You made a complex launch feel effortless. Thank you for showing up for the whole team.”</blockquote>
      <div className="hw-between"><span className="hw-muted">Sara Khan · Product team</span><span className="hw-tag hw-tag--violet">Above & beyond</span></div>
      <div className="hw-recognition-reactions"><button type="button" aria-label="Appreciate Rohan’s work" aria-pressed={liked} onClick={()=>setLiked(v=>!v)}><Icon name="heart" size={15}/><b>{liked?25:24}</b><span>{liked?"Appreciated":"Appreciate"}</span></button><span><Icon name="chat" size={15}/>6 kind words</span><span className="hw-muted">+250 points</span></div>
    </div>
    <div className="hw-small-stats"><div><strong>312</strong><span>moments celebrated</span></div><div><strong>61%</strong><span>of your people recognised</span></div></div>
    <Insight>Appreciation travels. Recognition now reaches 12 more teams than last month.</Insight>
  </div>;
}
function Actions() {
  return <div className="hw-scene"><div className="hw-between hw-board-summary"><span><b>Team action board</b><span className="hw-muted"> · 2 priorities</span></span><span className="hw-tag hw-tag--teal">On track</span></div><div className="hw-action-grid">{[
    {title:"Rebalance sprint load",theme:"Workload",owner:"Maya Brooks",initials:"MB",progress:70,due:"Sep 30",tasks:"7 of 10 steps",tone:"violet"},
    {title:"Make space for 1:1s",theme:"Manager support",owner:"Ravi Patel",initials:"RP",progress:40,due:"Oct 15",tasks:"2 of 5 steps",tone:"teal"},
  ].map(a=><article className="hw-action-card" key={a.title}><div className="hw-action-source"><span className={`hw-theme-dot hw-theme-dot--${a.tone}`}/>{a.theme}<span>↗</span></div><h3>{a.title}</h3><div className="hw-owner"><Avatar initials={a.initials} tone={a.tone}/><span>{a.owner}<small>Action owner</small></span></div><div className="hw-between hw-action-progress"><span>{a.tasks}</span><b>{a.progress}%</b></div><div className="hw-meter"><i style={{width:`${a.progress}%`}}/></div><div className="hw-action-due"><span>In progress</span><span>Due {a.due}</span></div></article>)}</div><div className="hw-impact"><div className="hw-impact-icon"><Icon name="check" size={18}/></div><div><b>Meeting-free Wednesdays</b><span>Completed · Workload score improved</span></div><strong>+5.2<small>points</small></strong></div><Insight label="From insight to impact">Every action has an owner. Every outcome is measured against its starting point.</Insight></div>;
}
function Copilot() {
  const [question, setQuestion] = useState(0);
  const answers = [
    { question: "Where should I focus with Engineering?", lead: "Start with workload.", body: "It’s the strongest signal behind the team’s engagement dip.", number: "312", metric: "workload mentions", change: "+22%", period: "vs. last quarter", advice: "Review sprint capacity with managers in the teams merged in March.", source: "Pulse responses" },
    { question: "What’s working well for our people?", lead: "Recognition is a strength.", body: "Teams are building a more consistent habit of appreciating each other.", number: "84", metric: "recognition score", change: "+12", period: "teams reached", advice: "Share the practices of teams with strong peer recognition across the organisation.", source: "Recognition signals" },
    { question: "What should our next action be?", lead: "Create room to recharge.", body: "Turn the workload signal into an owned, measurable team action.", number: "3", metric: "teams to prioritise", change: "2 weeks", period: "until follow-up", advice: "Review sprint capacity, agree on an owner, and check back with a short pulse.", source: "Action recommendations" },
  ];
  const answer = answers[question];
  return <div className="hw-scene">
    <div className="hw-chat-question"><Avatar initials="JD"/><p>{answer.question}</p></div>
    <div className="hw-answer" key={question}>
      <div className="hw-answer-brand"><SparkMark size={23}/><b>Vadal AI</b><span>2 sources</span></div>
      <p><strong>{answer.lead}</strong> {answer.body}</p>
      <div className="hw-answer-data"><div><strong>{answer.number}</strong><span>{answer.metric}</span></div><div><strong>{answer.change}</strong><span>{answer.period}</span></div></div>
      <p className="hw-muted">{answer.advice}</p>
      <div className="hw-citations"><span>01 · {answer.source}</span><span>02 · Team trends</span></div>
    </div>
    <div className="hw-question-options" role="group" aria-label="Example questions for Vadal AI">{["Where to focus?","What’s working?","Next action?"].map((q,i)=><button key={q} type="button" aria-pressed={question===i} onClick={()=>setQuestion(i)}>{q}<span aria-hidden="true">↗</span></button>)}</div>
  </div>;
}

export function HeroBento() {
  const [active,setActive]=useState(0);
  const [playing,setPlaying]=useState(true);
  const [hovered,setHovered]=useState(false);
  const [focused,setFocused]=useState(false);
  const [visible,setVisible]=useState(false);
  const [reduced,setReduced]=useState(true);
  const [response,setResponse]=useState(3);
  const root=useRef<HTMLDivElement>(null);
  const tabs=useRef<(HTMLButtonElement|null)[]>([]);
  const id=useId();
  const running=playing&&visible&&!hovered&&!focused&&!reduced;
  useEffect(()=>{
    const mq=window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync=()=>setReduced(mq.matches);sync();mq.addEventListener("change",sync);
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.2});
    if(root.current)observer.observe(root.current);
    return()=>{mq.removeEventListener("change",sync);observer.disconnect();};
  },[]);
  useEffect(()=>{if(!running)return;const timer=window.setTimeout(()=>setActive(v=>(v+1)%VIEWS.length),7500);return()=>window.clearTimeout(timer);},[running,active]);
  const select=(index:number)=>{setActive(index);setPlaying(false);};
  const scenes=[<VadalIntelligence key="vadal-ai"/>,<Listening key="listen"/>,<Survey key="survey" value={response} onChange={setResponse}/>,<Analytics key="analyse" id={`${id}-trend`}/>,<Recognition key="recognise"/>,<Actions key="act"/>,<Copilot key="ask"/>];
  return <div className="hw-shell" data-view={VIEWS[active].tab} data-visible={visible} ref={root} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false);}}>
    <div className="hw-window-bar"><div className="hw-workspace-name"><SignalMark size={20}/><b>Workspace</b><span>/</span><span>Overview</span></div><div className="hw-window-right"><span className="hw-demo">Product preview</span><Avatar initials="JD"/></div></div>
    <div className="hw-heading"><p>{VIEWS[active].description}</p><h2>{VIEWS[active].title}</h2></div>
    <div className="hw-stage"><div key={active} id={`${id}-panel-${active}`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="hw-panel">{scenes[active]}</div></div>
    <div className="hw-navigation"><div role="tablist" aria-label="Explore Vadal capabilities" className="hw-tabs">{VIEWS.map((view,i)=><button key={view.tab} type="button" ref={el=>{tabs.current[i]=el;}} role="tab" id={`${id}-tab-${i}`} aria-controls={active===i?`${id}-panel-${i}`:undefined} aria-selected={active===i} tabIndex={active===i?0:-1} onClick={()=>select(i)} onKeyDown={event=>{let next=i;if(event.key==="ArrowRight")next=(i+1)%VIEWS.length;else if(event.key==="ArrowLeft")next=(i+VIEWS.length-1)%VIEWS.length;else if(event.key==="Home")next=0;else if(event.key==="End")next=VIEWS.length-1;else return;event.preventDefault();select(next);tabs.current[next]?.focus();}}><Icon name={view.icon} size={16}/><span>{view.tab}</span></button>)}</div><button className="hw-play" type="button" aria-label={playing?"Pause product tour":"Play product tour"} aria-pressed={playing} onClick={()=>setPlaying(p=>!p)}>{playing?<span className="hw-pause-symbol" aria-hidden="true"/>:<Icon name="play" size={13}/>}</button></div>
  </div>;
}
