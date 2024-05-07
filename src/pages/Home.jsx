import { useContext, useEffect, useState } from 'react'
import { Alert, Button, CircularProgress, Container, Grid, Paper, TextField, Typography } from "@mui/material";

import { UserCard } from '../components/UserCard'
import userAPI from '../apiService/userApi'
import { AuthContext } from '../contexts/authContext';


function Home() {
  const [users, setUsers] = useState([])

  const { isLoggedIn } = useContext(AuthContext)

  const [name, setName] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [dummy, refresh] = useState(false)

  const getUsers = async () => {
    setLoading(true)
    const response = await userAPI.getAllUsers();
    if (response.error) setError(response.error)
    else setUsers(response.data)
    setLoading(false)
  }

  const addUserAndSync = async () => {
    setLoading(true)
    const response = await userAPI.addUser({name})
    if (response.error) setError(response.error)
    else refresh(!dummy)
    setLoading(false)
  }

  const deleteUserAndSync = async idToDelete => {
    setLoading(true)
    const response = await userAPI.deleteUser(idToDelete).then(() => refresh(!dummy))
    if (response.error) setError(response.error)
    else refresh(!dummy)
    setLoading(false)
  }


  useEffect(() => {
    getUsers()
  }, [dummy])

  return (
    <Container maxWidth='md' sx={{ marginTop: '10vh'}}>
        
      <Paper sx={{p: 1}}>
        <Typography variant="h4" sx={{my: 3}}>Lista de usuarios</Typography>
        {loading ? <CircularProgress /> : (
          <Grid container spacing={1}>
            {users.map(user => <Grid item xs={12} sm={6} key={user._id}><UserCard key={user._id} {...user} onDelete={() => deleteUserAndSync(user._id)}></UserCard></Grid>)}
          </Grid>
        )}

      </Paper>
      {isLoggedIn ? (
        <>
          <Typography variant="h5" sx={{mt: 5}}>Añadir usuario</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {loading ? <CircularProgress /> : <Button variant="contained" onClick={addUserAndSync}>Add User</Button>}
            </Grid>
          </Grid>
        </>
      )
        :
        <Typography variant="h5" sx={{mt: 5}}>Para añadir usuarios, por favor logueate</Typography>
      }
      {error && <Alert variant="outlined" severity="error" onClose={() => setError('')}>{`Ha habido un error: ${error}`}</Alert>}
    </Container>
  )
}

export default Home
