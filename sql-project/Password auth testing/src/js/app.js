document.querySelector('#test').addEventListener('click', () => {
  const data = {
    id: 'DEFAULT',
    name: 'Kyle',
    email: 'kyle@gmail.com',
    password: 'hashedpwd',
  };

  const Http = new XMLHttpRequest();
  Http.open('POST', '/users');

  Http.setRequestHeader('Accept', 'application/json');
  Http.setRequestHeader('Content-Type', 'application/json');

  Http.send(JSON.stringify(data));
});

document.querySelector('#login').addEventListener('click', () => {
  const data = {
    id: 'DEFAULT',
    name: 'Kyle',
    mail: 'kyle@gmail.com',
    password: 'hashedpwd',
  };

  const Http = new XMLHttpRequest();
  Http.open('POST', '/users/login');

  Http.setRequestHeader('Accept', 'application/json');
  Http.setRequestHeader('Content-Type', 'application/json');

  Http.send(JSON.stringify(data));
});
