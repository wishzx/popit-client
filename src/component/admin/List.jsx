import { Link } from "react-router-dom";

export default function List({ name, list, listElementName }) {
    return (
        <ul className="menu menu-compact hover-bordered lg:menu-normal ">
            <li className="menu-title">
                <span>actions</span>
            </li>
            <li className="text-3xl">
                <Link to="new">CREATE </Link>
            </li>
            <li className="menu-title">
                <span>{name}</span>
            </li>
            <div className="overflow-y-auto h-screen">
                {list.length &&
                    list.map((e) => {
                        return (
                            <li key={e.id}>
                                <Link to={`${e.id}`}>{e[listElementName]}</Link>
                            </li>
                        );
                    })}
            </div>
        </ul>
    );
}
