import { redirect } from "react-router-dom";
import api from "../../../api/api";

export async function action({ params }) {
    console.log(params);
    await api.delete(`admin/challenge/${params.id}`);
    return redirect(`/admin/challenge`);
}
