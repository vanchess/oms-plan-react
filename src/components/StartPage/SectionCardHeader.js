import styled from '@emotion/styled';
import { Avatar, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { css } from "@emotion/react";

const CardHeaderStyled = styled(CardHeader)(props => css`
    text-decoration: none;
    color: ${props.theme.palette.text.primary};
    &:focus, &:hover, &:visited, &:link, &:active: {
        text-decoration: none
    }
`)

export default function SectionCardHeader(props) {
    const { image, title, to } = props;

    return (
        <CardHeaderStyled
            component={RouterLink}
            to={to}
            disableTypography
            avatar={
                <Avatar aria-label="{title}" src={ image } />
            }
            title={ <Typography gutterBottom variant="h5" component="div">{title}</Typography> }
        />
    )
}