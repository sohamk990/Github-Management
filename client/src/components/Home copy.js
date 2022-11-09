import React, {useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'

import { Box, Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography, IconButton } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinearProgressWithLabel from './LinearWithValueLabel';

import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import { githubToken, githubUsername, githubRepo } from '../action/index'

const Home = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.tokenUpdate);
    const username = useSelector((state) => state.usernameUpdate);
    const repo = useSelector((state) => state.repoUpdate);

    const [progress, setProgress] = useState(0.0)
    
    const update_token = async() => {

        //Updating Username
        const response = await fetch("http://localhost:5000/user",{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            credentials: 'include',
            body:JSON.stringify({token:token})
        });
        const res = await response.json();
        dispatch(githubUsername(res.username));

        // Updating repositories and there branch list
        await update_repo_list();
    }

    const update_repo_list = async() => {
        let ans={};

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

            const branch_response = await fetch("http://localhost:5000/branch", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                credentials: 'include',
                body:JSON.stringify({token:token,repo_name:repo_name})
            });
            
            const branch_res = await branch_response.json();
            const branch_lst = branch_res.branches;

            if(typeof branch_lst !== "undefined")
                ans[repo_name]=branch_lst;

            setProgress((100*(i+1))/repo_lst.length)
        }

        console.log(Object.keys(ans));
        dispatch(githubRepo(ans));
    }

    const postData = async(event) => {
        event.preventDefault();
        await update_token();        
    }

    return (
        <Box align="center" sx={{m:"auto", mt:5, flexGrow:1, }} >        
            <TextField fullWidth disabled id="username" label={username} variant="filled" InputProps={{ readOnly: true }} sx={{m:5, mb:5, width:500,}}/>
            <TextField fullWidth autoFocus id="token" label="Token" defaultValue={token} type="password" variant="outlined" sx={{m:5, mb:5, width:500,}} onChange={(event)=> dispatch(githubToken(event.target.value))} />
            <Button variant="contained" onClick={postData} sx={{m:5, mb:5}}> Load </Button>
            <LinearProgressWithLabel value={progress} sx={{m:5,}} />
            
            <Grid container spacing={2}>            
        
            { Object.keys(repo).map( (rep) => ( 
                <Grid item xs={3}>
                <Accordion elevation={4}>
                                    
                    <AccordionSummary  expandIcon={<ExpandMoreIcon />}  id={rep} >
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label={<Typography fontSize='h6.fontSize' fontWeight='bold' >{rep}</Typography>} />
                        </FormGroup>
                        
                    </AccordionSummary>

                    
                    <AccordionDetails>                        
                        <FormGroup row="true">
                        { repo[rep].map( (branch) => (
                            <>
                                <Box sx={{m:1}}>
                                    <FormControlLabel control={<Checkbox />} label={<Typography>{branch}</Typography>} />
                                    
                                    
                                    <IconButton>
                                        <DriveFileRenameOutlineIcon sx={{color:"RebeccaPurple"}}/>
                                    </IconButton>

                                    <IconButton>
                                        <AddIcon sx={{color:"DodgerBlue"}}/>     
                                    </IconButton>
                                    
                                    <IconButton>
                                        <LockIcon sx={{color:"green"}}/>
                                    </IconButton>

                                    <IconButton>
                                        <LockOpenIcon sx={{color:"DeepPink"}}/>
                                    </IconButton>

                                    <IconButton>
                                        <DeleteForeverIcon sx={{color:"coral"}}/>
                                    </IconButton>
                                </Box>
                            </>
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