import React, { useContext, useEffect, useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ListingDataContext } from "../src/Context/ListingContext";
import { userDataContext } from "../src/Context/UserContext";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { authDataContext } from "../src/Context/AuthContext";
import { FaStar } from "react-icons/fa";
import { bookingDataContext } from "../src/Context/BookingContext";
import { toast } from "react-toastify";
function ViewCard() {
    let navigate = useNavigate()
    let {cardDetails} = useContext(ListingDataContext)
    let {userData} = useContext(userDataContext)
    let [updatePopUp, setUpdatePopUp] = useState(false)
    let [bookingPopUp, setBookingPopUp] = useState(false)
    let [title, setTitle] = useState(cardDetails.title);
    let [description, setDescription] = useState(cardDetails.description);
    let [backEndImage1, setBackEndImage1] = useState(null);
    let [backEndImage2, setBackEndImage2] = useState(null);
    let [backEndImage3, setBackEndImage3] = useState(null);
    let [rent, setRent] = useState(cardDetails.rent);
    let [city, setCity] = useState(cardDetails.city);
    let [landmark, setLandmark] = useState(cardDetails.landmark);
    let {serverUrl} = useContext(authDataContext)
    let {updating, setUpdating} = useContext(ListingDataContext)
    let {deleting, setDeleting} = useContext(ListingDataContext)
    let [minDate,setMinDate] = useState("")
    let {
        checkIn, setCheckIn,
        checkOut, setCheckOut,
        total, setTotal,
        night, setNight,handleBooking,booking, setBooking }= useContext(bookingDataContext)

        useEffect(() => {
    if (checkIn && checkOut && cardDetails.rent) {
        let inDate = new Date(checkIn);
        let OutDate = new Date(checkOut);
        
        let timeDiff = OutDate.getTime() - inDate.getTime();
        let n = Math.round(timeDiff / (24 * 60 * 60 * 1000)); 

        if (n > 0) {
            setNight(n);
            
            let baseRent = cardDetails.rent * n;
            let stayPointCharge = baseRent * 0.07; 
            let tax = baseRent * 0.07; 

            let finalTotal = baseRent + stayPointCharge + tax;
            setTotal(parseFloat(finalTotal.toFixed(2))); 
        } else {
            setNight(0);
            setTotal(0);
        }
    } else {
        setNight(0);
        setTotal(0);
    }
    
}, [checkIn, checkOut, cardDetails.rent]);

    const handleUpdateListing = async ()=> {
        setUpdating(true)
        try {
        let formData = new FormData();
        formData.append("title", title);
        if(backEndImage1){formData.append("image1", backEndImage1)}
        if(backEndImage2){formData.append("image2", backEndImage2)}
        if(backEndImage3){formData.append("image3", backEndImage3)}
        formData.append("description", description);
        formData.append("rent", rent);
        formData.append("city", city);
        formData.append("landmark", landmark);

        let result = await axios.post(
        serverUrl + `/api/listing/update/${cardDetails._id}`,
        formData,
        { withCredentials: true }
        );
        setUpdating(false)
        console.log(result)

        navigate("/");
        toast.success("Listing Updated")
        setTitle("");
        setDescription("");
        setBackEndImage1(null);
        setBackEndImage2(null);
        setBackEndImage3(null);
        setRent("");
        setCity("");
        setLandmark("");
    } catch (error) {
        setUpdating(false)
        console.log(error);
        toast.error(error.response.data.message)
    }
  };
    const handleDeleteListing =async() => {
        setDeleting(true)
        try{
            let result = await axios.delete(
        serverUrl + `/api/listing/delete/${cardDetails._id}`,
        { withCredentials: true }
        )
        console.log(result.data)
        navigate("/")
        toast.success("listing Deleted")
        setDeleting(false)
        } catch (error) {
            console.log(error)
            setDeleting(false)
            toast.error(error.response.data.message)
        }
    }

    const handleImage1 =  (e)=> {
            let file = e.target.files[0]
            setBackEndImage1(file)
        }

        const handleImage2 =  (e)=> {
            let file = e.target.files[0]
            setBackEndImage2(file)
        }

        const handleImage3 =  (e)=> {
            let file = e.target.files[0]
            setBackEndImage3(file)
        }

        useEffect(()=>{
            let today=new Date().toISOString().split("T")[0]
            setMinDate(today)

        },[])
    return (
        <div className="w-full h-[100vh] flex items-center justify-center flex-col bg-white gap-[10px] overflow-auto relative px-[12%]">
                <div className="w-[50px] h-[50px] bg-[#e63946] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center" onClick={()=> navigate("/")}>
                        <FaLongArrowAltLeft className="w-[25px] h-[25px] text-[white] " />
                </div>
        
                <div className='w-[100%] flex items-start justify-start text-[25px] md:w-[80%] mt-[15%] '>
                    <h1 className='text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[40px] md:px-[opx]'>{`In ${cardDetails.landmark.toUpperCase()} , ${cardDetails.city.toUpperCase()}`}</h1>
                </div>
        
                <div className="w-[100%] h-[350px] flex items-center justify-center flex-col md:w-[80%] md:flex-row">
                    <div className='w-[100%] h-[70%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]'>
                        <img src={cardDetails.image1} className='w-[100%]'/>
                    </div>
                    <div className="w-[100%] h-[50%] flex items-center justify-center  md:w-[50%] md:h-[100%] md:flex-col ">
                        <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]"><img src={cardDetails.image2}  className='w-[100%]'/></div>
                        <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]"><img src={cardDetails.image3} className='w-[100%]'/></div>
                    </div>
        
                </div>
                <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">{`${cardDetails.title.toUpperCase()} ${cardDetails.category.toUpperCase()}, ${cardDetails.landmark.toUpperCase()}`}</div>
        
                <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">{`${cardDetails.description } `}</div>
        
                <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">{`Rs.${cardDetails.rent}/day`}</div>
        
                
                    <div className="w-[95%] h-[50px] flex items-center justify-start px-[7%] gap-[15px] mb-[5%]">{cardDetails.host == userData._id &&<button className="px-[30px] py-[10px] bg-[#e63946] mt-[25px] text-[white] text-[18px] md:px-[50px] rounded-lg text-nowrap" onClick={()=>setUpdatePopUp(prev=> !prev)}>Edit Listing</button>}

                    {cardDetails.host != userData._id &&<button className="px-[30px] py-[10px] bg-[#e63946] mt-[25px] text-[white] text-[18px] md:px-[50px] rounded-lg" onClick={()=>setBookingPopUp(prev=> !prev)}>Booking</button>}
                </div>

                {/* update ListingPage */}

                {updatePopUp && <div className="fixed inset-0 flex items-center justify-center bg-[#000000aa] backdrop-blur-sm z-[100] pt-[50px]">

                    <RxCross2 className="text-[white] w-[30px] h-[30px] bg-[#e63946] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center" onClick={()=>setUpdatePopUp(false)}/>

                        <form action=""  className="max-w-[900px] w-[90%] max-h-[80vh] overflow-y-auto
                        flex items-center justify-start flex-col md:items-start gap[10px] overflow-auto text-[white] bg-[#272727] p-[20px]" onSubmit={(e)=>{e.preventDefault()}} >
                        
                        
                                    <div className="w-[200px] h-[50px] bg-[#e63946] text-[white] flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg" >
                                        Update Your Details
                                    </div>
                                    <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                                    <label htmlFor="title" className="text-[20px]">Title</label>
                                    <input type="text" id="title" className="w-[90%] h-[40px] border-[2px] border-[gray] rounded-lg text-[18px] px-[20px] text-[black]" required placeholder="__bhk house" onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
                                    </div>
                        
                                    <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                                    <label htmlFor="description" className="text-[20px]">Description</label>
                                    <textarea id="description" className="w-[90%] h-[80px] border-[2px] border-[gray] rounded-lg text-[18px] px-[20px] text-[black]" required onChange={(e)=>{setDescription(e.target.value)}} value={description} ></textarea>
                                    </div>
                        
                                    <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
                                    <label htmlFor="img1" className="text-[20px]">Image1</label>
                                    <div className="w-[90%] flex items-start justify-start h-[40px] border-[#555656] border-2 rounded-[10px] overflow-auto">
                                        <input type="file" id="img1" className="w-[100%] rounded-lg text-[15px] px-[10px] pt-[4px] text-[black]" required onChange={handleImage1}/>
                                    </div>
                                    </div>
                        
                                    <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] ">
                                    <label htmlFor="img2" className="text-[20px]">Image2</label>
                                    <div className="w-[90%] flex items-start justify-start h-[40px] border-[#555656] border-2 rounded-[10px]">
                                        <input type="file" id="img2" className="w-[100%] rounded-lg text-[15px] px-[10px] pt-[4px] text-[black]" required  onChange={handleImage2} />
                                    </div>
                                    </div>
                        
                                    <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                                    <label htmlFor="img3" className="text-[20px]">Image3</label>
                                    <div className="w-[90%] flex items-start justify-start h-[40px] border-[#555656] border-2 rounded-[10px]">
                                        <input type="file" id="img3" className="w-[100%] rounded-lg text-[15px] px-[10px] pt-[4px] text-[black]" required onChange={handleImage3}/>
                                    </div>
                                    </div>
                        
                                    <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                                    <label htmlFor="rent" className="text-[20px]">Rent</label>
                                    <input type="number" id="rent" className="w-[90%] h-[40px] border-[2px] border-[gray] rounded-lg text-[18px] px-[20px] text-[black]" required placeholder="Rs.______/day" onChange={(e)=>{setRent(e.target.value)}} value={rent}/>
                                    </div>
                        
                                    <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                                    <label htmlFor="city" className="text-[20px]">City</label>
                                    <input type="text" id="city" className="w-[90%] h-[40px] border-[2px] border-[gray] rounded-lg text-[18px] px-[20px] text-[black]" required placeholder="city, country" onChange={(e)=>{setCity(e.target.value)}} value={city}/>
                                    </div>
                        
                                    <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                                    <label htmlFor="landmark" className="text-[20px]">Landmark</label>
                                    <input type="text" id="landmark" className="w-[90%] h-[40px] border-[2px] border-[gray] rounded-lg text-[18px] px-[20px] text-[black]" required onChange={(e)=>{setLandmark(e.target.value)}} value={landmark} />
                                    </div>

                                    <div className="w-[100%] flex flex-col md:flex-row gap-[20px]">
                                    <button className="px-[20px] py-[10px] bg-[#e63946] mt-[25px] text-[white] text-[15px] md:px[60px] rounded-lg md:text-[18px] text-nowrap" onClick={handleUpdateListing} disabled={updating}>{updating?"updating...":"Update Listing"}</button>

                                    <button className="px-[20px] py-[10px] bg-[#e63946] mt-[25px] text-[white] text-[15px] md:px[60px] rounded-lg md:text-[18px] text-nowrap" onClick={handleDeleteListing} disabled={deleting}>{deleting?"deleting...":"Delete Listing"}</button>
                                    </div>  
                                    </form>
                    </div>}

                    {bookingPopUp && <div className="fixed inset-0 flex flex-col md:flex-row items-center justify-center bg-[#000000aa] backdrop-blur-sm z-[100] pt-[50px]">

                        <RxCross2 className="text-[white] w-[30px] h-[30px] bg-[#e63946] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center" onClick={()=>setBookingPopUp(false)}/>
                            <div className="">

                            </div>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-[20px] w-full ">
                            <form action="" className="max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f7fbfcfe] p-[20px] rounded-lg flex items-center justify-center flex-col gap-[10px] border-[1px] border-[#dedddd]" onSubmit={(e)=>{e.preventDefault()}}>
                                <h1 className="w-[100%] flex items-center justify-center py-[10px] text-[25px] border-b-[1px] border-[#a3a3a3]">Confirm & Book</h1>
                                <div className="w-[100%] h-[70%] mt-[10px] rounded-lg p-[10px]">
                                    <h3 className="text-[19px] font-semibold ">Your Trip -</h3>
                                    <div className="w-[90%] flex items-center justify-start gap-[20px] md:items-center md:justify-center  flex-col md:flex-row md:items-start md:mt-[30px]">
                                        <label htmlFor="checkin" className="text-[18px] md:text-[20px] ">CheckIn</label>
                                        <input type="date" id="checkin" min={minDate} className="border-[#555656] border-2 w-[200px] h-[40px] text-[15px] md:text-[18px] rounded-lg px-[7px]" required onChange={(e) =>setCheckIn(e.target.value)} value={checkIn}/>
                                    </div>

                                    <div className="w-[90%] flex items-center justify-start gap-[10px] md:items-center md:justify-center  flex-col md:flex-row md:items-start md:mt-[40px]">
                                        <label htmlFor="checkout" className="text-[18px] md:text-[20px] ">CheckOut</label>
                                        <input type="date" id="checkout" min={minDate} className="border-[#555656] border-2 w-[200px] h-[40px] text-[15px] md:text-[18px] rounded-lg px-[7px]" required onChange={(e) =>setCheckOut(e.target.value)} value={checkOut}/>
                                    </div>
                                    <div className="w-[100%] flex flex-col md:flex-row gap-[20px] md:pl-[135px]">
                                    <button className="px-[15px] py-[9px] bg-[#e63946] mt-[25px] text-[white] text-[15px] md:px[90px] rounded-lg md:text-[18px] text-nowrap "type="button" onClick={()=>handleBooking(cardDetails._id) }  disabled={booking}>{booking?"booking...":"Book Now"}</button>
                                    </div>

                                </div>
                                
                            </form>

                            <div className="max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f7fbfcfe] p-[20px] rounded-lg flex items-center justify-center flex-col gap-[10px] border-[1px] border-[#9b9a9a] "> 
                                <div className="w-[95%] h-[30%] border-[1px] border-[#9b9a9a] rounded-lg flex justify-center items-center gap-[8px] p-[20px] overflow-hidden">
                                    <div className="w-[70px] h-[90px] flex items-center justify-center flex-shrink-0 rounded-lg md:w-[100px] "><img src={cardDetails.image1} alt="" className="w-[100%] h-[100%] rounded-lg " />
                                    </div>
                                    <div className="w-[80%] h-[100px] gap-[5px] ">
                                        <h1 className="w-[90%] truncate">{`IN ${cardDetails.landmark.toUpperCase()},${cardDetails.city.toUpperCase()}`}</h1>
                                        <h1 className="flex items-start justify-start">{cardDetails.title.toUpperCase()}</h1>
                                        <h1 className="flex items-start justify-start">{cardDetails.category.toUpperCase()}</h1>
                                        <h1 className="flex items-start justify-start gap-[5px]"><FaStar className="text-[#e63946] mt-[3.5px]"/>{cardDetails.ratings}</h1>
                                    </div>


                                </div>
                                <div className="w-[95%] h-[60%] border-[1px] border-[#9b9a9a] rounded-lg flex justify-start items-start p-[20px] gap-[15px] flex-col">
                                    <h1 className="text-[22px] font-semibold text-nowrap">Booking Price - </h1>
                                    <p className="w-[100%] flex justify-between items-center px-[20px]">
                                        <span className="font-semibold">&#8377;{`${cardDetails.rent} X ${night} nights`}</span>
                                        <span>{cardDetails.rent*night}</span>
                                    </p>

                                    <p className="w-[100%] flex justify-between items-center px-[20px]">
                                        <span className="font-semibold">Tax /night</span>
                                        <span>{cardDetails.rent*7/100}</span>
                                    </p>

                                    <p className="w-[100%] flex justify-between items-center px-[20px] border-b-[1px] border-gray-500 pb-[10px]">
                                        <span className="font-semibold">StayPoint Charge /night</span>
                                        <span>{cardDetails.rent*7/100}</span>
                                    </p>

                                    <p className="w-[100%] flex justify-between items-center px-[20px]">
                                        <span className="font-semibold">Total Price</span>
                                        <span>{total}</span>
                                    </p>

                                </div>
                            </div>
                            </div>

                        </div>}
        
                </div>
    )
}
export default ViewCard