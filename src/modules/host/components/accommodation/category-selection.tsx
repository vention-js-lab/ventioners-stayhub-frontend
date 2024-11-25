import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import { type Category } from '#/types/category.type.ts';
import { useAccommodation } from '#/modules/host/context';
import { categorySelectionStyles } from '#/modules/host/styles';
import { axiosInstance } from '#/configs';
import { categoryToIconMap } from '#/modules/home/constants/category-icon-map.constant';
import { toast } from 'react-toastify';

interface ApiResponse {
  data: Category[];
}

export function CategorySelection() {
  const {
    data: responseData,
    isLoading,
    isError,
  } = useQuery<ApiResponse>({
    queryKey: ['categories'],
    queryFn: () => axiosInstance.get<ApiResponse>('/categories').then((response) => response.data),
  });

  const { data, updateData } = useAccommodation();

  if (isLoading) {
    return (
      <Box sx={categorySelectionStyles.loadingContainer}>
        <CircularProgress sx={{ color: '#FF385C' }} />
      </Box>
    );
  }

  if (isError) {
    toast('Failed to load categories. Please try again later.', { type: 'error' });
  }

  const categories = responseData?.data ?? [];

  const categoriesWithIcons = categories.map((category) => ({
    ...category,
    icon: categoryToIconMap[category.name],
  }));

  return (
    <Box sx={categorySelectionStyles.container}>
      <Typography variant="h4" sx={categorySelectionStyles.title}>
        Which of these best describes your place?
      </Typography>

      <Grid container={true} spacing={3} sx={categorySelectionStyles.gridContainer}>
        {categoriesWithIcons.map((category) => (
          <Grid item={true} xs={12} sm={6} md={4} key={category.id}>
            <Card
              onClick={() => updateData({ categoryId: category.id })}
              sx={{
                ...categorySelectionStyles.card,
                ...(data.categoryId === category.id && categorySelectionStyles.selectedCard),
              }}
            >
              <CardContent sx={categorySelectionStyles.cardContent}>
                {<category.icon sx={categorySelectionStyles.icon} />}
                <Typography variant="body2" color="text.secondary" align="center">
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
