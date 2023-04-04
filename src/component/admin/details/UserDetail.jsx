import { useLoaderData, useNavigation, Form, redirect } from "react-router-dom";
import api from "../../../api/api";
import Loading from "../../Loading";

export async function loader({ params }) {
    const user = await api(`admin/user/${params.id}`);
    return user.data;
}

export default function UserDetail() {
    return (
        <div className="card bg-acccent lg:m-32">
            <div className="card-body">
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
