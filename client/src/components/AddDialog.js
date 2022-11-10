import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// import { create_branch } from './Github';
// import { githubRepo } from '../action/index'

export default function CreateDialog({repo_name}) {

//   const dispatch = useDispatch();
  const token = useSelector((state) => state.tokenUpdate);
  const repositories = useSelector((state) => state.repoUpdate);

  const [open, setOpen] = React.useState(false);
  const [tags, setTags] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddClose = async () => {
    setOpen(false);
    console.log(tags);
    // const new_repositories = await create_branch(token,repositories,repo_name,branch_name,createBranchName);
    // dispatch(githubRepo({...new_repositories}));
  };

  const handleClose = async () => {
    setOpen(false);
  };


  useEffect(() => {

  }, [repositories,token,open]);
  
  return (
    <Box>
      <IconButton onClick={handleClickOpen}>
          <AddIcon sx={{color:"DodgerBlue"}}/>     
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Adding Tags </DialogTitle>
        
        <DialogContent>
          <DialogContentText>
            Enter the tags you want to add into the repository: {repo_name}
          </DialogContentText>

          <TextField fullWidth autoFocus margin="dense" label="Tags" type="text" variant="standard" onChange={(e)=>{setTags(e.target.value)}}/>
        </DialogContent>
        
        <DialogActions>
        <Button onClick={handleClose}> Cancel </Button>
          <Button onClick={handleAddClose}> Add </Button>          
        </DialogActions>

      </Dialog>
    </Box>
  );
}