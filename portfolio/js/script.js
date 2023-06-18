(function () {
  (function () {
    const btn = document.querySelector('#light-mode');
    const btnBackground = document.querySelector('#btn-background');

    const colors = [
      {
        color: 'black',
        background: 'rgb(255, 254, 240)',
      },
      {
        color: 'white',
        background: 'rgb(22, 22, 21)',
      },
    ];

    let drkmode = false;
    btn.addEventListener('click', () => {
      if (drkmode) {
        drkmode = false;
        btn.style.backgroundImage = "url('../image/icon/moon.svg')";
        changeColor(colors[1]);
      } else {
        drkmode = true;
        btn.style.backgroundImage = "url('../image/icon/sun.svg')";
        changeColor(colors[0]);
      }
    });
  })();

  const changeColor = (colors) => {
    document.body.style.background = colors.background;

    let elements = [
      document.querySelectorAll('li'),
      document.querySelectorAll('li a'),
      document.querySelectorAll('p'),
      document.querySelectorAll('h1'),
    ];

    for (const key of elements) {
      for (const element of key) {
        element.style.color = colors.color;
      }
    }

    document.querySelector('.banner article p').style.color = 'black';
  };
})();
