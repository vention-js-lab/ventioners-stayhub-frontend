export const settingsCardStyles = {
  container: {
    all: 'unset',
    paddingX: '8px',
    flex: 1,
    cursor: 'pointer',
    textAlign: 'start',
    maxHeight: '172px',
    minWidth: '260px',
  },
  card: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '156px',
    lineHeight: '20px',
    borderRadius: '12px',
    padding: '16px',
    marginY: '8px',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 6px 16px',
    color: 'rgb(34, 34, 34)',
  },
  iconContainer: {
    marginBottom: '16px',
  },
  title: {
    marginBottom: '8px',
    color: '#222222',
    fontWeight: 600,
  },
  description: {
    color: 'rgb(106, 106, 106)',
  },
} as const;
