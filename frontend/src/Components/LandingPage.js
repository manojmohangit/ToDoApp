import React from "react";
import Navbar from "./navbar";


function LandingPage() {
    return (
        <div>
            <Navbar/>
            <div className="text-center App">
                <h2>Welcome to To Do App</h2>
                <h5>App has been build using MERN Stack</h5>
            </div>
        </div>
    )
}

export default LandingPage;