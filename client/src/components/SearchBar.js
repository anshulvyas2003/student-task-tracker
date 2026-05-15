import React from 'react';

function SearchBar({ search, setSearch, status, setStatus, priority, setPriority }) {
  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select style={styles.select} value={status} onChange={e => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select style={styles.select} value={priority} onChange={e => setPriority(e.target.value)}>
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}

const styles = {
  container: { display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'20px' },
  input: { flex:'2', minWidth:'200px', padding:'10px', borderRadius:'8px', border:'1px solid #ddd', fontSize:'14px' },
  select: { flex:'1', minWidth:'130px', padding:'10px', borderRadius:'8px', border:'1px solid #ddd', fontSize:'14px' }
};

export default SearchBar;