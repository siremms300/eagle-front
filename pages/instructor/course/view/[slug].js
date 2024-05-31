
import {useState, useEffect} from 'react' 
import {useRouter} from 'next/router' 
import InstructorRoute from '../../../../components/routes/InstructorRoutes'
import axios from 'axios' 
import {Avatar, Tooltip, Button, Modal, List} from 'antd'
import { 
        EditOutlined, 
        CheckOutlined, 
        UploadOutlined, 
        QuestionCircleOutlined, 
        QuestionOutlined, 
        CloseOutlined,
        UserSwitchOutlined
    } from '@ant-design/icons' 
import AddLessonForm from '../../../../components/forms/AddLessonForm'
// import ReactMarkdown from "react-markdown" 
import {toast} from 'react-toastify' 
import Item from "antd/lib/list/Item";




const CourseView = ()=>{

    const [course, setCourse] = useState({}) 
    // for lessons 
    const [visible, setVisible] = useState(false) 
    const [progress, setProgress] = useState(0) 
    const [values, setValues] = useState({
        title: '',
        content: '',
        video: {}, 
    })




    // student count state 
    const[students, setStudents] = useState() 

    useEffect(()=> {
        course && studentCount()
    }, [])

    const studentCount = async()=> {
        const {data} = await axios.post(`/api/instructor/student-count`, {
            courseId: course._id
        })
        console.log("NUMBER OF STUDENTS: ", data)
        setStudents(data.length)
    }

    const router = useRouter() 

    const [uploading, setUploading] = useState(false) 
    const [uploadButtonText, setUploadButtonText] = useState("Upload video") 
    const {slug} = router.query

    useEffect(()=>{
        loadCourse()
    }, [slug]) 

    const loadCourse = async()=> {
        const {data} = await axios.get(`/api/course/${slug}`) 
        setCourse(data)
    }

    // functions for adding lesson 
    const handleAddLesson = async(e) => {
        e.preventDefault() 
        // console.log(values) handleEbookUpload
        try {
            const { data } = await axios.post(
                `/api/course/lesson/${slug}/${course.instructor._id}`, 
                values
            ) 
            console.log(data) 
            setValues({...values, title: '', content: '', video: {}})  
            setProgress(0) 
            setUploadButtonText("Upload video") 
            setVisible(false) 
            setCourse(data) 
            toast("Lesson added")
        } catch (err) {
            console.log(err)
            toast.error("Lesson add failed")
        }
    } 

    const handleVideo = async (e) => {
        console.log(course) 
         
        try {
            const file = e.target.files[0] 
            setUploadButtonText(file.name)  
            setUploading(true)

            const videoData = new FormData() 
            videoData.append('video', file)  
            //save progress bar and send video as form data to backend 
            const {data} = await axios.post(`/api/course/video-upload/${course.instructor._id}`, videoData, {
                onUploadProgress: (e) => {
                    setProgress(Math.round((100 * e.loaded) / e.total))
                }
            }) 
            // once response is recieved 
            console.log(data) 
            setValues({...values, video: data}) 
            // setValues({ title: '', content: '', video: {} });

            setUploading(false)

        } catch (err) {
            console.log(err) 
            setUploading(false) 
            toast.error("Video upload failed") 
        }
    }

    const handleRemoveVideo = async ()=> {
        
        try {
            setUploading(false)
            const {data} = await axios.post(`/api/course/remove-video/${course.instructor._id}`, values.video) 
            console.log(data) 
            setValues({...values, video: {}}) 
            setProgress(0) 
            setUploading(false) 
            setUploadButtonText("Upload another video") 
        } catch (err) {
            console.log(err)
            setUploading(false)
            toast.error("Video remove failed") 
        }
    }


    


    // const handleDrag = (e, index) => {
    //     e.dataTransfer.setData('itemIndex', index)
    // } 
 
    // const handleDrop = (e, index) => {
        
    //     const movingItemIndex = e.dataTransfer.getData('itemIndex') 
    //     const targetItemIndex = index
    //     let allLessons = values.lessons 

    //     let movingItem = allLessons[movingItemIndex]  //the clicked item meant to be reordered 
    //     allLessons.splice(movingItemIndex, 1) // remove one item from the given index
    //     allLessons.splice(targetItemIndex, 0, movingItem) // push item after target item index 

    //     setValues({...values, lessons: [...allLessons]})
    // }


    const handlePublish = async(e, courseId)=> {
       
        try {
            let answer = window.confirm("once you publish your course, it will be live for users to enroll") 
            if(!answer) return

            const {data} = await axios.put(`/api/course/publish/${courseId}`) 
            toast.success("Congratulatons! your course has been published") 
            setCourse(data)
        } catch (err) {
            console.log(err)
            toast.error("Course publish failed. Try again ")  
        }
 
    }  

    const handleUnpublish = async(e, courseId)=> {
        try {
            let answer = window.confirm("once you unpublish your course, it will no longer be live for users to enroll") 
            if(!answer) return

            const {data} = await axios.put(`/api/course/unpublish/${courseId}`) 
            toast.success("course has been published") 
            setCourse(data)
        } catch (err) {
            console.log(err) 
            toast.error("Course publish failed. Try again ")  
        }
    }

    return(
        <InstructorRoute>
            <div className='container-fluid pt-3'> 
            {/* {<pre>{JSON.stringify(course, null, 4)}</pre>} */}
                
                {course && (<div className='container-fluid pt-1'>
                    <div className='media pt-2'>
                        <Avatar size={80} src={course.image ? course.image.Location : '/course.png'} />
                         <div className='media-body pl-2'>
                            <div className='row'>
                                <div className='col'>
                                    <h5 className='mt-2 text-primary'>{course.name}</h5> 
                                    <p style={{marginTop: '-10px'}}>{course.lessons && course.lessons.length} Lessons</p> 
                                    <p style={{marginTop: '-15px', fontSize: '11px'}}>{course.category}</p> 

                                </div> 

                                 
                                <div className='d-flex pt-1'>  

                                {/* tooltip for number of students enrolled */}

                                    <Tooltip title={`${students} Enrolled`} >
                                        <UserSwitchOutlined 
                                            className='h5 pointer text-info mr-2 float-right'
                                        />
                                    </Tooltip> 


                                    <Tooltip title="Edit" >
                                        <EditOutlined 
                                            onClick={()=> router.push(`/instructor/course/edit/${slug}`)} 
                                            className='h5 pointer text-warning mr-2 float-right'
                                        />
                                    </Tooltip> 
                                   

                                    {course.lessons && course.lessons.length < 1 ? (<Tooltip title="min 1 lesson required to publish">
                                        <QuestionOutlined className='h5 pointer text-danger'/>   
                                    </Tooltip>) : course.published ? 
                                    
                                    (<>
                                    <Tooltip title="Unpublish">
                                        <CloseOutlined onClick={e => handleUnpublish(e, course._id)} className='h5 pointer text-danger'/>
                                    </Tooltip> 
                                    &nbsp;&nbsp;
                                    </>)
                                    :
                                    (<>
                                    <Tooltip title="Publish">
                                        <CheckOutlined onClick={e => handlePublish(e, course._id)} className='h5 pointer text-success'/>
                                    </Tooltip>
                                    &nbsp;&nbsp;
                                    </>)
                                }

                                </div>

                            </div>
                         </div> 

                         <div className='row'>
                            {/* Course Price */}
                            <div className='col'>
                                Price: {course.price}
                            </div>
                         </div>

                         <br />

                         <div className='row'>
                            <div className='col'>
                                {/* for now markdown is not working but we will find the issue and get it to work later */}
                                {/* <ReactMarkdown source={course.description} />  */} 
                                {course.description} 
                                
                            </div>
                         </div>

                         

                    </div>
                    <br />
                    {/* the button is means to display a modal for adding lesson. onclick will make the modal visible hence the setVisible state */}
                    <div className='row'>
                        <Button
                            onClick={()=> setVisible(true)}
                            className='col-md-6 offset-md-3 text-center'
                            type='primary'
                            shape='round'
                            icon={<UploadOutlined />} 
                            size='large'
                            
                        >
                            Add Lesson
                        </Button>
                    </div> 

                    <Modal title="+Add lesson"
                        centered
                        open={visible}
                        onCancel={()=>setVisible(false)} 
                        footer={null}
                    >
                        <AddLessonForm 
                            values={values} 
                            setValues={setValues} 
                            handleAddLesson={handleAddLesson}
                            uploading={uploading} 
                            uploadButtonText={uploadButtonText} 
                            handleVideo={handleVideo}  
                            progress={progress} 
                            handleRemoveVideo={handleRemoveVideo}
                        /> 

                    </Modal> 

                    <hr />

                    <div className="row pb-5">
                        <div className="col lesson-list">
                            <h4>
                            {course && course.lessons && course.lessons.length} Lessons
                            </h4>
                            <List
                                // onDragOver={e => e.preventDefault()}
                                itemLayout="horizontal"
                                dataSource={course && course.lessons}
                                renderItem={(item, index) => (
                                <Item
                                    // draggable
                                    // onDragStart={e => handleDrag(e, index)}
                                    // onDrop={e => handleDrop(e, index)} 
                                >
                                <Item.Meta
                                    avatar={<Avatar>{index + 1}</Avatar>}
                                    title={item.title}
                                ></Item.Meta>
                                </Item>
                            )}
                            ></List>
                        </div>
                    </div>

                 </div> 
                 )}
            </div>
        </InstructorRoute>
    )

}

export default CourseView 