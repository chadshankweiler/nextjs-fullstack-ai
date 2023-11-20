"use client";

import { editEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content);
    const [isLoading, setIsLoading] = useState(false);

    const [analysis, setAnalysis] = useState(entry?.analysis);

    const { summary, subject, color, mood, negative } = analysis;
    const analysisData = [
        { name: "Summary", value: summary },
        { name: "Subject", value: subject },
        { name: "Mood", value: mood },
        { name: "Negative", value: negative ? "True" : "False" },
    ];

    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true);
            const data = await editEntry(entry.id, _value);
            setAnalysis(data.analysis)
            setIsLoading(false);
        },
    });
    return (
        <div className="w-full h-full grid grid-cols-3">
            <div className="col-span-2 h-full w-full">
            {isLoading && <div>..loading</div>}
            <textarea
                className="h-full w-full p-8 text-xl"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            </div>
            <div className="border-black/10 border-l col-span-1">
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
        </div>
    );
};

export default Editor;
