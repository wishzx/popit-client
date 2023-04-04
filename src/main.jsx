import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login, { action as loginAction } from "./component/auth/Login";
import ErrorPage from "./component/ErrorPage";
import Feed, { loader as feedLoader } from "./component/Feed";
import Main from "./component/Main";
import Root from "./component/Root";
import { action as signupAction } from "./component/auth/Signup";
import "./index.css";

import Challenges, {
    loader as challengesLoader,
} from "./component/admin/Challenges";
import Contents, { loader as contentLoader } from "./component/admin/Contents";
import ChallengeDetail, {
    action as challengeDetailAction,
    loader as challengeDetailLoader,
} from "./component/admin/details/ChallengeDetail";
import ContentDetail, {
    loader as contentDetailLoader,
    action as contentDetailAction,
} from "./component/admin/details/ContentDetail";
import UserDetail, {
    loader as userDetailLoader,
} from "./component/admin/details/UserDetail";
import Users, { loader as usersLoader } from "./component/admin/Users";
import { action as deleteUserAction } from "./component/admin/details/deleteUserAction";

import { action as deleteChallengeAction } from "./component/admin/details/deleteChallengeAction";
import ChallengeNew, {
    action as challengeNew,
} from "./component/admin/details/new/ChallengeNew";
import ChallengePage, {
    loader as challengePageLoader,
} from "./component/challenge/ChallengePage";
import ChallengeUserDetail, {
    loader as loaderChallengeUserDetail,
    action as actionChallengeUserDetail,
} from "./component/challenge/ChallengeUserDetail";

const Signup = React.lazy(() => import("./component/auth/Signup"));

const AdminPage = React.lazy(() => import("./component/admin/AdminPage"));

const router = createBrowserRouter([
    {
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/login",
                element: <Login />,
                action: loginAction,
                errorElement: <ErrorPage />,
            },
            {
                path: "/signup",
                action: signupAction,
                element: <Signup />,
            },
            {
                element: <Main />,
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <Feed />,
                        loader: feedLoader,
                    },
                    {
                        path: "/challenges",
                        element: <ChallengePage />,
                        loader: challengePageLoader,
                        children: [
                            {
                                path: ":id",
                                element: <ChallengeUserDetail />,
                                loader: loaderChallengeUserDetail,
                                action: actionChallengeUserDetail,
                            },
                        ],
                    },
                    {
                        path: "/admin",
                        element: <AdminPage />,
                        children: [
                            {
                                path: "user",
                                loader: usersLoader,
                                element: <Users />,
                                children: [
                                    {
                                        path: ":id",
                                        element: <UserDetail />,
                                        errorElement: <ErrorPage />,
                                        children: [
                                            {
                                                path: "delete",
                                                action: deleteUserAction,
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                path: "content",
                                loader: contentLoader,
                                element: <Contents />,
                                children: [
                                    {
                                        path: ":id",
                                        element: <ContentDetail />,
                                        loader: contentDetailLoader,
                                        action: contentDetailAction,
                                        errorElement: <ErrorPage />,
                                        children: [
                                            {
                                                path: "delete",
                                                action: deleteChallengeAction,
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                path: "challenge",
                                loader: challengesLoader,
                                element: <Challenges />,
                                children: [
                                    {
                                        path: ":id",
                                        element: <ChallengeDetail />,
                                        loader: challengeDetailLoader,
                                        action: challengeDetailAction,
                                        errorElement: <ErrorPage />,
                                        children: [
                                            {
                                                path: "delete",
                                                action: deleteChallengeAction,
                                            },
                                        ],
                                    },
                                    {
                                        path: "new",
                                        element: <ChallengeNew />,
                                        action: challengeNew,
                                        errorElement: <ErrorPage />,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById("root")
);
