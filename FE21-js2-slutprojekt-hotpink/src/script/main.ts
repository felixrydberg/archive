import navToggle from './modules/navtoggle';

((): void => {
  // Creates categories which holds clickable element.
  const showCategories = (): void => {
    const categories: string[] = ['gaming', 'programmering', 'mat'];
    const main: HTMLDivElement = document.querySelector('.index-main');
    categories.forEach((category: string): void => {
      const article: HTMLElement = document.createElement('article');
      article.classList.add('article-category');

      const link: HTMLAnchorElement = document.createElement('a');
      link.setAttribute('href', './forum.html');
      link.setAttribute('target', '_self');

      // Stores category data in session, for usage when creating posts
      link.addEventListener('click', (e: MouseEvent): void =>
        sessionStorage.setItem('category', category)
      );
      const categoryTitle: HTMLElement = document.createElement('h2');

      categoryTitle.classList.add('forum-category');
      link.appendChild(categoryTitle);
      article.appendChild(link);
      categoryTitle.innerText = category.toUpperCase();
      main.appendChild(article);
    });
  };
  showCategories();
  navToggle();
})();
