// src/components/CalendarView.js
import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, isToday } from 'date-fns';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  PlusIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { id: 1, title: 'Morning Run', type: 'exercise', date: '2023-05-15', time: '07:00', duration: 30, completed: true },
    { id: 2, title: 'Team Meeting', type: 'work', date: '2023-05-15', time: '14:00', duration: 60, completed: false },
    { id: 3, title: 'Evening Meditation', type: 'meditation', date: '2023-05-15', time: '20:00', duration: 15, completed: false },
    { id: 4, title: 'Gym Session', type: 'exercise', date: '2023-05-17', time: '18:00', duration: 60, completed: false },
    { id: 5, title: 'Journaling', type: 'journal', date: '2023-05-17', time: '21:00', duration: 20, completed: false },
  ]);

  const nextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const prevWeek = () => setCurrentDate(addDays(currentDate, -7));
  const goToToday = () => { setCurrentDate(new Date()); setSelectedDate(new Date()); };

  const getEventColor = (type) => {
    const colors = {
      exercise: 'bg-blue-200 text-blue-800',
      work: 'bg-purple-200 text-purple-800',
      meditation: 'bg-green-200 text-green-800',
      journal: 'bg-teal-200 text-teal-800',
      water: 'bg-cyan-200 text-cyan-800',
      default: 'bg-gray-200 text-gray-800',
    };
    return colors[type] || colors.default;
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
        <button
          onClick={goToToday}
          className="px-2 py-1 border rounded flex items-center gap-1 text-sm hover:bg-gray-100"
        >
          <CalendarDaysIcon className="w-4 h-4" /> Today
        </button>
      </div>
      <div className="flex gap-2">
        <button onClick={prevWeek} className="p-1 rounded hover:bg-gray-100"><ChevronLeftIcon className="w-5 h-5" /></button>
        <button onClick={nextWeek} className="p-1 rounded hover:bg-gray-100"><ChevronRightIcon className="w-5 h-5" /></button>
      </div>
    </div>
  );

  const renderDays = () => {
    const startDate = startOfWeek(currentDate, { weekStartsOn: 0 });
    return (
      <div className="grid grid-cols-7 text-center border-b border-gray-200 font-semibold">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="py-1">
            {format(addDays(startDate, i), 'EEE')}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentDate, { weekStartsOn: 0 });
    return (
      <div className="grid grid-cols-7 border-b border-gray-200">
        {Array.from({ length: 7 }).map((_, i) => {
          const day = addDays(startDate, i);
          const formattedDate = format(day, 'yyyy-MM-dd');
          const dayEvents = events.filter(event => event.date === formattedDate);
          const isSelected = isSameDay(day, selectedDate);

          return (
            <div
              key={i}
              className={`border-r border-gray-200 p-2 min-h-[120px] cursor-pointer ${isSelected ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-100`}
              onClick={() => setSelectedDate(day)}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-sm font-medium ${isToday(day) ? 'font-bold text-blue-600' : ''}`}>
                  {format(day, 'd')}
                </span>
                {dayEvents.length > 0 && (
                  <span className="text-xs bg-blue-500 text-white rounded-full px-1">{dayEvents.length}</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                {dayEvents.slice(0, 2).map(event => (
                  <span key={event.id} className={`text-xs px-1 py-[2px] rounded ${getEventColor(event.type)} truncate`}>
                    {event.title}
                  </span>
                ))}
                {dayEvents.length > 2 && (
                  <span className="text-xs text-gray-500">+{dayEvents.length - 2} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const selectedDateEvents = events.filter(event => event.date === format(selectedDate, 'yyyy-MM-dd'));

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2"><CalendarDaysIcon className="w-6 h-6" /> Calendar</h1>
        <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <PlusIcon className="w-4 h-4" /> Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded shadow">{renderHeader()}{renderDays()}{renderCells()}</div>

          {/* All Events */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">All Events</h2>
            {events.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {events.sort((a, b) => a.time.localeCompare(b.time)).map(event => (
                  <li key={event.id} className="flex items-center py-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getEventColor(event.type)}`}>
                      <ClockIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-gray-500">{format(new Date(`${event.date}T${event.time}`), 'h:mm a')} • {event.duration} min</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${event.completed ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                      {event.completed ? 'Completed' : 'Upcoming'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-4 text-gray-500">No events scheduled</div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Selected Date Events */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h2>
            {isToday(selectedDate) && <span className="inline-block mb-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">Today</span>}
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 border rounded mb-2 hover:bg-gray-50">
              <PlusIcon className="w-4 h-4" /> Add Event
            </button>
            {selectedDateEvents.length > 0 ? (
              <ul className="space-y-1">
                {selectedDateEvents.map(event => (
                  <li key={event.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <div className={`w-1 h-10 rounded ${getEventColor(event.type)}`}></div>
                    <div>
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.time} • {event.duration} min</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center p-4 bg-gray-50 rounded text-gray-500">No events scheduled</div>
            )}
          </div>

          {/* Upcoming Events */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
            <ul className="space-y-2">
              {events.filter(event => new Date(`${event.date}T${event.time}`) > new Date())
                .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
                .slice(0, 3)
                .map(event => (
                  <li key={event.id} className="flex items-center gap-2">
                    <div className={`w-1 h-10 rounded ${getEventColor(event.type)}`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-gray-500">{format(new Date(`${event.date}T${event.time}`), 'MMM d, h:mm a')} • {event.duration} min</p>
                    </div>
                  </li>
                ))}
              {events.filter(event => new Date(`${event.date}T${event.time}`) > new Date()).length === 0 && (
                <div className="text-center py-2 text-gray-500">No upcoming events</div>
              )}
            </ul>
            <button className="w-full mt-2 px-3 py-2 border rounded hover:bg-gray-50">View All Events</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
