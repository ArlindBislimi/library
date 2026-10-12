const myLibrary = [];

const library = document.querySelector("#library");

const dialog = document.querySelector("#book-dialog");

const form = document.querySelector("#book-form");

const newBookBtn = document.querySelector("#new-book-btn");

const cancelBtn = document.querySelector("#cancel-btn");


// Constructor

function Book(title, author, pages, read) {

    this.id = crypto.randomUUID();

    this.title = title;

    this.author = author;

    this.pages = pages;

    this.read = read;
}


// Prototype function

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};


// Add book to array

function addBookToLibrary(title, author, pages, read) {

    const book = new Book(title, author, pages, read);

    myLibrary.push(book);
}


// Display books

function displayBooks() {

    library.innerHTML = "";

    myLibrary.forEach(book => {

        const card = document.createElement("div");
        card.classList.add("book-card");

      
        card.dataset.id = book.id;

        const title = document.createElement("h2");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        const status = document.createElement("p");
        status.textContent = `Status: ${book.read ? "Read" : "Not Read"}`;

        const readBtn = document.createElement("button");
        readBtn.textContent = "Toggle Read";

        readBtn.addEventListener("click", () => {
            book.toggleRead();
            displayBooks();
        });

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";

        removeBtn.addEventListener("click", () => {

            const index = myLibrary.findIndex(item => item.id === book.id);

            myLibrary.splice(index, 1);

            displayBooks();

        });

        card.append(
            title,
            author,
            pages,
            status,
            readBtn,
            removeBtn
        );

        library.appendChild(card);

    });

}


// Open dialog

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});


// Close dialog

cancelBtn.addEventListener("click", () => {
    dialog.close();
});


// Form submit

form.addEventListener("submit", (event) => {

    event.preventDefault();

    const title = document.querySelector("#title").value;

    const author = document.querySelector("#author").value;

    const pages = document.querySelector("#pages").value;

    const read = document.querySelector("#read").checked;

    addBookToLibrary(title, author, pages, read);

    displayBooks();

    form.reset();

    dialog.close();

});


// Example books

addBookToLibrary(
    "The Hobbit",
    "J.R.R. Tolkien",
    295,
    true
);

addBookToLibrary(
    "1984",
    "George Orwell",
    328,
    false
);

displayBooks();