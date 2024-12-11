import { useNavigate, useSearchParams } from 'react-router-dom';
import Lottie from 'react-lottie';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import failAnimation from '#/assets/lotties/fail.json';
import successAnimation from '#/assets/lotties/success.json';

export function PaymentResult() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/');
  }, 5000);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      {success === 'true' ? (
        <Lottie
          options={{
            animationData: successAnimation,
            loop: false,
            autoplay: true,
          }}
          height={400}
          width={400}
        />
      ) : (
        <Lottie
          options={{
            animationData: failAnimation,
            loop: false,
            autoplay: true,
          }}
          height={400}
          width={400}
        />
      )}
      <Typography variant="h3" sx={{ mt: 2 }}>
        {success === 'true' ? 'Payment successful' : 'Payment failed'}
      </Typography>
    </Box>
  );
}
