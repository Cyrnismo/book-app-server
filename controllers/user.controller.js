const db = require('../models');
const User = db.users;

exports.user_create = async (req, res) => {
    const userUsername = req.body.username;
    const userEmail = req.body.author;
    const userPassword = req.body.password;
    const userRoles = req.body.roles;

    const user = new User({
        username: userUsername,
        email: userEmail,
        password: userPassword,
        roles: userRoles
    });

    try {
        await user.save();
        res.send("inserted user");
    } catch (err) {
        console.log(err);
    }
};

exports.user_detail = async (req, res) => {
    const id = req.params.id;

    BookModel.findById(id)
    .then(book => {
        if (!book) { return res.status(404).end() };
        return res.status(200).json(book);
    })
    .catch(err => next(err));
};

exports.allAcess = (req, res) => {
    res.status(200).send("Public Content.");
}

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
}

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
}

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
}