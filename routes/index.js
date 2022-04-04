const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send('index');
});
router.get('/login', (req, res) => {
    res.send('login');
});
router.post('/', (req, res) => {
    res.redirect('/');
});
router.get('/chat', (req, res) => {
    res.send('chat');
});

module.exports = router;