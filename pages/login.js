

import { useContext, useEffect, useState } from 'react'
import axios from 'axios' 
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Context } from '../context'
import { useRouter } from 'next/router'

const Login = ()=>{

    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('') 
    const[loading, setLoading] = useState(false)

    //state
    const{state, dispatch} = useContext(Context)  

    const {user} = state
    //router 
    const router = useRouter() 

    // protecting logged in user from accessing some pages 
    useEffect(()=>{
        if(user !== null) router.push("/")   // i will redirect to user dashboard if necessity demands
    }, [user])

    console.log('STATE', state)

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try {
            setLoading(true)
            const {data} = await axios.post(`/api/login`, { 
            email, password
            })
            //console.log("LOGIN RESPONSE", data)
            // console.table({name, email, password}) 

            // Clear the input fields by setting the state to empty strings
            setEmail('');
            setPassword('');
            toast.success('Login successful') 
            setLoading(false) 
            // console.log("LOGIN RESPONSE", data)
            dispatch({
                type: "LOGIN",
                payload: data,  
            }) 
            // save in local storage 
            window.localStorage.setItem('user', JSON.stringify(data))
            // redirect                    
            // router.push("/user")     


            if (data.role === "Instructor") {
                router.push("/instructor");
            } else {
                router.push("/user");
            }


        } 

        catch (err) {
            toast.error(err.response.data) 
            setLoading(false)
        } finally {
            // Clear the input fields by setting the state to empty strings
            setEmail('');
            setPassword('');
            setLoading(false)
        }
    }
  
    return(
        <>
            <h1 className="jumbotron text-center bg-primary square">Login</h1> 
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                 
                    <input 
                        type="email" 
                        className="form-control mb-4 p-4" 
                        value={email} 
                        onChange={(e)=> setEmail(e.target.value)}
                        placeholder='Enter email'
                        required
                    />

                    <input 
                        type="password" 
                        className="form-control mb-4 p-4" 
                        value={password} 
                        onChange={(e)=> setPassword(e.target.value)}
                        placeholder='Enter password' 
                        required
                    />

                    <button 
                        type="submit" 
                        className="btn btn-primary p-2"
                        disabled={!email || !password || loading} 
                        style={{ width: '100%' }}
                    > 
                        {loading ? <SyncOutlined spin/> : "Submit"}
                    </button>
                </form> 
                <p className='text-center pt-3'>
                    New User?{" "}
                    <Link href='/register'>Register here</Link> 
                </p>
                <p className='text-center text-danger'>
                    <Link href='/reset' className='text-danger'>Forgot password</Link> 
                </p>
            </div>
        </> 
    )
} 

export default Login