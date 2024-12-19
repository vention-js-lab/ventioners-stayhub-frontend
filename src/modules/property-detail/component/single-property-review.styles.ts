export const PropertyReviewStyles = {
  mainContainerBox: {
    px: { md: 0, xs: 1 },
    mt: { md: 0, xs: 4 },
    mb: { md: 2, xs: 1 },
    '@media (max-width: 768px)': {
      margin: 'auto',
      ml: { md: 0, xs: 2 },
      mr: { md: 0, xs: 2 },
    },
  },
  reviewTitle: {
    mb: 3,
    display: 'flex',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      fontSize: '1.2rem',
    },
  },
  reviewTitleIcon: { fontSize: '30px', mr: 1 },
  reviewContainerBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    justifyContent: 'space-between',
    '& > *': {
      flex: { xs: '1 1 100%', md: '1 1 calc(50% - 16px)' },
      minWidth: { xs: '100%', md: 'calc(50% - 16px)' },
      maxWidth: { xs: '100%', md: 'calc(50% - 16px)' },
    },
  },
  reviewBox: {
    py: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    maxWidth: '300px',
  },
  reviewDetailsBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2,
  },
  reviewNameBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  reviewAvatarBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontWeight: 'bold',
  },
  reviewName: { fontWeight: 'bold' },
  reviewRatingIcons: {
    '& svg': { fontSize: '16px' },
  },
  showMoreButton: { textAlign: 'center', mt: 2 },
} as const;
