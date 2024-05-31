import { useEffect, useState, createElement } from "react"; 
import { useRouter } from "next/router";  
import axios from "axios"; 
import StudentRoute from "../../../components/routes/StudentRoute"; 
import {Menu, Avatar, Button } from "antd" 
import ReactPlayer from 'react-player'
import ReactMarkdown from 'react-markdown'
import { 
    PlayCircleOutlined, 
    MenuFoldOutlined, 
    MenuUnfoldOutlined,
    CheckCircleFilled,
    MinusCircleFilled
} from "@ant-design/icons"; 

const { Item } = Menu;


const SingleCourse = ()=> { 

    const[clicked, setClicked] = useState(-1) 
    const[collapsed, setCollapsed] = useState(false) 
    const[loading, setLoading] = useState(false)
    const[course, setCourse] = useState({lessons: []})    // course.lessons 
    const[completedLessons, setCompletedLessons] = useState([])
    // force state update 
    const[updateState, setUpdateState] = useState(false)

    // router 
    const router = useRouter() 
    const {slug} = router.query 

    useEffect(()=>{
        if(slug) loadCourse()
    }, [slug]) 

    useEffect(()=>{
        if(course) loadCompletedlessons()
    }, [course])

    const loadCompletedlessons = async()=> {
        const {data} = await axios.post(`/api/list-completed`, {courseId: course._id}) 
        console.log("COMPLETED LESSONS: ", data) 
        setCompletedLessons(data) 
    }

    const loadCourse = async()=>{
        const {data} = await axios.get(`/api/user/course/${slug}`) 
        setCourse(data)
    }

    const markCompleted = async ()=>{
        
        try {
            const{data} = await axios.post(`/api/mark-completed`, {
                courseId: course._id, 
                lessonId: course.lessons[clicked]._id
            }) 
            console.log(data) 
            setCompletedLessons([...completedLessons, course.lessons[clicked]._id])
        } catch (err) {
            console.log(err)
        }
    }

    const markIncompleted = async ()=> {
        try{
            const {data} = await axios.post(`/api/mark-incompleted`, {
                courseId: course._id, 
                lessonId: course.lessons[clicked]._id
            })
            console.log(data) 
            const all = completedLessons  
            const index = all.indexOf(course.lessons[clicked]._id) 
            if(index > -1) {
                all.splice(index, 1) 
                setCompletedLessons(all) 
                setUpdateState(!updateState)
            }
        } catch(err) {
            console.log(err)
        }
    }

    return( 
         
        <StudentRoute>
            <div className="row">
                <div style={{maxWidth: 320}}> 
                    <Button 
                        className="text-primary mt-1 btn-block mb-2"
                        onClick={()=> setCollapsed(!collapsed)} 
                        style={{ width: '100%' }}
                    >
                        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)} 
                        {!collapsed && "Lessons"}
                    </Button>
                    <Menu
                        defaultSelectedKeys={[clicked]}
                        inlineCollapsed={collapsed} 
                        style={{height: '80vh', overflow: 'scroll'}}
                    >
                        {course.lessons.map((lesson, index)=> (
                            <Item 
                                onClick={()=> setClicked(index)} 
                                key={index} 
                                icon={<Avatar >{index + 1}</Avatar>}> 
                                {lesson.title.substring(0, 40)} 
                                {completedLessons && completedLessons.includes(lesson._id) ? 
                                
                                    (<CheckCircleFilled 
                                        className="float-right text-primary pl-2"
                                        style={{marginTop: "13px", float: 'right'}}
                                    />) : 
                                    (<MinusCircleFilled 
                                        className="float-right text-danger pl-2"
                                        style={{marginTop: "13px", float: 'right'}}
                                />)}

                            </Item>
                        ))}
                    </Menu>
                </div> 

                <div className='col'>
                    {clicked !== -1 ? (
                        <> 

                            <div className="col alert alert-primary square">
                                {course.lessons[clicked].title.substring(0, 30)}  
                                
                               {completedLessons.includes(course.lessons[clicked]._id) ? (
                                <span 
                                    className="float-right pointer" 
                                    onClick={markIncompleted} 
                                    style={{ float: 'right' }}
                                > 
                                     Mark as incompleted
                                </span>
                               ) : (
                                <span 
                                    className="float-right pointer" 
                                    onClick={markCompleted} 
                                    style={{ float: 'right' }}
                                > 
                                     Mark as completed
                                </span> 
                               )
                               
                               
                               
                               }
                            </div>

                            {course.lessons[clicked].video && course.lessons[clicked].video.Location && (
                                <>
                                    <div className="wrapper">
                                        <ReactPlayer 
                                            className="player" 
                                            playing={true}
                                            url={course.lessons[clicked].video.Location} 
                                            width= "100%"    
                                            height="500px" 
                                            onEnded={()=> markCompleted()}
                                            controls 
                                            config={{
                                                file: {
                                                    attributes: {
                                                        controlsList: 'nodownload', // Disable download option
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </>
                            )}


                            <ReactMarkdown 
                                source={course.lessons[clicked].content} 
                                className="single-post" 
                            />
                        </>
                    ) : (
                        <div className="d-flex justify-content-center p-5">
                            <div className="text-center p-5">
                                <PlayCircleOutlined className="text-primary display-1 p-5" />
                                <p className="lead">Click on the lessons to start learning</p>
                            </div>
                        </div>
                    )}

                </div>
            </div> 
        </StudentRoute> 

    )
}

export default SingleCourse