
import {useState, useEffect} from 'react' 
import { Select, Button, Input, Avatar, Badge } from 'antd' 
import { SaveOutlined } from '@ant-design/icons'


const {Option} = Select 


const CourseCreateForm = ({
    handleChange, 
    handleImage, 
    handleImageRemove,
    handleSubmit, 
    values, 
    setValues,
    preview,
    uploadButtonText, 
    editPage = false
 })=> {

    // const children = []
    
    // for(let i=0; i <= 100; i++) {
    //     children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>)
    // }

    return (
        <>
            {values && 


                <form onSubmit={handleSubmit}> 
                    <div className='form-group'>
                        <input 
                            type='text' 
                            name='name' 
                            className="form-control mb-4 p-4" 
                            placeholder='Course name' 
                            value={values.name} 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className='form-group'>
                        <textarea 
                            name="description" 
                            className="form-control mb-4 p-4"
                            // cols="7" 
                            rows="7" 
                            style={{ width: '100%', border: '1px solid lightblue', borderRadius: '4px', outline: 'none' }}
                            placeholder='Course description' 
                            value={values.description}
                            onChange={handleChange}
                        > 
                        </textarea>
                    </div> 

                    <div className='form-group'>
                        <Select
                            value={values.category}
                            style={{ width: '100%' }}
                            size='large'
                            onChange={value => setValues({ ...values, category: value })}
                            placeholder='Select a category'
                        >
                            <Option value='Forext Trading'>Forext Trading</Option>
                            <Option value='Fitness'>Fitness</Option>
                            <Option value='Finance'>Finance</Option> 
                            <Option value='Finance'>e-Book</Option> 
                        </Select> 
                    </div>

                    <div className='form-row pt-3'>
                        <div className='col'>
                            <div className='form-group'> 
                                <Select
                                    value={values.paid}
                                    style={{width: '100%'}}
                                    size='large'
                                    onChange={v => setValues({...values, paid: !values.paid})}
                                >
                                    <Option value={true}>Paid</Option>
                                    <Option value={false}>Free</Option>
                                </Select>
                            </div>
                        </div>

                        {values.paid && 
                            
                            <div className='form-group pt-2'>
                                {/* <Select
                                    defaultValue="$0"
                                    style={{width:'100%'}}
                                    onChange={v => setValues({...values, price: v})}
                                    tokenSeparators={[,]}
                                    size='large' 
                                >
                                    {children}
                                </Select> */}

                                    <Input
                                        type='number'
                                        name='price'
                                        placeholder='Course price'
                                        value={values.price}
                                        onChange={handleChange}
                                        size='large'
                                    />
                            </div>
                            
                        }
                    </div> 


                    <div className='form-row pt-3'>
                        <div className='col'>
                            <div className='form-group'>
                                <label 
                                    className='btn btn-outline-secondary btn-block text-left'
                                    style={{ width: '100%' }} 
                                >
                                    {/* {values.loading ? 'Uploading' : 'Upload Image'}  */} 
                                    {uploadButtonText}
                                    <input 
                                        type='file' 
                                        name='image'
                                        onChange={handleImage}
                                        accept='image/*' 
                                        hidden
                                    /> 
                                </label>
                            </div>
                        </div>

                        {preview && (
                            
                            <Badge count="X" onClick={handleImageRemove} className='pointer'> 
                                <Avatar width={200} src={preview}/> 
                            </Badge>
                            
                        )} 

                        { editPage && values.image && <Avatar width={200} src={values.image.Location}/> }
                    </div>

                    <div className='row pt-3'>
                        <div className='col'>
                            <Button 
                                onClick={handleSubmit} 
                                disabled={values.loading || values.uploading}
                                className='btn btn-primary'
                                icon={<SaveOutlined/>}
                                // style={{ width: '100%', paddingBottom: '10px' }} 
                                type="primary"
                                size="large"
                                shape='round'
                            >
                                {values.loading ? 'Saving...' : 'Save and Continue'}
                            </Button>
                        </div>
                    </div>
                </form>}
        </>
    )
    
}

export default CourseCreateForm