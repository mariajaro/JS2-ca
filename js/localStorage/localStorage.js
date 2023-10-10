export const setLocalStorage = (key, value) => {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  };
  
  export const fetchLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    const parsedData = JSON.parse(data);
    return parsedData;
  };
