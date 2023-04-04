import { useContext, useEffect } from "react";
import {
    Outlet,
    useLoaderData,
    useNavigate,
    useNavigation,
} from "react-router";
import { Link } from "react-router-dom";
import api from "../../api/api";
import UserContext from "../UserContext";

export async function loader() {
    const challenges = await api("/challenge");
    return challenges.data;
}

export default function ChallengePage() {
    const challenges = useLoaderData();
    const [user, _] = useContext(UserContext);
    const navigation = useNavigation();
    const navigate = useNavigate();
    console.log(challenges);
    useEffect(() => {
        if (!user.name) {
            //navigate("/");
        }
    }, [user]);

    return (
        <div className="flex min-h-screen bg-base-100 w-full">
            <div className="bg-base-300 ">
                <div className="flex min-h-screen flex-row">
                    <div className="bg-base-200">
                        <ul className="menu menu-compact hover-bordered lg:menu-normal  w-auto ">
                            <li className="menu-title">
                                <span>Challenges</span>
                            </li>
                            {challenges.length &&
                                challenges.map((e) => {
                                    return (
                                        <li key={e.id}>
                                            <Link to={`${e.id}`}>{e.name}</Link>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

/*
[
  {
    "id": "1",
    "createdAt": "2023-04-03T15:54:18.415Z",
    "name": "Maroono",
    "tags": "Travel",
    "content": [
      {
        "image_url": "http://dummyimage.com/500x500.png/ff4444/ffffff",
        "likes": 9
      }
    ]
  }
]
*/
