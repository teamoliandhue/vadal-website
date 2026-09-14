"use client";

import { useState, type CSSProperties } from "react";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import "./listening-experience.css";

const CHANNELS = ["All signals", "Feedback", "Pulse"] as const;
const SIGNALS = [
  { channel:"Feedback", source:"Anonymous feedback", time:"2 min ago", start:"A little more clarity on ", emphasis:"career paths", end:" would go a long way.", theme:"Career growth", tone:"violet" },
  { channel:"Pulse", source:"Weekly pulse", time:"12 min ago", start:"Our team is doing great work. We just need ", emphasis:"room to recharge", end:".", theme:"Workload", tone:"teal" },
  { channel:"Feedback", source:"Anonymous feedback", time:"24 min ago", start:"It helps when my manager makes ", emphasis:"time to listen", end:".", theme:"Manager support", tone:"teal" },
  { channel:"Pulse", source:"Onboarding pulse", time:"35 min ago", start:"Having a buddy made me feel ", emphasis:"part of the team", end:" from day one.", theme:"Belonging", tone:"violet" },
];
const INSIGHTS = [
  { theme:"Workload", title:"A pattern worth listening to.", text:"Similar concerns across 3 teams. A short follow-up pulse can uncover why." },
  { theme:"Career growth", title:"Clarity is the conversation.", text:"Career paths and manager conversations are themes to explore together." },
  { theme:"Employee experience", title:"Different moments. Shared context.", text:"Connect weekly check-ins with onboarding feedback to see the whole picture." },
];

export function ListeningExperience() {
  const [channel, setChannel] = useState(0);
  const signals = (channel === 0 ? SIGNALS : SIGNALS.filter(signal => signal.channel === CHANNELS[channel])).slice(0, 2);
  const insight = INSIGHTS[channel];
  return (
    <div className="hw-scene ls-experience">
      <div className="ls-summary">
        <div className="ls-summary-copy"><span className="ls-kicker">THE VOICE OF YOUR WORKFORCE</span><div className="ls-number">2,768<span>signals this week</span></div></div>
        <div className="ls-audio" aria-hidden="true">{[9,15,23,13,30,39,24,46,32,20,43,54,34,62,44,28,51,37,22,44,31,17,27,38,19,12,22,10].map((height,index)=><i key={index} style={{"--bar-height":`${height}%`,"--bar-delay":`${index * -0.17}s`} as CSSProperties}/>)}</div>
        <span className="ls-live"><i/>Listening</span>
      </div>

      <div className="ls-toolbar"><div className="ls-filters" role="group" aria-label="Filter listening signals">{CHANNELS.map((name,index)=><button key={name} type="button" onClick={()=>setChannel(index)} aria-pressed={channel===index}>{name}</button>)}</div><span className="ls-private"><Icon name="lock" size={11}/>Identity protected</span></div>

      <div className="ls-stream" key={channel} aria-live="polite">
        {signals.map((signal,index)=><article className={`ls-message ls-message--${signal.tone}`} key={signal.start} style={{"--message-delay":`${index * 140}ms`} as CSSProperties}>
          <span className="ls-message-icon"><Icon name={signal.channel==="Pulse"?"pulse":"chat"} size={16}/></span>
          <div className="ls-message-body"><div className="ls-message-meta"><span>{signal.source}</span><time>{signal.time}</time></div><p>“{signal.start}<mark>{signal.emphasis}</mark>{signal.end}”</p></div>
          <span className="ls-theme">{signal.theme}</span>
        </article>)}
      </div>

      <div className="ls-discovery" key={`insight-${channel}`}>
        <span className="ls-discovery-icon"><SparkMark size={22}/></span>
        <div><div className="ls-discovery-heading"><span>VADAL INTELLIGENCE</span><span className="ls-discovery-theme">{insight.theme}</span></div><p><strong>{insight.title}</strong> {insight.text}</p></div>
      </div>
    </div>
  );
}
