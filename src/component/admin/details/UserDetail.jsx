import { useLoaderData } from "react-router";

export async function loader() {
    /*     const contents = await api("admin/content"); */
    /*     console.log(contents); */
    return null;
}

export default function UserDetail() {
    const contents = useLoaderData();
    const navigation = useNavigation();

    return (
        <div className="bg-base-100">
            <div>213</div>
        </div>
    );
}
