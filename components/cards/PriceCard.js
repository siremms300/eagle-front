
import {useState, useEffect, useContext} from 'react' 
import { SyncOutlined } from "@ant-design/icons"; 
import {useRouter} from 'next/router'
import { Context } from '../../context';


const PriceCard = ({ 
    price, 
    locale, 
    handleSubscription,  
    userSubscriptions, 
}) => { 

    const {state: {user}} = useContext(Context) 

    const router = useRouter()  


    // Format the price based on the user's locale
    const formattedPrice = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: price.currency,
    }).format(price.unit_amount / 100);


    // const dynamicDescription = (price, handleSubscription)=> {
    //     if (price.nickname === 'MONTHLY PLAN') {
    //         return 
    //     }
    // }

    // const handleSubscription = async (e) => {
    //     // e.preventDefault();
    //     // Check if the user is logged in
    //     console.log("SUBSCRIPTION BUTTON CLICKED:", user); // Add this line for debugging
    //     if (!user) router.push('/login');
    //   };

    const buttonStyle = ()=> {
        return price.nickname === 'MONTHLY PLAN' ?  "btn-outline-primary" : "btn-primary"
    }

    const headerStyle = ()=> {
        return price.nickname === '6 MONTHS PLAN' ?  "bg-primary text-light" : ""
    }

    const borderStyle =()=> {
        return price.nickname === '6 MONTHS PLAN' ?  "border-primary" : "" 
    }

    const buttonText =()=> {
        return user ? "Subscribe" : "Login to subscribe"
    }
    

    return(

            <div className='col'>
                <div className={`card mb-4 rounded-3 shadow-sm ${borderStyle()}`}>
                    <div className={`card-header py-3 ${headerStyle()}`}>
                        <h4 className='py-0 fw-normal'>{price.nickname}</h4>
                    </div>

                    <div className='card-body'>
                        <h1 className='card-title pricing-card-title'>
                            {/* {(price.unit_amount /100).toLocaleString("en-US", {
                                style: 'currency', 
                                currency: 'USD'
                            })} <small className='text-muted fw-light'></small> */} 

                            {formattedPrice}

                        </h1> 
                        <ul className='list-unstyled mt-3 mb-4'>
                            <li>Signals </li>
                            <li>Analysis </li> 
                            <li>Trade setups </li>  
                            <li>Community </li>
                        </ul> 

                        <button 
                            className={`w-100 btn btn-lg ${buttonStyle()}`}
                            onClick={(e)=> handleSubscription(e, price)}
                        >
                            {userSubscriptions && userSubscriptions.includes(price.id) ? "Access plan" : buttonText()}
                        </button> {" "}

                        {/* <button
                            className={`w-100 btn btn-lg ${buttonStyle()}`} 
                        >
                            Subscribe with paystack 
                        </button> */}
                        
                    </div> 
                </div>
            </div>
       
    )
    

}

export default PriceCard