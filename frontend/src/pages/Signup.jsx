import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import axios from 'axios'
const Signup = () => {
    const history=useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if(isLoggedIn===true){
        // history('/');
    }
    const [Data,setData]=useState({username:'',email:'',password:''});
    const change=(e)=>{
        const {name,value}=e.target;
        setData({...Data,[name]:value});
    }
    const handleSubmit=async()=>{
        try{
            if(Data.username==='' || Data.email==='' || Data.password===''){
                alert('Please fill all the fields');
            }
            else{
                const response=await axios.post('http://localhost:1000/api/v1/sign-in', Data);
                setData({username:'',email:'',password:''});
                alert(response.data.message);
                history('/login');
            }
        }
        catch(err){
            alert(err.response.data.message);
        }
    }
    return(
        <div className='h-[98vh] flex items-center justify-center'>
            <div className='p-4 w-2/6 rounded bg-gray-800'>
                <div className='text-2xl font-semibold'>SignUp</div>
                <input type='username' placeholder='username' className='bg-gray-700 px-3 py-2 my-3 w-full rounded' name='username' value={Data.username} onChange={change}/>
                <input type='email' placeholder='email' className='bg-gray-700 px-3 py-2 my-3 w-full rounded' name='email' value={Data.email} required onChange={change}/>
                <input type='password' placeholder='password' className='bg-gray-700 px-3 py-2 my-3 w-full rounded' name='password' value={Data.password} onChange={change}/>
                <div className='w-full flex items-center justify-between'>
                    <button className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded' onClick={handleSubmit}>Signup</button>
                    <button className='text-gray-400 hover:text-gray-200' onClick={()=>history('/login')}>Already having an account? Login here</button>
                </div>            
            </div>
        </div>
    )
}
export default Signup