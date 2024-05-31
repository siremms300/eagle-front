
import {Card, Badge} from 'antd' 
import Link from 'next/link' 
import { CurrencyFormatter } from '../../utils/helpers'

const {Meta} = Card 


const CourseCard = ({course}) => {

    const {name, instructor, price, image, slug, paid, category } = course 

    // <pre>{JSON.stringify(course)}</pre> 
    const linkStyle = {
        textDecoration: 'none', // Remove the underline
        color: 'inherit', // Inherit the text color from the parent element 
      };
    
    return(
        <Link href={`/course/${slug}`} style={linkStyle}> 
            <Card
                className='mb-4' 
                cover= {
                    <img 
                    // image is coming from amazon aws just incase it stops working 
                        // src={image.Location} 
                        alt={name} 
                        style={{height: '200px', objectFit: 'cover'}}
                        className='p-3'
                    /> 
                }
            >
                <h2 className='font-weight-bold'>{name}</h2> 
                <p>by {instructor.name}</p> 
                <Badge count={category} 
                    style={{backgroundColor: '#03a9f4'}} 
                    className='pb-2 mr-2'
                /> 
                <h4 className='pt-2'>{paid ? CurrencyFormatter({
                    amount: price,
                    currency: 'usd'
                }): "Free"}</h4> 

                <button className='w-100 btn' style={{ borderColor: '#007BFF' }}>
                    Enroll
                </button>
            </Card>
        </Link>
    )
}




export default CourseCard



