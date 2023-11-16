"use client";

import { useState } from "react";

const Editor = ({ entry }) => {
    const [value, setValue] = useState(entry.content);
    return (
        <div className="h-full w-full">
            <textarea className="h-full w-full p-8 text-xl" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    );
};

export default Editor;
