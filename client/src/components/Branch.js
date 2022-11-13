import React from 'react'
import { useSelector } from 'react-redux'

import { Box, IconButton, Paper } from '@mui/material'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LockIcon from '@mui/icons-material/Lock';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';

const Branch = () => {
    const repositories = useSelector((state) => state.repoUpdate);

    const handleClickOpen = () => {
    
    };

    return (
    <Box>
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ border:2, m:5, }}>

        <IconButton onClick={handleClickOpen} sx={{m:5, mb:5}}>
            <AddIcon fontSize="large" sx={{color:"DodgerBlue"}}/>     
        </IconButton>

        <IconButton onClick={handleClickOpen} sx={{m:5, mb:5}}>
          <DriveFileRenameOutlineIcon fontSize="large" sx={{color:"RebeccaPurple"}}/>
        </IconButton>

        <IconButton onClick={handleClickOpen} sx={{m:5, mb:5}}>
          <LockOpenIcon fontSize="large" sx={{color:"DeepPink"}}/>
        </IconButton>
        
        <IconButton onClick={handleClickOpen} sx={{m:5, mb:5}}>
            <DeleteForeverIcon fontSize="large" sx={{color:"coral"}}/>
        </IconButton>


        <IconButton onClick={handleClickOpen} sx={{m:5, mb:5}}>
            <LockIcon fontSize="large" sx={{color:"green"}}/>
        </IconButton>
        
    </Box>

    {/* <Box display="flex" justifyContent="center" alignItems="center" sx={{ border:2, m:5, }}>
        <FormGroup>
            <Grid container spacing={2}>
            { Object.keys(repositories).map( (rep,key) => (
                    <>
                    { repositories[rep].map( (branch,key) => (
                        <Grid item xs={3} key={key}>
                        <FormControlLabel control={<Checkbox defaultChecked />} label = { 
                            <>
                                <Typography fontSize='h6.fontSize' fontWeight='bold'> {rep}/ </Typography>
                                <Typography fontSize='h7.fontSize'> {branch} </Typography>
                            </>
                            }/>
                        </Grid>
                    ))}
                    </>
            ))}
            </Grid>
        </FormGroup>
    </Box> */}
    
    <Box>
        <TableContainer component={Paper}>
        <Table sx={{ }} >
            <TableHead>
            <TableRow>
                <TableCell align="center"> Repository name </TableCell>
                <TableCell align="center"> Branch Name </TableCell>
            </TableRow>
            </TableHead>

            <TableBody>            
            { Object.keys(repositories).map( (rep,key) => (
                    <>
                    { repositories[rep].map( (branch,key) => (
                        <TableRow  key={rep} >
                        <TableCell align="center"> {rep} </TableCell>
                        <TableCell align="Center"> {branch} </TableCell>
                        </TableRow>
                    ))}
                    </>
            ))}
            
            </TableBody>
        </Table>
        </TableContainer>
    </Box>
    
    </Box>

  )
}

export default Branch   