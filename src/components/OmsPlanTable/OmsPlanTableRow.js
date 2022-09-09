import styled from "@emotion/styled";
import { TableRow } from "@mui/material";

const setActiveRow = (e) => {
    const row = e.target.closest('.MuiTableRow-root');
    const rowCollection = row.parentElement.querySelectorAll('.active');
    for(let i = 0; i < rowCollection.length; i++)
    {
      rowCollection[i].classList.remove("active");
    }
    row.classList.add("active");
}

const TableRowStyled = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: ${({theme}) => theme.palette.action.hover};
  }
  &:hover .MuiTableCell-root {
    background-color: ${({theme}) => theme.palette.grey[400]};
  }
  &.active .MuiTableCell-root {
    background-color: ${({theme}) => theme.palette.primary.light};
    /* font-weight: 500; */
  }
`

const handleOnClick = (e, f) => {
    setActiveRow(e);
    if (f) {
        f(e);
    }
}

export default ({onClick, ...props}) => (
    <TableRowStyled onClick={(e) => handleOnClick(e,onClick)} {...props}></TableRowStyled>
)