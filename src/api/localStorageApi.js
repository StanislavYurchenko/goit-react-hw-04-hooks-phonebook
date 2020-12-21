export const getContactsFromLocalStorage = () => {
  const localStorageData = JSON.parse(localStorage.getItem('contacts'));
  return localStorageData ? localStorageData : [];
};

export const setContactsToLocalStorage = contacts => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
};
