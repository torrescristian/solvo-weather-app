import { AppBar, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import useConnected from '../../state/hooks/useConnected';
import AlertMenuButton from './AlertMenuButton';
import DashboardNavButton from './DashboardNavButton';
import LogoutNavButton from './LogoutNavButton';

export default function Navbar() {
  const { isConnected } = useConnected();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Weather App
          </Typography>
          {isConnected && <DashboardNavButton />}
          {isConnected && <LogoutNavButton />}
          {isConnected && <AlertMenuButton />}
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
