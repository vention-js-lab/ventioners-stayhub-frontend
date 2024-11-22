export const guestModalStyles = {
    paper: {
        borderRadius: 2,
        width: '100%',
        maxWidth: '400px',
        p: 1,
    },
    dialogContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 1,
    },
    dialogTitle: {
        fontWeight: 500
    },
    addRemoveButtonContainer: {
        direction: 'row',
        spacing: 1,
        alignItems: 'center',
    },
    icon: {
        fontSize: 16
    },
    functionButtonContainer: {
        borderTop: '1px solid #EBEBEB',
        pt: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clearButton: {
        textTransform: 'none',
    },
    submitButton: {
        bgcolor: 'black',
        '&:hover': {
            bgcolor: '#333',
        },
        textTransform: 'none',
    }
} as const;