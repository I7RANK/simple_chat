const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');

function insertMessageBox(msg, type) {
  const chatBox = document.querySelector('.chat-box');
  const li = document.createElement('li');
  const div = document.createElement('div');
  const span = document.createElement('span');
  let messagetype = 'me-message';

  if (type === 'your') messagetype = 'your-message';

  li.setAttribute('class', 'message-box');
  div.setAttribute('class', `our-message ${messagetype}`);

  li.appendChild(div);
  div.appendChild(span);

  span.textContent = msg;
  messages.appendChild(li);
  chatBox.scrollTo(0, chatBox.scrollHeight);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    insertMessageBox(input.value);
    socket.emit('chat message', { id: socket.id, msg: input.value });
    input.value = '';
  }
});

socket.on("connect", () => {
  console.log("I'm connected");
  console.log(socket.id);
});

socket.on('chat message', function (res) {
  if (res.id !== socket.id) insertMessageBox(res.msg, 'your');
});

