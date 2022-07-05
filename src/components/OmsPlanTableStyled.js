import { TableContainer } from "@mui/material";

import styled from "@emotion/styled";
import { css } from "@emotion/react";
import isPropValid from "@emotion/is-prop-valid";

import OmsPlanTable from "./OmsPlanTable";
import React from "react";
/*
const tableStyledOptions = { 
    shouldForwardProp :  prop  => 
      isPropValid ( prop ) && prop !==  'leftColWidth' && prop !== 'rightColWidth'
  }
*/
const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft" || (e.key === "Tab" && e.shiftKey)) {
        //e.target.parentElement.parentElement.previousElementSibling.firstElementChild.scrollIntoView({block: "nearest", behavior: "smooth"});
        e.target.parentElement.previousElementSibling.firstElementChild.click();
        e.preventDefault();
    }
    if (e.key === "ArrowRight" || (e.key === "Tab" && !e.shiftKey)) {
        e.target.parentElement.nextElementSibling.firstElementChild.click();
        e.preventDefault();
    }
    if (e.key === "ArrowUp" || (e.key === 'Enter' && e.shiftKey)) {
        const previousRow = e.target.parentElement.parentElement.previousElementSibling;
        if (previousRow) {
            const cellIndex = e.target.parentElement.cellIndex;
            previousRow.cells[cellIndex].firstElementChild.click();
        }
        e.preventDefault();
    }
    if (e.key === "ArrowDown" || (e.key === 'Enter' && !e.shiftKey)) {
        const nextRow = e.target.parentElement.parentElement.nextElementSibling;
        if (nextRow) {
            const cellIndex = e.target.parentElement.cellIndex;
            nextRow.cells[cellIndex].firstElementChild.click();
        }
        e.preventDefault();
    }
    
}

const OmsPlanTableStyled = styled(
        ({className, ...props}) => (
            <TableContainer className={className}>
                <OmsPlanTable {...props} onKeyDown={handleKeyDown}></OmsPlanTable>
            </TableContainer>
        )
 //   , tableStyledOptions
  )(
  props => css`
    scroll-padding-top: ${props.topRowHeight + 50}px;
    scroll-padding-left: ${props.leftColWidth + 325}px;
    scroll-padding-bottom: 25px;
    scroll-padding-right: 500px;
    scroll-behavior: smooth;
    max-height: calc(100vh - 150px);
    min-height: 400px;
    &.FullScreen {
        background-color: #fff;
        width: 100%;
        height: 100%;
        max-height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: ${props.theme.zIndex.appBar + 150};
    }
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
    
    & tr:nth-of-type(1) th {
        border: 0;
        top: 0;
        height: ${props.topRowHeight}px;
        min-height: ${props.topRowHeight}px;
        position: sticky;
        z-index: ${props.theme.zIndex.appBar + 2};
    }
    & tr:nth-of-type(2) th {
        top: ${props.topRowHeight}px;
        position: sticky;
        z-index: ${props.theme.zIndex.appBar + 2};
    }

    & tr:nth-last-of-type(1) td {
        background-color: #e9e9e9;
        border: 0;
        bottom: 0;
        position: sticky;
        z-index: ${props.theme.zIndex.appBar + 2};
    }
    & tr:nth-last-of-type(1) td.stickyRight,
    & tr:nth-last-of-type(1) td:nth-of-type(-n+2) {
        background-color: #d3d3d3;
        z-index: ${props.theme.zIndex.appBar + 4};
    }

    & tr th:nth-of-type(-n+2) {
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
    & tr th.stickyRight {
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

export default OmsPlanTableStyled;