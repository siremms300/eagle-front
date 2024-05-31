
import { useState, useEffect, useContext } from "react"; 
import { Context } from "../../context" 
import axios from "axios";
import { DollarOutlined, SettingOutlined, LoadingOutlined, SyncOutlined } from "@ant-design/icons"; 
import { CurrencyFormatter, StripeCurrencyFormatter } from "../../utils/helpers"; 
import InstructorRoute from '../../components/routes/InstructorRoutes'




const InstructorRevenue = ()=> { 

    const[balance, setBalance] = useState({pending: []})
    const[loading, setLoading] = useState(false)

    useEffect(()=> {
        sendBalanceRequest()
    }, []) 

    const sendBalanceRequest = async()=>{
        const {data} = await axios.get('/api/instructor/balance') 
        setBalance(data)
    } 

    const handlePayoutSettings = async()=> {
        try{
            setLoading(true) 
            const {data} = await axios.get("/api/instructor/payout-settings") 
            window.location.href = data
        } catch(err) { 
            setLoading(false)
            console.log(err) 
            alert("Unable to open payout settings. Try again") 
            setLoading(false) //i need to look into this later because its not working at the moment. the reason its not working is that user needs to enroll using the become instructor button so as to reciever a stripe_customer_id which would be used to access the payout page 
        }
    }

    return(

        <InstructorRoute>
            <div className="container"> 
                <div className="row pt-2"> 
                    <div className="col-md-8 offset-md-2 bg-light p-5">
                        <h2>
                            Revenue report <DollarOutlined className="float-right"/> {" "}
                        </h2>   
                        <small>You get paid directly from stripe to your bank account every 48hrs</small>  
                        <hr /> 
                        <h4>
                            {/* {JSON.stringify(balance, null, 4)} */}
                            Pending balance 
                            {balance.pending && balance.pending.map((bp, i)=> (
                                <span key={i} className="float-right"> {StripeCurrencyFormatter(bp)} </span>
                            ))} 
                           
                        </h4> 
                        <small>For the last 48hrs</small>
                        <hr /> 
                        <h4>
                            Payouts {" "} 
                            {!loading ?
                            <SettingOutlined 
                            className="float-right pointer" 
                            onClick={handlePayoutSettings}
                            /> : <SyncOutlined spin className="float-right pointer"/>

                            }
                        </h4> 
                        <small>
                            Update your stripe account details or view previous payouts
                        </small>

                    </div>
                </div>
            </div>
        </InstructorRoute>
    )

} 

export default InstructorRevenue 
