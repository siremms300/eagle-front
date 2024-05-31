

import { useEffect, useState, useContext } from "react"; 
import axios from "axios"; 
// import StudentRoute from "../../components/routes/StudentRoute";
import { UserOutlined } from "@ant-design/icons"; 
import { Context } from "../../context";
import moment from 'moment'
import UserRoute from "../../components/routes/UserRoutes"


const SubAccount = ()=>{

    const[subscriptions, setSubscriptions] = useState([]) 

    const {state: {user}} = useContext(Context)

    

    useEffect(()=>{
        getSubscriptions()
    })

    const getSubscriptions = async()=> {
        const {data} = await axios.get('/api/subscriptions') 
        console.log("SUBSCRIPTIONS: ", data)
        setSubscriptions(data.data)
    }


    const manageSubscriptions = async () => {
        try {
          const { data } = await axios.get('/api/customer-portal');
          // Redirect the user to the Stripe customer portal
          window.location.href = data.url;
        //   window.open(data)
        } catch (err) {
          console.error(err);
        } 
      };
    
      // Fetch user subscriptions when the component mounts
      useEffect(() => {
        getSubscriptions();
    }, []);


    
    return(
        <UserRoute>
            <div className="container">
                <div className="row">
                    <UserOutlined 
                        className='d-flex justify-content-center fw-bold display-4'
                    />
                    <h1>Account</h1>
                    <p className="lead pb-4"> Subscription status</p>
                    {/* <pre>{JSON.stringify(subscriptions, null, 4)}</pre> */}
                </div> 

                <div className="row">
                {subscriptions && subscriptions.map((sub) => (
                    <div key={sub.id}>
                        <section>
                            <hr /> 
                            <h4 className="fw-bold">{sub.plan.nickname}</h4> 
                            <h5>
                                {(sub.plan.amount / 100).toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </h5> 
                            <p>Status: {sub.status}</p> 
                            {/* <p>Card last four digits: {sub.default_payment_method.card.last4}</p>  */}
                            <p>Current subscription ends: {" "}
                                {moment(sub.current_period_end * 1000)
                                .format('dddd, MMMM, Do YYYY h:mm:ss a')
                                .toString()
                            } 
                            </p>
                            {/* <button 
                                className="btn btn-outline-primary"
                                onClick={()=> router.push(`/${sub.plan.nickname.toLowerCase()}`)}
                            >
                                Access Subscription
                            </button> {" "} */} 

                            <button 
                                className="btn btn-outline-primary"
                                onClick={() => (window.location.href = "https://t.me/+o7tsly23e1c0MzNk")}
                            >
                                Access Subscription 
                            </button> {" "}

                            <button 
                                className="btn btn-outline-danger"
                                onClick={manageSubscriptions} 
                            >
                                Manage Subscription
                            </button>
                        </section>
                    </div>
                ))}
 
                </div>
            </div>
        </UserRoute>
    )

}

export default SubAccount

