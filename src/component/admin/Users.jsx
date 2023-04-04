import { Outlet, useLoaderData, useNavigation } from "react-router";
import api from "../../api/api";
import Loading from "../Loading";
import List from "./List";

export async function loader() {
    const users = await api("admin/user");
    console.log(users);
    return users;
}

export default function Users() {
    const users = useLoaderData();
    const navigation = useNavigation();

    return (
        <div className="flex min-h-screen">
            <div className="bg-base-200">
                {navigation.state === "loading" ? (
                    <Loading />
                ) : (
                    <List
                        name="user"
                        list={users.data}
                        listElementName="instagram_uname"
                    />
                )}
            </div>
            <div className="grow">
                <Outlet />
            </div>
        </div>
    );
}
