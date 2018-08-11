// YOUR CODE HERE:
// http://parse.atx.hackreactor.com/chatterbox/classes/messages

const app = {};
app.server = 'http://parse.atx.hackreactor.com/chatterbox/classes/messages';

app.init = () => {
  return;
};

app.send = (message) => {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = () => {
  $.ajax({
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    success: function (data) {
      console.log(data);
      $('#chats').append(`<p class="chatText">${data.results[0].text}</p>`);
    },
    error: function (data) {
      console.error('chatterbox failed to get message:', data);
    }
  });
};

app.clearMessages = () => {
  $('#chats').children().remove();
};

app.renderMessage = (message) => {
  $('#chats').append(`<p class=""><a href="#" class="username" data="${message.username}">${message.username}</a>: ${message.text}</p>`);
  $('.username').click((event) => {
    app.handleUsernameClick(event.target.innerText);
  });
};

app.renderRoom = (roomString) => {
  $('#roomSelect').append(`<div id="${roomString}">${roomString}</div>`);
};

app.handleUsernameClick = (username) => {
    // app.allFriends.push(username);
  return;
};

app.handleSubmit = (message) => {
  console.log('I was submitted');
  app.send(message);
};
// app.allFriends = [];    
app.parseUser = (someString) => {
  let newName = someString.slice(10);
  return newName;
};
