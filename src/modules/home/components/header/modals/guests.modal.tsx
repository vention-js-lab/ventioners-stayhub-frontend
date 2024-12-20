import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CounterButton, CounterText } from '#/modules/home/styles';
import { guestTypes } from '../constants';
import { guestModalStyles } from '../styles';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

export interface GuestCounts {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

interface GuestsModalProps {
  open: boolean;
  onClose: () => void;
  guestCounts: GuestCounts;
  onGuestCountsChange: React.Dispatch<React.SetStateAction<GuestCounts>>;
}

export function GuestsModal({ open, onClose, guestCounts, onGuestCountsChange }: GuestsModalProps) {
  const { t } = useTranslation('home');
  const handleCountChange = (type: keyof GuestCounts, increment: boolean) => {
    const guestType = guestTypes.find((g) => g.type === type);
    if (!guestType) return;
    if (['pets', 'infants'].includes(type) && increment && guestCounts.adults === 0) {
      onGuestCountsChange((prev) => ({
        ...prev,
        adults: 1,
      }));
    }

    const currentCount = guestCounts[type];
    const newCount = increment ? currentCount + 1 : currentCount - 1;

    if (newCount >= guestType.min && newCount <= guestType.max) {
      onGuestCountsChange((prev) => ({
        ...prev,
        [type]: newCount,
      }));
    }
  };

  const formatGuestCount = () => {
    const totalGuests = guestCounts.adults + guestCounts.children;
    const guestText = t(TRANSLATION_KEYS.home.header.search.guests.total, { count: totalGuests });
    const parts = [guestText];

    if (guestCounts.infants > 0) {
      parts.push(t(TRANSLATION_KEYS.home.header.search.infants.total, { count: guestCounts.infants }));
    }
    if (guestCounts.pets > 0) {
      parts.push(t(TRANSLATION_KEYS.home.header.search.pets.total, { count: guestCounts.pets }));
    }

    return parts.join(', ');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: guestModalStyles.paper,
      }}
    >
      <DialogContent>
        <Stack spacing={3}>
          {guestTypes.map(({ type, max, min }) => (
            <Box key={type} sx={guestModalStyles.dialogContainer}>
              <Box>
                <Typography fontWeight={guestModalStyles.dialogTitle.fontWeight}>
                  {t(TRANSLATION_KEYS.home.header.search[type].title)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t(TRANSLATION_KEYS.home.header.search[type].description)}
                </Typography>
              </Box>

              <Stack
                direction={guestModalStyles.addRemoveButtonContainer.direction}
                spacing={guestModalStyles.addRemoveButtonContainer.spacing}
                alignItems={guestModalStyles.addRemoveButtonContainer.alignItems}
              >
                <CounterButton
                  disabled={
                    guestCounts[type] <= min ||
                    (type === 'adults' &&
                      guestCounts.adults === 1 &&
                      Object.entries(guestCounts).some(([key, val]) => {
                        return key !== 'adults' && val > 0;
                      }))
                  }
                  onClick={() => handleCountChange(type, false)}
                >
                  <RemoveIcon sx={guestModalStyles.icon} />
                </CounterButton>

                <CounterText>{guestCounts[type]}</CounterText>

                <CounterButton disabled={guestCounts[type] >= max} onClick={() => handleCountChange(type, true)}>
                  <AddIcon sx={guestModalStyles.icon} />
                </CounterButton>
              </Stack>
            </Box>
          ))}

          <Box sx={guestModalStyles.functionButtonContainer}>
            <Button
              onClick={() => onGuestCountsChange({ adults: 0, children: 0, infants: 0, pets: 0 })}
              sx={guestModalStyles.clearButton}
            >
              {t(TRANSLATION_KEYS.home.header.search.clear_all)}
            </Button>

            <Button variant="contained" onClick={onClose} sx={guestModalStyles.submitButton}>
              {formatGuestCount()}
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
