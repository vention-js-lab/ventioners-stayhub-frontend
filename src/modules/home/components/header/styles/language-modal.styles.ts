export const languageModalStyles = {
    paper: {
        borderRadius: 4,
        width: '100%',
        maxWidth: 400,
    },
    dialogTitle: {
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #DDDDDD',
    },
    dialogText: {
        fontWeight: 600
    },
    dialogContent: {
        p: 0,
    },
    dialogContentList: {
        pt: 0,
    },
    closeButton: {
        '&:hover': { backgroundColor: '#F7F7F7' }
    },
    listItemButton: {
        px: 3,
        py: 2,
        '&:hover': { backgroundColor: '#F7F7F7' },
    },
    checkbox: {
        mr: 2
    },
    listItemText: {
        chosen: 600,
        default: 400
    }
} as const;