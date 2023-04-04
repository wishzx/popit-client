import { Form, useNavigation } from "react-router-dom";
import api from "../../api/api";
import Loading from "../Loading";

export async function action({ request }) {
    const formData = await request.formData();
    let data = Object.fromEntries(formData);
    data.gender = "Male";
    let res = await api.post("/user", data);

    return res;
}

export default function Signup() {
    const navigation = useNavigation();
    return (
        <div className="hero min-h-screen bg-gradient-to-tr from-secondary to-primary">
            <div className="hero-content max-w-3xl flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-gray-100">
                        Register
                    </h1>
                    <p className="py-6 text-gray-100"></p>
                </div>
                <Form method="post" id="signin-form">
                    <div className="card  flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label for="firstname" className="label">
                                    <span className="label-text">
                                        First Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="first_name"
                                    required
                                    className="input input-bordered input-primary"
                                    autoComplete="given-name"
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="lastname" className="label">
                                    <span className="label-text">
                                        Last Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="last_name"
                                    required
                                    autoComplete="family-name"
                                    className="input input-bordered input-primary"
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="instagram" className="label">
                                    <span className="label-text">
                                        Instagram name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    id="instagram"
                                    name="instagram_uname"
                                    required
                                    className="input input-bordered input-primary"
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="login_email" className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
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
                                    autoComplete="new-password"
                                    className="input input-bordered input-primary"
                                />
                            </div>
                            <div className="form-control">
                                <label
                                    htmlFor="confirm-password"
                                    className="label"
                                >
                                    <span className="label-text">
                                        Confirm password
                                    </span>
                                </label>
                                <input
                                    id="confirm-password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="input input-bordered input-primary"
                                />
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary input-primary">
                                    {navigation.state === "idle" ? (
                                        "Signin"
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
