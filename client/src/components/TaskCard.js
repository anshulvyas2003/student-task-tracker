import React from 'react';

function TaskCard({ task, onDelete, onEdit }) {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
  const priorityColor = { low:'#7ED321', medium:'#F5A623', high:'#D0021B' };

  return (
    <div style={{...styles.card, borderLeft: `5px solid ${priorityColor[task.priority]}`, background: isOverdue ? '#fff5f5' : 'white'}}>
      <div style={styles.header}>
        <h3 style={styles.title}>{task.title}</h3>
        <span style={{...styles.badge, background: priorityColor[task.priority]}}>{task.priority}</span>
      </div>
      <p style={styles.desc}>{task.description}</p>
      <div style={styles.footer}>
        <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>
        <span style={styles.status}>{task.status}</span>
        {isOverdue && <span style={styles.overdue}>⚠️ Overdue</span>}
      </div>
      <div style={styles.actions}>
        <button style={styles.editBtn} onClick={() => onEdit(task)}>Edit</button>
        <button style={styles.deleteBtn} onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}

const styles = {
  card: { padding:'16px', borderRadius:'12px', marginBottom:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', transition:'transform 0.2s' },
  header: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' },
  title: { margin:0, fontSize:'16px' },
  badge: { color:'white', padding:'2px 10px', borderRadius:'20px', fontSize:'12px' },
  desc: { color:'#666', fontSize:'14px', margin:'0 0 8px' },
  footer: { display:'flex', gap:'12px', fontSize:'13px', color:'#888', marginBottom:'8px' },
  status: { textTransform:'capitalize', fontWeight:'500', color:'#4A90D9' },
  overdue: { color:'#D0021B', fontWeight:'500' },
  actions: { display:'flex', gap:'8px' },
  editBtn: { background:'#F5A623', color:'white', border:'none', padding:'6px 16px', borderRadius:'6px', cursor:'pointer' },
  deleteBtn: { background:'#D0021B', color:'white', border:'none', padding:'6px 16px', borderRadius:'6px', cursor:'pointer' }
};

export default TaskCard;