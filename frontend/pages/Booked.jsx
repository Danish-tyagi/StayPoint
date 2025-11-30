import React, { useContext, useState } from "react";
import { GiConfirmed } from "react-icons/gi"
import { bookingDataContext } from "../src/Context/BookingContext";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Star from "../src/assets/Component/Star";
import axios from "axios";
import UserContext, { userDataContext } from "../src/Context/UserContext";
import { authDataContext } from "../src/Context/AuthContext";
import { ListingDataContext } from "../src/Context/ListingContext";

function Booked() {
    let {bookingData} = useContext(bookingDataContext)
    let navigate = useNavigate()
    let [star,setStar] = useState(null)
    let {serverUrl} = useContext(authDataContext)
    let {getCurrentUser} = useContext(userDataContext)
    let {getListing} = useContext(ListingDataContext)
    let {cardDetails} = useContext(ListingDataContext)

    const handleRating = async(id) => {
        try {
            let result = await axios.post(serverUrl + `/api/listing/ratings/${id}`,  {ratings:star},{withCredentials:true})
            await getListing()
            await getCurrentUser()
            console.log(result)
            navigate("/")

        } catch (error) {
            console.log(error)
        }

    }



    const handleStar = async (value) => {
        setStar(value)
        console.log("you rated",value)

    }
    return (
        <div className="w-[100vw] min-h-[100vh] flex items-center justify-center gap-[10px] bg-slate-200 flex-col">
            <div className="w-[95%] max-w-[500px] h-[380px] bg-[white] flex items-center justify-center border-[1px] border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg mt-[60px]">
                <div className="w-[100%] -[50%] text-[20px] flex items-center justify-center flex-col gap-[20px] font-semibold"><GiConfirmed className="w-[100px] h-[100px] text-[green]"/>Booking Confirmed</div>
                <div className="w-[100%] flex items-center justify-between text-[16px] md:text-[18px]"><span>Booking Id :</span> <span>{bookingData._id}</span></div>

                <div className="w-[100%] flex items-center justify-between text-[16px] md:text-[18px]"><span>Owner Details :</span> <span>{bookingData.host?.email}</span></div>

                <div className="w-[100%] flex items-center justify-between text-[16px] md:text-[18px]"><span>Total Rent :</span> <span>{bookingData.totalRent}</span></div>
            </div>

            <div className="w-[95%] max-w-[600px] h-[150px] bg-[white] flex items-center justify-center border-[1px] border-[#b5b5b5] flex-col gap-[20px] p-[20px] md:w-[80%] rounded-lg"><h1 className="text-[19px]">{star} out of 5 Rating</h1>
            <Star onRate={handleStar}/>
            <button className="px-[30px] py-[10px] bg-[#e63946] text-[white] text-[18px] md:px[80px] rounded-lg text-nowrap" onClick={()=>handleRating(cardDetails._id)}>Submit</button>
            </div>

            <button className="px-[30px] py-[10px] bg-[#e63946] text-[white] text-[18px] md:px[100px] rounded-lg text-nowrap absolute top-[10px] right-[20px]" onClick={()=> navigate("/")}>Back to Home</button>
        </div>
    )
}

export default  Booked