"use client";

import type { NextComponentType, NextPageContext } from "next";
import { useEffect, useState } from "react";

interface Props {
    vote: number;
}

const circleClass = "w-full h-full fill-none ";
const circleStyle: React.CSSProperties = {
    strokeLinecap: "round",
};
const circleProp = {
    cx: "50%",
    cy: "50%",
};

const bg = {
    radius: 8,
    width: 2,
};

const dynamic = {
    radius: 8,
    width: 1,
};
const box = 20;
const icr = 2 * Math.PI * dynamic.radius;

const VoteIndicator: NextComponentType<NextPageContext, {}, Props> = ({
    vote,
}) => {
    const [v, setV] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setV((v) => {
                const nv = v + 0.5;
                return nv > 10 ? 1 : nv;
            });
        }, 700);

        return () => clearInterval(interval);
    }, []);

    const offset = ((10 - v) / 10) * icr;

    return (
        <div style={{ width: 100, height: 100 }} className="relative">
            <svg viewBox={`0 0 ${box} ${box}`} preserveAspectRatio="xMinYMid meet">
                <circle
                    className={`${circleClass} stroke-green-800 `}
                    style={circleStyle}
                    {...circleProp}
                    r={bg.radius}
                    strokeWidth={bg.width}
                ></circle>
                <circle
                    className={`${circleClass} stroke-yellow-400 stroke-1`}
                    {...circleProp}
                    r={dynamic.radius}
                    style={circleStyle}
                    strokeWidth={dynamic.width}
                    strokeDashoffset={offset}
                    strokeDasharray={icr}
                    transform={`rotate(-90, ${box / 2}, ${box / 2})`}
                ></circle>
            </svg>
            <div className="left-1/2 top-1/2 absolute -translate-x-1/2 -translate-y-1/2 flex justify-center items-center leading-none">
                {v * 10}
                <span
                    className="self-end leading-none"
                    style={{ fontSize: ".5em", transform: "translateY(-.1em)" }}
                >
                    %
                </span>
            </div>
        </div>
    );
};

export default VoteIndicator;
