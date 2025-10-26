import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/Sidebar';
import StreakChart from '../components/StreakChart';
import HabitTree from '../components/HabitTree';
import CalendarView from '../components/CalendarView';
import BadgeCard from '../Components';
import InsightsCard from "../Components/InsightsCard";
import { addHabit, deleteHabit, toggleHabitComplete } from '../redux/habitSlice';
import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { habits, streak, badges } = useSelector((state) => state.habits);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top App Bar */}
        <div className="fixed w-full md:ml-64 bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center md:hidden">
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <BellIcon className="h-6 w-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </div>
              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-green-700 font-medium">{streak.current} day streak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content below AppBar */}
        <div className="pt-16 px-4 md:px-6 flex-1">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
              {/* Left Column */}
              <div className="md:col-span-5 space-y-6">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl p-6 shadow">
                  <h2 className="text-2xl font-semibold mb-2">Welcome back, User! 👋</h2>
                  <p className="opacity-90">Track your habits and build a better version of yourself, one day at a time.</p>
                </div>

                {/* Habit Tree */}
                <div className="bg-white rounded-2xl p-4 shadow">
                  <h3 className="text-lg font-semibold mb-3">My Habits</h3>
                  <HabitTree
                    habits={habits}
                    onAddHabit={(parentId, name) => dispatch(addHabit({ parentId, name }))}
                    onDeleteHabit={(habitId) => dispatch(deleteHabit(habitId))}
                    onToggleHabitComplete={(habitId) => dispatch(toggleHabitComplete(habitId))}
                  />
                </div>

                {/* Streak Chart */}
                <div className="bg-white rounded-2xl p-4 shadow">
                  <StreakChart />
                </div>
              </div>

              {/* Right Column */}
              <div className="md:col-span-3 space-y-6">
                <div className="bg-white rounded-2xl p-4 shadow">
                  <CalendarView />
                </div>

                <div className="bg-white rounded-2xl p-4 shadow">
                  <BadgeCard badges={badges} />
                </div>

                <div className="bg-white rounded-2xl p-4 shadow">
                  <InsightsCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
