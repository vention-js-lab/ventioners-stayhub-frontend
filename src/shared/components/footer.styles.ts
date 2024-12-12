import { type MuiStylesObject } from '#/types/mui-styles-object.type';

export const footerStyles = {
  footer: {
    backgroundColor: '#F7F7F7',
    padding: '16px 0',
    marginTop: 'auto',
  },
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 300,
    letterSpacing: '1px',
  },
} satisfies MuiStylesObject;
