import { type MuiStylesObject } from '#/types/mui-styles-object.type.ts';

export const basicDetailsStyles = {
  container: {
    maxWidth: 800,
    margin: '24px auto',
    padding: '40px 24px',
  },
  title: {
    marginBottom: '32px',
    fontWeight: 600,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  inputField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '&:hover fieldset': {
        borderColor: '#000000',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#717171',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#222222',
    },
  },
  descriptionField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
  },
  priceField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
    },
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
  },
  currencyAdornment: {
    color: '#717171',
    marginRight: '8px',
  },
} satisfies MuiStylesObject;
