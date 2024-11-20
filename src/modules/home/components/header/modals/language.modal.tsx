import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { languages } from '../constants';
import { languageModalStyles } from '../styles';

interface LanguageModalProps {
  open: boolean;
  onClose: () => void;
  selectedLanguage: string;
  onLanguageSelect: (language: string) => void;
}

export function LanguageModal({ open, onClose, selectedLanguage, onLanguageSelect }: LanguageModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      PaperProps={{
        sx: languageModalStyles.paper,
      }}
    >
      <DialogTitle sx={languageModalStyles.dialogTitle}>
        <Typography variant="h6" component="div" sx={languageModalStyles.dialogText}>
          Choose a language
        </Typography>
        <IconButton onClick={onClose} size="small" sx={languageModalStyles.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={languageModalStyles.dialogContent}>
        <List sx={languageModalStyles.dialogContentList}>
          {languages.map((lang) => (
            <ListItem key={lang.code} disablePadding={true}>
              <ListItemButton
                onClick={() => {
                  onLanguageSelect(lang.code);
                  onClose();
                }}
                sx={languageModalStyles.listItemButton}
              >
                <Radio checked={selectedLanguage === lang.code} sx={languageModalStyles.checkbox} />
                <ListItemText
                  primary={lang.name}
                  secondary={lang.region}
                  primaryTypographyProps={{
                    fontWeight:
                      selectedLanguage === lang.code
                        ? languageModalStyles.listItemText.chosen
                        : languageModalStyles.listItemText.default,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
