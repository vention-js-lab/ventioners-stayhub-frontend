import Button from '@mui/material/Button';
import { useState } from 'react';
import { CancelBookingModal } from './cancel-booking-modal';

type CancelBookingButtonProps = {
  bookingId: string;
};

export function CancelBookingButton({ bookingId }: CancelBookingButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Button variant="contained" color="error" onClick={() => setIsModalOpen(true)}>
        Cancel Booking
      </Button>

      <CancelBookingModal bookingId={bookingId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}
