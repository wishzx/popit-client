import api from "./api";

export async function getContents() {
    let contents = await api.get("/feed");
    if (!contents) {
        contents = [];
    } else {
        contents = contents.data;
    }
    console.log(contents);
    return contents;
}
export async function login(credentials) {
    let res = await api.post("/signin", credentials);
    let json = res.json();
    return json;
}

export async function signin() {}

export async function postLike(content_id) {
    let res = await api.post("/like", { content_id });
    if (res.status === 200) return true;
    return false;
}

export async function deleteLike(content_id) {
    let res = await api.delete("/like", { content_id });
    if (res.status === 200) return true;
    return false;
}
