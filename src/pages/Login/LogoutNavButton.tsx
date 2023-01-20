import { Button } from '@mui/material';
import useLogoutMutation from '../../state/hooks/useLogoutMutation';

export default function LogoutNavButton() {
  const logoutMutation = useLogoutMutation();
  
  const handleClick = () => {
    logoutMutation.mutate();
  }

  return (
    <Button color='inherit' onClick={handleClick}>Logout</Button>
  )
}
