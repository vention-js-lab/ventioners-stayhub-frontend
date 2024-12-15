import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useCancelBooking } from '../api/cancel-booking';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { cancelBookingModalStyles } from './cancel-booking.modal.style';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

type CancelBookingModalProps = {
  bookingId: string;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hasRefund: boolean;
};

export function CancelBookingModal({ bookingId, setIsModalOpen, isModalOpen, hasRefund }: CancelBookingModalProps) {
  const { t } = useTranslation('bookings');
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
      <DialogTitle sx={cancelBookingModalStyles.title}>{t(TRANSLATION_KEYS.bookings.cancel.are_you_sure)}</DialogTitle>

      <DialogContent sx={cancelBookingModalStyles.content}>
        <DialogContentText sx={cancelBookingModalStyles.contentText}>
          {t(TRANSLATION_KEYS.bookings.cancel.content)}
        </DialogContentText>
        {hasRefund ? (
          <Box sx={cancelBookingModalStyles.contentTextContainer}>
            <strong>{t(TRANSLATION_KEYS.bookings.cancel.refund_info)}</strong>
            <Typography sx={{ mt: 1 }}>• {t(TRANSLATION_KEYS.bookings.cancel.refund_1)}</Typography>
            <Typography sx={{ mt: 1 }}>• {t(TRANSLATION_KEYS.bookings.cancel.refund_2)}</Typography>
            <Typography sx={{ mt: 1 }}>• {t(TRANSLATION_KEYS.bookings.cancel.refund_3)}</Typography>
          </Box>
        ) : null}
      </DialogContent>

      <DialogActions sx={cancelBookingModalStyles.actions}>
        <Button onClick={handleCloseModal} color="primary" variant="outlined">
          {t(TRANSLATION_KEYS.bookings.cancel.keep_booking)}
        </Button>
        <Button onClick={handleCancelBooking} color="error" variant="contained" disabled={isPending}>
          {t(TRANSLATION_KEYS.bookings.cancel.confirm)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
