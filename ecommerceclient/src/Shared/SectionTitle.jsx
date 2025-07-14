import React from 'react';

const SectionTitle = ({heading,subheading}) => {
    return (
        <div  className='w-[400px] mx-auto'>
            <h1 className='text-yellow-500 text-3xl text-center '>---{heading}---</h1>
            <p className=' text-3xl uppercase text-center'>---{subheading}---</p>
            
        </div>
    );
};

export default SectionTitle;