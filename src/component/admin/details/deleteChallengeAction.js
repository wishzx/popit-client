import { redirect } from "react-router-dom";
import api from "../../../api/api";

export async function action({ params }) {
    await api.delete(`admin/content/${params.id}`);
    return redirect(`/admin/content`);
}
