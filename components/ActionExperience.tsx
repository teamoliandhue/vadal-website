"use client";

import { useState, type CSSProperties } from "react";
import { Icon } from "./Icon";
import { SparkMark } from "./Brand";
import "./action-experience.css";

/* Act used to be a track of plans with owners — which read as analysis, not
   action. It is a recommendation surface now: the signal, the play Vadal
   suggests for it, and a way to start it. Analyse folded in here as the eNPS
   band across the top, because a trend is evidence for a decision rather than
   a destination of its own. */

/* eNPS, Apr → Sep. Smoothed here rather than hand-written so the curve and
   its fill can never drift apart. */
const POINTS: [number, number][] = [
  [0,44],[40,41],[80,35],[120,37],[160,31],[200,27],[240,29],[280,21],[320,17],[360,19],[400,12],[440,6],[480,3],
];
const LINE = POINTS.slice(1).reduce((d, [x, y], i) => {
  const [px, py] = POINTS[i], mx = (px + x) / 2;
  return `${d} C${mx} ${py} ${mx} ${y} ${x} ${y}`;
}, `M${POINTS[0][0]} ${POINTS[0][1]}`);
const AREA = `${LINE} L480 56 L0 56 Z`;

type Play = { signal: string; action: string; tone: string; icon: "heart" | "users" | "compass" };
const PLAYS: Play[] = [
  { signal: "Recognition is low in Engineering", action: "Run a peer recognition round this week", tone: "violet", icon: "heart" },
  { signal: "6 high performers at flight risk",  action: "Book retention 1:1s with their managers", tone: "coral",  icon: "users" },
  { signal: "3 people tracking below target",    action: "Start a coaching plan with Vadal",       tone: "blue",   icon: "compass" },
];

export function ActionExperience({ id }: { id: string }) {
  const [started, setStarted] = useState(false);
  const stroke = `${id}-stroke`, fill = `${id}-fill`;
  return (
    <div className="hw-scene ac-experience">
      <div className="ac-canvas">
        {/* Analyse, folded in — the evidence the plays below are reacting to */}
        <div className="ac-evidence">
          <div className="ac-score"><b>+41</b><span>eNPS<small>↗ 8 in 6 months</small></span></div>
          <svg className="ac-trend" viewBox="0 0 480 56" preserveAspectRatio="none" role="img" aria-label="eNPS rises from 33 to 41 between April and September">
            <defs>
              <linearGradient id={stroke} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#19c6b4"/><stop offset=".55" stopColor="#3b9eff"/><stop offset="1" stopColor="#7c5cf8"/>
              </linearGradient>
              <linearGradient id={fill} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#4aa8f0" stopOpacity=".3"/><stop offset="1" stopColor="#7c5cf8" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path className="ac-area" d={AREA} fill={`url(#${fill})`}/>
            <path className="ac-line" d={LINE} pathLength={1} fill="none" stroke={`url(#${stroke})`} vectorEffect="non-scaling-stroke"/>
          </svg>
          <span className="ac-span">Apr → Sep</span>
        </div>

        <div className="ac-plays">
          <span className="ac-kicker"><SparkMark size={14}/>Vadal recommends</span>

          {PLAYS.map((play,index)=><div className={`ac-play ac-play--${play.tone}`} key={play.signal} data-lead={index === 0} style={{"--play-delay":`${index * 120}ms`} as CSSProperties}>
            <span className="ac-play-icon"><Icon name={play.icon} size={15}/></span>
            <div>
              <span className="ac-signal">{play.signal}</span>
              <strong>{play.action}</strong>
            </div>
            {index === 0 ? (
              <button type="button" className="ac-start" aria-pressed={started} onClick={()=>setStarted(v=>!v)}>
                {started ? <><Icon name="check" size={13}/>Assigned</> : "Start"}
              </button>
            ) : (
              <span className="ac-arrow" aria-hidden="true"><Icon name="arrow" size={14}/></span>
            )}
          </div>)}
        </div>
      </div>
    </div>
  );
}
