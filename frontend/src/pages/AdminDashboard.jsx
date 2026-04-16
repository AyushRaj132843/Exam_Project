import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('USERS');
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Question CMS State
  const [formSubject, setFormSubject] = useState('');
  const [formQuestion, setFormQuestion] = useState('');
  const [formOptions, setFormOptions] = useState(['', '', '', '']);
  const [formAnswer, setFormAnswer] = useState('');
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();
  const userInfoStr = localStorage.getItem('userInfo');
  const user = userInfoStr ? JSON.parse(userInfoStr) : null;

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/admin-login');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const [usersRes, questionsRes] = await Promise.all([
        axios.get('/api/admin/users-results', config),
        axios.get('/api/questions/all', config)
      ]);
      setUsers(usersRes.data);
      setQuestions(questionsRes.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching data');
    }
    setLoading(false);
  };

  const handleCreateOrUpdateQuestion = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const payload = {
        subject: formSubject,
        question: formQuestion,
        options: formOptions,
        answer: formAnswer
      };

      if (editingId) {
        await axios.put(`/api/questions/${editingId}`, payload, config);
        alert('Question updated');
      } else {
        await axios.post('/api/questions', payload, config);
        alert('Question created');
      }
      
      setFormSubject('');
      setFormQuestion('');
      setFormOptions(['', '', '', '']);
      setFormAnswer('');
      setEditingId(null);
      fetchData(); // Reload data
    } catch (err) {
      console.error(err);
      alert('Failed to save question');
    }
  };

  const handleEdit = (q) => {
    setEditingId(q._id);
    setFormSubject(q.subject);
    setFormQuestion(q.question);
    setFormOptions(q.options);
    setFormAnswer(q.answer);
    setActiveTab('QUESTIONS');
    window.scrollTo(0, 0); // scroll to the form
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this question?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`/api/questions/${id}`, config);
      alert('Deleted successfully');
      fetchData();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading Admin Data...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '1rem', background: '#fefefe', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', color: '#023047' }}>Admin Dashboard</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #ddd', paddingBottom: '1rem' }}>
        <button 
          onClick={() => setActiveTab('USERS')}
          style={{ padding: '0.8rem 1.5rem', cursor: 'pointer', background: activeTab === 'USERS' ? '#8ecae6' : '#eee', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
        >
          User Results
        </button>
        <button 
          onClick={() => setActiveTab('QUESTIONS')}
          style={{ padding: '0.8rem 1.5rem', cursor: 'pointer', background: activeTab === 'QUESTIONS' ? '#8ecae6' : '#eee', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
        >
          Question CMS
        </button>
      </div>

      {activeTab === 'USERS' && (
        <div>
          <h2>Registered Users & Marks</h2>
          {users.length === 0 ? <p>No users found.</p> : users.map(u => (
            <div key={u._id} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
              <h3>{u.username} (Enrollment: {u.enrollmentNumber || 'N/A'})</h3>
              <p>Total Exam Attempts: {u.results?.length || 0}</p>
              
              {u.results && u.results.length > 0 && (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                  <thead>
                    <tr style={{ background: '#219ebc', color: '#fff' }}>
                      <th style={{ padding: '8px', border: '1px solid #ddd' }}>Subject</th>
                      <th style={{ padding: '8px', border: '1px solid #ddd' }}>Score</th>
                      <th style={{ padding: '8px', border: '1px solid #ddd' }}>Total</th>
                      <th style={{ padding: '8px', border: '1px solid #ddd' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {u.results.map(r => (
                      <tr key={r._id}>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{r.subject}</td>
                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{r.score}</td>
                        <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{r.total}</td>
                        <td style={{ padding: '8px', border: '1px solid #ddd' }}>{new Date(r.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'QUESTIONS' && (
        <div>
          <h2>Manage Questions Bank</h2>
          
          <form onSubmit={handleCreateOrUpdateQuestion} style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', marginBottom: '2rem' }}>
            <h3>{editingId ? 'Edit Question' : 'Add New Question'}</h3>
            <div style={{ marginBottom: '1rem' }}>
              <label>Subject: </label>
              <input required type="text" value={formSubject} onChange={(e) => setFormSubject(e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Question Text: </label>
              <textarea required value={formQuestion} onChange={(e) => setFormQuestion(e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Options (4 required): </label>
              {formOptions.map((opt, idx) => (
                <input 
                  key={idx} 
                  type="text" 
                  required
                  placeholder={`Option ${idx + 1}`} 
                  value={opt} 
                  onChange={(e) => {
                    const newOpts = [...formOptions];
                    newOpts[idx] = e.target.value;
                    setFormOptions(newOpts);
                  }} 
                  style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '5px' }} 
                />
              ))}
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Correct Answer (Must match one option exactly): </label>
              <input required type="text" value={formAnswer} onChange={(e) => setFormAnswer(e.target.value)} style={{ width: '100%', padding: '8px' }} />
            </div>
            <button type="submit" style={{ padding: '0.8rem 2rem', background: '#fb8500', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              {editingId ? 'Update Question' : 'Create Question'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormSubject(''); setFormQuestion(''); setFormOptions(['','','','']); setFormAnswer(''); }} style={{ marginLeft: '1rem', padding: '0.8rem 2rem' }}>Cancel</button>
            )}
          </form>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#023047', color: '#fff' }}>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Subject</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Question</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Answer</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map(q => (
                <tr key={q._id}>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{q.subject}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{q.question}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{q.answer}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                    <button onClick={() => handleEdit(q)} style={{ background: '#219ebc', color: 'white', padding: '5px 10px', marginRight: '5px', border: 'none', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(q._id)} style={{ background: '#d62828', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}

    </div>
  );
}

export default AdminDashboard;
