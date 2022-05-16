import { TableContainer } from "@mui/material";
import styled from "@emotion/styled";

export default styled(TableContainer)(props => {
    return ({
        maxHeight: 'calc(100vh - 128px)',
        minHeight: "400px",
        '&.FullScreen': {
        backgroundColor: "#fff",
        width: "100%",
        height: '100%',
        position:'absolute',
        left: 0,
        top: 0,
        zIndex: props.theme.zIndex.appBar + 150,
        }
    })
})