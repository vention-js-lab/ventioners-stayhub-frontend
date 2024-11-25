import { type MuiStylesObject } from '#/types/mui-styles-object.type.ts';

export const categorySelectionStyles = {
  container: {
    maxWidth: 800,
    margin: '24px auto',
    padding: '40px 24px',
  },
  title: {
    marginBottom: '32px',
    fontWeight: 600,
    color: '#222222',
  },
  gridContainer: {
    marginTop: '16px',
  },
  card: {
    height: '100%',
    transition: 'all 0.2s ease-in-out',
    borderRadius: '12px',
    border: '1px solid #DDDDDD',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
    },
  },
  selectedCard: {
    border: '2px solid #FF385C',
    backgroundColor: '#FFF8F9',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.12)',
    },
  },
  cardContent: {
    padding: '24px !important', // Override MUI default padding
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  categoryIcon: {
    fontSize: '32px',
    color: '#717171',
  },
  categoryName: {
    fontWeight: 500,
    color: '#222222',
    textAlign: 'center',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
  },
  icon: {
    color: '#FF385C',
    fontSize: '32px',
  },
} satisfies MuiStylesObject;
