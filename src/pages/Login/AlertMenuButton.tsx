import { useEffect, useState } from 'react';
import { Badge, Box, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ClearIcon from '@mui/icons-material/Clear';

import useFavoriteCitiesQuery from '../../state/hooks/useFavoriteCitiesQuery';
import useAlertQuery from '../../state/hooks/useAlertQuery';
import useFavoriteCitiesWeatherQuery from '../../state/hooks/useFavoriteCitiesWeatherQuery';
import { formatOperator, formatTemp } from '../../state/utils';
import { useQueryClient } from 'react-query';

export default function AlertMenuButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const fcq = useFavoriteCitiesQuery();
  const fcwq = useFavoriteCitiesWeatherQuery();
  const alertQuery = useAlertQuery();
  const [alerts, setAlerts] = useState<string[]>([]);
  const [myInterval, setMyInterval] = useState<number>(0);
  const queryClient = useQueryClient();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClear = () => {
    handleClose();
    setAlerts([]);
  };

  const updateAlertsNotifications = () => {
    const { operator, temperature } = alertQuery.data!;

    const newAlerts: string[] = fcwq
      .data!.filter((w) => {
        const favCity = fcq.data!.find(
          (fc) => w.coord.lat === fc.lat && w.coord.lon === fc.lon
        );

        if (!favCity?.alertEnabled) return false;

        if (operator === 'colder_than') {
          return formatTemp(w.main.temp) < temperature;
        }

        if (operator === 'hotter_than') {
          return formatTemp(w.main.temp) > temperature;
        }
      })
      .map((w) => {
        const { operator, temperature } = alertQuery.data!;

        return `${w.name} was ${formatOperator(
          operator
        )} ${temperature}℃ at ${new Date().toLocaleTimeString()}`;
      });

    setAlerts(prevAlerts => newAlerts.concat(prevAlerts));
  };

  useEffect(() => {
    if (!fcq.isSuccess || !fcwq.isSuccess) return;
    
    if (myInterval) {
      clearInterval(myInterval);
    }

    const _interval = setInterval(() => {
      updateAlertsNotifications();
    }, 5000) // 5 sec

    setMyInterval(_interval);
    
    return clearInterval(myInterval);
  }, [fcwq.data, fcq.data]);

  return (
    <>
      <IconButton
        size="large"
        aria-label="show new notifications"
        color="inherit"
        onClick={handleClick}
        disabled={!alerts.length}
      >
        <Badge badgeContent={alerts.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ overflowY: 'scroll', maxHeight: 200 }}>
          {alerts.map((alert) => (
            <MenuItem onClick={handleClose} key={alert}>
              {alert}
            </MenuItem>
          ))}
        </Box>
        <Divider />
        <MenuItem onClick={handleClear}>
          <ClearIcon />
          Clear
        </MenuItem>
      </Menu>
    </>
  );
}
