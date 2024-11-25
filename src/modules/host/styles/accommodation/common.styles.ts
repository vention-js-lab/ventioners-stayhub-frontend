import { type MuiStylesObject } from '#/types/mui-styles-object.type.ts';

export const commonStyles = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formControl: {
    width: '100%',
    marginBottom: '20px',
  },
  buttonGroup: {
    position: 'fixed',
    bottom: 32,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    padding: '0 24px',
  },
  button: {
    textTransform: 'uppercase',
    width: 'auto',
    padding: '10px 24px',
  },
  mapContainer: {
    height: '400px',
    width: '100%',
    marginBottom: '20px',
  },
  imageUpload: {
    border: '2px dashed #ccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
  },
  numberSelector: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
} satisfies MuiStylesObject;
