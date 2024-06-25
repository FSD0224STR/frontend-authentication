
import {Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Confirm = () => {

  const [message, setMessage] = useState('Confirming user...')

  const { userid } = useParams();
  console.log('a ver si es quien creemos', userid)

  useEffect(() => {
    if (userid) {
      fetch(`http://localhost:3000/users/confirm/${userid}`, {method: 'PATCH'})
        .then(res => res.json())
        .then(data => setMessage(data))
    }
  }, [userid])

  return (
    <Container maxWidth='sm' sx={{ marginTop: '20vh'}}>
      <Typography variant="h4" sx={{my: 3, textAlign: 'center'}}>{message}</Typography>
    </Container> 
  )
}