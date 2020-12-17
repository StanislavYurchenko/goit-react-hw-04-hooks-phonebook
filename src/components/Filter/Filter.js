import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

function Filter({ filter, onChange }) {
  return (
    <>
      <div className={styles.description}>Find contacts by name</div>
      <input className={styles.input} onChange={onChange} value={filter} name="filter" type="text" />
    </>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}


export default Filter;
