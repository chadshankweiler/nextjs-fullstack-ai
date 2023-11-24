const createUrl = (path: String) => {
    return window.location.origin + path;
};

export const createNewEntry = async () => {
    const res = await fetch(
        new Request(createUrl("/api/journal"), {
            method: "POST",
        })
    );

    if (res.ok) {
        const data = await res.json();
        console.log(data);
        return data.data;
    }
};

export const editEntry = async (id, content) => {
    const res = await fetch(
        new Request(createUrl(`/api/journal/${id}/`), {
            method: "PATCH",
            body: JSON.stringify({ content }),
        })
    );

    if (res.ok) {
        const data = await res.json();
        return data.data;
    }
};

export const askQuestion = async (question) => {
    const res = await fetch(
        new Request(createUrl("/api/question"), {
            method: "POST",
            body: JSON.stringify({ question }),
        })
    );

    if (res.ok) {
        const data = await res.json()
        return data.data
    }
};
