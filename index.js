const posts = [];

const TITLE_VALIDATION_LIMIT = 10;
const TEXT_VALIDATION_LIMIT = 20;

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');
const validationMessage = document.getElementById('validationMessage');

newPostBtnNode.addEventListener('click', function () {
  //получить данные из поля ввода
  const postFromUser = getPostFromUser();

  //сохранить пост (в данном случае заголовок поста) - присвой значение, которое ввел пользователь
  addPost(postFromUser);
  //этот метод в массив добавит новый пост
  //отобразить пост

  renderPosts();
});

postTitleInputNode.addEventListener('input', validation);

postTextInputNode.addEventListener('input', validation);

function validation() {
  const titlelen = postTitleInputNode.value.length;
  const textlen = postTextInputNode.value.length;

  if (titlelen > TITLE_VALIDATION_LIMIT) {
    validationMessage.innerText = `Длина заголовка не должна превышать ${TITLE_VALIDATION_LIMIT} символов!`;
    validationMessage.classList.remove('validationMessage_hidden');
    return;
  }

  if (textlen > TEXT_VALIDATION_LIMIT) {
    validationMessage.innerText = `Длина текста не должна превышать ${TEXT_VALIDATION_LIMIT} символов!`;
    validationMessage.classList.remove('validationMessage_hidden');
    return;
  }
  validationMessage.classList.add('validationMessage_hidden');
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
