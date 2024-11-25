import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {authActions} from '../store/auth';

const Login = () => {
    const history=useNavigate();
    const dispatch=useDispatch();
    const [Data,setData]=useState({username:'',password:''});
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    if(isLoggedIn===true){
        history('/');
    }
    const change=(e)=>{
        const {name,value}=e.target;
        setData({...Data,[name]:value});
    }
    const handleSubmit=async()=>{
        try{
            if(Data.username==='' || Data.password===''){
                alert('Please fill all the fields');
            }
            else{
                const response=await axios.post('http://localhost:1000/api/v1/log-in', Data);
                setData({username:'',password:''});
                console.log(response);
                localStorage.setItem('id',response.data.id);
                localStorage.setItem('token',response.data.token);
                dispatch(authActions.login());
                history('/');
            }
        }
        catch(err){
            alert(err.response.data.message);
        }
    }

    return (
        <div className='h-[98vh] flex items-center justify-center'>
            <div className='p-4 w-2/6 rounded bg-gray-800'>
                <div className='text-2xl font-semibold'>LogIn</div>
                <input type='username' placeholder='username' className='bg-gray-700 px-3 py-2 my-3 w-full rounded' name='username' value={Data.username} onChange={change}/>
                <input type='password' placeholder='password' className='bg-gray-700 px-3 py-2 my-3 w-full rounded' name='password' value={Data.password} onChange={change}/>
                <div className='w-full flex items-center justify-between'>
                    <button className='bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded' onClick={handleSubmit}>Login</button>
                    <Link to="/signup" className='text-gray-400 hover:text-gray-200'>Not having an account? Signup here</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
