import React, { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router'
import { Context } from "../context"
import axios from "axios";
import PriceCard from '../components/cards/PriceCard.js'

const Membership = () => {
    const [prices, setPrices] = useState([]); 
    const {state: {user}} = useContext(Context) 
    const [userSubscriptions, setUserSubscriptions] = useState([]) 
    // paystack plans 
    const [plans, setPlans] = useState([]) 

    const router = useRouter()

    useEffect(()=> {
        let result = [] 
        const check = ()=> user && user.subscriptions && user.subscriptions.map((sub)=> {
            result.push(sub.plan.id)
        })
        check()
        setUserSubscriptions(result) 
    }, [user])

    useEffect(() => {
        fetchPrices() 
    }, []) 

    const fetchPrices = async() => { 
        const { data } = await axios.get("/api/prices")  
        console.log("PRICES FROM BACKEND ", data)  
        setPrices(data) 
    } 

    useEffect(()=> {
        fetchPlans() 
    }, []) 

    const fetchPlans = async() => { 
        const { data } = await axios.get("/api/plans")  
        console.log("PLANS FROM PAYSTACK ", data)  
        setPlans(data) 
    } 

    const handleClick = async(e, price)=> {
        e.preventDefault()
        if(userSubscriptions && userSubscriptions.includes(price.id)) {
            window.location.href = "https://t.me/+o7tsly23e1c0MzNk";
            // We will direct them to the telegram channel here 
            return 
        }

        if(user) {
            const {data} = await axios.post('/api/create-subscription', {
                priceId: price.id,
            })
            window.open(data)
        } else {
            router.push('/register') 
        }
    }

    const handlePaystackClick = async (e, plan) => {   
        e.preventDefault(); 
        console.log('Selected plan ID:', plan.id);
        console.log("PLAN CODE: ", plan.plan_code) 
        try { 
          if (user && plan) {  
            const { data } = await axios.post('/api/paystack-subscription', {   
            // planId: plan.id,  
            planCode: plan.plan_code 
            });  
            // Handle the data, such as opening a new window or redirecting to the Paystack page
            // Here, I'm opening a new window for demonstration purposes 
            console.log('Paystack API Response:', data); 
            window.open(data.paystackPaymentLink); 
         } 
          else {
            // Handle the case when the user is not authenticated or the plan is missing
            console.log('User is not authenticated or plan is missing.', user, plans);
          }
        } catch (err) {
          console.error('Error creating Paystack subscription:', err);
        } 
    }; 

    

      

    const recurringPrices = prices.filter(price => price.type === "recurring");

    return (
        <div className='container-fluid'>
            <div className='row col-md-6 offset-md-3 text-center'>
                <h1 className='pt-5 fw-bold'>
                    Explore the right plan for your profit
                </h1> 
                <p className='lead -b-4'>Choose the plan that suits you best</p>
            </div> 

            {/* <pre>{JSON.stringify(prices, null, 4)}</pre> */}
            
            <div className='row pt-5 mb-3 text-center flex-column flex-md-row'>
                {recurringPrices.map((price)=> (
                    <div className='col-md-4' key={price.id}>
                        <PriceCard  
                            price={price}  
                            handleSubscription={handleClick}
                            userSubscriptions={userSubscriptions} 
                        />
                    </div> 
                ))}  
            </div>
            {/* <pre>{JSON.stringify(plans, null, 4)}</pre>  */}
            {plans.map((plan)=> (
                <div key={plan.id}>
                    <h3>{plan.name}</h3>
                    <h4>{plan.amount}</h4> 
                    <button
                        className={'btn btn-lg btn-outline-primary'} 
                        onClick={(e) => handlePaystackClick(e, plan)}
                    >
                        Subscribe with paystack 
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Membership;
