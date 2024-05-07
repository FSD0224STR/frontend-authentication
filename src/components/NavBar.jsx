import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

// add avatar component to the navbar

const NavBar = () => {
  const { isLoggedIn, logout, profile } = useContext(AuthContext)

  console.log(' a ver que es profile del context en navbar', profile)

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My App
        </Typography>
        <Link to="/home"><Button sx={{color: 'white'}}>Home</Button></Link>
        {isLoggedIn && <Avatar sx={{ bgcolor: 'primary.main' }}>{profile.name[0]}</Avatar>}
        {!isLoggedIn && <Link to="/login"><Button sx={{color: 'white'}}>Login</Button></Link>}
        {isLoggedIn && <Button onClick={logout} sx={{color: 'white'}}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};

export { NavBar };