const book_controller = require('../controllers/book.controller');

module.exports = function(app) {
    app.get('/book/all', book_controller.book_list);

    app.get('/book/:id', book_controller.book_detail);

    app.post('/book/create', book_controller.book_create);
}