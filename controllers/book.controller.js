const express = require('express');
const db = require('../models');
const Book = db.book;

exports.book_list = async (req, res) => {
  let limit = parseInt(req.query.limit);
  let skip = parseInt(req.query.skip);
  let size;
  Book.find({}, (err, books) => {
    if (err) { res.send(err); }
    size = books.length;
  });

  return Book.find({}, (err, books) => {
    if (books.length === 0) { return };

    if (err) {
      res.send(err);
    }

    if (books.length <= limit) {
      limit = books.length;
    }

    res.send(books);
  }).skip(skip).limit(limit);
};

exports.book_create = async (req, res) => {
  const bookTitle = req.body.title;
  const bookAuthor = req.body.author;
  const bookDescription = req.body.description;
  const bookImage = req.body.image;

  const book = new Book({ title: bookTitle, author: bookAuthor, description: bookDescription, image: bookImage });

  try {
    await book.save();
    res.send("inserted book");
  } catch (err) {
    console.log(err);
  }
};

exports.book_detail = async (req, res) => {
  const id = req.params.id;

  Book.findById(id)
  .then(book => {
    if (!book) { return res.status(404).end() };
    return res.status(200).json(book);
  })
  .catch(err => next(err));
};