"use client";

import { askQuestion } from "@/utils/api";
import { setRequestMeta } from "next/dist/server/request-meta";
import { useState } from "react";

const Question = () => {
    const [value, setValue] = useState("");
    const [loading, isLoading] = useState(false);
    const [response, setResponse] = useState();
    const onChange = (e) => {
        setValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        isLoading(true);
        const answer = await askQuestion(value);
        setResponse(answer);
        setValue("");
        isLoading(false);
    };
    return (
        <div>
            {loading && <div>...isLoading</div>}
            <form onSubmit={handleSubmit}>
                <input
                    disabled={loading}
                    onChange={onChange}
                    value={value}
                    type="text"
                    placeholder="Ask a question"
                    className="border-black/20 px-4 py-2 text-lg rounded-lg "
                />
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-blue-400 px-4 py-2 rounded-lg text-lg"
                >
                    Ask
                </button>
            </form>
            {response && (<div>{response}</div>)}
        </div>
    );
};

export default Question;
