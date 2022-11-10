import React from 'react'
import { useSelector } from 'react-redux'

import { Box, Stack, Accordion, AccordionDetails, AccordionSummary, Grid, Typography, IconButton} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

import RenameDialog from './RenameDialog';
import DeleteDialog from './DeleteDialog';
import CreateDialog from './CreateDialog';
import LockDialog from './LockDialog';
import UnlockDialog from './UnlockDialog';


const Repo = () => {
    const repositories = useSelector((state) => state.repoUpdate);
    
    return (
        <Box sx={{m:2}}>
            <Grid container spacing={2}>
            { Object.keys(repositories).map( (rep) => ( 
                <Grid item xs={3}>
                <Accordion elevation={4} keepMounted>
                    <AccordionSummary  expandIcon={<ExpandMoreIcon />}  id={rep} >
                        <Stack direction="row" alignItems="center" gap={1}>
                            <Typography fontSize='h6.fontSize' fontWeight='bold'> {rep} </Typography>
                            <IconButton>
                                <AddIcon sx={{color:"DodgerBlue"}}/>
                            </IconButton>
                        </Stack>
                    </AccordionSummary>
                    
                    <AccordionDetails>
                        { repositories[rep].map( (branch) => (
                                <Stack direction="row" alignItems="center" gap={1} id={branch} >
                                    <Typography> {branch} </Typography>
                                    <RenameDialog repo_name={rep} branch_name={branch}/>
                                    <CreateDialog repo_name={rep} branch_name={branch}/>                                    
                                    <LockDialog repo_name={rep} branch_name={branch}/>
                                    <UnlockDialog repo_name={rep} branch_name={branch}/>
                                    <DeleteDialog repo_name={rep} branch_name={branch}/>
                                </Stack>
                        ))}
                    </AccordionDetails>
                </Accordion>
                </Grid>
            ))}    
            </Grid>
        </Box>
    )
}

export default Repo