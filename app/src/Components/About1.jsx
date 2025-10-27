import React from 'react'
import { video1 } from '../assets/material'

const About1 = () => {
  return (
    <>
      {/* Added p-8 for padding inside the background div */}
      <div className='bg-emerald-50 p-8'>
        {/* Corrected font-wieght:400; to font-normal and added mb-4 for spacing */}
        <h1 className='text-4xl font-normal text-center mb-4'>
          About MindTrack Wellness Tracker
        </h1>
        
        {/* Added mb-4 for spacing */}
        <p className='mb-4'>
            MindTrack Wellness Tracker is a dedicated digital platform founded on the principle of achieving holistic health and well-being. Our mission is to empower you by providing a real-time interactive dashboard for individual progress, alongside the option for a supportive community environment through group challenges. We believe in tracking progress, not just symptoms.
        </p>
        
        {/* Corrected the missing closing bracket (>) and added mb-4 for spacing */}
        <h2 className='text-3xl mb-4'>
          Personalized Insights, Real-Time Clarity
        </h2>
        
        <p>
          We move beyond static tracking. MindTrack imparts personalized insights using intuitive tools designed for clarity. These include advanced data visualization
        </p>
         
      </div>
      <div className=' flex justify-center item-center p-3 bg-emerald-100'>
      <video width="640" height="360" controls>
        <source src={video1} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    </>
  )
}

export default About1