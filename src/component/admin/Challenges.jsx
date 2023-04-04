import { Outlet, useLoaderData, useNavigation } from "react-router";
import api from "../../api/api";
import Loading from "../Loading";
import List from "./List";

export async function loader() {
    const contents = await api("admin/challenge");
    return contents;
}

export default function Challenges() {
    const contents = useLoaderData();
    const navigation = useNavigation();

    return (
        <div className="flex min-h-screen">
            <div className="bg-base-200">
                {navigation.state === "loading" ? (
                    <Loading />
                ) : (
                    <List
                        name="challenges"
                        list={contents.data}
                        listElementName="name"
                    />
                )}
            </div>
            <div className="grow">
                <Outlet />
            </div>
        </div>
    );
}
