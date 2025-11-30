import React, { useContext } from 'react';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ListingDataContext } from '../src/Context/ListingContext';


function ListingPage3() { 
    let navigate = useNavigate()
    let{title,setTitle,
            description,setDescription,
            frontEndImage1, setFrontEndImage1,
            frontEndImage2, setFrontEndImage2,
            frontEndImage3, setFrontEndImage3,
            backEndImage1, setBackEndImage1,
            backEndImage2, setBackEndImage2,
            backEndImage3, setBackEndImage3,
            rent, setRent,
            city, setCity,
            landmark, setLandmark,
            category, setCategory,
            handleAddListing,
            adding,setAdding
        } = useContext(ListingDataContext)
    return (
        <div className="w-[100%] h-[100vh] flex items-center justify-center flex-col bg-white gap-[10px] overflow-auto relative px-[12%]">
        <div className="w-[50px] h-[50px] bg-[#e63946] cursor-pointer absolute left-[20px] rounded-[50%] flex items-center justify-center md:top-[3%]" onClick={()=> navigate("/listingpage2")}>
                <FaLongArrowAltLeft className="w-[25px] h-[25px] text-[white] " />
        </div>

        <div className='w-[100%] flex items-start justify-start text-[25px] md:w-[80%] mt-[15%] md:mt-[15%]'>
            <h1 className='text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[60px] md:px-[opx]'>{`In ${landmark.toUpperCase()} , ${city.toUpperCase()}`}</h1>
        </div>

        <div className="w-[100%] h-[350px] flex items-center justify-center flex-col md:w-[80%] md:flex-row ">
            <div className='w-[100%] h-[70%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]'>
                <img src={frontEndImage1} className='w-[100%]'/>
            </div>
            <div className="w-[100%] h-[50%] flex items-center justify-center  md:w-[50%] md:h-[100%] md:flex-col ">
                <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]"><img src={frontEndImage2}  className='w-[100%]'/></div>
                <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-[white]"><img src={frontEndImage3} className='w-[100%]'/></div>
            </div>

        </div>
        <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">{`${title.toUpperCase()} ${category.toUpperCase()}, ${landmark.toUpperCase()}`}</div>

        <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">{`${description} `}</div>

        <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">{`Rs.${rent}/day`}</div>

        <div className="w-[95%] h-[50px] flex items-center justify-start px-[70px]"><button className="px-[50px] py-[10px] bg-[#e63946] mt-[25px] text-[white] text-[18px] md:px-[50px] rounded-lg text-nowrap" onClick={handleAddListing} disabled={adding}>{adding? "adding...":"Add Listing"}</button></div>

        </div>
    )
}

export default ListingPage3