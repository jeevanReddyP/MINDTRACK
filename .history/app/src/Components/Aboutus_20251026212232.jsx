import React from 'react';
import { image1 } from '../assets/material';
import Whyus from './Whyus';

const Aboutus = () => {
  return (
    <>
      <section className="bg-white py-16">
        <div className="container mx-auto flex flex-col lg:flex-row items-center px-4 lg:px-8 max-w-7xl">
          
          {/* Left Column: Text Content */}
          <div className="lg:w-1/2 w-full lg:pr-12 mb-12 lg:mb-0 flex flex-col justify-center bg-emerald-50 p-6 rounded-lg">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              Struggling to build consistent habits that actually last?
            </h1>

            <ul className="space-y-3 text-lg text-gray-700 mb-8 list-inside list-none">
              <li>❌ Not getting a Chance to get a 1:1 Class Environment to become healthier?</li>
              <li>❌ Do not know how to get World-Class guidance at Home?</li>
              <li>❌ Want a Personalized Mentor to build good habits?</li>
            </ul>

            <div className="w-24 h-1 bg-emerald-500 mb-8 rounded-full"></div>

            <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
              If your answer is Yes to any of these questions — you’ve finally landed in the Right Place! Get your Personalized Habit-Building Program, designed to fit your lifestyle and goals, all within a LIVE 1:1 guidance environment.
            </p>

            <p className="text-base sm:text-lg text-gray-600">
              In this 1:1 Habit-Building Mentorship Program, our Expert Coaches will not only help you build strong, consistent habits, but also guide you in time management, self-discipline, and mindset growth — empowering you to become the best version of yourself.
            </p>
          </div>

          {/* Right Column: Image */}
          <div className="lg:w-1/2 w-full flex items-center justify-center bg-emerald-50 p-6 rounded-lg">
            <img
              src={image1}
              alt="Habit Building"
              className="max-w-full h-auto rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>

        </div>
      </section>

      {/* Why Us Section */}
      <Whyus />
    </>
  );
};

export default Aboutus;
