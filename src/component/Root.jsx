import React, { useState } from "react";
import { Outlet } from "react-router";
import UserContext from "./UserContext";

function Root() {
    const userContext = useState(() => {
        return { name: undefined, isAdmin: false, likes: [] };
    }); // return object even if it's empty so that it's easier to manage
    //TODO read/save this in a cookie with the same expiration of bearer token for saved login

    return (
        <React.StrictMode>
            <UserContext.Provider value={userContext}>
                <Outlet />
            </UserContext.Provider>
        </React.StrictMode>
    );
}

export default Root;
