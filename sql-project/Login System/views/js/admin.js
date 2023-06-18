//Commands

(function () {
  const updateships = document.querySelector('.update-ships');

  updateships.addEventListener('click', () => {
    const http = new XMLHttpRequest();
    http.open('GET', '/updateships', true);
    http.send(null);
  });
})();

//Fetch + Display info

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    getships();
    getbadges();
    getranks();
    getlinkships();
    getlinkbadges();
    getlinkranks();
  });

  //Get

  const getships = () => {
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        displayships(JSON.parse(http.response));
      }
    };

    http.open('POST', `/getships`, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send();
  };

  const getbadges = () => {
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        displaybadges(JSON.parse(http.response));
      }
    };

    http.open('POST', `/getbadges`, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send();
  };

  const getranks = () => {
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        displayranks(JSON.parse(http.response));
      }
    };

    http.open('POST', `/getranks`, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send();
  };

  const getlinkships = () => {
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        displaylinkships(JSON.parse(http.response));
      }
    };

    http.open('POST', `/getlinkships`, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send();
  };

  const getlinkbadges = () => {
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        displaylinkbadges(JSON.parse(http.response));
      }
    };

    http.open('POST', `/getlinkbadges`, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send();
  };

  const getlinkranks = () => {
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        displaylinkranks(JSON.parse(http.response));
      }
    };

    http.open('POST', `/getlinkranks`, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send();
  };

  //Display

  const displayships = (data) => {
    const parent = document.querySelector('.ships');

    const title = document.createElement('p');
    title.classList.add('title');
    title.innerText = 'Ships';

    const table = document.createElement('table');

    data.forEach((row) => {
      const tr = document.createElement('tr');

      const id = document.createElement('th');
      id.innerText = row.shipID;

      const manufacturer = document.createElement('th');
      manufacturer.innerText = row.manufacturer;

      const name = document.createElement('th');
      name.innerText = row.name;

      const remove = document.createElement('button');
      remove.innerText = 'TBA';
      remove.addEventListener('click', () => {
        removerow('ships', row.shipID, 'ship');
      });

      tr.appendChild(id);
      tr.appendChild(manufacturer);
      tr.appendChild(name);
      tr.appendChild(remove);

      table.appendChild(tr);
    });

    parent.appendChild(title);
    parent.appendChild(table);
  };

  const displaybadges = (data) => {
    const parent = document.querySelector('.badges');

    const title = document.createElement('p');
    title.classList.add('title');
    title.innerText = 'Badges';

    const table = document.createElement('table');

    const tr = document.createElement('tr');

    const name = document.createElement('th');
    name.innerText = 'Names';

    const type = document.createElement('th');
    type.innerText = 'Type';

    const form = document.createElement('th');
    form.innerText = 'Update Badge';

    tr.appendChild(name);
    tr.appendChild(type);
    tr.appendChild(form);

    table.appendChild(tr);

    data.forEach((row) => {
      const tr = document.createElement('tr');

      const name = document.createElement('th');
      name.innerText = row.badgename;

      const type = document.createElement('th');
      type.innerText = row.badgetype;

      const th = document.createElement('th');

      const form = document.createElement('form');
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = form.querySelector('.input-name').value;
        const type = form.querySelector('.input-type').value;
        const id = row.badgeID;

        const http = new XMLHttpRequest();

        http.onreadystatechange = () => {
          if (http.readyState === 4) {
            getbadges();
          }
        };

        http.open('POST', `/updatebadge`, true);
        http.setRequestHeader('Content-type', 'application/json');
        http.send(
          JSON.stringify({
            id: id,
            name: name,
            type: type,
          })
        );
      });

      const newname = document.createElement('input');
      newname.setAttribute('type', 'text');
      newname.setAttribute('name', 'name');
      newname.setAttribute('placeholder', 'new-badge-name');
      newname.setAttribute('required', 'null');
      newname.classList.add('input-name');

      const newtype = document.createElement('input');
      newtype.setAttribute('type', 'text');
      newtype.setAttribute('name', 'type');
      newtype.setAttribute('placeholder', 'new-badge-type');
      newtype.setAttribute('required', 'null');
      newtype.classList.add('input-type');

      const button = document.createElement('button');
      button.setAttribute('type', 'submit');
      button.innerText = 'Update';

      form.appendChild(newname);
      form.appendChild(newtype);
      form.appendChild(button);

      th.appendChild(form);

      tr.appendChild(name);
      tr.appendChild(type);
      tr.appendChild(th);

      table.appendChild(tr);
    });

    while (parent.firstChild) {
      parent.firstChild.remove();
    }

    parent.appendChild(title);
    parent.appendChild(table);
  };

  const displayranks = (data) => {
    const parent = document.querySelector('.ranks');

    const title = document.createElement('p');
    title.classList.add('title');
    title.innerText = 'Ranks';

    const table = document.createElement('table');

    data.forEach((row) => {
      const tr = document.createElement('tr');

      table.appendChild(tr);
    });

    parent.appendChild(title);
    parent.appendChild(table);
  };

  const displaylinkranks = (data) => {
    const parent = document.querySelector('.linkranks');

    const title = document.createElement('p');
    title.classList.add('title');
    title.innerText = 'Linkranks';

    const table = document.createElement('table');

    data.forEach((row) => {
      const tr = document.createElement('tr');

      table.appendChild(tr);
    });

    parent.appendChild(title);
    parent.appendChild(table);
  };

  const displaylinkships = (data) => {
    const parent = document.querySelector('.linkships');

    const title = document.createElement('p');
    title.classList.add('title');
    title.innerText = 'Linkships';

    const table = document.createElement('table');

    data.forEach((row) => {
      const tr = document.createElement('tr');

      table.appendChild(tr);
    });

    parent.appendChild(title);
    parent.appendChild(table);
  };

  const displaylinkbadges = (data) => {
    const parent = document.querySelector('.linkbadges');

    const title = document.createElement('p');
    title.classList.add('title');
    title.innerText = 'Linkbadges';

    const table = document.createElement('table');

    data.forEach((row) => {
      const tr = document.createElement('tr');

      table.appendChild(tr);
    });

    parent.appendChild(title);
    parent.appendChild(table);
  };

  const removerow = (table, id, name) => {
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        displaylinkranks(JSON.parse(http.response));
      }
    };

    http.open('POST', `/removerow`, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send({
      id: id,
      table: table,
      name: name,
    });
  };
})();

//Display container

(function () {
  //Containers
  const fetch = document.querySelector('.container-fetch');
  const insert = document.querySelector('.container-insert');

  //Buttons
  const togglebtn = document.querySelector('.container-display .toggle-btn');
  let toggle = false;

  togglebtn.addEventListener('click', () => {
    console.log('toggle');
    if (toggle) {
      fetch.classList.remove('display');
      insert.classList.add('display');
      togglebtn.innerText = 'Fetchs';

      toggle = false;
    } else {
      insert.classList.remove('display');
      fetch.classList.add('display');
      togglebtn.innerText = 'Inserts';

      toggle = true;
    }
  });
})();

//Insert Forms

(function () {
  const shipForm = document.querySelector('.ship');
  const rankForm = document.querySelector('.rank');
  const badgeForm = document.querySelector('.badge');
})();
