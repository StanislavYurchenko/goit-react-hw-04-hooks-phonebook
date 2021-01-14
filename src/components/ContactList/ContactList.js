import React from 'react';
import PropTypes from 'prop-types';
import ContactListItem from '../ContactListItem/ContactListItem';
import styles from './ContactList.module.css';

function ContactList({ contacts, filter, removeContactById }) {
  return (
    <>
      <ul className={styles.contacts}>
        {filter
          ? contacts
              .filter(contact =>
                contact.name
                  .toLowerCase()
                  .trim()
                  .includes(filter.toLowerCase().trim()),
              )
              .map(contact => (
                <ContactListItem
                  key={contact.id}
                  contact={contact}
                  removeContact={removeContactById}
                />
              ))
          : contacts.map(contact => (
              <ContactListItem
                key={contact.id}
                contact={contact}
                removeContact={removeContactById}
              />
            ))}
      </ul>
    </>
  );
}

ContactList.defaultProps = {
  contacts: {
    number: '',
  },
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string,
    }),
  ),
  filter: PropTypes.string.isRequired,
  removeContactById: PropTypes.func.isRequired,
};

export default ContactList;
