import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const numberSelectorStyles = {
  numberSelector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '12px',
  },
  label: {
    flex: '1',
    textAlign: 'left',
  },
  button: {
    minWidth: '36px',
    height: '36px',
    margin: '0 8px',
  },
  value: {
    minWidth: '36px',
    textAlign: 'center',
  },
} satisfies MuiStylesObject;
