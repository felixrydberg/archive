(function () {
  const addship = document.querySelector('.addships');

  const openAddfleet = document.querySelector('.open-addfleet');
  openAddfleet.addEventListener('click', () => {
    addship.classList.add('display');
  });

  const closeAddfleet = document.querySelector('.close-addfleet');
  closeAddfleet.addEventListener('click', () => {
    addship.classList.remove('display');
  });
})();
