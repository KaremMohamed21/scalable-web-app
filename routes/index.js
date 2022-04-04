const {Router} = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.cookie("indexCookie", "cookie");
    res.render('index', {title: 'Index'});
});
router.get('/login', (req, res) => {
    res.render('login', {title: 'login'});
});
router.post('/', (req, res) => {
    res.redirect('/');
});
router.get('/chat', (req, res) => {
    res.render('chat', {title: 'chat'});
});

module.exports = router;