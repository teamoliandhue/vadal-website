"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "./Icon";
import { SignalMark, VFlag } from "./Brand";
import type { IconName } from "@/lib/content";
import "./hero-workspace.css";
import { VadalIntelligence } from "./VadalIntelligence";
import "./hero-polish.css";
import "./vadal-ai-finish.css";
import { ListeningExperience } from "./ListeningExperience";
import { SurveyExperience } from "./SurveyExperience";
import { RecognitionExperience } from "./RecognitionExperience";
import { ActionExperience } from "./ActionExperience";
import { SocialExperience } from "./SocialExperience";
import { AskExperience } from "./AskExperience";

/* Social leads the capabilities — it is the one every employee touches daily.
   Analyse is no longer its own tab: its trend chart moved inside Act, where a
   number is evidence for a decision rather than a destination. */
const VIEWS: { tab: string; icon: IconName; title: string; description: string }[] = [
  { tab: "Vadal AI", icon: "spark", title: "Intelligence in every interaction.", description: "Meet Vadal.ai / Your workforce, connected" },
  { tab: "Social", icon: "users", title: "Where the whole company shows up.", description: "Social / Company-wide feed" },
  { tab: "Listen", icon: "chat", title: "Every voice. A clearer picture.", description: "Continuous listening / All teams" },
  { tab: "Survey", icon: "pulse", title: "Small questions. Real understanding.", description: "Engagement pulse / September 2026" },
  { tab: "Recognise", icon: "heart", title: "Make great work feel seen.", description: "Recognition / Across your organisation" },
  { tab: "Act", icon: "checks", title: "Good insights deserve a next step.", description: "Action planning / Engineering" },
  { tab: "Ask", icon: "spark", title: "Your next decision starts here.", description: "Vadal AI / Grounded in your workforce data" },
];

function Avatar({ initials, tone = "violet" }: { initials: string; tone?: string }) {
  return <span className={`hw-avatar hw-avatar--${tone}`}>{initials}</span>;
}
function Social() {
  return <SocialExperience/>;
}
function Listening() {
  return <ListeningExperience />;
}
function Survey({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return <SurveyExperience value={value} onChange={onChange}/>;
}
function Recognition() {
  return <RecognitionExperience/>;
}
function Actions({ id }: { id: string }) {
  return <ActionExperience id={id}/>;
}
function Copilot() {
  return <AskExperience/>;
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
  const scenes=[<VadalIntelligence key="vadal-ai"/>,<Social key="social"/>,<Listening key="listen"/>,<Survey key="survey" value={response} onChange={setResponse}/>,<Recognition key="recognise"/>,<Actions key="act" id={`${id}-trend`}/>,<Copilot key="ask"/>];
  return <div className="hw-shell" data-view={VIEWS[active].tab} data-visible={visible} ref={root} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false);}}>
    <div className="hw-window-bar"><div className="hw-workspace-name">{VIEWS[active].tab === "Vadal AI" ? <VFlag size={19}/> : <SignalMark size={20}/>}<b>Workspace</b><span>/</span><span>Overview</span></div><div className="hw-window-right"><span className="hw-demo">Product preview</span><Avatar initials="JD"/></div></div>
    <div className="hw-heading"><p>{VIEWS[active].description}</p><h2>{VIEWS[active].title}</h2></div>
    <div className="hw-stage"><div key={active} id={`${id}-panel-${active}`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="hw-panel">{scenes[active]}</div></div>
    <div className="hw-navigation"><div role="tablist" aria-label="Explore Vadal capabilities" className="hw-tabs">{VIEWS.map((view,i)=><button key={view.tab} type="button" ref={el=>{tabs.current[i]=el;}} role="tab" id={`${id}-tab-${i}`} aria-controls={active===i?`${id}-panel-${i}`:undefined} aria-selected={active===i} tabIndex={active===i?0:-1} onClick={()=>select(i)} onKeyDown={event=>{let next=i;if(event.key==="ArrowRight")next=(i+1)%VIEWS.length;else if(event.key==="ArrowLeft")next=(i+VIEWS.length-1)%VIEWS.length;else if(event.key==="Home")next=0;else if(event.key==="End")next=VIEWS.length-1;else return;event.preventDefault();select(next);tabs.current[next]?.focus();}}><Icon name={view.icon} size={16}/><span>{view.tab}</span></button>)}</div><button className="hw-play" type="button" aria-label={playing?"Pause product tour":"Play product tour"} aria-pressed={playing} onClick={()=>setPlaying(p=>!p)}>{playing?<span className="hw-pause-symbol" aria-hidden="true"/>:<Icon name="play" size={13}/>}</button></div>
  </div>;
}
