import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, editTask, onCancel }) {
  const [form, setForm] = useState({
    title: '', description: '', dueDate: '', status: 'pending', priority: 'medium'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title,
        description: editTask.description,
        dueDate: editTask.dueDate?.slice(0, 10),
        status: editTask.status,
        priority: editTask.priority
      });
    }
  }, [editTask]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.dueDate) {
      setError('All fields are required!');
      return;
    }
    setError('');
    onSubmit(form);
    setForm({ title:'', description:'', dueDate:'', status:'pending', priority:'medium' });
  };

  return (
    <div style={styles.container}>
      <h2>{editTask ? 'Edit Task' : 'Add New Task'}</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input style={styles.input} name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <textarea style={styles.input} name="description" placeholder="Description" value={form.description} onChange={handleChange} rows={3} />
        <input style={styles.input} type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
        <select style={styles.input} name="status" value={form.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select style={styles.input} name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div style={{display:'flex', gap:'8px'}}>
          <button style={styles.btn} type="submit">{editTask ? 'Update' : 'Add Task'}</button>
          {editTask && <button style={styles.cancelBtn} type="button" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: { background:'white', padding:'20px', borderRadius:'12px', marginBottom:'24px', boxShadow:'0 2px 8px rgba(0,0,0,0.1)' },
  input: { display:'block', width:'100%', padding:'10px', marginBottom:'12px', borderRadius:'8px', border:'1px solid #ddd', fontSize:'14px', boxSizing:'border-box' },
  btn: { background:'#4A90D9', color:'white', border:'none', padding:'10px 24px', borderRadius:'8px', cursor:'pointer', fontSize:'14px' },
  cancelBtn: { background:'#aaa', color:'white', border:'none', padding:'10px 24px', borderRadius:'8px', cursor:'pointer', fontSize:'14px' },
  error: { color:'red', marginBottom:'8px' }
};

export default TaskForm;