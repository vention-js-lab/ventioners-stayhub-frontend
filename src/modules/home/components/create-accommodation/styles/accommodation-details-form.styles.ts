import { type MuiStylesObject } from '#/types/mui-styles-object.type.ts';

export const accommodationDetailsFormStyles = {
  container: {
    padding: 2,
  },
  dropdown: {
    width: '100%',
    marginTop: 1,
  },
  amenitiesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    marginTop: 1,
  },
  amenityChip: {
    cursor: 'pointer',
    '&:active': {
      backgroundColor: 'transparent',
    },
    '&:focus': {
      outline: 'none',
      backgroundColor: 'primary.main',
    },
  },
  selectedAmenityChip: {
    backgroundColor: 'primary.main',
    color: 'white',
  },
  guestCountContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  guestsCountControls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '104px',
  },
  guestsCountButton: {
    all: 'unset',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid rgb(176, 176, 176)',
    borderRadius: '50%',
    textAlign: 'center',
    cursor: 'pointer',
    flex: '0 0 auto',
    width: '32px',
    height: '32px',
    fontSize: '30px',
    '&:hover': {
      borderColor: 'rgb(34, 34, 34)',
    },
    '&:disabled': {
      borderColor: 'rgb(235, 235, 235)',
    },
    '&:disabled img': {
      opacity: '25%',
      userSelect: 'none',
    },
  },
} satisfies MuiStylesObject;
