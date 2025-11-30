import React, { useContext } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { IoRestaurant } from "react-icons/io5";
import { MdPool } from "react-icons/md";
import { MdBedroomParent } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import { GiWoodCabin } from "react-icons/gi";
import { FaShop } from "react-icons/fa6";
import { ListingDataContext } from "../src/Context/ListingContext";

function ListingPage2() {
    let navigate = useNavigate()
    let {category, setCategory} = useContext(ListingDataContext)
    return (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-white relative overflow-auto relative">
        <div className="w-[50px] h-[50px] bg-[#e63946] cursor-pointer absolute top-[5%] left-[20px] rounded-[50%] flex items-center justify-center" onClick={()=> navigate("/listingpage1")}>
        <FaLongArrowAltLeft className="w-[25px] h-[25px] text-[white] " />
        </div>

        <div className="w-[200px] h-[50px] bg-[#e63946] text-[white] flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg" >
                Set Your Category
        </div>

        <div className="max-w-[900px] w-[100%] h-[450px] flex items-center justify-start flex-col gap-[40px] flex-wrap mt-[30px] overflow-auto bg-white ">

        <h1 className="text-[18px] text-[black] md:text-[30px] px-[10px] ">Which of these best describes your place?</h1>

        <div className="max-w-[900px] w-[100%] h-[1%] flex items-center justify-center gap-[15px] flex-wrap md:w-[70%]">

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "villa"?"border-[#8b8b8b] border-3": ""}`} onClick={()=> setCategory("villa")}> <HiMiniBuildingLibrary t className="w-[30px] h-[30px] text-black"/>
            <h3>Villa</h3></div>

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "restaurent"?"border-[#8b8b8b] border-3": ""}`} onClick={()=> setCategory("restaurent")}> <IoRestaurant className="w-[30px] h-[30px] text-black"/>
            <h3>Restaurant</h3></div>

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "poolHouse"?"border-[#8b8b8b] border-3": ""}`} onClick={()=> setCategory("poolHouse")}> <MdPool className="w-[30px] h-[30px] text-black"/>
            <h3>Pool House</h3></div>

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "rooms"?"border-[#8b8b8b] border-3": ""}`} onClick={()=> setCategory("rooms")}> <MdBedroomParent className="w-[30px] h-[30px] text-black"/>
            <h3>Rooms</h3></div>

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "flat"?"border-[#8b8b8b] border-3": ""}`} onClick={()=> setCategory("flat")}><BiBuildingHouse className="w-[30px] h-[30px] text-black"/>
            <h3>Flat</h3>
            </div>

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "pg"?"border-[#8b8b8b] border-3": ""}`} onClick={()=> setCategory("pg")}><IoBedOutline className="w-[30px] h-[30px] text-black"/>
            <h3>PG</h3></div>

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "cabins"?"border-[#8b8b8b] border-3": ""}`} onClick={()=> setCategory("cabins")}> <GiWoodCabin className="w-[30px] h-[30px] text-black"/>
            <h3>Cabins</h3></div>

            <div className={`w-[180px] h-[100px] flex items-center justify-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category == "shops"?"border-[#8b8b8b] border-3": ""}`} onClick={()=> setCategory("shops")}> <FaShop className="w-[30px] h-[30px] text-black"/>
            <h3>Shops</h3></div>


        </div>
        <button className="px-[50px] py-[10px] bg-[#e63946] mt-[25px] text-[white] text-[18px] md:px[80px] rounded-lg absolute right-[10%] bottom-[5%]" onClick={()=>navigate("/listingpage3")} disabled={!category}>Next</button>
        </div>


        </div>
    )
}

export default ListingPage2