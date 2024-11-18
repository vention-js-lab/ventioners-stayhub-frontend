export const inputStyles = (focused: boolean, hasContent: boolean, noBorder: boolean = true) => ({
  container: {
    position: 'relative',
    height: '57px',
    borderBottom: '1px solid rgb(176, 176, 176)',
    ...(focused && {
      transform: 'scaleX(1.005) scaleY(1.01)',
      border: '2px solid rgb(34, 34, 34)',
      borderRadius: '8px',
    }),
    ...(noBorder && {
      borderBottom: 'none',
    }),
  },

  input: {
    all: 'unset',
    display: 'inline-block',
    opacity: 0,
    width: 'calc(100% - 20px)',
    height: '100%',
    fontSize: '16px',
    ...((focused || hasContent) && {
      height: '26px',
      opacity: '1',
      textAlign: 'left',
      color: 'rgb(34, 34, 34)',
      margin: '22px 10px',
      marginBottom: '6px',
    }),
  },

  label: {
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

    ...((focused || hasContent) && {
      transition: 'transform 0.15s cubic-bezier(0.455, 0.03, 0.515, 0.955)',
      transform: 'translateY(-12px) scale(0.75)',
    }),
  },
});
