import React from "react";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

function Footer() {
    return(
        <div className="w-[100%] h-[200px] bg-gray-200 flex justify-center items-center flex-col gap-[12px]">
                <div className="flex gap-4">
                    <FaInstagramSquare className="text-[29px]"/>
                    <FaFacebookSquare className="text-[29px]"/>
                </div>
            <div className="text-[20px]">&copy; StayPoint Private Limited</div>
            <div className="text-[19px] text-[blue]">Terms   Privacy</div>
            </div>


    )
    
}

export default Footer