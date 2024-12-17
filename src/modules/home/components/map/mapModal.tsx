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
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';
import MapHandler from './mapHandler';

interface MapModalProps {
  isLoading: boolean;
  data: Accommodation[];
  coordinates: { lat: number; lng: number };
  placeResult: google.maps.places.PlaceResult | null;
}

export function MapModal({ isLoading, data, coordinates, placeResult }: MapModalProps) {
  const { t } = useTranslation('home');
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <Button onClick={handleOpenModal} endIcon={<MapIcon style={mapModalStyles.MapIcon} />} sx={mapModalStyles.Button}>
        {t(TRANSLATION_KEYS.home.map.show_map)}
      </Button>
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth={false} sx={mapModalStyles.Dialog}>
        <IconButton onClick={handleCloseModal} sx={mapModalStyles.IconButton}>
          <CloseIcon />
        </IconButton>
        <DialogContent sx={mapModalStyles.DialogContent}>
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['places']}>
            <CustomMap isLoading={isLoading} data={{ data }} coordinates={coordinates} />
            <MapHandler place={placeResult} />
          </APIProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
