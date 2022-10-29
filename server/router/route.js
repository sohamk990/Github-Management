const express = require('express');
const router = express.Router();
const API = require ('../GitHub/user')

router.get('/user', async (req,res) => {
    res.send(await API.get_user());
});

module.exports = router;