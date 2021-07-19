document.addEventListener("DOMContentLoaded", function () {
    const submitform = document.getElementById("form");

    submitform.addEventListener("submit", function (event) {
        event.preventDefault();

        if (checkRead()) {
            addBookCompleted();
        } else {
            addBooks();
        }
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Book has beend saved.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromBooks();
});