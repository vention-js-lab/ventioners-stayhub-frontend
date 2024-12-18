import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckMailbox } from '../components';
import { showToastError } from '#/utils';

export function CheckMailRoute() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email');

  if (!email) {
    showToastError('No email provided');
    navigate('/');
    return null;
  }

  return <CheckMailbox email={email} />;
}
