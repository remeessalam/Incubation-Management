import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios"

import './Login.css';
import bgImg from "../../assets/img1.jpg"
import { toast } from 'react-toastify';
import { color } from '@mui/system';


function Login() {
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    useEffect(() => {
        if (cookies.jwt) {
            navigate('/')
        }
    })

    const onSubmit = async (userData) => {
        try {
            const { data } = await axios.post("http://localhost:4000/login", userData, { withCredentials: true })
            if (data.status == true) {
                localStorage.setItem("userToken", data.token)
                console.log(JSON.stringify(data)+"token")
                navigate('/')
            } else {
                toast.error(data.error, { position: "top-right" })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
         <h1>Incubation</h1>
        <section className='App'>
            <div className='register'>
                <div className='col-1'>
                    <h2> Login </h2>
                    <form
                        id='form'
                        className='flex flex-col'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input type="text" placeholder='email'  {...register("email", {
                            required: { value: true, message: "Email is required" },
                            pattern:  { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: "Enter a valid email" }
                        })} />
                        {errors.email && <p className='error'>{errors.email.message}</p>}
                        <input type="password" placeholder='password' {...register("password", { required: { value: true, message: "Password required" }, minLength: { value: 8, message: "Password should be 8 characters long" } })} />
                        {errors.password && <p className='error'>{errors.password.message}</p>}
                        <button className='btn'> Submit </button>
                        <p style={{ opacity: '.6' }}><Link to={'/register'}>Register</Link></p>
                    </form>
                </div>
            </div>
        </section>
        </>

    )
}

export default Login
