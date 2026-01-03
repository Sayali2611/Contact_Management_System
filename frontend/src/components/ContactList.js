import React from 'react';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, onDelete, sortBy, onSortChange }) => {
  // Sort contacts based on selected option
  const getSortedContacts = () => {
    const sorted = [...contacts];
    
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      default:
        return sorted;
    }
  };

  const sortedContacts = getSortedContacts();

  if (contacts.length === 0) {
    return (
      <div className="contacts-container">
        <h2 className="contacts-title">All Contacts</h2>
        <div className="no-contacts">
          <p>📭 No contacts yet. Add your first contact!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contacts-container">
      <div className="contacts-header">
       <h2 className="contacts-title">
  All Contacts <span className="contacts-count">{contacts.length}</span>
</h2>
        
        <div className="sort-controls">
          <span style={{ marginRight: '10px', color: '#7f8c8d' }}>Sort by:</span>
          <button 
            className={`sort-btn ${sortBy === 'newest' ? 'active' : ''}`}
            onClick={() => onSortChange('newest')}
          >
            Newest
          </button>
          <button 
            className={`sort-btn ${sortBy === 'oldest' ? 'active' : ''}`}
            onClick={() => onSortChange('oldest')}
          >
            Oldest
          </button>
          <button 
            className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
            onClick={() => onSortChange('name')}
          >
            Name
          </button>
        </div>
      </div>

      <div className="contacts-list">
        {sortedContacts.map(contact => (
          <ContactItem 
            key={contact._id} 
            contact={contact} 
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;