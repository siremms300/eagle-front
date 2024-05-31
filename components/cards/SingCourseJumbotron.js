
import { CurrencyFormatter } from '../../utils/helpers' 
import SingleCourse from '../../pages/course/[slug]' 
import { Badge, Modal, Button } from 'antd' 

import ReactPlayer from 'react-player' 
import dynamic from 'next/dynamic'; 
import {LoadingOutlined, SafetyOutlined} from '@ant-design/icons'


const SingleCourseJumbotron = ({
    course, 
    showModal, 
    setShowModal, 
    preview, 
    setPreview, 
    loading, 
    user, 
    handleFreeEnrollment, 
    handlePaidEnrollment,
    enrolled,
    setEnrolled
})=> {

    // destructuring the values from course 
    const {name, description, instructor, updatedAt, lessons, image, price, paid, category} = course 

    const ReactPlayer = dynamic(() => import('react-player'), {
        ssr: false, // This disables server-side rendering for ReactPlayer
      });


    return(

        
        <div className='jumbotron bg-primary square' style={{ padding: '20px' }}>
        {/* <pre>{JSON.stringify(course, null, 4)}</pre>  */}
            
            <div className='row'>
                <div className='col-md-8'>
                    {/* title */}
                    <h1 className='text-light font-weight-bold'> {name} </h1> 
                    {/* description */} 
                    <p className='lead'>{description && description.substring(0, 160)}...</p>
                    {/* category */} 
                    <Badge count={category} style={{backgroundColor: '#03a9f4'}} className='pb-4 mr-2'/>
                    {/* author */} 
                    <p>Created by {instructor.name}</p>
                    {/* updated at */} 
                    <p>Last updated {new Date(updatedAt).toLocaleDateString()}</p>
                    {/* price */} 

                    <h4 className='text-light'>{
                        paid ? CurrencyFormatter({
                            amount: price,
                            currency: 'usd'
                        }) : "Free"
                    }</h4>
                </div>

                <div className='col-md-4'> 
                    {/* show video preview or course image */} 
                    
                    {lessons[0].video && lessons[0].video.Location ? (
                    
                    <div onClick={()=> {
                        setPreview(lessons[0].video.Location) 
                        setShowModal(!showModal)
                    }}>
                        <ReactPlayer 
                            className="react-player-div" 
                            url={lessons[0].video.Location} 
                            playing={false}
                            width="100%"
                            light={image.Location}
                            height="225px"
                            controls
                        />
                    </div>
                    
                    ) : (
                        <>
                            <img 
                                // src={image.Location} 
                                alt={name} 
                                className='img img-fluid'
                            />
                        </>
                    )}

                    {/* enroll button */} 
                    {loading ?
                        <div className='d-flex justify-content-center'>
                            <LoadingOutlined className='h1 text-danger'/>
                        </div>
                     : 
                        <Button
                            className='col-md-3 mt-3 text-danger'
                            // type='primary' 
                            block
                            shape='round'
                            icon={<SafetyOutlined />} 
                            size='large' 
                            disabled={loading} 
                            onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
                        >
                            {user ? enrolled.status ? "Go to course" : "Enroll" : "Login to enroll"}
                        </Button> 
                        
                     }
                </div>
            </div>
            
        </div>
    )
}

export default SingleCourseJumbotron