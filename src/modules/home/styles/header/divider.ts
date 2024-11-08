import { Divider, styled } from "@mui/material";

export const StyledDivider = styled(Divider)(({ theme }) => ({
    margin: '0 -4px',
    height: '24px',
    alignSelf: 'center',
    backgroundColor: '#DDDDDD',
    [theme.breakpoints.down('sm')]: {
        height: '20px',
    },
}));