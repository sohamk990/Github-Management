import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';

import GitHubIcon from '@mui/icons-material/GitHub';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import{Link} from 'react-router-dom';
// import { Fab } from '@mui/material';


const pages=["Repo","Error"];

export default function ButtonAppBar() {
  return (
    <Box>
      <AppBar>
        <Toolbar>
          
          <IconButton color="inherit" component={Link} to="/">
            <GitHubIcon/>            
          </IconButton>
          <Typography> GitHub </Typography>

          <Box m="auto">
            <ButtonGroup variant="contained">
              {pages.map( (page,idx) => ( <Button component={Link} to={`/${page}`} key={idx}> {page} </Button> ))}
            </ButtonGroup>
          </Box>


          {/* <Fab color="Secondary"  component={Link} to="/About">
            <AccountCircleIcon/>
          </Fab> */}

        </Toolbar>
      </AppBar>
      <Toolbar/>
    </Box>
  );
}
