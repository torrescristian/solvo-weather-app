import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface IProps {
  title?: string,
  children: any,
  onClose: () => void;
  open: boolean;
}

export const useModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return { open, handleOpen, handleClose };
}

export default function CustomModal({ children, title, onClose, open }: IProps) {
  return (
    <Box>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            { title }
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            {children}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
