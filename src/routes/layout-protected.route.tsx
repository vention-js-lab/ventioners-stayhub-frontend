import { useAuth } from '#/modules/auth/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '#/redux/hooks';
import { createUser, removeUser } from '#/redux/auth/authSlice';
import CircularProgress from '@mui/material/CircularProgress';

const loadingStyles = { display: 'flex', backgroundColor: '#000000' };

type Props = {
  protectedRoute: boolean;
};

export function AuthLayout({ protectedRoute }: Props) {
  const { data: user, isLoading, isError } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <CircularProgress sx={loadingStyles} />;
  }

  if (isError || !user) {
    dispatch(removeUser());

    if (protectedRoute) {
      navigate('/login', { replace: true });
    }
  } else {
    dispatch(createUser(user));
  }

  return <Outlet />;
}
