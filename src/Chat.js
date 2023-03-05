import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    // Fetch initial chat messages
    axios.get('https://api.chatgpt.com/messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // Function to handle search query input change
  function handleSearchInputChange(event) {
    setSearchQuery(event.target.value);
  }

  // Function to handle search button click
  function handleSearchButtonClick() {
    const newFilteredMessages = messages.filter(message => {
      return message.text.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredMessages(newFilteredMessages);
  }

  // Function to handle enter button click
  function handleEnterButtonClick() {
    // Perform any desired action, such as sending a message to the chat
    console.log('Enter button clicked!');
  }

  return (
    <div>
      {/* Add the search bar and buttons */}
      <div>
        <input type="text" id="search-input" placeholder="Search messages..." onChange={handleSearchInputChange} />
        <button id="search-button" onClick={handleSearchButtonClick}>Search</button>
        <button id="enter-button" onClick={handleEnterButtonClick}>Enter</button>
      </div>

      {/* Display the filtered messages */}
      <ul>
        {filteredMessages.map(message => (
          <li key={message.id}>
            <strong>{message.user}</strong>: {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;
