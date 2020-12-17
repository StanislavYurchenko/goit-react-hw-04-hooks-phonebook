import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

function ContactList({ contacts, filter, removeContactById }) {
  const markupContact = (contact, removeContact) => {
    return (
      <li key={contact.id} className={styles.contact}>
        <div>
          <span className={styles['contact-name']}>{contact.name}:</span>
          <span className={styles['contact-number']}>{contact.number}</span>
        </div>

        <button className={styles['remove-btn']} onClick={() => removeContact(contact.id)}>
          Delete
        </button>
      </li>
    );
  };

  return (
    <>
      <ul className={styles.contacts}>
        {filter
          ? contacts
            .filter(contact => contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim()))
            .map(contact => markupContact(contact, removeContactById))
          : contacts.map(contact => markupContact(contact, removeContactById))}
      </ul>
    </>
  );
}
ContactList.defaultProps = {
  contacts: {
    number: '',
  }
}


ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string,
  })),
  filter: PropTypes.string.isRequired,
  removeContactById: PropTypes.func.isRequired,
}

export default ContactList;
