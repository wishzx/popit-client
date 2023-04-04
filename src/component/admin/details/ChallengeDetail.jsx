import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useSubmit,
} from "react-router-dom";
import api from "../../../api/api";
import Loading from "../../Loading";

export async function loader({ params }) {
    const challenge = await api(`admin/challenge/${params.id}`);
    return challenge.data;
}

export async function action({ request, params }) {
    const formData = await request.formData();
    console.log(formData);
    const updates = Object.fromEntries(formData);
    console.log(updates);
    await api.put(`admin/challenge/${params.id}`, updates);
    return redirect(`/admin/challenge/${params.id}`);
}

export default function ChallengeDetail() {
    const challenge = useLoaderData();
    const submit = useSubmit();
    const navigation = useNavigation();
    return (
        <div className="card bg-acccent lg:m-32">
            <div className="card-body">
                <div className="card-title p-2">
                    id {challenge.id}{" "}
                    {navigation.state === "loading" && <Loading />}
                </div>
                <div className="font-extralight">
                    created {new Date(challenge.createdAt).toDateString()}
                </div>
                <Form id="challenge-form" method="PUT">
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
                                defaultValue={challenge.name}
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
                            defaultValue={challenge.tags}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <p className="card-actions justify-end pt-3">
                        <button className="btn btn-success" type="submit">
                            Save
                        </button>
                    </p>
                </Form>
                <span className="card-actions justify-end pt-2">
                    <Form
                        method="delete"
                        action="delete"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button className="btn btn-error" type="submit">
                            Delete
                        </button>
                    </Form>
                </span>
            </div>
        </div>
    );
}
