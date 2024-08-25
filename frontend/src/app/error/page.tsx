// src/pages/error.tsx
import React from 'react';
import NavBar from "@/components/NavBar";

const ErrorPage: React.FC = () => {
    return (
        <div className="all-container">
            <NavBar />
            <div className="text-white">
                <h1>Error</h1>
                <p>Player data not found. Please try again later.</p>
            </div>
        </div>
    );
};

export default ErrorPage;
