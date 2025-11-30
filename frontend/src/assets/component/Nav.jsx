import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import { GiWoodCabin } from "react-icons/gi";
import { IoBedOutline } from "react-icons/io5";
import { BiBuildingHouse } from "react-icons/bi";
import { MdBedroomParent } from "react-icons/md";
import { MdPool } from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authDataContext } from "../../Context/AuthContext";
import axios from 'axios';
import { userDataContext } from "../../Context/UserContext";
import { ListingDataContext } from "../../Context/ListingContext";
import { GrSearch } from "react-icons/gr";


function Nav() {
    let [showpopup, setShowpopup] = useState(false)
    let{userData, setUserData} = useContext(userDataContext)
    let navigate = useNavigate()
    let {serverUrl} = useContext(authDataContext)
    let [category,setCategory] = useState()
    let {listingData, setListingData, setNewListingData, newListingData,searchData,handleSearch,handleViewCard} = useContext(ListingDataContext)
    let [input, setInput]= useState("")

    const handleLogOut = async () => {
        try{
            let result = await axios.post(serverUrl + "/api/auth/logout", {withCredentials:true})
            setUserData(null)
            console.log(result)
        }catch (error) {
            console.log(error)

        }

    }
    const handleCategory = (category)=>{
        setCategory(category)
        if(category=="trending"){
            setNewListingData(listingData)
        }else{
            setNewListingData(listingData.filter((list)=> list.category==category))
        }
        

    }
    const handleClick = (id) => {
        if(userData){
            handleViewCard(id)
        }
        else {
            navigate("/login")
        }
    }

    useEffect(()=>{
        handleSearch(input)

    },[input])
    return (
        <div className=" fixed top-0 bg-[white] z-[20]">
            <div className="w-full border-[#dcdcdc] border-b-[1px] flex items-center justify-between pt-[14px]">
            <div className=""><img src="/logo2.png"  className="w-[120px] mb-[19px] pl-[22px]" /></div>
            <div className="mb-[10px] relative w-[35%] hidden  md:block">
                <input type="text" className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px]" placeholder="Any Where |  Any Location  |  Any City  " onChange={(e)=>setInput(e.target.value)} value={input}/>
                <button className="absolute p-[10px] rounded-[50%] bg-[#e63946] text-[white] right-[3%] top-[4px]"><IoSearch  className="w-[20px] h-[20px] " /></button>
            </div>
            <div className="flex items-center justify-center gap-[10px] pr-[25px] relative">
                <span className="text-[18px] cursor-pointer rounded-[50px] hover:bg-[#ded9d9] px-[8px] py-[5px] mb-[5px] hidden  md:block" onClick={()=>navigate("/listingpage1")}>List your home</span>
                <button className="px-[20px] py-[10px] flex items-center justify-center gap-[5px] border-[1px] border-[#bdbaba] mb-[5px] rounded-[50px] hover:shadow-lg" onClick={()=> setShowpopup(prev => !prev)}><span><GiHamburgerMenu className="w-[20px] h-[20px]"/></span> 
                {userData == null && <span><CgProfile   className="w-[20px] h-[20px]"/></span>}
                {userData != null && <span className="w-[25px] h-[25px] bg-[#e63946] text-[white] text-center rounded-full flex items-center justify-center">{userData?.name.slice(0,1)}</span>}
                </button>
                { showpopup && <div className="w-[220px] h-[250px] absolute bg-slate-50 top-[110%] right-[5%] border-[1px] border-[#aaa9a9] z-10 rounded-lg text-left">
                    <ul className="w-[100%] h-[100%] text-[17px] flex items-start justify-around flex-col ">
                        {!userData &&<li className="w-[100%] px-[15px] py-[10px] hover:bg-[#f0f1f0] cursor-pointer" onClick={()=>{navigate("/login"); setShowpopup(false)}}>Login</li>}
                        {userData &&<li className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f1f3] cursor-pointer"  onClick={()=>{handleLogOut();setShowpopup(false)}}>Logout</li>}
                        <div className="w-[100%] h-[1px] bg-[#c1c0c0]"></div>
                        <li  className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f1f3] cursor-pointer " onClick={()=>{navigate("/listingpage1");setShowpopup(false)}}>List Your Home</li>
                        <li  className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f1f3] cursor-pointer" onClick={()=>{navigate("/mylisting");setShowpopup(false)}} >My Listing</li>
                        <li  className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f1f3] cursor-pointer " onClick={()=>{navigate("/mybooking");setShowpopup(false)}}>My Booking</li>
                    </ul>
                </div>}
            </div> 


            {searchData?.length>0 &&<div className="w-[100vw] h-[450px] flex flex-col gap-[15px] absolute top-[50%] overflow-auto left-[0] justify-start items-center">
                <div className="max-w-[700px] w-[100vw] h-[300px] overflow-hidden flex flex-col bg-[#fefdfd] p-[20px] rounded-lg border-[1px] border-[#a2a1a1] cursor-pointer">
                    {
                        searchData.map((search)=>(
                            <div className=" border-[black] p-[8px] flex justify-start pl-[9px]" onClick={()=>handleClick(search._id)}><GrSearch className="text-[18px] mt-[5px] mr-[8px]"/>
                                {searchData.title} in {search.landmark},{search.city}
                            </div>
                        ))

                    }
                </div>
            </div>}


            </div>
            <div className="w-[100%] h-[65px] flex items-center justify-center block  md:hidden">
                <div className="mb-[10px] relative w-[35%] ">
                <input type="text" className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px]" placeholder="Any Where |  Any Location  |  Any City  " onChange={(e)=>setInput(e.target.value)} value={input}/>
                <button className="absolute p-[10px] rounded-[50%] bg-[#e63946] text-[white] right-[3%] top-[4px]"><IoSearch  className="w-[20px] h-[20px] " /></button>
            </div>
            </div>
            <div className="w-[100vw] h-[85px] flex items-center justify-start  cursor-pointer text-[13px] gap-[40px] overflow-auto md:justify-center px-[15px]">
                <div 
                className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] ${category=="trending"?"border-b-[1px] border-[#a6a5a5]":""}`} 
                onClick={()=>handleCategory("trending")}
>
                <MdWhatshot className="w-[30px] h-[30px] text-black"/>
                <h3>Trending</h3>
                </div>

                <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] ${category=="villa"?"border-b-[1px] border-[#a6a5a5]":""}`} onClick={()=>handleCategory("villa")}>
                    <HiMiniBuildingLibrary className="w-[30px] h-[30px] text-black"/>
                    <h3>Villa</h3>
                </div>

                <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] ${category=="restaurent"?"border-b-[1px] border-[#a6a5a5]":""}`} onClick={()=>handleCategory("restaurent")}>
                    <IoRestaurant className="w-[30px] h-[30px] text-black"/>
                    <h3>Restaurant</h3>
                </div>

                <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] ${category=="poolHouse"?"border-b-[1px] border-[#a6a5a5]":""}`} onClick={()=>handleCategory("poolHouse")}>
                    <MdPool className="w-[30px] h-[30px] text-black"/>
                    <h3>Pool House</h3>
                </div>

                <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] ${category=="rooms"?"border-b-[1px] border-[#a6a5a5]":""}`} onClick={()=>handleCategory("rooms")}>
                    <MdBedroomParent className="w-[30px] h-[30px] text-black"/>
                    <h3>Rooms</h3>
                </div>

                <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] ${category=="flat"?"border-b-[1px] border-[#a6a5a5]":""}`} onClick={()=>handleCategory("flat")}>
                    <BiBuildingHouse className="w-[30px] h-[30px] text-black"/>
                    <h3>Flat</h3>
                </div>

                <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] ${category=="pg"?"border-b-[1px] border-[#a6a5a5]":""}`} onClick={()=>handleCategory("pg")}>
                    <IoBedOutline className="w-[30px] h-[30px] text-black"/>
                    <h3>PG</h3>
                </div>

                <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] ${category=="cabins"?"border-b-[1px] border-[#a6a5a5]":""}`} onClick={()=>handleCategory("cabins")}>
                    <GiWoodCabin className="w-[30px] h-[30px] text-black"/>
                    <h3>Cabins</h3>
                </div>

                <div className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] ${category=="shops"?"border-b-[1px] border-[#a6a5a5]":""}`} onClick={()=>handleCategory("shops")}>
                    <FaShop className="w-[30px] h-[30px] text-black"/>
                    <h3>Shops</h3>
                </div>
            </div>
            
            
        </div>

    )
}

export default Nav;