function useLocalStorage() {
  const getItem = (key) => {
    if (
      typeof key === "number" ||
      typeof key === "string" ||
      typeof key === "boolean"
    ) {
      return localStorage.getItem(key);
    } else {
      return JSON.parse(localStorage.getItem(key));
    }
  };

  const setItem = (key, data) => {
    if (
      typeof key === "number" ||
      typeof key === "string" ||
      typeof key === "boolean"
    ) {
      return localStorage.setItem(key, data);
    } else {
      return localStorage.setItem(key, JSON.stringify(data));
    }
  };

  const removeItem = (key) => {
    localStorage.removeItem(key);
  };

  const clear = () => {
    localStorage.clear();
  };

  const length = () => {
    return localStorage.length;
  };

  return { getItem, setItem, removeItem, clear, length };
}
export { useLocalStorage };
