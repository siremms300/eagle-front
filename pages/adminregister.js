import { useState, useEffect, useContext } from 'react'
import axios from 'axios' 
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Context } from '../context'
import { useRouter } from 'next/router' 

const Register = ()=>{

    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('') 
    const[role, setRole] = useState('Instructor') // Default role is 'Instructor'
    const[loading, setLoading] = useState(false) 

    const{state: {user}} = useContext(Context)

    const router = useRouter() 

    useEffect(()=>{
        if(user !==null) router.push('/')
    }, [user])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try {
            setLoading(true)
            const {data} = await axios.post(`/api/register`, {
                name, email, password, role // Include the role in the request
            })
            //console.log("REGISTER RESPONSE", data)
            // console.table({name, email, password, role}) 

            // Clear the input fields by setting the state to empty strings
            setName('');
            setEmail('');
            setPassword('');
            toast.success('Registration successful. Please login') 
            setLoading(false)
            router.push("/login")      
        } catch (err) {
            toast.error(err.response.data) 
            setLoading(false)
        } finally {
            // Clear the input fields by setting the state to empty strings
            setName('');
            setEmail('');
            setPassword('');
            setLoading(false)
        }
    }

    return(
        <>
            <h1 className="jumbotron text-center bg-primary square">Register</h1> 
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className="form-control mb-4 p-4" 
                        value={name} 
                        onChange={(e)=> setName(e.target.value)}
                        placeholder='Enter name'
                        required
                    />

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

                    <div className="mb-4">
                        <label htmlFor="role">Select Role:</label>
                        <select
                            id="role"
                            className="form-control"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="Instructor">Instructor</option>
                            <option value="Learner">Learner</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-block btn-primary p-2"
                        disabled={!name || !email || !password || loading} 
                        style={{ width: '100%' }}
                    > 
                        {loading ? <SyncOutlined spin/> : "Submit"}
                    </button>
                </form> 
                <p className='text-center p-3'>
                    Already registered?{" "}
                    <Link href='/login'>Login</Link> 
                </p>
            </div>
        </>
    )
} 

export default Register
