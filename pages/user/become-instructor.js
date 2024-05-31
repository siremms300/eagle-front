

import { useContext, useState } from 'react'
import axios from 'axios' 
import { Context } from '../../context' 
import { Button } from 'antd' 
import { SettingOutlined, UserSwitchOutlined, LoadingOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify' 
import InstructorRoute from '../../components/routes/UserRoutes'



const BecomeInstructor = ()=>{
    // state 
    const [loading, setLoading] = useState(false) 

    const {
        state: {user}
    } = useContext(Context) 

    const becomeInstructor = ()=>{
        setLoading(true)  
        // console.log("Become instructor") 
        console.log("Become instructor") 
        axios.post("/api/make-instructor") 
        .then(res =>{
            console.log(res) 
            window.location.href = res.data 
        }).catch(err =>{
            console.log(err.response.status) 
            toast.error("Stripe onboarding failed. Try again")
            setLoading(false) 
        })
    }

    return(
        <InstructorRoute>
            <h1 className='jumbotron text-center bg-primary square'>Become Instructor</h1> 

            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 offset-md-3 text-center'> 
                        <div className='pt-4'>
                            <UserSwitchOutlined className='display-1 pb-3'/>  
                            <br /> 
                            <h2>Setup payout to publish courses</h2> 
                            <p className='lead text-warning'> Funds will be transfred to your account using Stripe </p> 


                            <Button 

                                className='mb-3' 
                                    type='primary' 
                                    block shape='round' 
                                    icon={loading ? <LoadingOutlined /> : <SettingOutlined />} 
                                    size='large'
                                    onClick={becomeInstructor} 
                                    disabled={user && user.role && user.role.includes("Instructor") || loading} 
                                >
                            {loading ? "processing..." : "Payout Setup"}
                            </Button>

                            <p className='lead'>
                                You will be redirected to stripe to complete onboarding process
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </InstructorRoute>
    )
}

export default BecomeInstructor 