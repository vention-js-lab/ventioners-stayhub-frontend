const emailInputStyles = (emailFocused: boolean, hasContent: boolean, noBorder: boolean = false) => ({
  emailContainer: {
    position: 'relative',
    height: '57px',
    borderBottom: '1px solid rgb(176, 176, 176)',
    ...(emailFocused && {
      transform: 'scale(1.005) translateY(-1px)',
      border: '2px solid rgb(34, 34, 34)',
      borderRadius: '8px',
    }),
    ...(noBorder && {
      borderBottom: 'none',
    }),
  },

  emailLabel: {
    position: 'absolute',

    textAlign: 'left',
    verticalAlign: 'middle',
    left: '10px',
    right: '12px',
    top: '15px',
    bottom: '18px',

    color: 'rgb(106, 106, 106)',

    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    userSelect: 'none',

    transition: 'transform 0.15s cubic-bezier(0.455, 0.03, 0.515, 0.955)',
    transformOrigin: 'left center',

    ...((emailFocused || hasContent) && {
      transition: 'transform 0.15s cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      transform: 'translateY(-12px) scale(0.75)',
    }),
  },

  email: {
    all: 'unset',
    display: 'inline-block',
    opacity: 0,
    width: 'calc(100% - 20px)',
    height: '100%',
    fontSize: '16px',
    ...((emailFocused || hasContent) && {
      height: '26px',
      opacity: 1,
      textAlign: 'left',
      color: 'rgb(34, 34, 34)',
      margin: '22px 10px',
      marginBottom: '6px',
    }),
  },
});

export default emailInputStyles;
