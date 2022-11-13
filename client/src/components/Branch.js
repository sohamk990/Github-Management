import React, {useState} from 'react'
import { useSelector } from 'react-redux'

import { Box, Checkbox, IconButton, Paper, Typography, TextField } from '@mui/material'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LockIcon from '@mui/icons-material/Lock';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';


const Branch = () => {
    const repositories = useSelector((state) => state.repoUpdate);

    const [branchKeyword, setBranchKeyword] = useState("");
    const [repoKeyword, setRepoKeyword] = useState("");
    
    const [branchList,setBranchList] = useState({});
    const [check,Setcheck] = useState(false);

    const handleClickOpen = () => {
    
    };

    const handleCheck = (event,repo_name,branch_name) => {
        event.preventDefault();
        const check = event.target.checked;

        if(check===true)
        {
            if(!branchList.hasOwnProperty(repo_name))
                branchList[repo_name]=[];
            branchList[repo_name].push(branch_name);
        }
        else
        {
            for (let i=0; i<branchList[repo_name].length; i++)
            {
                if(branchList[repo_name][i]===branch_name)
                {
                    branchList[repo_name].splice(i,1);
                }
            }
        }

        setBranchList({...branchList});
        console.log(branchList);
    };

    const handleAllCheck = (event) => {
        Setcheck(event.target.checked);
        if(check)
        {

        }
        else
        {

        }
    };


    return (
    <Box>
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ border:5, m:5, }}>

        <IconButton onClick={handleClickOpen} sx={{m:5, mb:5}}>
            <AddIcon fontSize="large" sx={{color:"DodgerBlue"}}/>     
        </IconButton>
        
        <IconButton onClick={handleClickOpen} sx={{m:5, mb:5}}>
            <DeleteForeverIcon fontSize="large" sx={{color:"coral"}}/>
        </IconButton>

        <IconButton onClick={handleClickOpen} sx={{m:5, mb:5}}>
          <DriveFileRenameOutlineIcon fontSize="large" sx={{color:"RebeccaPurple"}}/>
        </IconButton>

        <IconButton onClick={handleClickOpen} sx={{m:5, mb:5}}>
          <LockOpenIcon fontSize="large" sx={{color:"DeepPink"}}/>
        </IconButton>

        <IconButton onClick={handleClickOpen} sx={{m:5, mb:5}}>
            <LockIcon fontSize="large" sx={{color:"green"}}/>
        </IconButton>
        
    </Box>
    
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ border:5, m:5, }}>
    <TextField fullWidth autoFocus autoComplete='off' id="search" label="Repo Search" defaultValue={repoKeyword} variant="outlined" sx={{m:5, mb:5, width:500,}} onChange={(event)=>{setRepoKeyword(event.target.value)}} />
        <TextField fullWidth autoFocus autoComplete='off' id="search" label="Branch Search" defaultValue={branchKeyword} variant="outlined" sx={{m:5, mb:5, width:500,}} onChange={(event)=>{setBranchKeyword(event.target.value)}} />        
    </Box>

    <Box>
        <TableContainer component={Paper}>
        <Table sx={{ }} >
            <TableHead>
                <TableRow>
                    <TableCell> <Checkbox onChange={handleAllCheck} /> </TableCell>
                    <TableCell> <Typography fontSize='h5.fontSize' fontWeight='bold'> Repository name </Typography>  </TableCell>
                    <TableCell> <Typography fontSize='h5.fontSize' fontWeight='bold'> Branch name </Typography>  </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>            
            { Object.keys(repositories).map( (rep,key) => {
                if(RegExp(repoKeyword,'i').test(String(rep))===true)
                {
                    return repositories[rep].map( (branch,key) => {
                        if(RegExp(branchKeyword,'i').test(String(branch))===true)
                        {
                            return  <TableRow key={key} >
                                <TableCell> <Checkbox onChange={(event)=>{handleCheck(event,rep,branch)}} /> </TableCell>
                                <TableCell > {rep} </TableCell>
                                <TableCell > {branch} </TableCell>
                            </TableRow>
                        }
                        else
                            return null;
                    })
                }
                else
                    return null;
            })}            
            </TableBody>
        </Table>
        </TableContainer>
    </Box>
    
    </Box>

  )
}

export default Branch   