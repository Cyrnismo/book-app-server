const { authJwt } = require('../middlewares');
const controller = require('../controllers/user.controller.js');

module.exports = function(app) {
    app.get('/user/:id', controller.user_detail);

    app.post('/user/create', controller.user_create);

    app.get('/test/all', controller.allAcess);

    app.get('/test/user', [authJwt.verifyToken], controller.userBoard);

    app.get('/test/mod', [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);

    app.get('/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};