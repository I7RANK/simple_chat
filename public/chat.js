let myName = '';

while (myName === '') {
  myName = window.prompt('Say me your name*');
}

const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');

function insertMessageBox(msg, type, userName) {
  const chatBox = document.querySelector('.chat-box');
  const li = document.createElement('li');
  const div = document.createElement('div');
  const p = document.createElement('p');
  const span = document.createElement('span');
  let messagetype = 'me-message';

  if (type === 'your') messagetype = 'your-message';

  li.setAttribute('class', 'message-box');
  div.setAttribute('class', `our-message ${messagetype}`);
  span.setAttribute('class', 'message-user-name');
  p.setAttribute('class', 'message-text');

  li.appendChild(div);
  div.appendChild(span);
  div.appendChild(p);

  span.textContent = userName;
  p.textContent = msg;
  messages.appendChild(li);
  chatBox.scrollTo(0, chatBox.scrollHeight);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    const obj = {
      id: socket.id,
      userName: myName,
      date: new Date(),
      msg: input.value
    };

    insertMessageBox(input.value, '', myName);
    socket.emit('chat message', obj);
    input.value = '';
  }
});

socket.on("connect", () => {
  console.log("I'm connected");
  console.log(socket.id);
});

socket.on('chat message', function (res) {
  if (res.id !== socket.id) insertMessageBox(res.msg, 'your', res.userName);
});
