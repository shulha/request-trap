$(document).ready(() => {
  const socket = io.connect('http://localhost:3000');

  socket.emit('room_join', trapId);

  function parseObj(obj) {
    let str = '';
    Object.entries(obj).forEach((entry) => {
      str += `<p>${entry[0]}: ${entry[1]}</p>`;
    });
    return str;
  }

  function addTrapRequest(request) {
    $('#trapTable tr:first')
      .after(
        `<tr>
          <td>${request.created_at}</td>
          <td>${request.method}</td>
          <td>${parseObj(request.headers)}</td>
          <td>${request.remote_ip}</td>
          <td>${request.scheme}</td>
          <td>${parseObj(request.query_params)}</td>
          <td>${parseObj(request.cookies)}</td>
          <td>${parseObj(request.body)}</td>
          </tr>`,
      );
  }

  socket.on('catched', (data) => {
    addTrapRequest(data);
  });
});
