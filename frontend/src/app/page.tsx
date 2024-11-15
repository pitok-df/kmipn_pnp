import { Metadata } from "next";
import Countdown from "./components/molecules/countDown";
import NavbarHome from "./components/molecules/navbar";

export const metadata: Metadata = {
    title: 'Home Page KMIPN 2025',
    description: "KMIPN 2025 POLITEKNIK NEGERI PADANG"
};

export default function LandingPage() {
    return (
        <>
            <NavbarHome />
            <div className="p-4 mt-16">
                <Countdown />
            </div>
        </>
    );
}