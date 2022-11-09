import React from 'react'
import { useSelector } from 'react-redux'

const Remove = () => {
  // const dispatch = useDispatch();
  const token = useSelector((state) => state.tokenUpdate);

  return (
    <div>{token}</div>
  )
}

export default Remove