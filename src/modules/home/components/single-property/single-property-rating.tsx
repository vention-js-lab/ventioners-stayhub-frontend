import { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { showToastError } from '#/utils';
import { useCreateReview } from '../../api/create-review';
import { useQueryClient } from '@tanstack/react-query';

interface ReviewFormProps {
  accommodationId: string;
}

export function ReviewForm({ accommodationId }: ReviewFormProps) {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');

  const { mutate: createReview, status } = useCreateReview(queryClient, accommodationId);
  const isLoading = status === 'pending';
  const handleSubmit = () => {
    if (rating === null || comment.trim() === '') {
      showToastError('Both rating and comment are required.');
      return;
    }
    createReview({ rating, comment, accommodationId });
    setRating(null);
    setComment('');
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom={true}>
        Leave a Review
      </Typography>

      <Rating value={rating} onChange={(event, newValue) => setRating(newValue)} precision={1} sx={{ mb: 2, fontSize: '3rem' }} />

      {rating !== null && (
        <>
          <TextField
            fullWidth={true}
            label="Comment"
            multiline={true}
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 2 }}
            disabled={isLoading}
          />

          <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </>
      )}
    </Box>
  );
}
