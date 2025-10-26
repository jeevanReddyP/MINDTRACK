import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../Components/Sidebar";
import StreakChart from "../Components/StreakChart";
import HabitTree from "../Components/HabitTree";
import CalendarView from "../Components/CalendarView";
import BadgeCard from "../Components/BadgeCard";
import InsightsCard from "../Components/InsightsCard";
import { addHabit, deleteHabit, toggleHabitComplete } from "../redux/habitSlice";
import { BellIcon, Bars3Icon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { habits, streak, badges } = useSelector((state) => state.habits);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-1 flex-col ml-0 md:ml-64">
        {/* Top Navigation Bar */}
        <header className="fixed w-full md:w-[calc(100%-16rem)] md:ml-64 bg-white/90 backdrop-blur-sm shadow-sm z-20 border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 md:px-8">
            {/* Mobile Menu Icon */}
            <button className="md:hidden p-2 rounded-md hover:bg-gray-100 transition" aria-label="Open menu">
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            </button>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Notifications + Streak */}
            <div className="flex items-center space-x-5">
              <div className="relative">
                <BellIcon className="h-6 w-6 text-gray-700 hover:text-gray-900 transition" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </div>

              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1.5 rounded-full text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-green-700 font-medium">
                  {streak.current || 0} day streak
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <main className="pt-20 px-4 md:px-8 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-8 gap-8">
              {/* Left Section */}
              <div className="md:col-span-5 space-y-8">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-3xl p-6 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-1">
                    Welcome back, <span className="font-bold">User!</span> 👋
                  </h2>
                  <p className="text-white/90">
                    Keep going strong — every small habit adds up to big change.
                  </p>
                </div>

                {/* Habit Tree */}
                <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4">My Habits</h3>
                  <HabitTree
                    habits={habits}
                    onAddHabit={(parentId, name) =>
                      dispatch(addHabit({ parentId, name }))
                    }
                    onDeleteHabit={(habitId) => dispatch(deleteHabit(habitId))}
                    onToggleHabitComplete={(habitId) =>
                      dispatch(toggleHabitComplete(habitId))
                    }
                  />
                </div>

                {/* Streak Chart */}
                <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4">Streak Progress</h3>
                  <StreakChart />
                </div>
              </div>

              {/* Right Section */}
              <div className="md:col-span-3 space-y-8">
                <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
                  <CalendarView />
                </div>

                <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
                  <BadgeCard badges={badges} />
                </div>

                <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100">
                  <InsightsCard />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
