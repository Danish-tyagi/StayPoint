import React, {createContext, useContext, useState } from "react";
import { authDataContext } from "./AuthContext";
import { userDataContext } from "./UserContext";
import { ListingDataContext } from "./ListingContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const bookingDataContext = createContext();

function BookingContext({children}) {
    let [checkIn, setCheckIn] = useState("")
    let [checkOut, setCheckOut] = useState("")
    let [total, setTotal] = useState(0)
    let [night, setNight] = useState(0)
    let {serverUrl} = useContext(authDataContext)
    let {getCurrentUser} = useContext(userDataContext)
    let {getListing} = useContext(ListingDataContext)
    let [bookingData, setBookingData] = useState([])
    let [booking, setBooking] = useState(false)
    let navigate = useNavigate()

    const handleBooking = async (id) => {
        setBooking(true)
        if (!checkIn || !checkOut) {
            alert("Please select dates");
            return;
        }
        try {
            let result = await axios.post( serverUrl + `/api/booking/create/${id}`,
                {
                    checkIn,checkOut,totalRent:total
                },{withCredentials:true}
            )
            await getCurrentUser()
            await getListing()
            setBookingData(result.data)
            console.log(result.data)
            setBooking(false)
            navigate("/booked")
            toast.success("Booking Successful")
                
        } catch (error) {
            console.log(error)
            setBookingData(null)
            toast.error(error.response.data.message)
            
        }
    }

    const cancelBooking = async(id) => {
        try {
            let result = await axios.delete( serverUrl + `/api/booking/cancel/${id}`
                ,{withCredentials:true}
            )
            await getCurrentUser()
            await getListing()
            console.log(result.data)
            toast.success("Cancel Booking Successful")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    let value = {
        checkIn, setCheckIn,
        checkOut, setCheckOut,
        total, setTotal,
        night, setNight,
        bookingData, setBookingData,
        handleBooking,
        cancelBooking,
        booking, setBooking

    }

    return(
        <div className="">
            <bookingDataContext.Provider value={value} >
                {children}
            </bookingDataContext.Provider>

        </div>
    )
}

export default BookingContext

// import React, { createContext, useState } from "react";
// import axios from "axios";

// export const bookingDataContext = createContext();

// function BookingContext({ children }) {
    
//     const [checkIn, setCheckIn] = useState("");
//     const [checkOut, setCheckOut] = useState("");
//     const [night, setNight] = useState(0);
//     const [total, setTotal] = useState(0);

//     // BOOKING API
//     const handleBooking = async (listingId) => {
//         if (!checkIn || !checkOut) {
//             alert("Please select dates");
//             return;
//         }

//         try {
//             const result = await axios.post(
//                 `http://localhost:8080/api/booking/create/${listingId}`,
//                 {
//                     checkIn,
//                     checkOut,
//                     totalRent: total
//                 },
//                 { withCredentials: true }
//             );

//             alert("Booking Successful!");

//             // Reset states
//             setCheckIn("");
//             setCheckOut("");
//             setNight(0);
//             setTotal(0);

//         } catch (err) {
//             console.log(err);
//             alert(err.response?.data?.message || "Booking Error");
//         }
//     };

//     const value = {
//         checkIn, setCheckIn,
//         checkOut, setCheckOut,
//         night, setNight,
//         total, setTotal,
//         handleBooking
//     };

//     return (
//         <bookingDataContext.Provider value={value}>
//             {children}
//         </bookingDataContext.Provider>
//     );
// }

// export default BookingContext;
