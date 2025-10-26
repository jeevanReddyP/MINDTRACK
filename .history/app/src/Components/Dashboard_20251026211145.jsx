// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FitnessCenterIcon,
  WaterDropIcon,
  SelfImprovementIcon,
  EventIcon,
  AddIcon,
  ArrowRightIcon,
} from '@heroicons/react/outline'; // Using Heroicons for icons

// Mock data
const stats = [
  { title: 'Habits Tracked', value: '5/8', icon: <FitnessCenterIcon className="h-6 w-6" /> , color: 'bg-blue-500'},
  { title: 'Water Intake', value: '6/8 cups', icon: <WaterDropIcon className="h-6 w-6" />, color: 'bg-teal-400'},
  { title: 'Meditation', value: '10 min', icon: <SelfImprovementIcon className="h-6 w-6" />, color: 'bg-green-500'},
];

const todayHabits = [
  { id: 1, name: 'Morning Run', completed: true, time: '7:00 AM' },
  { id: 2, name: 'Drink Water', completed: false, time: '8:00 AM' },
  { id: 3, name: 'Read Book', completed: false, time: '9:00 PM' },
];

const upcomingEvents = [
  { id: 1, title: 'Team Meeting', time: '2:00 PM', date: 'Today' },
  { id: 2, title: 'Yoga Class', time: '6:30 PM', date: 'Tomorrow' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [habits, setHabits] = useState(todayHabits);

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex items-center space-x-4"
          >
            <div className={`${stat.color} rounded-full p-3 text-white`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.title}</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Habits & Upcoming Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Habits */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Today's Habits
            </h2>
            <button
              onClick={() => navigate('/habits')}
              className="text-blue-500 flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between py-3 cursor-pointer"
                onClick={() => toggleHabit(habit.id)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      habit.completed ? 'bg-green-500 text-white' : 'bg-gray-300'
                    }`}
                  >
                    {habit.completed ? '✓' : ''}
                  </div>
                  <div>
                    <p
                      className={`font-medium ${
                        habit.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'
                      }`}
                    >
                      {habit.name}
                    </p>
                    <p className="text-gray-400 text-sm">{habit.time}</p>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => navigate('/habits/new')}
              className="mt-3 w-full text-blue-500 flex items-center justify-center space-x-2 border-t pt-2"
            >
              <AddIcon className="h-5 w-5" />
              <span>Add New Habit</span>
            </button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Upcoming Events
            </h2>
            <button
              onClick={() => navigate('/calendar')}
              className="text-blue-500 flex items-center space-x-1"
            >
              <span>View Calendar</span>
              <ArrowRightIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between py-3 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white">
                    <EventIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {event.date} • {event.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => navigate('/calendar/new')}
              className="mt-3 w-full text-blue-500 flex items-center justify-center space-x-2 border-t pt-2"
            >
              <AddIcon className="h-5 w-5" />
              <span>Add New Event</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
