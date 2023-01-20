import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LogoutNavButton() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/dashboard');
  }

  return (
    <Button color='inherit' onClick={handleClick}>Dashboard</Button>
  )
}
