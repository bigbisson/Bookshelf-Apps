const UNCOMPLETE_LIST_BOOK_ID = "books"
const COMPLETE_LIST_BOOK_ID = "completed-books"
const BOOK_ITEMID = "itemid";

function makeBook(booktitle, bookauthor, timeyear, isCompleted) {

    const textTitle = document.createElement("h2");
    textTitle.innerText = booktitle;

    const textAuthor = document.createElement("p");
    textAuthor.innerText = bookauthor;

    const textTimeYear = document.createElement("p");
    textTimeYear.innerText = timeyear;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textAuthor, textTimeYear);

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return container;
}

function checkRead() {
    return document.getElementById("isComplete").checked;
}

function addBooks() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETE_LIST_BOOK_ID);
    const textBookTitle = document.getElementById("title").value;
    const textBookAuthor = document.getElementById("author").value;
    const timeBookYear = document.getElementById("year").value;

    const book = makeBook(textBookTitle, textBookAuthor, timeBookYear, false);
    const bookObject = composeBookObject(textBookTitle, textBookAuthor, timeBookYear, false);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    uncompletedBOOKList.append(book);
    updateDataStorage();
}

function addBookCompleted() {
    const listCompleted = document.getElementById(COMPLETE_LIST_BOOK_ID);
    const textBookTitle = document.getElementById("title").value;
    const textBookAuthor = document.getElementById("author").value;
    const timeBookYear = document.getElementById("year").value;

    const book = makeBook(textBookTitle, textBookAuthor, timeBookYear, true);
    const bookObject = composeBookObject(textBookTitle, textBookAuthor, timeBookYear, true);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    listCompleted.append(book);
    updateDataStorage();
}

function addBookToCompleted(bookElement) {
    const listCompleted = document.getElementById(COMPLETE_LIST_BOOK_ID);
    const bookTitle = bookElement.querySelector(".inner > h2").innerText;
    const bookAuthor = bookElement.querySelector(".inner > p").innerText; 
    const bookYear = bookElement.querySelector(".inner > p+p").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    listCompleted.append(newBook);
    bookElement.remove();

    updateDataStorage();
}

function removeBookFromCompleted(bookElement) {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    bookElement.remove();

    updateDataStorage();
}

function undoBooksFromCompleted(bookElement) {
    const listUncompleted = document.getElementById(UNCOMPLETE_LIST_BOOK_ID);
    const bookTitle = bookElement.querySelector(".inner > h2").innerText;
    const bookAuthor = bookElement.querySelector(".inner > p").innerText;
    const bookYear = bookElement.querySelector(".inner > p+p").innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);

    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    bookElement.remove();

    updateDataStorage();
}

function createButton(buttonTypeClass, eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function createUndoButton() {
    return createButton("undo-button", function (event) {
        undoBooksFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function (event) {
        removeBookFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function (event) {
        addBookToCompleted(event.target.parentElement);
    });
}