import { Outlet, useLoaderData, useNavigation } from "react-router";
import Loading from "../../Loading";

export async function loader() {
    /*     const contents = await api("admin/content");
    return contents; */
    return null;
}

export default function ContentDetail() {
    const contents = useLoaderData();
    const navigation = useNavigation();

    return (
        <div className="bg-base-100">
            <div>123</div>
        </div>
    );
}
