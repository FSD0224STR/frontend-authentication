import { useContext, useState } from "react"

import Button from '@mui/material/Button';
import { Alert, Box, CircularProgress, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { AuthContext } from "../contexts/authContext";

export const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const { login, loading, error, setError } = useContext(AuthContext)

  return (
    <Container maxWidth='sm' sx={{ marginTop: '20vh'}}>
      <Paper sx={{p: 1}}>
        <Typography variant="h4" sx={{my: 3, textAlign: 'center'}}>Bienvenido</Typography>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item sx={{textAlign: 'center'}} sm={6} xs={12}>
            <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={e => setName(e.currentTarget.value)} />
          </Grid>
          <Grid item sx={{textAlign: 'center'}} justifyContent='center' sm={6} xs={12}>
            <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={e => setPassword(e.currentTarget.value)} />
          </Grid>
        </Grid>
        <Box sx={{m: 2, textAlign: 'center'}}>
          {loading ? <CircularProgress /> : <Button variant="contained" onClick={() => login(name, password)}>Login</Button>}
        </Box>
      </Paper>
      {error && <Alert variant="outlined" severity="error" onClose={() => setError('')}>{`Ha habido un error: ${error}`}</Alert>}
    </Container>
  )
}