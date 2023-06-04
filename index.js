//структура данных теперь - не просто переменная, которая является строкой, а объект

const posts = [];

const postTitleInputNode = document.querySelector('.js-post-title-input');
const postTextInputNode = document.querySelector('.js-post-text-input');
const newPostBtnNode = document.querySelector('.js-new-post-btn');
const postsNode = document.querySelector('.js-posts');
const validationMessage = document.getElementById('validationMessage');

newPostBtnNode.addEventListener('click', function () {
  //получить данные из поля ввода
  const postFromUser = getPostFromUser();

  //сохранить пост (в данном случае заголовок поста) - присвой значение, которое ввел пользователь посту (в самом верху)
  addPost(postFromUser);
  //этот метод в массив добавит новый пост
  //отобразить пост

  renderPosts();
});

postTitleInputNode.addEventListener('input', function (event) {
  console.log('change', event.target.value);
});

function getPostFromUser() {
  //заголовок получаем из одного поля ввода, а текст из другого
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;

  return {
    //возвращаем объект, состоящий из тайтла и текста
    title: title,
    text: text,
  };
}

function addPost({ title, text }) {
  // в эту функцию мы передаем объект, состоящий из тайтла и текста - и потом мы из этого объекта в массив постов запушим новый
  const currentDate = new Date();
  const dt = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

  posts.push({
    dt,
    title,
    text,
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
          <p class='post__date'>${post.dt}</p>
          <p class='post__title'>${post.title}</p>
          <p class='post__text'>${post.text}</p>
      </div>
    `;
  });

  // const postHTML = `
  //   <div class='post'>
  //       <p class='post__title'>${post.title}</p>
  //       <p class='post__text'>${post.text}</p>
  //   </div>
  //   `;
  //формирование HTML через шаблонные строки с обратными кавычками

  postsNode.innerHTML = postsHTML;
  //вставляем этот HTML в Ленту posts
}
