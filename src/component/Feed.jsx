import { useLoaderData, useNavigation } from "react-router-dom";
import { deleteLike, getContents, postLike } from "../api/fetch";
import Card from "./Card";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useContext, useMemo, useState } from "react";
import UserContext from "./UserContext";

export async function loader() {
    const contents = await getContents();
    return { contents };
}

export default function Feed() {
    const { contents } = useLoaderData();
    const [user, setUser] = useContext(UserContext);
    const likes = useMemo(() => {
        return new Set(user.likes || []);
    }, [user]);
    const navigation = useNavigation();

    return (
        <>
            {navigation.state === "submitting" ? (
                <Loading />
            ) : (
                <div className="grid place-items-center py-10 gap-10 bg-base-content">
                    {contents.map((content) => (
                        <FeedCard
                            key={content.id}
                            content={content}
                            initiallyLiked={likes.has(content.id)}
                            logged={user.name !== undefined}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
//{id, createdAt, updatedAt, image_url, likes, challenge_id, user_id})
function FeedCard({ content, initiallyLiked, logged }) {
    const [liked, setLiked] = useState(() => initiallyLiked);
    const [totalLikes, setTotalLikes] = useState(() => content.likes);

    const toggleLike = async () => {
        if (!logged) {
            alert("please log in to vote");
            return;
        }
        //optimistic ui update
        !liked && setTotalLikes(totalLikes + 1);
        liked && setTotalLikes(totalLikes - 1);

        setLiked(!liked);
        if (!liked) {
        }

        if (!liked) {
            setLiked(await postLike(content.id));
        } else {
            setLiked(!(await deleteLike(content.id)));
        }
    };

    return (
        <div className="card w-96  sm:w-1/2 bg-base-200 shadow-xl">
            <figure>
                <LazyLoadImage
                    src={content.image_url}
                    alt=""
                    height={500}
                    width={500}
                />
            </figure>
            <div className="card-body bg-base-300">
                <h2 className="card-title">
                    {content.challenge.name}
                    <span className="badge badge-outline">
                        {content.challenge.tags}
                    </span>
                </h2>
                <i className="font-light">by {content.user.instagram_uname}</i>
                <button
                    onClick={() => toggleLike()}
                    className="card-actions text-2xl justify-end"
                >
                    <div className="text-primary">{liked ? "★" : "☆"}</div>
                    <div>{totalLikes}</div>
                </button>
            </div>
        </div>
    );
}

/* 
interface FeedApi {
    image_url: string;
    likes: number;
    id: string;
    challenge: { tags: string; name: string };
    user: { instagram_uname: string };
} */
