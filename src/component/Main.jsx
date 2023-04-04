import { Suspense } from "react";
import { Outlet } from "react-router";
import Footer from "./Footer";
import Loading from "./Loading";
import NavBar from "./NavBar";

export default function Main() {
    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-base-300">
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </div>
            <Footer />
        </>
    );
}
