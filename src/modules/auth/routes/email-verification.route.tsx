import { useNavigate, useSearchParams } from 'react-router-dom';
import { EmailVerification } from '../components';
import { showToastError } from '#/utils';
import { ENDPOINTS } from '../constants';

export function EmailVerificationRoute() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  if (!email || !token) {
    showToastError('No email or token provided');
    navigate(ENDPOINTS.login);
    return null;
  }
  return <EmailVerification email={email} token={token} />;
}
