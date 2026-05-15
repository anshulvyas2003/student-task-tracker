import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import SearchBar from './components/SearchBar';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (status) params.status = status;
      if (priority) params.priority = priority;
      const res = await axios.get('/api/tasks', { params });
      setTasks(res.data);
      setError('');
    } catch (err) {
      setError('Failed to load tasks. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, [search, status, priority]);

  const handleSubmit = async (form) => {
    try {
      if (editTask) {
        await axios.put(`/api/tasks/${editTask._id}`, form);
        setEditTask(null);
      } else {
        await axios.post('/api/tasks', form);
      }
      fetchTasks();
    } catch (err) {
      setError('Failed to save task.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>📋 Student Task Tracker</h1>
      <Dashboard tasks={tasks} />
      <TaskForm onSubmit={handleSubmit} editTask={editTask} onCancel={() => setEditTask(null)} />
      <SearchBar search={search} setSearch={setSearch} status={status} setStatus={setStatus} priority={priority} setPriority={setPriority} />
      {error && <p style={styles.error}>{error}</p>}
      {loading ? (
        <p style={styles.center}>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p style={styles.center}>No tasks found. Add one above!</p>
      ) : (
        tasks.map(task => (
          <TaskCard key={task._id} task={task} onDelete={handleDelete} onEdit={setEditTask} />
        ))
      )}
    </div>
  );
}

const styles = {
  page: { maxWidth:'800px', margin:'0 auto', padding:'24px 16px', fontFamily:'sans-serif' },
  heading: { textAlign:'center', marginBottom:'24px', color:'#333' },
  error: { color:'red', textAlign:'center' },
  center: { textAlign:'center', color:'#888' }
};

export default App;