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
} satisfies MuiStylesObject;
