import React from 'react';

function Dashboard({ tasks }) {
  const today = new Date();
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const overdue = tasks.filter(t => 
    new Date(t.dueDate) < today && t.status !== 'completed'
  ).length;

  return (
    <div style={styles.container}>
      <div style={{...styles.card, background: '#4A90D9'}}>
        <h3 style={styles.num}>{total}</h3>
        <p style={styles.label}>Total</p>
      </div>
      <div style={{...styles.card, background: '#F5A623'}}>
        <h3 style={styles.num}>{pending}</h3>
        <p style={styles.label}>Pending</p>
      </div>
      <div style={{...styles.card, background: '#7ED321'}}>
        <h3 style={styles.num}>{completed}</h3>
        <p style={styles.label}>Completed</p>
      </div>
      <div style={{...styles.card, background: '#D0021B'}}>
        <h3 style={styles.num}>{overdue}</h3>
        <p style={styles.label}>Overdue</p>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', gap:'16px', flexWrap:'wrap', marginBottom:'24px' },
  card: { flex:'1', minWidth:'120px', borderRadius:'12px', padding:'16px', textAlign:'center', color:'white' },
  num: { fontSize:'32px', margin:'0' },
  label: { margin:'4px 0 0', fontSize:'14px' }
};

export default Dashboard;