(function () {
  window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    getOrgFleet();
  });

  const getOrgFleet = () => {
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        displayOrgFleet(JSON.parse(http.response));
      }
    };

    http.open('POST', `/getorgfleet`, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.send();
  };

  const displayOrgFleet = (data) => {
    const parent = document.querySelector('.orgfleet .container');

    const table = document.createElement('table');

    data.forEach((row) => {
      const tr = document.createElement('tr');

      const owner = document.createElement('th');
      owner.innerText = row.username;

      const manu = document.createElement('th');
      manu.innerText = row.manufacturer;

      const name = document.createElement('th');
      name.innerText = row.name;

      tr.appendChild(owner);
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

      table.appendChild(tr);

      parent.appendChild(table);
    });
  };
})();
