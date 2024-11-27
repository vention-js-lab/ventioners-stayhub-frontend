import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
}

interface SinglePropertyReviewProps {
  reviews: Review[];
}

const SinglePropertyReview: React.FC<SinglePropertyReviewProps> = ({ reviews }) => {
  const [numReviews, setNumReviews] = useState(12);

  const handleShowMore = () => {
    setNumReviews((prev) => prev + 12);
  };

  const overallRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <Box sx={{ px: { md: 2, xs: 1 }, mt: { md: 0, xs: 4 } }}>
      <Typography variant="h4" sx={{ mb: 3, display: 'flex', alignItems: 'center', ml: { md: 0, xs: 2 } }}>
        <StarIcon sx={{ fontSize: '30px', mr: 1 }} /> {overallRating} ({reviews.length} reviews)
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'space-between',
          '& > *': {
            flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
            minWidth: { xs: '100%', md: 'calc(50% - 16px)' },
            maxWidth: { xs: '100%', md: 'calc(50% - 16px)' },
          },
        }}
      >
        {reviews.slice(0, numReviews).map((review) => (
          <Box
            key={review.id}
            sx={{
              p: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              maxWidth: '300px',
            }}
          >
            <Divider />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    fontWeight: 'bold',
                  }}
                >
                  {review.name[0]}
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {review.name}
                </Typography>
              </Box>

              <Rating
                value={review.rating}
                precision={0.5}
                icon={<StarIcon />}
                emptyIcon={<StarIcon style={{ opacity: 0.3 }} />}
                readOnly={true}
                sx={{
                  '& svg': { fontSize: '16px' },
                }}
              />
            </Box>

            <Box>
              <Typography variant="body2" color="text.secondary">
                {review.comment.slice(0, 140)}
                {review.comment.length > 140 ? `...` : ''}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      {numReviews < reviews.length && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button onClick={handleShowMore} variant="outlined">
            Show More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SinglePropertyReview;
