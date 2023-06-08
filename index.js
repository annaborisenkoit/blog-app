const posts = [];

const TITLE_VALIDATION_LIMIT = 10;
const TEXT_VALIDATION_LIMIT = 20;

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');
const outputTitle = document.querySelector('.js-output-title');
const outputText = document.querySelector('.js-output-text');
const validationMessage = document.querySelector('.js-validationMessage');

newPostBtnNode.addEventListener('click', function () {
  //получит данные из поля ввода

  const postFromUser = getPostFromUser(); // присвоит значение, которое ввел пользователь

  addPost(postFromUser); //этот метод добавит новый пост в массив (но еще не отобразит на странице)

  renderPosts(); //отобразит пост на странице

  clearInput(); //очистит инпуты
});

postTitleInputNode.addEventListener('input', function () {
  validation();
  validationDisabledButton();
});

postTextInputNode.addEventListener('input', function () {
  validation();
  validationDisabledButton();
});

function validation() {
  const titlelen = postTitleInputNode.value.length;
  const textlen = postTextInputNode.value.length;

  if (titlelen > TITLE_VALIDATION_LIMIT) {
    outputTitle.innerText = `Длина заголовка не должна превышать ${TITLE_VALIDATION_LIMIT} символов`;
    outputTitle.classList.remove('output-title_hidden');
    return;
  } else {
    outputTitle.classList.add('output-title_hidden');
  }

  if (textlen > TEXT_VALIDATION_LIMIT) {
    outputText.innerText = `Длина текста не должна превышать ${TEXT_VALIDATION_LIMIT} символов`;
    outputText.classList.remove('output-text_hidden');
    return;
  } else {
    outputText.classList.add('output-text_hidden');
  }
}

function validationDisabledButton() {
  if (
    postTitleInputNode.value.length > TITLE_VALIDATION_LIMIT ||
    postTextInputNode.value.length > TEXT_VALIDATION_LIMIT
  ) {
    newPostBtnNode.setAttribute('disabled', 'disabled');
    newPostBtnNode.classList.add('btn-disabled');
  } else {
    newPostBtnNode.removeAttribute('disabled');
    newPostBtnNode.classList.remove('btn-disabled');
  }
}

function getPostFromUser() {
  //заголовок получаем из одного поля ввода, а текст из другого
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;
  const options = { weekday: 'long', hour: 'numeric', minute: 'numeric' };
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString([], options);

  if (!title || !text) {
    return;
  }

  return {
    //возвращаем объект, состоящий из тайтла, текста, даты и времени
    title: title,
    text: text,
    date: date,
    time: time,
  };
}

function addPost({ title, text, date, time }) {
  // в эту функцию мы передаем объект, состоящий из тайтла и текста - и потом мы из этого объекта в массив постов запушим новый
  posts.push({
    title,
    text,
    date,
    time,
  });
}

function getPosts() {
  return posts;
}

function renderPosts() {
  const posts = getPosts();
  //метод renderPost, который отрисовывал один пост, а теперь мне нужно отрисовывать не просто один пост, а сформировать список html

  let postsHTML = '';

  posts.forEach((post) => {
    postsHTML += `  
      <div class='post'>
          <p class='post__date'>${post.date} ${post.time}</p>
          <p class='post__title'>${post.title}</p>
          <p class='post__text'>${post.text}</p>
      </div>
    `;
  });

  postsNode.innerHTML = postsHTML;
  //вставляем этот HTML в Ленту posts
}

function clearInput() {
  postTitleInputNode.value = '';
  postTextInputNode.value = '';
}
