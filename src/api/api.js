import axios from "axios";
export const BASE_URL_API = "http://localhost:3001";

const api = axios.create({
    baseURL: BASE_URL_API,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6ImFtYXR6a2FpdGlzMEB3dW5kZXJncm91bmQuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjgwNTE3NzE2fQ.wi9tcQFNb_t6ZlFNhqofm7zVoaedd8tUBgsi6rzyglA";
api.defaults.headers.common["Authorization"] = token;

export default api;
