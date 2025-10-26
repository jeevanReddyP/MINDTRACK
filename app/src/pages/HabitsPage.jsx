// src/pages/HabitsPage.jsx
import React, { useState } from "react";
import { PlusIcon, CheckCircleIcon, CircleStackIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

const habitCategories = [
  { id: 1, name: "Health", color: "bg-blue-500" },
  { id: 2, name: "Fitness", color: "bg-purple-500" },
  { id: 3, name: "Mindfulness", color: "bg-green-500" },
  { id: 4, name: "Productivity", color: "bg-teal-500" },
];

const HabitsPage = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: "Drink water", completed: false, category: 1, currentStreak: 5 },
    { id: 2, name: "Morning workout", completed: true, category: 2, currentStreak: 12 },
    { id: 3, name: "Meditate", completed: false, category: 3, currentStreak: 8 },
  ]);
  const [newHabit, setNewHabit] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [editingHabit, setEditingHabit] = useState(null);

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const addHabit = (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;

    if (editingHabit) {
      setHabits(
        habits.map((habit) =>
          habit.id === editingHabit.id
            ? { ...habit, name: newHabit, category: selectedCategory }
            : habit
        )
      );
      setEditingHabit(null);
    } else {
      const newHabitObj = {
        id: Date.now(),
        name: newHabit,
        completed: false,
        category: selectedCategory,
        currentStreak: 0,
      };
      setHabits([...habits, newHabitObj]);
    }
    setNewHabit("");
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const startEditing = (habit) => {
    setEditingHabit(habit);
    setNewHabit(habit.name);
    setSelectedCategory(habit.category);
  };

  const getCategoryById = (id) => habitCategories.find((c) => c.id === id) || {};

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Habits</h1>
        <button
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => {
            setEditingHabit(null);
            setNewHabit("");
            setSelectedCategory(1);
          }}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Habit
        </button>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">
          {editingHabit ? "Edit Habit" : "Add New Habit"}
        </h2>
        <form
          className="flex flex-col sm:flex-row gap-2 items-center"
          onSubmit={addHabit}
        >
          <input
            type="text"
            placeholder="Enter a new habit"
            className="border border-gray-300 rounded px-3 py-2 flex-1"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded px-3 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
          >
            {habitCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={!newHabit.trim()}
          >
            {editingHabit ? "Update" : "Add"}
          </button>
          {editingHabit && (
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              onClick={() => {
                setEditingHabit(null);
                setNewHabit("");
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Habit List */}
      <div className="bg-white shadow rounded p-4">
        {habits.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No habits yet. Click "Add Habit" to get started.
          </div>
        ) : (
          <ul className="space-y-2">
            {habits.map((habit) => {
              const category = getCategoryById(habit.category);
              return (
                <li
                  key={habit.id}
                  className="flex items-center justify-between border-b border-gray-200 py-2"
                >
                  <div className="flex items-center gap-3">
                    <button
                      className={`w-6 h-6 flex items-center justify-center rounded-full border ${
                        habit.completed
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-400 text-gray-400"
                      }`}
                      onClick={() => toggleHabit(habit.id)}
                    >
                      {habit.completed ? (
                        <CheckCircleIcon className="w-4 h-4" />
                      ) : (
                        <CircleStackIcon className="w-4 h-4" />
                      )}
                    </button>
                    <div>
                      <div className="font-medium">{habit.name}</div>
                      <div className="text-sm text-gray-500">
                        {category.name} • {habit.currentStreak}{" "}
                        day{habit.currentStreak !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${category.color} text-white`}
                    >
                      {category.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 border rounded text-gray-600">
                      {habit.currentStreak} day
                      {habit.currentStreak !== 1 ? "s" : ""}
                    </span>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => startEditing(habit)}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteHabit(habit.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HabitsPage;
