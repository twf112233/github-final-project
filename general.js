const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Task 10: Get all books using Async/Await with Axios
public_users.get('/', async function (req, res) {
  try {
    const getBooks = () => {
      return new Promise((resolve, reject) => {
        resolve(books);
      });
    };
    const bookList = await getBooks();
    return res.status(200).send(JSON.stringify(bookList, null, 4));
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving books" });
  }
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const findBook = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject({ status: 404, message: "Book not found" });
    }
  });

  findBook
    .then((book) => res.status(200).send(JSON.stringify(book, null, 4)))
    .catch((err) => res.status(err.status || 500).json({ message: err.message }));
});

// Task 12: Get book details based on Author using Promises / Async
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  new Promise((resolve, reject) => {
    let matchingBooks = [];
    const keys = Object.keys(books);
    keys.forEach(key => {
      if (books[key].author.toLowerCase() === author.toLowerCase()) {
        matchingBooks.push({
          isbn: key,
          title: books[key].title,
          reviews: books[key].reviews
        });
      }
    });

    if (matchingBooks.length > 0) {
      resolve(matchingBooks);
    } else {
      reject({ status: 404, message: "No books found by this author" });
    }
  })
    .then((data) => res.status(200).json({ booksbyauthor: data }))
    .catch((err) => res.status(err.status || 500).json({ message: err.message }));
});

// Task 13: Get book details based on Title using Promises / Async
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  new Promise((resolve, reject) => {
    let matchingBooks = [];
    const keys = Object.keys(books);
    keys.forEach(key => {
      if (books[key].title.toLowerCase() === title.toLowerCase()) {
        matchingBooks.push({
          isbn: key,
          author: books[key].author,
          reviews: books[key].reviews
        });
      }
    });

    if (matchingBooks.length > 0) {
      resolve(matchingBooks);
    } else {
      reject({ status: 404, message: "No books found with this title" });
    }
  })
    .then((data) => res.status(200).json({ booksbytitle: data }))
    .catch((err) => res.status(err.status || 500).json({ message: err.message }));
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  }
  return res.status(404).json({ message: "Book not found" });
});

module.exports.general = public_users;
