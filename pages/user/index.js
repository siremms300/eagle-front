
import {useContext, useEffect, useState} from 'react'
import { Context } from '../../context' 
import UserRoute from '../../components/routes/UserRoutes'
import axios from 'axios'
import {Avatar} from 'antd' 
import Link from 'next/link'
import {SyncOutlined, PlayCircleOutlined} from '@ant-design/icons' 



const userIndex = ()=>{

    const {state: {user}} = useContext(Context) 
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
        loadCourses()
    }, []) 

    const loadCourses = async()=> {
        try{
            setLoading(true)
            const {data} = await axios.get('/api/user-courses') 
            setCourses(data) 
            setLoading(false)
        } catch(err) {
            console.log(err)
        }
    }

    const linkStyle = {
        textDecoration: 'none', // Remove the underline
        color: 'inherit', // Inherit the text color from the parent element
      };

    return ( 
        <UserRoute>

            {loading && <SyncOutlined 
                            spin 
                            className='d-flex justify-content-center display-1 text-danger'
                        />}
            
            <h1 className="jumbotron text-center">
               User Dashboard
            </h1>
            {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */} 
            {/* Show list of courses */} 

            {courses && courses.map(course => (
                <div key={course._id} className='media pt-2 pb-1'>
                    <Avatar 
                        size={80} 
                        shape="square" 
                        src={course.image ? course.image.Location : '/course.png'}
                    />   

                    <div className='media-body pl-2'>
                        <div className='row'>
                            <div className='col'>
                                <Link 
                                    href={`/user/course/${course.slug}`} 
                                    className='pointer'
                                    style={linkStyle}
                                >  
                                    <h5 className='mt-2 text-primary'>{course.name}</h5> 
                                </Link>
                                <p style={{marginTop: '-10px'}}>{course.lessons.length} lessons</p> 
                                <p className='text-muted' style={{marginTop: '-15px', fontSize: '12px'}}>
                                By {course.instructor.name}  
                                </p> 
                            </div> 

                            <div className='col-md-3 mt-3 text-center'>

                                <Link 
                                        href={`/user/course/${course.slug}`} 
                                        className='pointer'
                                    > 
                                        <PlayCircleOutlined className='h2 pointer text-primary'/> 
                                </Link> 
 
                            </div> 
                            <hr />
                        </div>
                    </div>                  
                </div> 


            ))}
             
        </UserRoute>
    );
} 

export default userIndex 