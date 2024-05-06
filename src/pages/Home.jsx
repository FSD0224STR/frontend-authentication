import { useEffect, useState } from 'react'
import { Alert, Box, Container, Grid, Paper, TextField, Typography } from "@mui/material";

import './Home.css'
import { UserCard } from '../components/UserCard'
import userAPI from '../apiService/userApi'
import { useNavigate } from 'react-router-dom'




function Home() {
  const [users, setUsers] = useState([])

  const [name, setName] = useState('')

  const [error, setError] = useState('')

  const [dummy, refresh] = useState(false)

  const navigate = useNavigate()

  const getUsers = async () => {
    const users = await userAPI.getAllUsers();
    if (users.length) setUsers(users)
    else setError(users.message)
    if (users.message === 'jwt expired') {
      localStorage.removeItem('access_token')
      setTimeout(() => navigate('/login'), 3000 )
     
    }
  }

  const addUserAndSync = async () => {

    const data = await userAPI.addUser({name})
    if (!data._id) setError('ha habido un error añadiendo usuario')
    refresh(!dummy)
  }

  const deleteUserAndSync = (idToDelete) => userAPI.deleteUser(idToDelete).then(message => refresh(!dummy))


  useEffect(() => {
    getUsers()
  }, [dummy])

  return (
    <>
        <Container maxWidth='md' sx={{ marginTop: '20vh'}}>
          <Paper sx={{p: 1}}>
              <Typography variant="h4" sx={{my: 3}}>Lista de usuarios</Typography>
              <Grid container spacing={1}>
                {users.map(user => <Grid item xs={12} sm={6} key={user._id}><UserCard key={user._id} {...user} onDelete={() => deleteUserAndSync(user._id)}></UserCard></Grid>)}
              </Grid>
          </Paper>
        </Container>
      <label>Name:</label><input value={name} onChange={e => setName(e.currentTarget.value)}></input>
      <button onClick={addUserAndSync}>Click para añadir</button>
      {error && <Alert variant="outlined" severity="error">{`Ha habido un error: ${error}`}</Alert>}
    </>
  )
}

export default Home
