import React, { useContext, useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOffSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import axios from 'axios';
import { authDataContext } from "../src/Context/AuthContext";
import { userDataContext } from "../src/Context/UserContext";
import { toast } from "react-toastify";

function SignUp() {
    let [show,setShow] = useState(false)
    let navigate = useNavigate()
    let {userData, setUserData} = useContext(userDataContext)
    let {serverUrl} = useContext(authDataContext)
    let [name,setName] = useState("")
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let {loading,setLoading} = useContext(authDataContext)

    const handleSignUp = async (e) => {
        setLoading(true)
        try{
            e.preventDefault()
            let result = await axios.post(serverUrl + "/api/auth/signup",{
                name,
                email,
                password
            },{withCredentials: true})
            setLoading(false)
            setUserData(result.data)
            navigate("/")
            toast.success("Signup Successfully")
            console.log(result)

            } catch (error) {
                console.log(error)
                toast.error("Something went wrong")
        }
    }
    return (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
            <div className="w-[50px] h-[50px] bg-[#e63946] curser-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center" onClick={()=> navigate("/")}>
            <FaLongArrowAltLeft className="w-[25px] h-[25px] text-[white] " />
            </div>
            <form action="" className="max-w-[900px] w-[90%] h-[600px]
            flex items-center justify-center flex-col md:items-start gap[10px] " onSubmit ={handleSignUp}>
                <h1 className="text-[30px] text-[black]">Welcome to StayPoint</h1>
                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] mt-[30px]">
                <label htmlFor="name" className="text-[20px]">User Name</label>
                <input type="text" id="name" className="w-[90%] h-[40px] border-[2px] border-[gray] rounded-lg text-[18px] px-[20px] " required onChange={(e)=>setName(e.target.value)}
                value={name}/>
                </div>
                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px]">
                <label htmlFor="email" className="text-[20px]">Email</label>
                <input type="text" id="email" className="w-[90%] h-[40px] border-[2px] border-[gray] rounded-lg text-[18px] px-[20px]"required onChange={(e)=>setEmail(e.target.value)}
                value={email}/>
                </div>
                <div className="w-[90%] flex items-start justify-start flex-col gap-[10px] relative">
                <label htmlFor="password" className="text-[20px]">Password</label>
                <input type={show?"text":"password"} id="password" className="w-[90%] h-[40px] border-[2px] border-[gray] rounded-lg text-[18px] px-[20px]" required onChange={(e)=>setPassword(e.target.value)}
                value={password}/>
                {!show && <MdRemoveRedEye className="w-[22px] h-[22px] absolute right-[12%] bottom-[10px] curser-pointer" onClick={()=>setShow(prev => !prev)}/>}
                {show && <IoEyeOffSharp className="w-[22px] h-[22px] absolute right-[12%] bottom-[10px] curser-pointer" onClick={()=>setShow(prev => !prev)}/>}
                </div>
                <button className="px-[50px] py-[10px] bg-[#e63946] mt-[25px] text-[white] text-[18px] md:px[80px] mb-[5px] rounded-lg" disabled={loading}>{loading? "Loading...":"SignUp"}</button>
                <p className="text-[18px]">Already have a account?  <span className="text-[19px] text-[#e63946]" onClick={() =>navigate("/login")}>Login</span></p>
            </form> 

        </div>

    )
}

export default SignUp