import React, {useState} from 'react'
// import axios from 'axios'

import Box from '@mui/material/Box'
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup, Grid, LinearProgress, Paper, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinearProgressWithLabel from './LinearWithValueLabel';

const Home = () => {
    const [token, setToken] = useState("")
    const [username, setUser] = useState("username")
    const [repo, setRepo] = useState([])
    
    const handleInputs = (event) => {
        setToken(event.target.value);
    }

    const get_repo_list = async() => {
        let ans=[];

        const repo_response = await fetch("http://localhost:5000/repo", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            credentials: 'include',
            body:JSON.stringify({token:token})
        });

        const repo_res = await repo_response.json();        
        const repo_lst = repo_res.repo;
        
        for (let i=0; i<repo_lst.length; i++)
        {
            const repo_name = repo_lst[i];            
            console.log(repo_name);

            const branch_response = await fetch("http://localhost:5000/branch", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                credentials: 'include',
                body:JSON.stringify({token:token,repo_name:repo_name})
            });
            
            const branch_res = await branch_response.json();
            const branch_lst = branch_res.branches;
            console.log(branch_lst);

            if(typeof branch_lst !== "undefined")
                ans.push({name:repo_name,branches:branch_lst});
        }

        setRepo(ans);
    }

    const postData = async(event) => {
        event.preventDefault();
        console.log(token);

        // await axios.get("http://localhost:5000/user", {withCredentials: true}).then(response => {
        //     const res=response.data;
        //     setUser(res);
        //     console.log(user);
        // })

        const response = await fetch("http://localhost:5000/user",{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        credentials: 'include',
        body:JSON.stringify({token:token})
        });

        const res = await response.json();
        setUser(res.username);
        console.log(username);

        await get_repo_list();
    }

    return (
        <Box align="center" sx={{m:"auto", mt:5, flexGrow:1, }} >        
            <TextField fullWidth disabled id="username" label={username} variant="filled" InputProps={{ readOnly: true }} sx={{m:5, mb:5, width:500,}}/>
            <TextField fullWidth id="token" label="Token" type="password" variant="outlined" sx={{m:5, mb:5, width:500,}} onChange={handleInputs} />
            <Button variant="contained" onClick={postData} sx={{m:5, mb:5}}> Load </Button>
            <LinearProgressWithLabel value={50}/>
            
            <Grid container spacing={2}>            
            {repo.map( (rep) => ( 
                <Grid item xs={3}>
                <Accordion elevation={4}>
                                    
                    <AccordionSummary  expandIcon={<ExpandMoreIcon />}  id={rep} >
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label={<Typography fontSize='h6.fontSize' fontWeight='bold'>{rep.name}</Typography>} />
                        </FormGroup>
                        
                    </AccordionSummary>

                    
                    <AccordionDetails>                        
                        <FormGroup row="true">
                        { rep.branches.map( (branch) => (
                            // <Typography> {branch} </Typography>
                            <FormControlLabel control={<Checkbox />} label={<Typography>{branch}</Typography>} />
                        ))}                
                        </FormGroup>                        
                    </AccordionDetails>
                </Accordion>
                </Grid>
            ))}    
            </Grid>
            
        </Box>
  )
}

export default Home