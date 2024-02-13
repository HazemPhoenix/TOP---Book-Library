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

class Book {
  constructor(name, author, pages, readStatus) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
  info() {
    return `${this.name} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
  }
  changeStatus() {
    if (this.readStatus == "Read") {
      this.readStatus = "Not Yet Read";
    } else {
      this.readStatus = "Read";
    }
  }
}

class BookCard {
  constructor(book, i) {
    this.book = book;
    this.bookIndex = i;
    this.card = document.createElement("div");
    this.card.classList = "card";

    this.bookName = document.createElement("p");
    this.bookName.textContent = book.name;

    this.bookAuthor = document.createElement("p");
    this.textContent = book.author;

    this.bookPages = document.createElement("p");
    this.bookPages.textContent = book.pages;

    this.bookReadStatus = document.createElement("p");
    this.bookReadStatus.textContent = book.readStatus;

    this.remove = document.createElement("button");
    this.remove.textContent = "Remove";
    this.remove.classList = "remove-btn";
    this.remove.setAttribute("data-index", i);
    this.remove.addEventListener("click", removeBook);

    this.editStatus = document.createElement("button");
    this.editStatus.textContent = "Change Status";
    this.editStatus.classList = "editStatBtn";
    this.editStatus.setAttribute("data-index", i);
    this.editStatus.addEventListener("click", changeStatus);

    this.card.appendChild(this.bookName);
    this.card.appendChild(this.bookAuthor);
    this.card.appendChild(this.bookPages);
    this.card.appendChild(this.bookReadStatus);
    this.card.appendChild(this.remove);
    this.card.appendChild(this.editStatus);
    return this.card;
  }
  
removeBook  (e) {
    const bookIndex = parseInt(e.target.getAttribute("data-index"), 10);
    if (!isNaN(bookIndex)) {
      myLibrary.splice(bookIndex, 1);
    }
    container.innerHTML = "";
    displayBooks(myLibrary);
  };
changeStatus (e)  {
    const bookIndex = parseInt(e.target.getAttribute("data-index"), 10);
    myLibrary[bookIndex].changeStatus();
    container.innerHTML = "";
    displayBooks(myLibrary);
  };
}

const makeBookCard = (book, i) => {
  const displayBooks = (bookList) => {
    for (let i = 0; i < bookList.length; i++) {
      container.appendChild(makeBookCard(bookList[i], i));
    }
  };

  function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks(myLibrary);
  }


  const 

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

    container.innerHTML = "";
    addBookToLibrary(book);
    dialog.close();
  });
};
