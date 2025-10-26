// src/pages/JournalTracker.jsx
import React, { useState, useEffect } from 'react';
import { format, isToday, isThisWeek, isThisMonth } from 'date-fns';
import { AiOutlineSearch, AiOutlineCalendar, AiOutlineTag, AiOutlineClose } from 'react-icons/ai';
import { FaRegSmile, FaRegMeh, FaRegFrown, FaRegGrinStars, FaRegGrin } from 'react-icons/fa';

const moodOptions = [
  { value: 'very_happy', label: 'Very Happy', icon: <FaRegGrinStars className="text-green-600" />, color: 'bg-green-100', border: 'border-green-600' },
  { value: 'happy', label: 'Happy', icon: <FaRegGrin className="text-green-500" />, color: 'bg-green-50', border: 'border-green-500' },
  { value: 'neutral', label: 'Neutral', icon: <FaRegMeh className="text-yellow-500" />, color: 'bg-yellow-100', border: 'border-yellow-500' },
  { value: 'sad', label: 'Sad', icon: <FaRegFrown className="text-orange-500" />, color: 'bg-orange-100', border: 'border-orange-500' },
  { value: 'very_sad', label: 'Very Sad', icon: <FaRegFrown className="text-red-500" />, color: 'bg-red-100', border: 'border-red-500' },
];

const tagOptions = [
  'Work', 'Personal', 'Health', 'Family', 'Friends',
  'Exercise', 'Food', 'Travel', 'Hobbies', 'Goals'
];

const JournalTracker = () => {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: 'neutral',
    tags: [],
    date: new Date(),
  });

  useEffect(() => {
    const saved = localStorage.getItem('journalEntries');
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setEntries(entries.map(entry =>
        entry.id === editingId ? { ...formData, id: editingId } : entry
      ));
      setEditingId(null);
    } else {
      setEntries([{ ...formData, id: Date.now().toString(), date: formData.date }, ...entries]);
    }
    setShowForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', mood: 'neutral', tags: [], date: new Date() });
  };

  const handleEdit = (entry) => {
    setFormData(entry);
    setEditingId(entry.id);
    setShowForm(true);
  };

  const confirmDelete = (entry) => {
    setEntryToDelete(entry);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (entryToDelete) {
      setEntries(entries.filter(e => e.id !== entryToDelete.id));
      setDeleteConfirmOpen(false);
      setEntryToDelete(null);
    }
  };

  const filteredEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    let dateMatch = true;

    if (dateRange === 'today') dateMatch = isToday(entryDate);
    else if (dateRange === 'week') dateMatch = isThisWeek(entryDate);
    else if (dateRange === 'month') dateMatch = isThisMonth(entryDate);

    const moodMatch = filter === 'all' || entry.mood === filter;
    const searchMatch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase());
    const tagsMatch = selectedTags.length === 0 || selectedTags.every(tag => entry.tags.includes(tag));

    return dateMatch && moodMatch && searchMatch && tagsMatch;
  });

  const getMoodOption = (value) => moodOptions.find(m => m.value === value) || moodOptions[2];

  const moodStats = moodOptions.map(mood => ({
    ...mood,
    count: entries.filter(e => e.mood === mood.value).length
  }));

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h1 className="text-2xl font-bold">Journal</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-blue-700"
          onClick={() => { setShowForm(!showForm); setEditingId(null); resetForm(); }}
        >
          {showForm ? 'Cancel' : 'New Entry'}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded p-4 mb-4 flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <AiOutlineSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search entries..."
            className="border rounded px-2 py-1 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {/* Date range */}
          {['today', 'week', 'month', 'all'].map(range => (
            <button
              key={range}
              className={`px-3 py-1 rounded border ${dateRange === range ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
              onClick={() => setDateRange(range)}
            >
              {range === 'today' ? 'Today' : range === 'week' ? 'This Week' : range === 'month' ? 'This Month' : 'All Time'}
            </button>
          ))}

          {/* Mood filter */}
          <select
            className="border rounded px-2 py-1"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Moods</option>
            {moodOptions.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>

          {/* Tags filter */}
          <div className="relative">
            <select
              multiple
              className="border rounded px-2 py-1 min-w-[120px]"
              value={selectedTags}
              onChange={(e) => setSelectedTags([...e.target.selectedOptions].map(o => o.value))}
            >
              {tagOptions.map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Mood Summary */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Mood Summary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {moodStats.map(mood => (
            <div key={mood.value} className={`p-3 rounded border-l-4 ${mood.color} ${mood.border}`}>
              <div className="flex justify-center mb-1 text-2xl">{mood.icon}</div>
              <div className="text-center font-bold">{mood.count}</div>
              <div className="text-center text-sm">{mood.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white shadow rounded p-4 mb-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
            <input
              type="date"
              value={format(new Date(formData.date), 'yyyy-MM-dd')}
              onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
              className="border rounded px-2 py-1 w-full"
            />
            <select
              name="mood"
              value={formData.mood}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
            >
              {moodOptions.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
            <textarea
              placeholder="Write your thoughts..."
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-full"
              rows={4}
              required
            />
            <div className="flex flex-wrap gap-2">
              {tagOptions.map(tag => (
                <button
                  key={tag}
                  type="button"
                  className={`px-2 py-1 border rounded ${formData.tags.includes(tag) ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                  onClick={() => handleTagChange(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" className="border px-3 py-1 rounded" onClick={() => { setShowForm(false); resetForm(); }}>Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">{editingId ? 'Update' : 'Save'} Entry</button>
            </div>
          </form>
        </div>
      )}

      {/* Journal Entries */}
      {filteredEntries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEntries.map(entry => {
            const mood = getMoodOption(entry.mood);
            return (
              <div key={entry.id} className={`bg-white shadow rounded flex flex-col border-l-4 ${mood.border} hover:shadow-lg transition`}>
                <div className="p-3 flex flex-col flex-grow">
                  <div className="flex justify-between mb-1 items-center">
                    <div className="flex items-center gap-1 font-bold text-sm">{mood.icon}{mood.label}</div>
                    <div className="text-xs text-gray-500">{format(new Date(entry.date), 'MMM d, yyyy')}</div>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{entry.title}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-3">{entry.content}</p>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {entry.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 border rounded flex items-center gap-1">
                        <AiOutlineTag />{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end p-1 border-t border-gray-200 gap-1">
                  <button onClick={() => handleEdit(entry)} className="text-blue-500 text-sm px-2 py-1">Edit</button>
                  <button onClick={() => confirmDelete(entry)} className="text-red-500 text-sm px-2 py-1">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white shadow rounded min-h-[200px]">
          <FaRegSmile className="text-gray-400 text-6xl mb-2" />
          <h2 className="text-lg text-gray-500 mb-2">No journal entries found</h2>
          <p className="text-gray-400 mb-3">
            {searchQuery || filter !== 'all' || selectedTags.length > 0
              ? 'Try adjusting your filters or search query.'
              : 'Start by writing your first journal entry!'}
          </p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
            onClick={() => setShowForm(true)}
          >
            New Entry
          </button>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-4 max-w-sm w-full">
            <h3 className="font-bold mb-2">Delete Entry</h3>
            <p className="mb-4">Are you sure you want to delete this journal entry? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button className="border px-3 py-1 rounded" onClick={() => setDeleteConfirmOpen(false)}>Cancel</button>
              <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalTracker;
