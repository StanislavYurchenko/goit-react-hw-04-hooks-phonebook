import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const { addContact, isExistContact } = this.props;
    const normalizedName = name.trim();

    if (isExistContact(name)) {
      return toast.error(`"${normalizedName}" contact already exists`);
    }

    if (!normalizedName) {
      return toast.error('Enter contact name');
    }

    addContact({ name: normalizedName, number, id: uuidv4() });

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Name</h3>
        <input
          className={styles.input}
          name="name"
          value={name}
          onChange={this.onChange}
          type="text"
        />

        <h3>Number</h3>
        <input
          className={styles.input}
          name="number"
          value={number}
          onChange={this.onChange}
          type="text"
        />

        <button className={styles['remove-btn']} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  isExistContact: PropTypes.func.isRequired,
};

export default ContactForm;
