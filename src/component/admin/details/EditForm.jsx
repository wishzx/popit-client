export default function EditForm(props) {
    return (
        <div className="card bg-acccent lg:m-32">
            <div className="card-body">
                <div className="card-title">
                    id {challenge.id}{" "}
                    {navigation.state === "loading" && <Loading />}
                </div>
                <div className="font-extralight">
                    created {new Date(challenge.createdAt).toDateString()}
                </div>
                <Form id="challenge-form">
                    <div>
                        <label htmlFor="name">
                            <span>Name</span>
                            <input
                                id="name"
                                type="text"
                                placeholder="name"
                                className="input input-bordered w-full max-w-xs"
                                value={challenge.name}
                            />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="tags">
                            <span>Tags</span>
                            <input
                                id="tags"
                                type="text"
                                placeholder="tags"
                                value={challenge.tags}
                                className="input input-bordered w-full max-w-xs"
                            />
                        </label>
                    </div>
                    <p className="card-actions justify-end pt-3">
                        <button className="btn btn-success" type="submit">
                            Save
                        </button>
                        <button className="btn btn-error" type="button">
                            Delete
                        </button>
                    </p>
                </Form>
            </div>
        </div>
    );
}
