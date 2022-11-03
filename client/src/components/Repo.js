import React, {useState} from 'react'

import { Box, Button } from '@mui/material'

const Repo = () => {
    const [username, setUser] = useState("username")

    const repo_list= async(event) =>{
        setUser('ABC');
        console.log("asdf");
    }
    
    return (
        <Box align="center" sx={{m:"auto"}} >
            <Button variant="contained" sx={{mb:5}} onC ={repo_list} > Load </Button>
        </Box>
    )
}

export default Repo