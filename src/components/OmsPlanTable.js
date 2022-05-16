import { Table } from '@mui/material';
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import isPropValid from "@emotion/is-prop-valid";

const tableStyledOptions = { 
    shouldForwardProp :  prop  => 
      isPropValid ( prop ) && prop !==  'leftColWidth' && prop !== 'rightColWidth'
  }
  
export default styled(Table, tableStyledOptions)(props => css`
  & th {
    background-color: #e9e9e9;
    min-width: 50px;
    padding: 0 2px 0 2px;
  }
  & td {
    min-width: 50px;
    white-space: nowrap;
    padding: 0px 5px 0px 5px;
  }
  
  & th:nth-of-type(-n+2) {
    background-color: #d3d3d3;
    position: sticky;
    z-index: ${props.theme.zIndex.appBar + 4}
  }
  & td:nth-of-type(-n+2) {
    background-color: #e9e9e9;
    position: sticky;
    z-index: ${props.theme.zIndex.appBar + 3}
  }
  & th:nth-of-type(1), & td:nth-of-type(1) {
    left: 0;
    width: ${props.leftColWidth}px;
  }
  & th:nth-of-type(2), & td:nth-of-type(2) {
    max-width: 300px;
    overflow: hidden;
    left: ${props.leftColWidth}px;
  }
  & .stickyRight {
    padding: 0;
    min-width: ${props.rightColWidth}px;
    position: sticky;
  }
  & th.stickyRight {
    background-color: #d3d3d3;
    z-index: ${props.theme.zIndex.appBar + 4};
  }
  & td.stickyRight {
    background-color: #e9e9e9;
    z-index: ${props.theme.zIndex.appBar + 3};
  }
  & .stickyRight:nth-last-of-type(1) {
    right: 0px;
  }
  & .stickyRight:nth-last-of-type(2) {
    right: ${props.rightColWidth}px;
  }
  & .stickyRight:nth-last-of-type(3) {
    right: ${2 * props.rightColWidth}px;
  }
  & .stickyRight:nth-last-of-type(4) {
    right: ${3 * props.rightColWidth}px;
  }
  & .stickyRight:nth-last-of-type(5) {
    right: ${4 * props.rightColWidth}px;
  }
  `)