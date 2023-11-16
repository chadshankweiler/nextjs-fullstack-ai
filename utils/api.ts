const createUrl = (path: String) => {
    return window.location.origin + path;
};

export const createNewEntry = async () => {
    const res = await fetch(
        new Request(createUrl("/api/journal"), {
            method: "POST",
        })
    );

    if(res.ok) {
        const data = await res.json()
        console.log(data)
        return data.data
    }
};
