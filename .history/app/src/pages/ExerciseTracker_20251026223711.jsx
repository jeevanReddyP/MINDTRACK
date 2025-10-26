import React, { useState, useEffect } from 'react';
import { format, subDays, isToday, isYesterday } from 'date-fns';
import {
  AddIcon,
  FitnessIcon,
  CardioIcon,
  YogaIcon,
  TimerOutlinedIcon,
  PlayArrowIcon,
  PauseIcon,
  EditIcon,
  DeleteIcon,
  TimerIcon
} from './Icons'; // You can create an Icons.js to export icons from @mui/icons-material

const exerciseTypes = [
  { id: 'strength', name: 'Strength Training', icon: <FitnessIcon />, color: 'bg-blue-200 text-blue-700' },
  { id: 'cardio', name: 'Cardio', icon: <CardioIcon />, color: 'bg-red-200 text-red-700' },
  { id: 'yoga', name: 'Yoga', icon: <YogaIcon />, color: 'bg-green-200 text-green-700' },
  { id: 'hiit', name: 'HIIT', icon: <TimerOutlinedIcon />, color: 'bg-yellow-200 text-yellow-700' },
  { id: 'other', name: 'Other', icon: <FitnessIcon />, color: 'bg-indigo-200 text-indigo-700' },
];

const ExerciseTracker = () => {
  const [exercises, setExercises] = useState([]);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('week');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [formData, setFormData] = useState({
    type: 'strength',
    name: '',
    duration: 30,
    calories: 200,
    notes: '',
    date: new Date(),
  });

  useEffect(() => {
    const saved = localStorage.getItem('exercises');
    if (saved) setExercises(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('exercises', JSON.stringify(exercises));
  }, [exercises]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setExercises(exercises.map(ex => ex.id === editingId ? { ...formData, id: editingId } : ex));
      setEditingId(null);
    } else {
      setExercises([...exercises, { ...formData, id: Date.now().toString(), date: formData.date || new Date() }]);
    }
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => setFormData({ type: 'strength', name: '', duration: 30, calories: 200, notes: '', date: new Date() });

  const handleEdit = (exercise) => { setFormData(exercise); setEditingId(exercise.id); setShowForm(true); };
  const handleDelete = (id) => setExercises(exercises.filter(ex => ex.id !== id));

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      setExercises([...exercises, {
        id: Date.now().toString(),
        type: 'other',
        name: 'Custom Workout',
        duration: Math.floor(timer / 60),
        calories: Math.floor(timer * 0.1),
        notes: 'Tracked with timer',
        date: new Date(),
      }]);
      setTimer(0);
    } else setIsRunning(true);
  };

  const formatTime = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')}`;

  const filteredExercises = exercises
    .filter(ex => {
      const exerciseDate = new Date(ex.date);
      const now = new Date();
      if (dateRange === 'today') return isToday(exerciseDate);
      if (dateRange === 'yesterday') return isYesterday(exerciseDate);
      if (dateRange === 'week') return exerciseDate >= subDays(now, 7);
      if (dateRange === 'month') return exerciseDate >= subDays(now, 30);
      return true;
    })
    .filter(ex => filter === 'all' || ex.type === filter);

  const totalDuration = filteredExercises.reduce((sum, ex) => sum + Number(ex.duration), 0);
  const totalCalories = filteredExercises.reduce((sum, ex) => sum + Number(ex.calories), 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Exercise Tracker</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2"
          onClick={() => { setShowForm(!showForm); setEditingId(null); resetForm(); }}
        >
          <AddIcon /> {showForm ? 'Cancel' : 'Add Exercise'}
        </button>
      </div>

      {/* Timer */}
      <div className="mb-6 bg-white p-4 rounded shadow text-center">
        <h2 className="text-xl font-semibold mb-2">Workout Timer</h2>
        <p className="text-4xl font-bold mb-2">{formatTime(timer)}</p>
        <button
          className={`px-6 py-2 rounded text-white ${isRunning ? 'bg-red-500' : 'bg-green-500'}`}
          onClick={toggleTimer}
        >
          {isRunning ? <><PauseIcon /> Stop & Save</> : <><PlayArrowIcon /> Start Workout</>}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border rounded px-3 py-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          {exerciseTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
        </select>

        <div className="flex gap-2 flex-wrap">
          {['today','yesterday','week','month','all'].map(range => (
            <button
              key={range}
              className={`px-3 py-1 rounded ${dateRange === range ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setDateRange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-gray-500">Total Workouts</p>
          <p className="text-2xl font-bold">{filteredExercises.length}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-gray-500">Total Duration</p>
          <p className="text-2xl font-bold">{totalDuration} min</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-gray-500">Calories Burned</p>
          <p className="text-2xl font-bold">{totalCalories}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-sm text-gray-500">Avg. Duration</p>
          <p className="text-2xl font-bold">{filteredExercises.length ? Math.round(totalDuration / filteredExercises.length) : 0} min</p>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="border rounded px-3 py-2"
              required
            >
              {exerciseTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
            </select>
            <input
              type="text"
              name="name"
              placeholder="Exercise Name"
              value={formData.name}
              onChange={handleInputChange}
              className="border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className="border rounded px-3 py-2"
              placeholder="Duration (minutes)"
            />
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleInputChange}
              className="border rounded px-3 py-2"
              placeholder="Calories"
            />
            <input
              type="date"
              name="date"
              value={format(new Date(formData.date), 'yyyy-MM-dd')}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <textarea
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="border rounded px-3 py-2 col-span-1 md:col-span-2"
            />
            <div className="flex gap-2 justify-end col-span-1 md:col-span-2">
              <button type="button" onClick={() => { setShowForm(false); resetForm(); }} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{editingId ? 'Update' : 'Add'} Exercise</button>
            </div>
          </form>
        </div>
      )}

      {/* Exercise List */}
      <div className="bg-white p-4 rounded shadow">
        {filteredExercises.length > 0 ? (
          <ul className="divide-y">
            {filteredExercises.map(exercise => {
              const type = exerciseTypes.find(t => t.id === exercise.type) || exerciseTypes[0];
              return (
                <li key={exercise.id} className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type.color}`}>{type.icon}</div>
                    <div>
                      <p className="font-semibold">{exercise.name}</p>
                      <p className="text-sm text-gray-500">{type.name} • {exercise.duration} min • {exercise.calories} cal</p>
                      {exercise.notes && <p className="text-xs text-gray-400">{exercise.notes}</p>}
                      <p className="text-xs text-gray-400">{format(new Date(exercise.date), 'MMM d, yyyy h:mm a')}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(exercise)} className="text-blue-600"><EditIcon /></button>
                    <button onClick={() => handleDelete(exercise.id)} className="text-red-600"><DeleteIcon /></button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <TimerIcon className="mx-auto mb-2 text-6xl opacity-50" />
            <p className="text-lg font-semibold mb-1">No exercises recorded yet</p>
            <p className="mb-3">{filter === 'all' && dateRange === 'all' ? 'Start tracking your first workout!' : 'No exercises match your current filters.'}</p>
            <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2 mx-auto">
              <AddIcon /> Add Exercise
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseTracker;
