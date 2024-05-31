

import { WarningTwoTone } from "@ant-design/icons"; 
import UserRoute from '../../components/routes/UserRoutes'
import { useRouter } from "next/router"; 




const StripeCancelsub = ()=>{ 
    // router 
    const router = useRouter() 
    
    
    return(
        <UserRoute showNav={true}> show nav was initially false 
            <div
                className='d-flex justify-content-center fw-bold'
                style={{height: '90vh'}}
            >
                <div className='d-flex align-items-center'>
                    <WarningTwoTone 
                        className="display-1 text-danger p-5"
                        style={{fontSize: '50px'}} 
                    />
                </div>
            </div>
        </UserRoute>
    )

}

export default StripeCancelsub

