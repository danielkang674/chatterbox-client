// YOUR CODE HERE:
// http://parse.atx.hackreactor.com/chatterbox/classes/messages

const app = {};
app.server = 'http://parse.atx.hackreactor.com/chatterbox/classes/messages';
app.friends = ['Bob', 'Jake', 'Justin', 'Casey', 'Hitt'];
app.init = () => {
  app.fetchAllMessages();
  app.renderFriends();
  
  $('#fetchMessage').click((event) => {
    event.preventDefault();
    app.fetchAllMessages();
  });
  
  
  $('#lobbyRoom').change((event)=>{
    event.preventDefault();
    app.fetchAllMessages();
  });
  return;
};

app.send = (message) => {
  // let trollMessage = {
  //   username: "<script>document.body.style.backgroundImage = `url('https://i.pinimg.com/originals/48/44/64/484464fe103a69440e452d52010f86cf.jpg')`;</script>",
  //   text: "<script>document.body.style.backgroundImage = `url('https://i.pinimg.com/originals/48/44/64/484464fe103a69440e452d52010f86cf.jpg')`;</script>",
  //   roomname: "<script>document.body.style.backgroundImage = `url('https://i.pinimg.com/originals/48/44/64/484464fe103a69440e452d52010f86cf.jpg')`;</script>",
  // };
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
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

app.fetch = (params) => {
  // let params = encodeURI('&where={"username":"Walker"
//                                    roomname: "lobby"}');
  // console.log(params);
  let ourDataObj = {'order': '-createdAt', 'limit': 30, 'where': {'roomname': params}};
  $.ajax({
    url: app.server,
    type: 'GET',
    data: ourDataObj,
    success: function (data) {
      app.handleData(data);
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
  let cleanedData = app.cleanData(message);
  let singleMessage = $('<p></p>').text(`${cleanedData.username}: ${cleanedData.text}`);
  singleMessage.addClass(`singleMessage ${cleanedData.username}`);
  singleMessage.click((event)=>{
    app.addFriend(cleanedData.username);
    $(`.${cleanedData.username}`).css('font-weight', 'Bold');
  });
  $('#chats').append(singleMessage);
};

app.renderRoom = (roomString) => {
  $('#roomSelect').append(`<div id="${roomString}">${roomString}</div>`);
};

app.handleUsernameClick = (username) => {
  return;
};

app.handleSubmit = (message) => {
  console.log('I was submitted from handleSubmit');
  app.send(message);
};
// ;    
app.parseUser = (someString) => {
  let newName = someString.slice(10);
  return newName;
};

app.handleData = (data)=>{
  // let resultsArray = data.results;
  console.log('from handleData', data);
  
  
  data.results.forEach(message=>{
    app.renderMessage(message);
  });
};

//data should be an object that has username, roomname, and text
app.cleanData = (message) => {
  let results = message;
  results.username = _.escape(results.username);
  results.text = _.escape(results.text);
  results.roomname = _.escape(results.roomname);
  results.username = results.username.replace(/[^A-Za-z0-9]/g, '');
  return results;

};

app.fetchAllMessages = ()=>{
  $('.singleMessage').remove();
  let lobbyName = $('#lobbyRoom').val();
  app.fetch(lobbyName);
};

app.addFriend = (friend) => {
  let cleanFriend = _.escape(friend);
  app.friends.push(cleanFriend);
  app.renderFriends();
};

app.renderFriends = () => {
  $('#myFriends').empty();
  app.friends.forEach((friend)=>{
    $('#myFriends').append(`<p class="friend"><a href="#">${friend}</a></p>`);
  });
};

