import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const bookingCardStyles = {
  container: {
    mb: 2,
    borderRadius: 2,
    boxShadow: 1,
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
  },
  content: {
    flex: 1,
    width: '100%',
    p: {
      xs: 3,
      md: 4,
      lg: 5,
    },
  },
  contextBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    height: '100%',
  },
  accommodationTitle: {
    fontWeight: 'bold',
    color: 'red',
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  titleBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  },
  moreOptionsButton: {
    p: 1,
    ml: 2,
  },
  detailsContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: 3,
    justifyContent: 'space-between',
    flex: 1,
    mb: 2,
  },
  detailBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 1,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    flex: 1,
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    flex: 1,
  },
  statusContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    mt: 'auto',
  },
  imageContainer: {
    width: { xs: '100%', md: '300px' },
    minWidth: { md: '300px' },
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    cursor: 'pointer',
  },
  noImage: {
    width: '100%',
    height: '100%',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'grey.200',
    color: 'grey.500',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
} satisfies MuiStylesObject;
