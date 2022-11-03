const express = require('express');
const router = express.Router();
const API = require ('../GitHub/api')

router.post('/user', async (req,res) => {    
    const username = await API.get_user(req.body.token);
    res.status(200).json({username:username});
});

router.post('/repo', async (req,res) => {
    const repo = await API.get_repo_list(req.body.token);
    // console.log(repo);
    res.status(200).json({repo:repo});
});

router.post('/branch', async (req,res) => {
    // res.send();
    const branches = await API.get_branch_list(req.body.token, req.body.repo_name);
    // console.log(repo);
    res.status(200).json({branches:branches});
});



module.exports = router;