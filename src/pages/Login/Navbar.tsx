import { AppBar, Toolbar, Typography } from '@mui/material';
import useConnected from '../../state/hooks/useConnected';
import Logout from './Logout';

export default function Navbar() {
  const { isConnected } = useConnected();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Weather App
        </Typography>
        {isConnected && <Logout />}
      </Toolbar>
    </AppBar>
  );
}
