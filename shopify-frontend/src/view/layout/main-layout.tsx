import React from 'react';
import {RouterManager} from "../../routes";

export default function MainLayout (){
    return (
        <div className="p-5 min-h-full bg-white px-20">
            <RouterManager />
        </div>
    );
}
