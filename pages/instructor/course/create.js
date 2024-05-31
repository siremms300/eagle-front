
import { useContext, useState } from 'react'
import InstructorRoute from '../../../components/routes/InstructorRoutes'
// import { Context } from '../../../context'
// import { Option } from 'antd/es/mentions'
import CourseCreateForm from '../../../components/forms/CourseCreateForm'
import Resizer from 'react-image-file-resizer'
import { toast } from 'react-toastify'
import axios from 'axios'
import {useRouter} from 'next/router'



const CourseCreate = ()=>{
    // state 
    const [values, setValues] = useState({
        name: '',
        description: '',
        category: 'Forex Trading',
        price: '',
        uploading: false,
        paid: true,
        loading: false 
        
    }) 

    const [image, setImage] = useState({})
    const [preview, setPreview] = useState('')
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image') 

    const router = useRouter() 

    const handleChange = e => {
        setValues({...values, [e.target.name]: e.target.value}) 
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
            const {data} = await axios.post('/api/course', {
                ...values, 
                image,
            })
            toast("Awesome! Now you can start adding lessons to the course") 
            console.log('Redirecting to /instructor');
            router.push('/instructor') 
        } catch(err) {
            console.log(err)
            toast(err.response.data) 
        }
        
    }


    
    return(
        <InstructorRoute>
            <h1 className='jumbotron text-center bg-primary square'> Create Course </h1>
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
                   /> 
            </div>
            {/* <pre>{JSON.stringify(values, null, 4)}</pre>  */} 
            {/* <pre>{JSON.stringify(image, null, 4)}</pre>  */}
        </InstructorRoute> 
    )
}

export default CourseCreate 
