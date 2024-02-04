const container = document.querySelector(".container");
const bookName = document.getElementById("bookName");
const bookAuthor = document.getElementById("bookAuthor");
const bookPages = document.getElementById("bookPages");
const newBook = document.querySelector(".newBook");
const dialog = document.querySelector("dialog");
const addBook = document.querySelector(".addBook");
const cancel = document.querySelector(".cancel");

newBook.addEventListener("click", () => {
  dialog.showModal();
});

cancel.addEventListener("click", () => {
  dialog.close();
});

const myLibrary = [];

function Book(name, author, pages, readStatus) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.info = () => {
    return `${this.name} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
  };
  this.changeStatus = () => {
    if (this.readStatus == "Read") {
      this.readStatus = "Not Yet Read";
    } else {
      this.readStatus = "Read";
    }
  };
}

const displayBooks = (bookList) => {
  for (let i = 0; i < bookList.length; i++) {
    const card = document.createElement("div");
    card.classList = "card";
    const bookName = document.createElement("p");
    bookName.textContent = bookList[i].name;
    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = bookList[i].author;
    const bookPages = document.createElement("p");
    bookPages.textContent = bookList[i].pages;
    const bookReadStatus = document.createElement("p");
    bookReadStatus.textContent = bookList[i].readStatus;
    const remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.classList = "remove-btn";
    remove.setAttribute("data-index", i);

    const editStatus = document.createElement("button");
    editStatus.textContent = "Change Status";
    editStatus.classList = "editStatBtn";
    editStatus.setAttribute("data-index", i);

    editStatus.addEventListener("click", changeStatus);
    remove.addEventListener("click", removeBook);

    card.appendChild(bookName);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(bookReadStatus);
    card.appendChild(remove);
    card.appendChild(editStatus);

    container.appendChild(card);
  }
};

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks(myLibrary);
}

const removeBook = (e) => {
  const bookIndex = parseInt(e.target.getAttribute("data-index"), 10);
  if (!isNaN(bookIndex)) {
    myLibrary.splice(bookIndex, 1);
  }
  container.innerHTML = "";
  displayBooks(myLibrary);
};

const changeStatus = (e) => {
  const bookIndex = parseInt(e.target.getAttribute("data-index"), 10);
  myLibrary[bookIndex].changeStatus();
  container.innerHTML = "";
  displayBooks(myLibrary);
};

addBook.addEventListener("click", (e) => {
  e.preventDefault();

  const bookReadStatus = document.querySelector(
    'input[name="status"]:checked'
  ).value;

  if (!bookName.value || !bookAuthor.value || !bookPages.value) {
    alert("Please fill in all fields before adding the book.");
    return;
  }

  const book = new Book(
    bookName.value,
    bookAuthor.value,
    bookPages.value,
    bookReadStatus
  );
  console.log(book);
  container.innerHTML = "";
  addBookToLibrary(book);
  dialog.close();
});
