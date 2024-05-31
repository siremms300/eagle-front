import Link from 'next/link'
import { Avatar , Tooltip} from 'antd'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import InstructorRoute from '../../components/routes/InstructorRoutes'
import InstructorNav from '../../components/nav/InstructorNav'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const InstructorIndex = () => {
    // state
    const [courses, setCourses] = useState([])

    useEffect(() => {
        loadCourses()
    }, [])

    const loadCourses = async () => {
        try {
            const { data } = await axios.get('api/instructor-courses')
            setCourses(data)
        } catch (err) {
            console.log(err)
        }
    }

    const myStyle = { marginTop: '-15px', fontSize: '12px' }

    const linkStyle = {
        textDecoration: 'none', // Remove the underline
        color: 'inherit', // Inherit the text color from the parent element
      };

    return (
        <InstructorRoute>
            <h1 className='jumbotron text-center bg-primary square'>Instructor Dashboard</h1>
            {courses.map(course => (
                <div className='media pt-2 course-container' key={course._id}>
                    {/* Use the correct condition to check if course.image is available */}
                    <Avatar size={80} src={course.image ? course.image.Location : '/course.png'} />

                    <div className='media-body pl-2'>
                        <div className='row'>
                            <div className='col'>
                                <Link
                                    href={`/instructor/course/view/${course.slug}`} // it can also be course._id
                                    className='pointer mt-2 text-primary'
                                    style={linkStyle}
                                >
                                    <h5>{course.name}</h5>
                                </Link>
                                <p style={{ marginTop: '-5px' }}>{course.lessons.length} Lessons</p>

                                {course.lessons.length < 1 ? (
                                    <p style={myStyle} className='text-warning'>At least one lesson is required to publish a course</p>
                                ) : course.published ? (
                                    <p style={myStyle} className='text-success'>Your course is live</p>
                                ) : (
                                    <p style={myStyle} className='text-success'>Your course is ready to be published</p>
                                )}

                            </div>

                            <div className='col-md-3 mt-3 text-center'>
                                {course.published ? (
                                    <Tooltip title="Published">
                                        <CheckCircleOutlined className='h5 pointer text-success' />
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Unpublished"> 
                                        <CloseCircleOutlined className='h5 pointer text-warning' /> 
                                    </Tooltip>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <style jsx>{`
                .course-container {
                    border: 1px solid #ccc; /* Add a faint border */
                    border-radius: 8px; /* Add rounded corners for a beautiful look */
                    padding: 10px; /* Add some padding to the course container */
                    margin-bottom: 10px; /* Add spacing between courses */
                }
            `}</style>
        </InstructorRoute>
    )
}

export default InstructorIndex
