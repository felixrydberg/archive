import { db } from './db';
import {
  ref,
  update,
  push,
  remove,
  get,
  DataSnapshot,
} from 'firebase/database';
import Post from './Post';

// Whole function is to create forummessages and categories with scaling in mind
// creates category messageboard based on selected category in main page
export const createPostgui = (): void => {
  const main: HTMLElement = document.querySelector('main');
  // Fetch who is logged in
  const sessionName = sessionStorage.getItem('name');
  // Using sessionstorage to store clicked category. Fetching value with getItem
  const category = sessionStorage.getItem('category');
  // Lets clear any existing childnodes on parent main
  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }

  // Fetching snapshot of data under selected category
  get(ref(db, `/posts/${category}`)).then((snapshot: DataSnapshot): void => {
    // Creating Category Header
    const article = document.createElement('article');
    article.classList.add('category-wrapper');
    const categoryTitle = document.createElement('h2');
    categoryTitle.classList.add('category-title');
    main.prepend(categoryTitle);
    // if category does'nt exist, tell user
    categoryTitle.innerText = `No data is available for category ${category}`;
    if (sessionStorage.getItem('login')) {
      article.appendChild(createForm(category));
    }
    // End Category Header
    if (snapshot.exists()) {
      // If category snapshop exists, publish category name
      categoryTitle.innerText = category.toUpperCase();
      // reverse order messages are shown
      const posts: Post[] = chronologicalOrder(snapshot);
      // If data exists create article to store category data in & attach to <main> element
      if (sessionStorage.getItem('login')) {
        posts.forEach((post: Post): void => {
          const { username, uid, title, timestamp, message } = post;

          article.appendChild(
            createMessageBody(
              {
                username: username,
                uid: uid,
                title: title,
                timestamp: timestamp.toString(),
                message: message,
              },
              sessionName,
              category
            )
          );
        });
      }
    }
    main.appendChild(article);
  });
};

// Function that creates an message form for each category
const createForm = (category: string): HTMLDivElement => {
  const username: string = sessionStorage.getItem('name');

  const container: HTMLDivElement = document.createElement('div');
  container.classList.add('form-container');
  // creating form to send messages with
  const form: HTMLFormElement = document.createElement('form');
  form.setAttribute('id', `${category}`);
  form.classList.add('post-forms');

  // Title input which has a 5 character minimum requirement

  const title: HTMLInputElement = document.createElement('input');
  title.setAttribute('type', 'text');
  title.setAttribute('name', 'title');
  title.setAttribute('id', 'title');
  title.setAttribute('placeholder', 'Add a title.. (min 5 characters)');
  title.required = true;

  // Message input which has a max 500 character limit

  const message: HTMLTextAreaElement = document.createElement('textarea');

  message.setAttribute('name', 'message');
  message.setAttribute('id', 'message');
  message.setAttribute('maxlength', '500');
  message.setAttribute('form', category);
  message.setAttribute('cols', '10');
  message.setAttribute('rows', '10');
  message.setAttribute(
    'placeholder',
    'Write something interesting.. (max 500 char length) '
  );

  // Submit button with listener that checks that the limit & requirement is upheld & forwards data to post creation.
  const submitButton: HTMLInputElement = document.createElement('input');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('value', 'Post Message');
  form.addEventListener('submit', (e: MouseEvent): void => {
    e.preventDefault();

    if (
      message.value !== '' &&
      message.value.length <= 500 &&
      title.value !== '' &&
      title.value.length >= 5
    ) {
      addPostToDb({
        username: username,
        title: title.value,
        message: message.value,
        category,
      });
      message.value = '';
      title.value = '';
    }
    if (message.value.length > 500) {
      message.style.borderBlockColor = 'red';
    }
    if (title.value.length < 5) {
      title.style.borderBlockColor = 'red';
    }
  });
  // Simple reset form button
  const resetButton: HTMLInputElement = document.createElement('input');
  resetButton.setAttribute('type', 'reset');
  resetButton.setAttribute('value', 'Cancel');

  form.appendChild(title);

  form.appendChild(message);

  form.appendChild(submitButton);
  form.appendChild(resetButton);

  container.append(form);

  return container;
};
interface config {
  username: string;
  title: string;
  message: string;
  category: string;
}

// pushes new data to database based on category selection
const addPostToDb = (newPost: config): void => {
  const dbRef = ref(db, `/posts/${newPost.category}`);

  const uuid: string = push(dbRef).key;
  const post = new Post(newPost.username, newPost.title, newPost.message, uuid);
  const posts = {};
  posts[uuid] = post;
  update(dbRef, posts);
};

// Takes the snapshop, creates a array from data and returns a reversed array
const chronologicalOrder = (snapshot: DataSnapshot): Post[] => {
  const posts: Post[] = [];
  for (const x in snapshot.val()) {
    const { username, uid, title, timestamp, message } = snapshot.val()[x];
    posts.push(new Post(username, title, message, uid, timestamp));
  }
  return posts.reverse();
};
interface Messages {
  username: string;
  uid: string;
  title: string;
  timestamp: string;
  message: string;
}

// Function for creating message body, which returns a constructed HTMLDIVElement
const createMessageBody = (
  messages: Messages,
  sessionName: string,
  category: string
): HTMLDivElement => {
  const { username, uid, title, timestamp, message } = messages;

  // Message Body with header div containing timestamp, who posted, title and message
  const postWrapperDiv = document.createElement('div');
  const postHeaderDiv = document.createElement('div');
  const postTitle = document.createElement('h5');
  const idParagraph = document.createElement('p');
  const createdByParagraph = document.createElement('p');
  const timeOfPost = document.createElement('p');
  const messageBody = document.createElement('p');

  postWrapperDiv.classList.add('message-wrapper');

  idParagraph.innerText = `postid: #${uid}`;
  idParagraph.classList.add('post-id');

  postTitle.innerText = `Title: ${title}`;
  postTitle.classList.add('post-title');

  createdByParagraph.innerHTML = `Poster:<a href=""> ${username}</a> (click to show profile)`;
  createdByParagraph.classList.add('poster');
  // Adding clickevent on <p> and setting poster name in session, then reroute user to profile for display of data
  createdByParagraph.addEventListener('click', (e: MouseEvent): void => {
    e.preventDefault();
    sessionStorage.setItem('profile', username);
    window.location.replace('profile.html');
  });

  timeOfPost.innerText = `Posted: ${timestamp}`;
  timeOfPost.classList.add('timestamp');

  messageBody.innerText = message;
  messageBody.classList.add('post');

  postHeaderDiv.appendChild(idParagraph);
  postHeaderDiv.appendChild(postTitle);
  postHeaderDiv.appendChild(createdByParagraph);
  postHeaderDiv.appendChild(timeOfPost);
  postWrapperDiv.appendChild(postHeaderDiv);
  postWrapperDiv.append(messageBody);
  // End Message Body

  // if user is owner of post, add possibility to remove it.
  if (sessionName === username) {
    const removeBtn: HTMLButtonElement = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerText = 'Delete Post';
    removeBtn.addEventListener('click', (e: MouseEvent): void => {
      e.preventDefault();
      remove(ref(db, `/posts/${category}/${uid}`));
    });
    postWrapperDiv.append(removeBtn);
  }
  return postWrapperDiv;
};
