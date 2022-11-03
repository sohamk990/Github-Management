import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { incNum,decNum } from '../action/index'

import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'

const Incdec = () => {
  const myState = useSelector((state) => state.changeNum);
  const dispatch = useDispatch();

  return (
    <Box sx={{mb:"5"}}>
        <TextField label={myState}/> 
        <Button variant='contained' onClick={()=> dispatch(incNum(5))}> + </Button>
        <Button variant='contained' onClick={()=> dispatch(decNum(2))}> - </Button>
    </Box>
  )
}

export default Incdec