import { AppBar, Toolbar, Typography } from '@mui/material';
import useConnected from '../../state/hooks/useConnected';
import DashboardNavButton from './DashboardNavButton';
import LogoutNavButton from './LogoutNavButton';

export default function Navbar() {
  const { isConnected } = useConnected();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Weather App
        </Typography>
        {isConnected && <DashboardNavButton />}
        {isConnected && <LogoutNavButton />}
      </Toolbar>
    </AppBar>
  );
}
