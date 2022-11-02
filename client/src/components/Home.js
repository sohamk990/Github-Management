import React, {useEffect, useState} from 'react'
// import axios from 'axios'

import Box from '@mui/material/Box'
import { Button, Paper, TextField } from '@mui/material'

const Home = () => {
    const [username, setUser] = useState("username")
    const [token, setToken] = useState("")
    

    const handleInputs = (event) => {
        setToken(event.target.value);
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
    }

    useEffect(()=>{
        postData();
      }, [] );

    return (
        <Box m="auto" align="center" sx={{m:2}}>
            <Paper variant="outlined" elevation={20}>
                <TextField disabled id="username" label={username} variant="filled" InputProps={{ readOnly: true }} sx={{m:2}}/> <br/>
                <TextField id="token" label="Token" variant="outlined" sx={{m:2}} onChange={handleInputs} /> <br/>
                <Button variant="contained" onClick={postData}> Enter </Button>
            </Paper>
        </Box>
  )
}

export default Home