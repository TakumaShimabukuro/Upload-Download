module.exports = (app, router, upload) => {
    const fileController = require('../controllers/file.controller.js');

    var path = __basedir + '/views/';

    router.use((req, res, next) => {
        console.log("/" + req.method);
        next();
    });

    app.get('/files', (req, res) => {
        if(!req.session.user || null){
            res.redirect('/');
        }
        res.sendFile(path + "up-down-load.html");
    });

    app.post('/files/upload', upload.single("uploadfile"), fileController.uploadFile);

    app.get('/files/getall', fileController.listFiles);

    app.get('/files/:id', fileController.downloadFile);

};