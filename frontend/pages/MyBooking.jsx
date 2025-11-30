import React, { useContext } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UseContext, { userDataContext } from "../src/Context/UserContext";
import Card from "../src/assets/Component/Card";


function MyBooking() {
    let navigate = useNavigate()
    let { userData } = useContext(userDataContext)
    return (
        <div className="w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative">
            <div className="w-[50px] h-[50px] bg-[#e63946] curser-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center" onClick={()=> navigate("/")}>
            <FaLongArrowAltLeft className="w-[25px] h-[25px] text-[white] " />
            </div>
            <div className="w-[50%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center  text-[30px] rounded-md text-[#613b3b] font-semibold mt-[50px] md:w-[600px] text-nowrap">MY BOOKING</div>
            <div className="w-[100%] h-[98%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]">
                {userData.listing.map((list)=> (
                    <Card title={list.title} landmark={list.landmark} city={list.city} image1={list.image1} image2={list.image2} image3={list.image3} rent={list.rent} id={list._id}  ratings={list.ratings} isBooked={list.isBooked} host={list.host}/>
                ))}
            </div>

        </div>
    )
}

export default MyBooking