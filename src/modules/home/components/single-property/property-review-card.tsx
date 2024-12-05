import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { PropertyReviewStyles } from './single-property-review.styles';
import StarIcon from '@mui/icons-material/Star';
import { truncateString } from '#/utils/truncate-string.util';

interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
}

function PropertyReviewCard({ review }: { review: Review }) {
  return (
    <Box key={review.id} sx={PropertyReviewStyles.reviewBox}>
      <Divider />
      <Box sx={PropertyReviewStyles.reviewDetailsBox}>
        <Box sx={PropertyReviewStyles.reviewNameBox}>
          <Box sx={PropertyReviewStyles.reviewAvatarBox}>{review.name[0]}</Box>
          <Typography variant="subtitle1" sx={PropertyReviewStyles.reviewName}>
            {review.name}
          </Typography>
        </Box>

        <Rating
          value={Number(review.rating)}
          precision={0.5}
          icon={<StarIcon />}
          emptyIcon={<StarIcon style={{ opacity: 0.3 }} />}
          readOnly={true}
          sx={PropertyReviewStyles.reviewRatingIcons}
        />
      </Box>

      <Box>
        <Typography variant="body2" color="text.secondary">
          {truncateString(review.comment, 140)}
        </Typography>
      </Box>
    </Box>
  );
}

export { PropertyReviewCard };
