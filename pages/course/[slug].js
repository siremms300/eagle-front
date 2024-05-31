
import {useState, useEffect, useContext} from 'react'
import axios from 'axios' 
import {useRouter} from 'next/router'
// import { Badge, Modal } from 'antd'   
// import { CurrencyFormatter } from '../../utils/helpers' 
import SingleCourseJumbotron from '../../components/cards/SingCourseJumbotron'
import PreviewModal from '../../components/modal/PreviewModal' 
import SingCourseLesson from '../../components/cards/SingleCourseLesson' 
import {Context} from '../../context'
import {toast} from 'react-toastify' 
import {loadStripe} from '@stripe/stripe-js'


    
  

const SingleCourse = ({course})=> { 
 
    // state 
    const [showModal, setShowModal] = useState(false)
    const [preview, setPreview] = useState("")
    const [loading, setLoading] = useState(false) 
    const [enrolled, setEnrolled] = useState({})

    const {state: {user}} = useContext(Context) 

    useEffect(()=> {
        if(user && course) checkEnrollment()

    }, [user, course])

    const checkEnrollment = async ()=> {
        const {data} = await axios.get(`/api/check-enrollment/${course._id}`) 
        console.log('CHECK ENROLLMENT ', data) 
        setEnrolled(data) 
    } 

    const router = useRouter()  
    const { slug } = router.query  

    const handlePaidEnrollment = async()=> {
        // console.log("Handle paid enrollment")
        try{
            setLoading(true) 
            // check if the user is logged in 
            if(!user) router.push('/login')  
            // check if user is already enrolled     
            if(enrolled.status) return router.push(`/user/course/${enrolled.course.slug}`) 
            const {data} = await axios.post(`/api/paid-enrollment/${course._id}`) 
            console.log(data) 
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY) 
            stripe.redirectToCheckout({sessionId: data}) 
            // router.push(`/payment/checkout`) 

        }catch(err) {
            console.log(err) 
            toast("Enrollment failed. Try again") 
            setLoading(false) 
        }
    } 


    const handleFreeEnrollment = async(e)=> {
        // console.log("Handle free enrollment") 
        e.preventDefault() 
        try{
            // check if the user is logged in 
            if(!user) router.push('/login') 
            // check if user is already enrolled 
            if(enrolled.status) return router.push(`/user/course/${enrolled.course.slug}`) 
            setLoading(true) 
            const {data} = await axios.post(`/api/free-enrollment/${course._id}`); 
            toast(data.message) 
            setLoading(false) 
            router.push(`/user/course/${data.course.slug}`) 
            console.log(data)
        }catch(err){
            console.log(err)
            toast("Enrollment failed. Try again")
            setLoading(false)
        }
    }
    

    return (

        <>  
            <SingleCourseJumbotron 
                course={course} 
                showModal={showModal}
                setShowModal={setShowModal} 
                preview={preview} 
                setPreview={setPreview} 
                user={user} 
                loading={loading} 
                handlePaidEnrollment={handlePaidEnrollment} 
                handleFreeEnrollment={handleFreeEnrollment} 
                enrolled={enrolled} 
                setEnrolled={setEnrolled} 
            />
            {/* {showModal ? course.lessons[0].video.Location : "dont show"} */} 
            <PreviewModal 
                showModal={showModal} 
                setShowModal={setShowModal}
                preview={preview}
            /> 

            {course.lessons && (
                <SingCourseLesson 
                    lessons={course.lessons} 
                    setPreview={setPreview} 
                    showModal={showModal} 
                    setShowModal={setShowModal}
                /> 
            )}
        </>
    )
}

export async function getServerSideProps ({query}) {
    const {data} = await axios.get(`${process.env.API}/course/${query.slug}`) 

    return {
        props: {
            course: data
        }
    }
}

export default SingleCourse
