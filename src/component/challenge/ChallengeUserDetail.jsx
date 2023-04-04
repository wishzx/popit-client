import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useSubmit,
} from "react-router-dom";
import api from "../../api/api";

export async function loader({ params }) {
    const challenge = await api(`/challengeUser/${params.id}`);

    return challenge.data[0];
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const image = Object.fromEntries(formData);

    await api.post(`content/${params.id}`, image);
    return redirect(`/challenge/${params.id}`);
}

export default function ChallengeUserDetail() {
    const challenge = useLoaderData();
    const navigation = useNavigation();
    console.log(challenge);
    return (
        <div className="card bg-acccent lg:m-32">
            <div className="card-body">
                <div className="card-title p-2">
                    {challenge.name}{" "}
                    <span className="badge badge-outline">
                        {challenge.tags}
                    </span>
                </div>
                <div> top score : {challenge.maxLike} </div>
                {challenge.content.length > 0 ? (
                    <>
                        <h1>your best : {challenge.content[0].likes} likes</h1>{" "}
                        <img src={challenge.content[0].image_url} />
                    </>
                ) : (
                    <div className="pt-52">
                        no entries for this challenge yet
                    </div>
                )}

                <div className="card-actions pt-10 ">
                    <Form id="user-challenge-form" method="POST">
                        <label className="label" htmlFor="image">
                            {" "}
                            <span className="label-text">Upload an image</span>
                        </label>
                        <input
                            type="text"
                            name="image_url"
                            placeholder="image url"
                            className="input input-bordered input-secondary  max-w-xs"
                        />

                        <button type="submit" className="btn m-auto ml-5">
                            Upload
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
}
