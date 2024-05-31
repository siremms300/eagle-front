
import { useState, useEffect, useContext } from 'react' 
import axios from 'axios' 
import { Context } from '../../context'; 
import { SyncOutlined } from "@ant-design/icons"; 
import UserRoute from '../../components/routes/UserRoutes'
import { useRouter } from "next/router"; 
 



const StripeSuccesssub = ()=>{

    const {state: {user}} = useContext(Context)
    // router 
    const router = useRouter() 
    // const { id } = router.query;
     
    useEffect(()=> {
        getSubscriptionStatus()
    }, [])
 
    const getSubscriptionStatus = async()=> {
        const {data} = await axios.get('/api/subscription-status') 
        console.log('SUBSCRIPTION STATUS: ', data) 

        if(data && data.length === 0) { 
            router.push("/membership")
        } else {
            // update user in local storage 

            router.push("/user/subaccount")
        }
    }
 
    return(
        <UserRoute showNav={false}> 
            <div 
                className='d-flex justify-content-center fw-bold'
                style={{height: '90vh'}}
            >
                <div className='d-flex align-items-center'>
                    <SyncOutlined 
                        spin 
                        // className="display-1 text-success p-5"
                        style={{fontSize: '50px'}} 
                    />
                </div>
            </div>
        </UserRoute>
    )

}

export default StripeSuccesssub

