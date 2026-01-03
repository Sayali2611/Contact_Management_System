import React from 'react';

const ContactItem = ({ contact, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="contact-item">
      <div className="contact-header">
        <h3 className="contact-name">{contact.name}</h3>
        <button 
          className="delete-btn"
          onClick={() => onDelete(contact._id)}
          title="Delete contact"
        >
          🗑️ Delete
        </button>
      </div>
      
      <div className="contact-details">
  <div className="contact-detail-row">
    <div className="detail-icon">📧</div>
    <div className="detail-text">
      <strong>Email:</strong> {contact.email}
    </div>
  </div>
  
  <div className="contact-detail-row">
    <div className="detail-icon">📱</div>
    <div className="detail-text">
      <strong>Phone:</strong> {contact.phone}
    </div>
  </div>
  
  {contact.message && (
    <div className="contact-detail-row">
      <div className="detail-icon">💬</div>
      <div className="detail-text">
        <strong>Message:</strong> {contact.message}
      </div>
    </div>
  )}
  
  <div className="contact-date">
    📅 Added: {formatDate(contact.createdAt)}
  </div>
</div>
    </div>
  );
};

export default ContactItem;