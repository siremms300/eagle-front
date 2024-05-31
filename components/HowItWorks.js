import React from 'react';

const HowItWorks = () => {
    return (
        <section className="category">
            {/* <h1 className="heading">How it works</h1> */}
            <div className="box-container">
                <div className="box">
                   
                    {/* <img src="../frontend/images/regions/america.png" alt="America" /> */}
                    <div>
                        <h4>Explore</h4>
                    </div>
                  
                </div>

                <div className="box">
                    
                    {/* <img src="../frontend/images/regions/asia.png" alt="Asia" /> */}
                    <div>
                        <h4>Apply</h4>
                    </div>
                    
                </div>

                <div className="box">
                   
                    {/* <img src="../frontend/images/regions/canada.png" alt="Canada" /> */}
                    <div>
                        <h4>Accept</h4> 
                    </div>
                    
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
