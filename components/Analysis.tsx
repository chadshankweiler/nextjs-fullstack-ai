"use client";

import { useState } from "react";
import { useAutosave } from "react-autosave";

const Analysis = ({ entry }) => {
    const [analysis, setAnalysis] = useState(entry?.analysis);
    const [isLoading, setIsLoading] = useState(false);

    const { summary, subject, color, mood, negative } = entry?.analysis;
    const analysisData = [
        { name: "Summary", value: summary },
        { name: "Subject", value: subject },
        { name: "Mood", value: mood },
        { name: "Negative", value: negative ? "True" : "False" },
    ];

    useAutosave({
        data: analysis,
        onSave: async (_analysis) => {
            setIsLoading(true);
            setIsLoading(false);
        },
    });
    return (
        <div>
            {isLoading && <div>..loading</div>}
            <div className="px-6 py-10" style={{ background: color }}>
                <h1 className="text-2xl">Analysis</h1>
            </div>
            <div>
                <ul>
                    {analysisData.map((item) => (
                        <li
                            className="flex items-center justify-between px-2 py-4 border-b border-t border-black/10"
                            key={item.name}
                        >
                            <span className="text-lg font-semibold ">
                                {item.name}
                            </span>
                            <span>{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Analysis;
