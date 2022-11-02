const express = require('express');
const router = express.Router();
const API = require ('../GitHub/api')

router.post('/user', async (req,res) => {    
    const username = await API.get_user(req.body.token);
    res.status(200).json({username:username});
});

router.get('/branch', async (req,res) => {
    res.send(await API.get_branch_list(req.body.repo_name));
});

router.get('/repo', async (req,res) => {
    res.send(await API.get_repo_list());
});



module.exports = router;