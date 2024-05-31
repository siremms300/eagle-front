
import { Button, Progress, Tooltip } from 'antd' 
import { CloseCircleFilled } from '@ant-design/icons'


const AddLessonForm = ({
    values, 
    setValues, 
    handleAddLesson, 
    uploading, 
    uploadButtonText,
    handleVideo,
    progress,
    handleRemoveVideo
    }) => { 

    return <div className='container pt-3'> 
        <form onSubmit={handleAddLesson}>
            <input 
                type='text' 
                className='form-control square' 
                onChange={e=> setValues({...values, title: e.target.value})} 
                value={values.title} 
                placeholder='Lesson Title'
                autoFocus
                required
            />  

            <textarea 
                className='form-control mt-3' 
                id='' 
                cols='7' 
                rows='7' 
                onChange={e => setValues({...values, content: e.target.value})}
                value={values.content} 
                placeholder='Lesson description'
            >
                    
            </textarea> 

            <div className='d-flex justify-content-center'>
                <label className='btn btn-dark btn-block text-left mt-3' style={{ width: '100%' }}>
                    {uploadButtonText}
                    <input onChange={handleVideo} type="file" accept='video/*' hidden/> 
                </label> 

                {(!uploading && values.video && values.video.Location) && (
                // Your content here
                    <Tooltip title='remove'>
                        <span onClick={handleRemoveVideo} className='pt-1 pl-3'>
                            <CloseCircleFilled className='text-danger d-flex justify-content-center pt-4 pointer'/>
                        </span>
                    </Tooltip>
                )}


                
            </div>


            {progress > 0 && <Progress 
                className='d-flex justify-content-center pt-2' 
                percent={progress} 
                steps={10}
            />}

            <Button 
                onClick={handleAddLesson} 
                className='col-md-3 mt-3' 
                size='large' 
                type='primary'
                loading={uploading}
                shape='round'
                style={{ width: '100%' }}
            >
                Save
            </Button>
        </form>
    </div> 
} 

export default AddLessonForm