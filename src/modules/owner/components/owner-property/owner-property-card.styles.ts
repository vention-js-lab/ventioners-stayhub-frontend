import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const ownerPropertyCardStyles = {
  card: {
    display: 'flex',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    overflow: 'hidden',
    maxWidth: '100%',
    height: {
      xs: '700px',
      sm: '650px',
      md: '500px',
      lg: '450px',
    },
    margin: 'auto',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row',
    },
    marginBottom: 3,
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  swiperContainer: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '45%',
    },
    height: {
      xs: '40%',
      sm: '45%',
      md: '100%',
      lg: '100%',
    },
    position: 'relative',
  },

  swiper: {
    width: '100%',
    height: '100%',
  },

  content: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '55%',
    },
    height: '100%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  category: {
    color: '#6A5AE0',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '4px',
    textTransform: 'uppercase',
  },

  name: {
    fontSize: '1.4rem',
    fontWeight: 700,
    marginBottom: '8px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: {
      xs: 1,
      md: 2,
    },
  },

  description: {
    fontSize: '0.95rem',
    color: '#666',
    margin: '8px 0',
    lineHeight: 1.5,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: {
      lg: 7,
      md: 6,
      sm: 4,
      xs: 4,
    },
  },

  rating: {
    display: {
      xs: 'none',
      sm: 'none',
      md: 'flex',
    },
    alignItems: 'center',
    margin: '16px 0',
  },

  location: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '8px',
    gap: '8px',
    color: '#555',
    fontSize: {
      xs: '0.8rem',
      sm: '0.85rem',
      md: '0.9rem',
    },
  },

  locationText: {
    paddingTop: '2px',
    paddingLeft: '8px',
    fontWeight: 600,
    color: 'text.secondary',
    lineHeight: 1.5,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: {
      lg: 4,
      xs: 3,
    },
  },

  amenitiesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    alignItems: 'center',
    color: '#555',
    fontSize: '0.875rem',
    marginBottom: '8px',
  },

  amenity: {
    fontWeight: 500,
    backgroundColor: 'primary.light',
    border: '1px solid',
    borderRadius: '8px',
    padding: '4px 8px',
    fontSize: '0.875rem',
    color: 'white',
  },

  price: {
    display: 'flex',
    justifyContent: 'flex-end',
    fontWeight: 700,
    fontSize: '1.1rem',
    color: '#333',
  },
} satisfies MuiStylesObject;
