
import { useContext, useEffect, useState } from 'react'
import axios from 'axios' 
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Context } from '../context'
import { useRouter } from 'next/router'




const ResetPassword = ()=>{
    // state 
    const [email, setEmail] = useState('') 
    const [success, setSuccess] = useState(false) 
    const [code, setCode] = useState('') 
    const [newPassword, setNewPassword] = useState('') 
    const [loading, setLoading] = useState(false) 

    //context 
    const {state: {user}} = useContext(Context)  

    //router
    const router = useRouter() 

    //redirect if user is logged in 
    useEffect(()=>{
        if(user !== null) router.push("/")
    }, [user])
    
    const handleSubmit = async(e)=>{

        e.preventDefault()
        setLoading(true) 
        try {
            const { data } = await axios.post('/api/forgot-password', { email })
            setSuccess(true) 
            toast("A password reset link has been sent to your email") 
            setLoading(false)
        } catch (err) {
            setLoading(false)
            toast(err.response.data) 
        } finally {
            // Clear the input fields by setting the state to empty strings
            setEmail('');
            setLoading(false)
        }
        
    } 

    const handleResetPassword = async (e)=>{
        e.preventDefault() 
        // console.log(email, code, newPassword) 
        // return

        try {
            setLoading(true) 
            const {data} = await axios.post('/api/reset-password', {
                email, 
                code, 
                newPassword
            })
            setEmail('')
            setCode('')
            setNewPassword('')
            setLoading(false) 
            toast('Congratulations! Now you can login with your new password.') 
            router.push('/login')
        }

        catch (err) {
            setLoading(false)
            toast(err.response.data)
        }
    }
 

    return (
        <>
            <h1 className='jumbotron text-center bg-primary square'>Forgot password?</h1> 
            <div className='container col-md-4 offset-md-4 pb-5'>
                <form onSubmit={success ? handleResetPassword : handleSubmit}>
                    <input 
                        type='email' 
                        className='form-control mb-4 p-4' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required 
                    /> 
                    {success && <>
                        <input 
                            type='text' 
                            className='form-control mb-4 p-4' 
                            value={code} 
                            onChange={e => setCode(e.target.value)}
                            placeholder="Enter reset code"
                            required 
                        /> 

                        <input 
                            type='password' 
                            className='form-control mb-4 p-4' 
                            value={newPassword} 
                            onChange={e => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            required 
                        /> 

                    </>}

                    <button 
                        type='submit' 
                        className='btn btn-primary p-2' 
                        disabled={loading || !email}
                        style={{ width: '100%' }}
                    >
                        {loading ? <SyncOutlined spin/> : "Submit"}
                    </button>
                </form>
            </div>
        </>
    )
}

export default ResetPassword  
