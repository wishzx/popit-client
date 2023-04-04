import { useContext, useEffect } from "react";
import {
    Form,
    Link,
    redirect,
    useNavigation,
    useActionData,
    useNavigate,
} from "react-router-dom";
import api from "../../api/api";
import Loading from "../Loading";
import UserContext from "../UserContext";

export async function action({ request, params }) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);
    let res = await api.post("/signin", credentials);
    return res;
}

export default function Login() {
    const navigation = useNavigation();
    const navigate = useNavigate();
    const [_, setUser] = useContext(UserContext);
    const response = useActionData();

    useEffect(() => {
        if (response?.status == 200) {
            //TODO promote function to api.js return user type
            api.defaults.headers.common["Authorization"] =
                "Bearer " + response.data.token;
            const user = {
                name: response.data.name,
                isAdmin: response.data.isAdmin,
                likes: response.data.likes,
            };
            console.log(user);
            setUser(user);
            navigate("/");
        }
    }, [response]);

    return (
        <div className="hero min-h-screen bg-gradient-to-tr from-secondary to-primary">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-gray-100">
                        Login now!
                    </h1>
                    <p className="py-6 text-gray-100">
                        amatzkaitis0@wunderground.com for both email and
                        password for admin and lohanlon1@topsy.com for a regular
                        user
                    </p>
                </div>
                <Form method="post" id="login-form">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label htmlFor="login_email" className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    id="login_email"
                                    name="email"
                                    required
                                    autoComplete="username"
                                    className="input input-bordered input-primary"
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="password" className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                    className="input input-bordered input-primary"
                                />
                                <label className="label">
                                    <Link
                                        to="/signup"
                                        className="label-text-alt link link-hover"
                                    >
                                        Create account
                                    </Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary input-primary"
                                >
                                    {navigation.state == "idle" ? (
                                        "Login"
                                    ) : (
                                        <Loading />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}
