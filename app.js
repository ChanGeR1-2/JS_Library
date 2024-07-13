"use strict";

class Book {
    #title;
    #author;
    #pages;
    #read;

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

const myLibrary = [];

const form = document.querySelector('.book-form-dialog');
const openButton = document.querySelector('.open-form-button');
const closeButton = document.querySelector('.close-form-button');

openButton.addEventListener('click', () => {
    form.showModal();
})

closeButton.addEventListener('click', () => {
    form.close();
})

const submitBtn = document.querySelector('button[type="submit"]');

submitBtn.addEventListener('click', () => {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    if (title && author && pages) {
        const read = !!document.querySelector('#read').checked;
        myLibrary.push(new Book(title, author, pages, read));
        displayBooks();
    }
})

function displayBooks() {
    const cards = document.querySelector('.book-cards');
    while (cards.firstChild) {
        cards.removeChild(cards.lastChild);
    }
    for (let book of myLibrary) {
        const card = document.createElement('div');
        card.classList.add('card');
        for (let [key, value] of Object.entries(book)) {
            if (key === "read") {
                const readBtn = document.createElement('button');
                readBtn.classList.add('read-button', `${value ? 'green' : 'red'}`);
                readBtn.addEventListener('click', () => {
                    readBtn.classList.toggle('green');
                    readBtn.classList.toggle('red');
                    book.toggleRead();
                    readBtn.textContent = readBtn.classList.contains('green') ? 'Read' : 'Not read';
                })
                readBtn.textContent = readBtn.classList.contains('green') ? 'Read' : 'Not read';
                card.appendChild(readBtn);
            } else {
                const para = document.createElement("p");
                const span2 = document.createElement("span");
                if (key === "pages") {
                    span2.textContent = `${value} pages`;
                } else {
                    span2.textContent = value;
                }
                para.appendChild(span2);

                card.appendChild(para);
            }
        }
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-button', 'grey');
        removeBtn.addEventListener('click', () => {
            myLibrary.splice(myLibrary.indexOf(book), 1);
            displayBooks();
        })
        removeBtn.textContent = 'Remove';
        card.appendChild(removeBtn);
        cards.appendChild(card);
    }
}