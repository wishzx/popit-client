import { Outlet, useLoaderData, useNavigation } from "react-router";
import api from "../../api/api";
import Loading from "../Loading";
import List from "./List";

export async function loader() {
    const contents = await api("admin/content");
    return contents;
}

export default function Contents() {
    const contents = useLoaderData();
    const navigation = useNavigation();

    return (
        <div className="flex min-h-screen">
            <div className="bg-base-200">
                {navigation.state === "loading" ? (
                    <Loading />
                ) : (
                    <List
                        name="content"
                        list={contents.data}
                        listElementName="id"
                    />
                )}
            </div>
            <div className="grow">
                <Outlet />
            </div>
        </div>
    );
}
