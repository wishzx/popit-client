import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

export default function NavBar() {
    return (
        <div className="navbar bg-gray-900">
            <div className="flex-1">
                <Link
                    to="/"
                    className="btn btn-ghost normal-case text-2xl nav-gradient"
                >
                    popIt
                </Link>
            </div>
            <div className="flex-none">
                <NavBarMenu />
            </div>
        </div>
    );
}

const NavBarMenu = () => {
    const [user, setUser] = useContext(UserContext);

    function logout() {
        setUser({ name: undefined, isAdmin: false });
    }

    return (
        <ul className="menu menu-horizontal px-1">
            {user.name && (
                <li>
                    <Link to="/challenges" className="nav-gradient">
                        Challenges
                    </Link>
                </li>
            )}
            {user.isAdmin && (
                <li>
                    <Link to="/admin" className="nav-gradient">
                        Admin
                    </Link>
                </li>
            )}
            {user.name ? (
                <li>
                    <div className="text-white">{user.name}</div>
                    <button
                        onClick={() => logout()}
                        className="font-bold nav-gradient"
                    >
                        Logout
                    </button>
                </li>
            ) : (
                <li>
                    <Link
                        to="/login"
                        className="btn btn-ghost font-bold nav-gradient"
                    >
                        Login
                    </Link>
                </li>
            )}
        </ul>
    );
};
