import React, { createContext, useState } from 'react';

const AppContext = createContext();

const App = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [itemList, setItemList] = useState([]);

  const handleLogin = () => {
    setCurrentUser('rohan');
    setIsAuthenticated(true);
  };

  const handleSignout = () => {
    setCurrentUser('');
    setIsAuthenticated(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      const newItem = {
        id: `item-${inputValue}`,
        name: inputValue,
      };
      setItemList((prevItems) => [...prevItems, newItem]);
      setInputValue('');
    }
  };

  const handleRemoveItem = (itemId) => {
    setItemList((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleClearList = () => {
    setItemList([]);
  };

  return (
    <AppContext.Provider value={{ currentUser, isAuthenticated }}>
      <div>
        <button id="login-btn" onClick={handleLogin}>
          Login
        </button>
        <button id="signout" onClick={handleSignout}>
          Signout
        </button>
        <div id="current-user">
          Current user: {currentUser}, isAuthenticated: {isAuthenticated ? 'Yes' : 'No'}
        </div>
        <input
          id="shopping-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddItem}>Add</button>
        <ul>
          {itemList.map((item) => (
            <li key={item.id}>
              {item.name}
              <button id={`remove-${item.id}`} onClick={() => handleRemoveItem(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button id="clear-list" onClick={handleClearList}>
          Clear
        </button>
      </div>
    </AppContext.Provider>
  );
};

export default App;
