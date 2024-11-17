const errorMessageStyles = {
  wrapper: {
    display: 'flex',
    height: '92px',
    border: '1px solid rgb(221, 221, 221)',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '24px',
  },
  msgContainer: {
    width: '100%',
    overflow: 'hidden',
    textAlign: 'left',
  },
  message: {
    display: '-webkit-box',
    width: '100%',
    color: 'rgb(106, 106, 106)',

    overflow: 'hidden',
    textOverflow: 'ellipsis',

    lineHeight: '1.1em',
    lineClamp: '2',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
  },
  title: {
    fontWeight: 'bold',
    height: '18px',
    color: 'rgb(34, 34, 34)',
    marginBottom: '6px',
  },
  signWrapper: {
    marginRight: '12px',
  },
  sign: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '44px',
    width: '44px',
    backgroundColor: 'rgb(193, 53, 21)',
    color: 'white',
    borderRadius: '50%',
  },
} as const;

export default errorMessageStyles;
