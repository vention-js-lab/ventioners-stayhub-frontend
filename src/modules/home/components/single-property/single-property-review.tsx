import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { SinglePropertyReviewStyles } from './single-property-review.styles';

interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
}

interface SinglePropertyReviewProps {
  reviews: Review[];
}

function SinglePropertyReview({ reviews }: SinglePropertyReviewProps) {
  const [numReviews, setNumReviews] = useState(12);

  const handleShowMore = () => {
    setNumReviews((prev) => prev + 12);
  };

  const overallRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <Box sx={SinglePropertyReviewStyles.mainContainerBox}>
      <Typography variant="h4" sx={SinglePropertyReviewStyles.reviewTitle}>
        <StarIcon sx={SinglePropertyReviewStyles.reviewTitleIcon} /> {overallRating} ({reviews.length} reviews)
      </Typography>
      <Box sx={SinglePropertyReviewStyles.reviewContainerBox}>
        {reviews.slice(0, numReviews).map((review) => (
          <Box key={review.id} sx={SinglePropertyReviewStyles.reviewBox}>
            <Divider />
            <Box sx={SinglePropertyReviewStyles.reviewDetailsBox}>
              <Box sx={SinglePropertyReviewStyles.reviewNameBox}>
                <Box sx={SinglePropertyReviewStyles.reviewAvatarBox}>{review.name[0]}</Box>
                <Typography variant="subtitle1" sx={SinglePropertyReviewStyles.reviewName}>
                  {review.name}
                </Typography>
              </Box>

              <Rating
                value={review.rating}
                precision={0.5}
                icon={<StarIcon />}
                emptyIcon={<StarIcon style={{ opacity: 0.3 }} />}
                readOnly={true}
                sx={SinglePropertyReviewStyles.reviewRatingIcons}
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
        <Box sx={SinglePropertyReviewStyles.showMoreButton}>
          <Button onClick={handleShowMore} variant="outlined">
            Show More
          </Button>
        </Box>
      )}
    </Box>
  );
}

export { SinglePropertyReview };
