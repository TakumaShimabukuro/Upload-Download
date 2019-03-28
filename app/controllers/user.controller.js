var bcrypt = require('bcryptjs');
 
const db = require('../config/db.config.js');
const User = db.users;

exports.registerUser = (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if(user){
            message = 'Usuario já está cadastrado! Faça o login';
            return res.render('index', {msg: message});
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                req.body.password = hash;
    
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }).then(() => {
                    message = 'Usuario cadastrado com sucesso! Faça o login';
                    return res.render('index', {msg: message});
                });
            });
        });
    });  
};

exports.login = (req, res) => {
    User.findOne({email: req.body.email}).then(user => {
        if(!user){
            res.render('index', {msg: 'Usuario não existe! Cadastre'});
            return;
        }
        bcrypt.compare(req.body.password, user.password, (err, success) => {
            if (success) {
                req.session.user = user.email;
                return res.redirect('/files');
            }
            res.render('login', {msg: 'Senha incorreta'});
        });
    });
};