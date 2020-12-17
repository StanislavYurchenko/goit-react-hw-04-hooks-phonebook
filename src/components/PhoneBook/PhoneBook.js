import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './PhoneBook.module.css';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';

class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      this.setContactsToLocalStorage();
    }
  }

  componentDidMount() {
    this.setState({ contacts: this.getContactsFromLocalStorage() });
  }

  setContactsToLocalStorage = () => {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };

  getContactsFromLocalStorage = () => {
    const localStorageData = JSON.parse(localStorage.getItem('contacts'));
    return localStorageData ? localStorageData : [];
  };

  addContact = newContact => {
    this.setState(({ contacts }) => {
      return { contacts: [...contacts, newContact] };
    });
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  removeContactById = idToRemove => {
    const { contacts } = this.state;
    this.setState({ contacts: contacts.filter(({ id }) => idToRemove !== id) });
  };

  isExistContact = name => {
    const { contacts } = this.state;
    return contacts.some(contact => contact.name === name);
  };

  containerClasses = [styles.container];

  render() {
    const { filter, contacts } = this.state;
    return (
      <div className={this.containerClasses.join(' ')}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm
          addContact={this.addContact}
          isExistContact={this.isExistContact}
        />

        {contacts.length > 0 && (
          <>
            <h2 className={styles['sub-title']}>Contacts</h2>
            <Filter filter={filter} onChange={this.onChange} />
            <ContactList
              filter={filter}
              contacts={contacts}
              removeContactById={this.removeContactById}
            />
          </>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default PhoneBook;
