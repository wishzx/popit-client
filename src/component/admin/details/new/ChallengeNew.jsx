import { useNavigation, Form, redirect } from "react-router-dom";
import api from "../../../../api/api";
import Loading from "../../../Loading";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const resp = await api.post(`admin/challenge/`, updates);
    return redirect(`/admin/challenge/${resp.data.id}`);
}

export default function ChallengeNew() {
    const navigation = useNavigation();
    return (
        <div className="card bg-acccent lg:m-32">
            <div className="card-body">
                <div className="card-title p-2">
                    New
                    {navigation.state === "loading" && <Loading />}
                </div>

                <Form id="challenge-form" method="POST">
                    <div>
                        <label htmlFor="name">
                            <span>Name</span>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                key={navigation.state}
                                placeholder="name"
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="tags">
                            <span>Tags</span>
                        </label>
                        <input
                            id="tags"
                            type="text"
                            name="tags"
                            key={navigation.state}
                            placeholder="tags"
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <p className="card-actions justify-end pt-3">
                        <button className="btn btn-success" type="submit">
                            {navigation.state === "submitting" ? (
                                <Loading />
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </p>
                </Form>
            </div>
        </div>
    );
}
