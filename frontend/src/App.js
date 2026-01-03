import React, { useState, useEffect } from 'react';
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { getAllContacts, deleteContact } from './services/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  // Fetch contacts when app loads
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await getAllContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      alert('Failed to load contacts. Make sure backend is running!');
    } finally {
      setLoading(false);
    }
  };

  const handleContactAdded = (newContact) => {
    setContacts([newContact, ...contacts]);
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id);
        setContacts(contacts.filter(contact => contact._id !== id));
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Failed to delete contact. Please try again.');
      }
    }
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">
          <p>Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Contact Management System</h1>
        <p className="app-subtitle">Add and manage your contacts easily</p>
      </header>

      <div className="main-content">
        <ContactForm onContactAdded={handleContactAdded} />
        <ContactList 
          contacts={contacts} 
          onDelete={handleDeleteContact}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />
      </div>

      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#7f8c8d', fontSize: '0.9rem' }}>
        <p>Built with React, Node.js, Express & MongoDB</p>
      </footer>
    </div>
  );
}

export default App;