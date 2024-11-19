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

interface LanguageModalProps {
  open: boolean;
  onClose: () => void;
  selectedLanguage: string;
  onLanguageSelect: (language: string) => void;
}

const languages = [
  { code: 'uz', name: "O'zbek", region: "O'zbekiston" },
  { code: 'en', name: 'English', region: 'United States' },
  { code: 'ru', name: 'Русский', region: 'Россия' },
];

export function LanguageModal({ open, onClose, selectedLanguage, onLanguageSelect }: LanguageModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 4,
          width: '100%',
          maxWidth: 400,
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #DDDDDD',
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Choose a language
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            '&:hover': { backgroundColor: '#F7F7F7' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <List sx={{ pt: 0 }}>
          {languages.map((lang) => (
            <ListItem key={lang.code} disablePadding={true}>
              <ListItemButton
                onClick={() => {
                  onLanguageSelect(lang.code);
                  onClose();
                }}
                sx={{
                  px: 3,
                  py: 2,
                  '&:hover': { backgroundColor: '#F7F7F7' },
                }}
              >
                <Radio checked={selectedLanguage === lang.code} sx={{ mr: 2 }} />
                <ListItemText
                  primary={lang.name}
                  secondary={lang.region}
                  primaryTypographyProps={{
                    fontWeight: selectedLanguage === lang.code ? 600 : 400,
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
