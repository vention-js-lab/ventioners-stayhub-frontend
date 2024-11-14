import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { ENDPOINTS } from '#/modules/auth/constants';
import googleIcon from '#/modules/auth/assets/icons/google.svg';
import styles from './google-auth-button.module.css';
import { AccessTokenStore } from '#/utils';

export function GoogleAuthButton() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');

    if (accessToken) {
      AccessTokenStore.setToken(accessToken);
      navigate('/');
    }
  }, []);

  return (
    <form action={`${import.meta.env.VITE_API_URL}${ENDPOINTS.googleAuth}`}>
      <Box className={styles.wrapper}>
        <button type="submit" className={styles.container}>
          <Box className={styles.logo}>
            <img src={googleIcon} alt="Google Icon" />
          </Box>
          <Box className={styles.text}>Continue with Google</Box>
        </button>
      </Box>
    </form>
  );
}
