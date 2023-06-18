(function () {
  window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    getships('');
    userShips();
  });

  const shipsearch = document.querySelector('.content .search');
  shipsearch.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = shipsearch.querySelector('input').value;
    getships(name);
  });

  const searchreset = document.querySelector('.content .reset');
  searchreset.addEventListener('submit', (event) => {
    event.preventDefault();
    getships('');
  });

  const userShips = () => {
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        displayUserships(JSON.parse(http.response));
      }
    };

    http.open('POST', `/getuserfleet`, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send();
  };

  const getships = (name) => {
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        displayAddfleet(JSON.parse(http.response));
      }
    };

    http.open('POST', `/userships`, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send(
      JSON.stringify({
        name: `${name}`,
      })
    );
  };

  const displayUserships = (data) => {
    const parent = document.querySelector('.userfleet .container');

    while (parent.firstChild) {
      parent.firstChild.remove();
    }

    const table = document.createElement('table');

    const tr = document.createElement('tr');

    const manufacturer = document.createElement('th');
    manufacturer.innerText = 'Manufacturer';

    const name = document.createElement('th');
    name.innerText = 'Ship name';

    tr.appendChild(manufacturer);
    tr.appendChild(name);

    if (window.innerWidth >= 950) {
      const career = document.createElement('th');
      career.innerText = 'Career';

      const focus = document.createElement('th');
      focus.innerText = 'Focus';

      const type = document.createElement('th');
      type.innerText = 'Class';

      const size = document.createElement('th');
      size.innerText = 'Size';

      tr.appendChild(career);
      tr.appendChild(focus);
      tr.appendChild(type);
      tr.appendChild(size);
    }

    const remove = document.createElement('th');
    remove.innerText = 'Remove';

    table.appendChild(tr);

    data.forEach((row) => {
      const tr = document.createElement('tr');

      const manu = document.createElement('th');
      manu.innerText = row.manufacturer;

      const name = document.createElement('th');
      name.innerText = row.name;

      tr.appendChild(manu);
      tr.appendChild(name);

      if (window.innerWidth >= 950) {
        const career = document.createElement('th');
        career.innerText = row.career;

        const focus = document.createElement('th');
        focus.innerText = row.focus;

        const type = document.createElement('th');
        type.innerText = row.class;

        const size = document.createElement('th');
        size.innerText = row.size;

        tr.appendChild(career);
        tr.appendChild(focus);
        tr.appendChild(type);
        tr.appendChild(size);
      }

      const remove = document.createElement('th');

      const btn = document.createElement('button');
      btn.innerText = 'X';
      btn.addEventListener('click', () => {
        const http = new XMLHttpRequest();

        http.onreadystatechange = () => {
          if (http.readyState === 4) {
            userShips();
            console.log('button pressed');
            while (parent.firstChild) {
              parent.firstChild.remove();
            }
          }
        };

        http.open('POST', `/removeusership`, true);
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify({ id: `${row.linkID}` }));
      });

      remove.appendChild(btn);

      tr.appendChild(remove);

      table.appendChild(tr);

      parent.appendChild(table);
    });
  };

  const displayAddfleet = (data) => {
    const parent = document.querySelector('main .addships .container');

    const table = document.createElement('table');

    const tr = document.createElement('tr');

    const manufacturer = document.createElement('th');
    manufacturer.innerText = 'Manufacturer';

    const name = document.createElement('th');
    name.innerText = 'Ship name';

    const addtofleet = document.createElement('th');
    addtofleet.innerText = 'Add ship';

    tr.appendChild(manufacturer);
    tr.appendChild(name);

    if (window.innerWidth >= 950) {
      const career = document.createElement('th');
      career.innerText = 'Career';

      const focus = document.createElement('th');
      focus.innerText = 'Focus';

      const type = document.createElement('th');
      type.innerText = 'Class';

      const size = document.createElement('th');
      size.innerText = 'Size';

      tr.appendChild(career);
      tr.appendChild(focus);
      tr.appendChild(type);
      tr.appendChild(size);
    }

    tr.appendChild(addtofleet);

    table.appendChild(tr);

    data.forEach((row) => {
      const tr = document.createElement('tr');

      const manu = document.createElement('th');
      manu.innerText = row.manufacturer;

      const name = document.createElement('th');
      name.innerText = row.name;

      const addtofleet = document.createElement('th');
      addtofleet.style.padding = '0';

      const btn = document.createElement('button');
      btn.innerText = 'Add ship';
      btn.addEventListener('click', () => {
        const http = new XMLHttpRequest();

        http.onreadystatechange = () => {
          if (http.readyState === 4) {
            userShips();
          }
        };

        http.open('POST', `/addship`, true);
        http.setRequestHeader('Content-type', 'application/json');
        http.send(JSON.stringify({ id: `${row.shipID}` }));
      });

      tr.appendChild(manu);
      tr.appendChild(name);

      if (window.innerWidth >= 950) {
        const career = document.createElement('th');
        career.innerText = row.career;

        const focus = document.createElement('th');
        focus.innerText = row.focus;

        const type = document.createElement('th');
        type.innerText = row.class;

        const size = document.createElement('th');
        size.innerText = row.size;

        tr.appendChild(career);
        tr.appendChild(focus);
        tr.appendChild(type);
        tr.appendChild(size);
      }

      addtofleet.appendChild(btn);

      tr.appendChild(addtofleet);

      table.appendChild(tr);
    });

    while (parent.firstChild) {
      parent.firstChild.remove();
    }

    parent.appendChild(table);
  };
})();
