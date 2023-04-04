import { useLoaderData } from "react-router";
import api from "../../api/api";

export async function loader() {
    const contents = await api("admin/content");
    console.log(contents);
    return null;
}

export default function Users() {
    const contents  = useLoaderData();

    return <div>users</div>;
}
