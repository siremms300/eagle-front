import React, { useState, useEffect } from 'react';
// import InstructorRoute from '../../components/routes/InstructorRoutes';

const EbookCreate = () => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [ebookInfo, setEbookInfo] = useState({});
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0) 
  const [values, setValues] = useState({
    title: '', 
    content: '',
    ebook: {}, 
})

  const handleEbookUpload = async (e) => {
    try {
      const file = e.target.files[0];

      setUploadButtonText(file.name);
      setUploading(true);

      const ebookData = new FormData();             
      ebookData.append("ebook", file); 

    //   const { data } = await axios.post(
    //     `/api/course/ebook-upload/${instructorId}`, 
    //     ebookData 
    //   ); 

    const {data} = await axios.post(`/api/course/ebook-upload/${instructorId}`, ebookData, {
        onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total))
        }
    }) 

    

      console.log(data);
    //   setEbookInfo(data); 
      setValues({...values, ebook: data}) 
      setUploadSuccess(true);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Ebook upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };




//   const handleVideo = async (e) => {
//     console.log(course) 
     
//     try {
//         const file = e.target.files[0] 
//         setUploadButtonText(file.name)  
//         setUploading(true)

//         const videoData = new FormData() 
//         videoData.append('video', file)  
//         //save progress bar and send video as form data to backend 
//         const {data} = await axios.post(`/api/course/video-upload/${course.instructor._id}`, videoData, {
//             onUploadProgress: (e) => {
//                 setProgress(Math.round((100 * e.loaded) / e.total))
//             }
//         }) 
//         // once response is recieved 
//         console.log(data) 
//         setValues({...values, video: data}) 
//         // setValues({ title: '', content: '', video: {} });

//         setUploading(false)

//     } catch (err) {
//         console.log(err) 
//         setUploading(false)
//         toast.error("Video upload failed") 
//     }
// }






  const handleSaveEbook = async () => {
    try { 
      const { data } = await axios.post(
        `/api/course/ebook-save/${instructorId}`, 
        ebookInfo
      );
  
      console.log(data);
      setEbookInfo(data);
      setUploadSuccess(true);
      setError(null);
      toast("Ebook saved successfully!");
    } catch (err) {
      console.log(err);
      setError("Ebook save failed. Please try again.");
      toast.error("Ebook save failed");
    }
  };
  

  return (
    <div> 
      <input
        type="file"
        accept=".pdf"
        onChange={handleEbookUpload}
        disabled={uploading}
      /> 

      {uploadSuccess && (
        <div className="alert alert-success">
          Ebook uploaded successfully!
          <p>Ebook name: {ebookInfo.name}</p>
          {/* Display any other relevant information */}
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>} 

      {uploadSuccess && (
        <button
          className="btn btn-primary"
          onClick={handleSaveEbook}
          disabled={uploading}
        >
          Save Ebook
        </button>
      )}
    </div>
  );
};

export default EbookCreate;
