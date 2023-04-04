import { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

export default function Admin() {
    const [user, _] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.isAdmin) {
            //navigate("/");
        }
    }, [user]);

    return (
        <div className="flex min-h-screen bg-base-100 w-full">
            <div className="py-20 bg-base-300 ">
                <Menu />
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

function Menu() {
    return (
        <ul className="menu menu-compact hover-bordered lg:menu-normal  w-auto p-2 rounded-box ">
            <li className="menu-title">
                <span>Admin</span>
            </li>
            <li>
                <Link to="user">Users</Link>
            </li>
            <li>
                <Link to="challenge">Challenges</Link>
            </li>
            <li>
                <Link to="content ">Contents</Link>
            </li>
        </ul>
    );
}
