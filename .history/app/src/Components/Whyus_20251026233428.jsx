import React from 'react'
import { image2, image3, image4, image5, } from '../assets/material'
import MindTrackFooter from './Footer'

const Whyus = () => {
  // Define your cards array
  const cards = [
    {
      image: image2,
      comment: "High-quality materials for lasting performance.",
    },
    {
      image: image3,
      comment: "Dedicated customer support available 24/7.",
    },
    {
      image: image4,
      comment: "Affordable prices with unbeatable value.",
    },
    {
      image: image5,
      comment: "Fast delivery and easy returns guaranteed.",
    },
  ]

  return (
    <>
      <div className="px-6 py-10">
        <h1 className="text-center text-3xl font-bold underline underline-offset-4 mb-10">
          Why Choose Us?
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden text-center p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={card.image}
                alt={Card ${index + 1}}
                className="w-full h-40 object-cover mb-4 rounded-md"
              />
              <p className="text-gray-700 font-medium">{card.comment}</p>
            </div>
          ))}
        </div>
       
      </div>
      <MindTrackFooter/>

    </>
  )
}

export default Whyus