 
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoadingBox from './loadingBox';


const Search = ()=> {

    const[destination, setDestination] = useState("")
    const [loading, setLoading] = useState(false); // Add loading state

    const router = useRouter()  

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch =()=> {
        setLoading(true); // Set loading to true when searching
        router.push(`/courses?destination=${destination}`);

        // setTimeout(() => {
        //     router.push(`/courses?destination=${destination}`);
        //     setLoading(false); // Set loading to false when the search is complete
        // }, 1000); // Replace 1000 with your desired loading duration
        setLoading(false); 
    }

    return(
        
        <div 
            className="headerSearch" 
        >
            <div className="headerSearchItem">
                    <input 
                        type="text" 
                        placeholder="search course, university or location"
                        className="headerSearchInput"  
                        onChange={e=> setDestination(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />  
                
                <button 
                    className="headerBtn"
                    onClick={handleSearch} 
                > 
                    {loading ? <LoadingBox /> : "Search"} 
                </button> 
            </div> 

            
        </div> 
    )
}  

export default Search 