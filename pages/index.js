
import {useState, useEffect} from 'react'
import axios from 'axios' 
import CourseCard from '../components/cards/CourseCard.js' 



const Index = ({courses})=>{ 
 
    
 

    // WE COMMENTED THE USE EFFECT BECAUSE IT IT NOT SEO FRIENDLY AND SO WE WOULD BE USING SERVER SIDE RENDERING FOR SEO
    
    // const [courses, setCourses] = useState([]) 
    // const fetchCourses = async()=> {
    //     const {data} = await axios.get('/api/courses') 
    //     setCourses(data)
    // }

    // useEffect(()=> {
    //     fetchCourses()
    // }, [])

    


    return(
        <>
            <h1 className="jumbotron text-center bg-primary square">Eagle-Eye FX</h1> 
            <div className='row col-md-6 offset-md-3 text-center'>
                <h1 className='pt-5 fw-bold'>
                    Find the right course for you and enroll
                </h1>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    {courses.map((course)=> 
                        <div 
                            key={course._id} 
                            className='col-md-4 '
                        >
                            {
                                // <pre>{JSON.stringify(course, null, 4)}</pre>
                                <CourseCard course={course}/>
                            }
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}

export async function getServerSideProps () {
    const {data} = await axios.get(`${process.env.API}/courses`)  
    
    return {
        props: {
            courses : data
        }
    }
}
 
export default Index 