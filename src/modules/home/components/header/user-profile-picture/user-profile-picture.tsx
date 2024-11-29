import Box from '@mui/material/Box';
import { userProfilePictureStyles as styles } from './user-profile-picture.styles';
import { type User } from '#/types';

type Props = {
  user: User;
  size: 'small' | 'large';
};

export function UserProfilePicture({ user, size }: Props) {
  return (
    <Box sx={{ ...styles.container, ...(size === 'large' && styles.container.large) }}>
      <Box sx={{ ...styles.text, ...(size === 'large' && { fontSize: '32px' }) }}>{user.firstName[0]}</Box>
    </Box>
  );
}
