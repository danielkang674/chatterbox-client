// YOUR CODE HERE:
// http://parse.atx.hackreactor.com/chatterbox/classes/messages

const app = {};
app.server = 'http://parse.atx.hackreactor.com/chatterbox/classes/messages';

app.init = () => {
  $('#fetchMessage').click((event) => {
    event.preventDefault();
    console.log(event);
    app.fetch();
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

app.fetch = () => {
  // let params = encodeURI('&where={"username":"Walker"
//                                    roomname: "lobby"}');
  // console.log(params);
  $.ajax({
    url: app.server + '?order=-createdAt' + '&limit=100',
    type: 'GET',
    success: function (data) {
      let cleanData = app.cleanData(data);
      app.handleData(cleanData);
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
  console.log('I was submitted from handleSubmit');
  app.send(message);
};
// app.allFriends = [];    
app.parseUser = (someString) => {
  let newName = someString.slice(10);
  return newName;
};

app.handleData = (data)=>{
  // let resultsArray = data.results;
  console.log('from handleData', data);
  data.forEach(message=>{
    app.renderMessage(message);
  });
};

//data should be an object that has username, roomname, and text
app.cleanData = (data) => {
  let results = data.results;
  console.log('from cleanData', results);
  
  //let newResults = _.escape(results);
  let newResult = results.map(user=>{
    _.escape(user.username);
    _.escape(user.text);
    _.escape(user.roomname);
  });
  
  return newResult;
  console.log('newResults', newResults);
};
// `<script>$("#chats").append(<img src="https://bit.ly/2Oq3AkD"></img>)</script>`
// "<script>document.body.style.backgroundImage = `url('https://i.pinimg.com/originals/48/44/64/484464fe103a69440e452d52010f86cf.jpg')`;</script>"
// "<script>document.body.style.backgroundImage = `url('https://i.pinimg.com/originals/48/44/64/484464fe103a69440e452d52010f86cf.jpg')`;</script>"
