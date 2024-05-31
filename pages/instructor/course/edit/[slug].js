
import { useContext, useState, useEffect } from 'react'
import InstructorRoute from '../../../../components/routes/InstructorRoutes'
// import { Context } from '../../../context'
// import { Option } from 'antd/es/mentions'
import CourseCreateForm from '../../../../components/forms/CourseCreateForm'
import Resizer from 'react-image-file-resizer'
import { toast } from 'react-toastify'
import axios from 'axios'
import {useRouter} from 'next/router'
// import Item from 'antd/es/list/Item'
import { Avatar, List, Modal } from 'antd' 
import {DeleteOutlined} from '@ant-design/icons'
import UpdateLessonForm from '../../../../components/forms/updateLessonForm'

const { Item } = List;


const CourseEdit = ()=>{
    // state 
    const [values, setValues] = useState({
        name: '',
        description: '',
        category: 'Forex Trading',
        price: '',
        uploading: false,
        paid: true,
        loading: false, 
        lessons: []
    }) 

    const [image, setImage] = useState({})
    const [preview, setPreview] = useState('')
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image') 
    const [uploadVideoButtonText, setUploadVideoButtonText] = useState("Upload video") 
    const [progress, setProgress] = useState(0) 
    const [uploading, setUploading] = useState(false) 

    const router = useRouter() 
    const {slug} = router.query 

    // state for updating lessons 
    const [visible, setVisible] = useState(false) 
    const [current, setCurrent] = useState({})

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value}) 
    } 

    useEffect(()=> {
        loadCourse()
    }, [slug])

    const loadCourse = async()=> {
        const {data} = await axios.get(`/api/course/${slug}`) 
        if(data) setValues(data) 
        if(data && data.image) setImage(data.image)  
    }

    const handleImage = (e)=> { 
        
        let file = e.target.files[0]
        setPreview(window.URL.createObjectURL(file))
        setUploadButtonText(file.name) 
        setValues({...values, loading: true})

        // image resize
        Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async(uri)=>{

            try {
                
                let {data} = await axios.post('/api/course/upload-image', { 

                    image: uri, 
                })  
                console.log('IMAGE UPLOADED', data) 
                //set image in the state 

                setImage(data) 
                setValues({...values, loading: false})
                toast('Image uploaded successfully')
                // router.push('/instructor') 

            } catch (err) {
                console.log(err)
                setValues({...values, loading: false})
                toast('Image upload failed. Try again')
            }
        })
    }

    const handleImageRemove = async () => {
        
        try {
            setValues({...values, loading: true})
            const res = await axios.post('/api/course/remove-image', {image})
            setImage({})
            setPreview('') 
            setUploadButtonText('Upload Image')
            setValues({...values, loading: false})

        } catch (err) {
            console.log(err)  
            setValues({...values, loading: false})
            toast.error('Failed to delete image')
        }
    } 

    const handleSubmit = async(e) => {
        e.preventDefault() 
        // console.log("Submit button is working ")
        // console.log(values) 

        try{
            const {data} = await axios.put(`/api/course/${slug}`, { 
                ...values, 
                image,
            }) 
            toast("Course has been updated. You can update the lessons now") 
            // console.log('Redirecting to /instructor');
            // for now we will disable redirect
            router.push('/instructor')  
        } catch(err) {
            console.log(err)
            toast(err.response.data) 
        }      
       
    } 


    const handleDrag = (e, index) => {
        e.dataTransfer.setData('itemIndex', index)
    } 
 
    const handleDrop = async (e, index) => {
        
        const movingItemIndex = e.dataTransfer.getData('itemIndex') 
        const targetItemIndex = index
        let allLessons = values.lessons 

        let movingItem = allLessons[movingItemIndex]  //the clicked item meant to be reordered 
        allLessons.splice(movingItemIndex, 1) // remove one item from the given index
        allLessons.splice(targetItemIndex, 0, movingItem) // push item after target item index 

        setValues({...values, lessons: [...allLessons]}) 
        // save the new lessons order in database 
        const {data} = await axios.put(`/api/course/${slug}`, { 
            ...values, 
            image,
        })  
        toast("Lessons rearranged and saved to databse")
    }

    const handleDelete = async (index)=> {
        // console.log("Deleted the lesson")  
        
        // frontend part 
        const answer = window.confirm("Are you sure you want to delete? ") 
        if(!answer) return
        let allLessons = values.lessons 
        const removed = allLessons.splice(index, 1) 
    
        setValues({...values, lessons: allLessons}) 
        // send the request to backend 
        const {data} = await axios.put(`/api/course/${slug}/${removed[0]._id}`)  
        console.log(data) 
    } 


    // functions for updating the video 

    const handleVideo = async (e)=> {
        // remove previous video if any 
        if(current.video && current.video.Location ) {
            const res = await axios.post(`/api/course/remove-video/${values.instructor._id}`, current.video) 
        } 
        // upload new video 
        const file = e.target.files[0] 
        setUploadVideoButtonText(file.name) 
        setUploading(true) 
        // send video as form data for uploading 
        const videoData = new FormData() 
        videoData.append('video', file)  
        videoData.append('courseId', values._id) 
        // save progress bar and send video as form data to backend 
        const {data} = await axios.post(`/api/course/video-upload/${values.instructor._id}`, videoData, {
            onUploadProgress: (e)=> setProgress(Math.round((100 * e.loaded) / e.total)) 
        }) 
        console.log(data) 
        setCurrent({...current, video: data}) 
        setUploading(false) 
    }

    const handleUpdateLesson = async(e)=> {
        // console.log("Lesson updated") 
        e.preventDefault()
        const {data} = await axios.put(`/api/course/lesson/${slug}/${current._id}`, current) 
        setUploadVideoButtonText("Upload video")
        setVisible(false)

            // update UI 
        if(data.ok) {
            let arr = values.lessons 
            const index = arr.findIndex((el)=> el._id === current._id) 
            arr[index] = current 
            setValues({...values, lessons: arr}) 
            toast("Lesson updated") 
            // router.push('/instructor') 
        }

    }

    
     
    return(
        <InstructorRoute>
            <h1 className='jumbotron text-center bg-primary square'> Update Course </h1>
            {/* {JSON.stringify(values, null, 4)} */} 
            {/* <div className="container col-md-4 offset-md-4 pb-5"> */}
            {/* <div className="pt-3 pb-3"> */}
            <div className="container col-md-8 offset-md-2 pb-5"> 
                   <CourseCreateForm 
                    handleSubmit={handleSubmit} 
                    handleImage={handleImage} 
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                    preview={preview} 
                    uploadButtonText={uploadButtonText} 
                    handleImageRemove={handleImageRemove} 
                    editPage={true}
                   /> 
            </div>
            {/* <pre>{JSON.stringify(values, null, 4)}</pre>  */} 
            {/* <pre>{JSON.stringify(image, null, 4)}</pre>  */} 

            <hr />
            <div className="row pb-5">
                <div className="col lesson-list">
                    <h4>
                    {values && values.lessons && values.lessons.length} Lessons
                    </h4>
                    <List
                        onDragOver={e => e.preventDefault()}
                        itemLayout="horizontal"
                        dataSource={values && values.lessons}
                        renderItem={(item, index) => (
                        <Item
                            draggable
                            onDragStart={e => handleDrag(e, index)}
                            onDrop={e => handleDrop(e, index)} 
                        >
                        <Item.Meta
                            onClick={()=> {
                                setVisible(true) 
                                setCurrent(item)
                            }}
                            avatar={<Avatar>{index + 1}</Avatar>}
                            title={item.title}
                        >  </Item.Meta> 

                        <DeleteOutlined 
                            onClick={()=> handleDelete(index)} 
                            className="text-danger float-right" 
                        /> 
                        </Item>
                    )}
                    ></List>
                </div>
            </div> 
            <Modal 
                title='update lesson' 
                centered open={visible} 
                onCancel={()=> setVisible(false)} 
                footer={null}
            > 
                <UpdateLessonForm 
                    current={current} 
                    setCurrent={setCurrent} 
                    handleVideo={handleVideo}
                    handleUpdateLesson={handleUpdateLesson} 
                    uploadVideoButtonText={uploadVideoButtonText} 
                    progress={progress} 
                    uploading={uploading}
                /> 
                {/* <pre>{JSON.stringify(current, null, 4)}</pre> */}
            </Modal>
        </InstructorRoute> 
    )
}

export default CourseEdit
