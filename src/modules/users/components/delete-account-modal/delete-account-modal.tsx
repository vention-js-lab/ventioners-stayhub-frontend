import { useState } from 'react';
import { api } from '#/configs';
import { Fragment } from 'react/jsx-runtime';
import { ENDPOINTS } from '../../constants';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';
import { toast } from 'react-toastify';
import { removeUser } from '#/redux/auth/auth-slice';
import { useQueryClient } from '@tanstack/react-query';
import { deleteAccountModalStyles as styles } from './delete-account-modal.styles';

export function DeleteAccountModal() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  function handleOpenModal() {
    setOpen(true);
  }

  function handleCloseModal() {
    setOpen(false);
  }

  function handleSubmit(): void {
    api
      .delete(`${ENDPOINTS.users}/${user?.id}`)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
        dispatch(removeUser());
        window.location.href = '/';

        toast('Account deleted successfully');
      })
      .catch(() => toast('Failed to delete your account'));
  }

  return (
    <Fragment>
      <Button onClick={handleOpenModal} disableRipple={true} sx={styles.modalButton}>
        Deactivate
      </Button>
      <Modal open={open} onClose={handleCloseModal}>
        <Box sx={styles.container}>
          <Box sx={styles.heading}>Deactivate account?</Box>
          <Box sx={styles.email}>{user?.email}</Box>
          <Box sx={{ ...styles.statement, borderBottom: '1px solid rgb(235, 235, 235)', paddingBottom: '24px' }}>
            <CheckCircleIcon />
            <Box>The profile and listings associated with this account will disappear</Box>
          </Box>
          <Box sx={styles.statement}>
            <CheckCircleIcon />
            <Box>Your won&apos;t be able to access the account info or past reservations</Box>
          </Box>
          <Button type="submit" sx={styles.submitButton} disableRipple={true} onClick={handleSubmit}>
            Deactivate
          </Button>
        </Box>
      </Modal>
    </Fragment>
  );
}
