import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const bookingCardStyles = {
  container: {
    mb: 2,
    borderRadius: 2,
    boxShadow: 1,
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },
  content: {
    p: 5,
  },
  contextBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
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
  detailsContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: 2,
    justifyContent: 'space-between',
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
  },
} satisfies MuiStylesObject;