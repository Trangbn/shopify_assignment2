import React from 'react';
import {authStorage} from "../../storage/auth-storage";

export default function Footer() {
    const handleLogout = () => {
        authStorage.reset();
        window.location.reload()
    }
    return (
        <div className="w-full flex items-end">
            <button className="uppercase mt-5 border px-3 bg-pink-200" onClick={handleLogout}>
                Sign out
            </button>
        </div>
    );
}
