import Box from '@mui/material/Box';

type Props = {
  firstName: string;
};

const styles = {
  container: {
    width: '32px',
    height: '32px',
    backgroundColor: '#000000',
    color: '#ffffff',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '5px',
  },
  text: {
    fontSize: '15px',
    fontWeight: '400',
    textTransform: 'uppercase',
  },
} as const;

export function UserProfileIcon({ firstName }: Props) {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.text}>{firstName[0]}</Box>
    </Box>
  );
}
