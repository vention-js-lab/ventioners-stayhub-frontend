import { useAuth } from '#/modules/auth/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '#/redux/hooks';
import { createUser, removeUser } from '#/redux/auth/auth-slice';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { layoutProtectedStyles as styles } from '#/styles/layout-protected.styles';
import { useEffect } from 'react';

type Props = {
  protectedRoute: boolean;
};

export function AuthLayout({ protectedRoute }: Props) {
  const { data: user, isLoading, isError } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isError || !user) {
      dispatch(removeUser());

      if (protectedRoute) {
        navigate('/login', { replace: true });
      }
    } else {
      dispatch(createUser(user));
    }
  }, [user, isError]);

  if (isLoading) {
    return (
      <Box sx={styles.container}>
        <CircularProgress sx={styles.spinner} />
      </Box>
    );
  }

  return <Outlet />;
}
