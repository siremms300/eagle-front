
import { useState, useEffect, useContext } from "react"; 
import { Context } from "../../context" 
import axios from "axios";
import { DollarOutlined, SettingOutlined, LoadingOutlined } from "@ant-design/icons"; 
import { CurrencyFormatter } from "../../utils/helpers"; 
import InstructorRoute from '../../components/routes/InstructorRoutes'



const InstructorRevenue = ()=> { 

    const[balance, setBalance] = useState({pending: []})

    useEffect(()=> {
        sendBalanceRequest()
    }, []) 

    const sendBalanceRequest = async()=>{
        console.log("Send balance request")
    } 

    const handlePayoutSettings = async()=> {
        console.log("Get my payout")
    }

    return(

        <InstructorRoute>
          <h1 className="jumbotron text-center bg-primary square">Checkout</h1> 
            <div className="container"> 
                <div className="row pt-2"> 
                    <div className="col-md-8 offset-md-2 bg-light p-5">
                        <h2>
                            product name <DollarOutlined className="float-right"/> {" "}
                        </h2>    
                        <hr /> 
                        <h4>
                            Product price <span className="float-right">0.00</span>
                        </h4> 
                        <hr /> 
                        <h4>
                            Enter coupon code {" "} <SettingOutlined className="float-right pointer" onClick={handlePayoutSettings}/> 
                        </h4> 

                        <hr /> 
                        <h4>
                            Onetime payent | Subscription {" "} <SettingOutlined className="float-right pointer" onClick={handlePayoutSettings}/> 
                        </h4> 

                        <hr /> 
                        <h4>
                            Enroll with stripe {" "} <SettingOutlined className="float-right pointer" onClick={handlePayoutSettings}/> 
                        </h4> 

                    </div>
                </div>
            </div>
        </InstructorRoute>
    )

} 

export default InstructorRevenue 
