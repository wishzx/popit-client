import { redirect, useLoaderData, useNavigation } from "react-router";
import { Form } from "react-router-dom";
import api from "../../../api/api";
import Loading from "../../Loading";

export async function loader({ params }) {
    const content = await api(`admin/content/${params.id}`);
    return content.data;
}

export async function action({ request, params }) {
    const formData = await request.formData();
    console.log(formData);
    const updates = Object.fromEntries(formData);
    console.log(updates);
    await api.put(`admin/content/${params.id}`, updates);
    return redirect(`/admin/content/${params.id}`);
}

export default function ContentDetail() {
    const content = useLoaderData();
    console.log(content);
    const navigation = useNavigation();

    return (
        <div className="card bg-acccent lg:m-32">
            <div className="card-body">
                <div className="card-title p-2">
                    id {content.id}{" "}
                    {navigation.state === "loading" && <Loading />}
                </div>
                <div className="font-extralight">
                    created {new Date(content.createdAt).toDateString()}
                </div>
                <Form id="content-form" method="PUT">
                    <div>
                        <label htmlFor="image_url">
                            <span className="label-text">Image</span>
                            <input
                                id="image_url"
                                type="text"
                                name="image_url"
                                key={navigation.state}
                                placeholder="image_url"
                                className="input input-bordered w-full max-w-xs"
                                defaultValue={content.image_url}
                            />
                        </label>
                    </div>
                    <div>
                        <label className="label-text" htmlFor="likes">
                            <span>Likes</span>
                        </label>
                        <input
                            disabled={true}
                            id="likes"
                            type="text"
                            key={navigation.state}
                            placeholder="likes"
                            defaultValue={content.likes}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div>
                        <label className="label-text" htmlFor="challenge_id">
                            <span>Challenge</span>
                        </label>
                        <input
                            id="challenge_id"
                            type="text"
                            name="challenge_id"
                            key={navigation.state}
                            placeholder="challenge_id"
                            defaultValue={content.challenge_id}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </div>
                    <div className="mt-5">
                        <label  htmlFor="user_id">
                            <span >User</span>
                        </label>
                        <input
                            id="user_id"
                            type="text"
                            name="user_id"
                            key={navigation.state}
                            placeholder="user_id"
                            defaultValue={content.user_id}
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

//{ id: "1", createdAt: "2023-04-03T15:54:18.423Z", updatedAt: "2023-04-03T15:54:18.423Z", image_url: "http://dummyimage.com/500x500.png/dddddd/000000", likes: 72, challenge_id: "3", user_id: "54" }
