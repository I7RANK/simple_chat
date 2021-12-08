var socket = io();

var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function (msg) {
  const chatBox = document.querySelector('.chat-box');
  var li = document.createElement('li');
  var div = document.createElement('div');
  var span = document.createElement('span');

  li.setAttribute('class', 'message-box');
  div.setAttribute('class', 'our-message me-message');

  li.appendChild(div);
  div.appendChild(span);

  span.textContent = msg;
  messages.appendChild(li);
  chatBox.scrollTo(0, chatBox.scrollHeight);
});
