import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import MapIcon from '@mui/icons-material/Map';
import { APIProvider } from '@vis.gl/react-google-maps';
import { CustomMap } from './mapComponent';
import { type Accommodation } from '../../types/accommodation.type';
import { mapModalStyles } from './mapModal.style';

interface MapModalProps {
  isLoading: boolean;
  data: Accommodation[];
  coordinates: { lat: number; lng: number };
}

export function MapModal({ isLoading, data, coordinates }: MapModalProps) {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpenModal} endIcon={<MapIcon />} sx={mapModalStyles.Button}>
        Show Map
      </Button>

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth={false} sx={mapModalStyles.Dialog}>
        <IconButton onClick={handleCloseModal} sx={mapModalStyles.IconButton}>
          <CloseIcon />
        </IconButton>
        <DialogContent sx={mapModalStyles.DialogContent}>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places']}>
            <CustomMap isLoading={isLoading} data={{ data }} coordinates={coordinates} />
          </APIProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
