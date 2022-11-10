import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

import { lock_branch } from './Github';
import { githubRepo } from '../action/index'

export default function LockDialog({repo_name, branch_name}) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.tokenUpdate);
  const repositories = useSelector((state) => state.repoUpdate);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLockClose = async () => {
    setOpen(false);
    const new_repositories = await lock_branch (token, repositories, repo_name, branch_name);
    dispatch(githubRepo({...new_repositories}));
  };

  const handleClose = async () => {
    setOpen(false);
  };


  useEffect(() => {

  }, [repositories,token,open]);
  
  return (
    <Box>
      <IconButton onClick={handleClickOpen}>
          <LockIcon sx={{color:"green"}}/>
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Locking Branch </DialogTitle>
        
        <DialogContent>
          <DialogContentText>
            Do you want to lock branch: {branch_name} of repository: {repo_name} ?
          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
        <Button onClick={handleClose}> Cancel </Button>
        <Button onClick={handleLockClose}> Lock </Button>
        </DialogActions>

      </Dialog>
    </Box>
  );
}