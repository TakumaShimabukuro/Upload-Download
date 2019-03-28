module.exports = (app, router) => {
    const userController = require('../controllers/user.controller.js');

    var path = __basedir + '/views/';

    router.use((req, res, next) => {
        console.log("/" + req.method);
        next();
    });

    app.get('/register', (req, res) => {
        res.sendFile(path + 'register.html');
    });

    app.get('/login', (req, res) => {
        res.render('login', {msg:''});
    });

    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    })
    
    app.post('/register', userController.registerUser);
    app.post('/login', userController.login);

};