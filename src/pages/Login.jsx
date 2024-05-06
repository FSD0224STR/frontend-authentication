import { useState } from "react"
import userAPI from '../apiService/userApi'
import { useNavigate } from "react-router-dom"

import Button from '@mui/material/Button';
import { Box, Container, Grid, Paper, TextField, Typography } from "@mui/material";

export const Login = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const onClickLogin = async () => {
        const token = await userAPI.login(name, password)
        console.log('a ver que nos devuelve el login', token)
        localStorage.setItem('access_token', token)
        navigate('/home')
    }

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
                    <Button variant="contained" onClick={onClickLogin}>Login</Button>
                </Box>
            </Paper>
        </Container>
    )
}