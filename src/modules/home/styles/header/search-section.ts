import { Button, styled } from "@mui/material";

export const SearchSection = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    borderRadius: 50,
    padding: '8px 24px',
    height: '100%', // Fill the container height
    color: '#222222',
    backgroundColor: 'transparent',
    flex: 1,
    minWidth: 0,
    minHeight: 0, // Remove default button minimum height
    '&:hover': {
        backgroundColor: '#F7F7F7',
    },
    '& .MuiStack-root': {
        width: '100%', // Ensure stack takes full width
        height: '100%', // Fill the button height
        justifyContent: 'center', // Center content vertically
    },
    [theme.breakpoints.down('md')]: {
        padding: '8px 16px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '8px 12px',
    },
}));