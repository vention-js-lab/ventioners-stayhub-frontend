import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { PropertyReviewStyles } from './single-property-review.styles';
import { PropertyreviewCard } from './property-review-card';

interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
}

interface PropertyReviewProps {
  reviews: Review[];
  overallRating: number;
}

function PropertyReview({ reviews, overallRating }: PropertyReviewProps) {
  const [numReviews, setNumReviews] = useState(12);

  const handleShowMore = () => {
    setNumReviews((prev) => prev + 12);
  };

  return (
    <Box sx={PropertyReviewStyles.mainContainerBox}>
      <Typography variant="h4" sx={PropertyReviewStyles.reviewTitle}>
        <StarIcon sx={PropertyReviewStyles.reviewTitleIcon} /> {overallRating} ({reviews.length} reviews)
      </Typography>
      <Box sx={PropertyReviewStyles.reviewContainerBox}>
        {reviews.slice(0, numReviews).map((review) => (
          <PropertyreviewCard key={review.id} review={review} />
        ))}
      </Box>
      {numReviews < reviews.length && (
        <Box sx={PropertyReviewStyles.showMoreButton}>
          <Button onClick={handleShowMore} variant="outlined">
            Show More
          </Button>
        </Box>
      )}
    </Box>
  );
}

export { PropertyReview };
