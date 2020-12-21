import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import {
  getContactsFromLocalStorage,
  setContactsToLocalStorage,
} from '../../api/localStorageApi';
import styles from './PhoneBook.module.css';

function PhoneBook() {
  const [contacts, setContacts] = useState(() => getContactsFromLocalStorage());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setContactsToLocalStorage(contacts);
  }, [contacts]);

  const addContact = newContact => {
    setContacts([...contacts, newContact]);
  };

  const onChange = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const removeContactById = idToRemove => {
    setContacts(contacts.filter(({ id }) => idToRemove !== id));
  };

  const isExistContact = name => {
    return contacts.some(contact => contact.name === name);
  };

  const containerClasses = [styles.container];

  return (
    <div className={containerClasses.join(' ')}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm addContact={addContact} isExistContact={isExistContact} />

      {contacts.length > 0 && (
        <>
          <h2 className={styles['sub-title']}>Contacts</h2>
          <Filter filter={filter} onChange={onChange} />
          <ContactList
            filter={filter}
            contacts={contacts}
            removeContactById={removeContactById}
          />
        </>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default PhoneBook;
