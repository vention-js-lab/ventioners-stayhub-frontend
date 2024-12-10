import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useCancelBooking } from '../../api/cancel-booking';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { cancelBookingModalStyles } from './cancel-booking.modal.style';

type CancelBookingModalProps = {
  bookingId: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CancelBookingModal({ bookingId, setIsModalOpen, isModalOpen }: CancelBookingModalProps) {
  const handleCloseModal = () => setIsModalOpen(false);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useCancelBooking(bookingId, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      handleCloseModal();
      toast('Booking cancelled successfully');
    },
    onError: (error) => {
      handleCloseModal();
      toast(error.response?.data.message || error.message);
    },
  });

  const handleCancelBooking = () => {
    mutate();
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="cancel-booking-dialog-title"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle sx={cancelBookingModalStyles.title}>Are you absolutely sure?</DialogTitle>

      <DialogContent sx={cancelBookingModalStyles.content}>
        <DialogContentText sx={cancelBookingModalStyles.contentText}>
          You are about to cancel your upcoming booking.
        </DialogContentText>
        <Box sx={cancelBookingModalStyles.contentTextContainer}>
          <strong>Refund Information:</strong>
          <Typography sx={{ mt: 1 }}>• Your refund will be processed within 2-3 business days</Typography>
          <Typography sx={{ mt: 1 }}>• The refund will be credited to your original payment method</Typography>
          <Typography sx={{ mt: 1 }}>• Cancellation may be subject to a small processing fee</Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={cancelBookingModalStyles.actions}>
        <Button onClick={handleCloseModal} color="primary" variant="outlined">
          Keep Booking
        </Button>
        <Button onClick={handleCancelBooking} color="error" variant="contained" disabled={isPending}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
