const books = document.querySelector('.books');
const addBtn = document.querySelector('.add-btn');
const inputAuthor = document.querySelector('.author');
const inputTitle = document.querySelector('.title');

let bookCollection = [];

function renderList() {
  books.innerHTML = '';
  bookCollection.forEach((el, i) => {
    /* eslint-disable */
    const html = `
			<div class="each-book">
		  		<span class="book-title">${el.title}</span>
		  		<span class="author">${el.author}</span>
		  		<button class="remove-btn" data-id=${i}>Remove</button>
	  		</div>`;
    /* eslint-enable */
    books.insertAdjacentHTML('afterbegin', html);
  });
}

const setLocalStorage = function () {
  localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
};

const getLocalStorage = function () {
  if (localStorage.getItem('bookCollection')) {
    bookCollection = JSON.parse(localStorage.getItem('bookCollection'));
    renderList();
  }
};

getLocalStorage();

addBtn.addEventListener('click', () => {
  const title = inputTitle.value;
  const author = inputAuthor.value;
  if (author && title) {
    bookCollection.push({
      title,
      author,
    });
    setLocalStorage(bookCollection);
    renderList();
  }
  inputTitle.value = '';
  inputAuthor.value = '';
});

const removeList = (el) => {
  bookCollection.splice(el, 1);
  setLocalStorage();
  renderList();
};

books.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const removeBtn = +e.target.dataset.id;
    removeList(removeBtn);
  }
});