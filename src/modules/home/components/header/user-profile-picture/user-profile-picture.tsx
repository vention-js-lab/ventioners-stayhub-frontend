import { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import cameraIcon from '#/assets/camera.svg';
import { type User } from '#/types';
import { userProfilePictureStyles as styles } from './user-profile-picture.styles';
import { api } from '#/configs';
import { ENDPOINTS } from '#/modules/users/constants';
import { useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '#/redux/hooks';
import { createUser } from '#/redux/auth/auth.slice';
import { toast } from 'react-toastify';
import { type AxiosAuthResponse } from '#/modules/auth/types';
import { useTranslation } from 'react-i18next';
import { TRANSLATION_KEYS } from '#/constants/translation-keys.constant';

type Props = {
  user: User;
  size: 'small' | 'large';
};

export function UserProfilePicture({ user, size }: Props) {
  const { t } = useTranslation('account-settings');
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  function handleSubmit(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      toast('No image specified');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    api
      .put<AxiosAuthResponse>(`${ENDPOINTS.users}/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        queryClient.invalidateQueries({ queryKey: ['auth-user'] });
        dispatch(createUser(res.data.data));
        toast('Success');
      })
      .catch(() => toast('There was an error while saving your picture'));
  }

  return (
    <Box sx={styles().container}>
      <Box sx={styles(size, user.profilePictureUrl).image}>
        {!user.profilePictureUrl && <Box sx={styles(size).text}>{user.firstName[0]}</Box>}

        {size === 'large' && (
          <Button disableRipple={true} sx={styles().button} onClick={() => imageInputRef.current?.click()}>
            <img src={cameraIcon} />
            &nbsp;{t(TRANSLATION_KEYS.account_settings.edit)}
            <input type="file" ref={imageInputRef} style={{ display: 'none' }} onChange={handleSubmit} accept="image/*" />
          </Button>
        )}
      </Box>
    </Box>
  );
}
