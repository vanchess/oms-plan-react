import React, { useState } from "react";
import { useSelector } from 'react-redux'
import clsx from 'clsx';
import {
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  LinearProgress,
} from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import TotalValueField from './TotalValueField';

import { hospitalBedProfilesArrForNodeIdSelector, hospitalBedProfilesForNodeIsLoadingSelector, indicatorForNodeIsLoadingSelector, indicatorsArrForNodeIdSelector, selectedNodeIdSelector } from '../../../store/nodeData/nodeDataSelectors';
import { periodIdsByYearSelector } from '../../../store/period/periodSelectors';
import { selectedYearSelector } from '../../../store/nodeData/nodeDataSelectors';
import Link from '@mui/material/Link';

import { Link as RouterLink} from 'react-router-dom';
import { plannedIndicatorChangeItemsIsLoadingSelector } from "../../../store/plannedIndicatorChange/plannedIndicatorChangeSelectors";
import { moArrSelector, moIdsSelector } from "../../../store/mo/moSelectors";

const firstHeadHeight = 25;
const leftColWidth = 20;
const rightColWidth = 120;
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  head: {
    backgroundColor: "#e9e9e9",
    minWidth: "50px",
    padding: "0 2px 0 2px",
  },
  tableContainer: {
    maxHeight: 'calc(100vh - 128px)',
    minHeight: "400px"
  },
  cell: {
    minWidth: "50px",
    whiteSpace: "nowrap",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingLeft: "5px",
    paddingRight: "5px",
  },
  
  stickyTop: {
    border: 0,
    top: 0,
    height: `${firstHeadHeight}px`,
    minHeight: `${firstHeadHeight}px`,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 2
  },
  stickyTopSecond: {
    top: `${firstHeadHeight}px`,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 2
  },
  stickyLeft: {
    
    backgroundColor: "#e9e9e9",
    left: 0,
    width: `${leftColWidth}px`,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 2
  },
  stickyLeftSecond: {
    maxWidth: "300px",
    overflow: "hidden",
    backgroundColor: "#e9e9e9",
    left: `${leftColWidth}px`,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 2
  },
  stickyRight: {
    backgroundColor: "#e9e9e9",
    right: '-1px',
    minWidth: `${rightColWidth}px`,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 2
  },
  stickyRight1: {
    backgroundColor: "#e9e9e9",
    right: '-1px',
    minWidth: `${rightColWidth}px`,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 2
  },
  stickyRight2: {
    backgroundColor: "#e9e9e9",
    right: `${rightColWidth - 2}px`,
    minWidth: `${rightColWidth}px`,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 2
  },
  stickyRight3: {
    backgroundColor: "#e9e9e9",
    right: `${2 * rightColWidth - 3}px`,
    minWidth: `${rightColWidth}px`,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 2
  },
  stickyRight4: {
    backgroundColor: "#e9e9e9",
    right: `${3 * rightColWidth - 4}px`,
    minWidth: `${rightColWidth}px`,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 2
  },
  stickyLeftTopZIndex: {
    backgroundColor: "#d3d3d3",
    zIndex: theme.zIndex.appBar + 3
  },
  fullScreenTableContainer: {
    backgroundColor: "#fff",
    width: "100%",
    height: '100%',
    position:'absolute',
    left: 0,
    top: 0,
    zIndex: theme.zIndex.appBar + 150
  }
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const MainTable = (props) => {

  const [fixedTotal, setFixedTotal] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const classes = useStyles();

  const nodeId = useSelector(selectedNodeIdSelector);
  const mo = useSelector(moArrSelector);
  const moIds = useSelector(moIdsSelector);
  const profiles = useSelector(store => hospitalBedProfilesArrForNodeIdSelector(store, nodeId));
  const indicators = useSelector(store => indicatorsArrForNodeIdSelector(store, nodeId));
  
  const year = useSelector(store => selectedYearSelector(store));
  const periodIds = useSelector(store => periodIdsByYearSelector(store, year));
  //const selectedNodeId = useSelector(selectedNodeIdSelector);
  const changeIsLoading = useSelector(plannedIndicatorChangeItemsIsLoadingSelector);
  const profilesHospitalIsLoading = useSelector((store) => hospitalBedProfilesForNodeIsLoadingSelector(store, nodeId));
  const indicatorForNodeIsLoading = useSelector((store) => indicatorForNodeIsLoadingSelector(store, nodeId));
  const isLoading = changeIsLoading || profilesHospitalIsLoading || indicatorForNodeIsLoading;

console.log('M0');
  
  if (isLoading || !indicators || !profiles || mo.length === 0 || periodIds.length === 0) {
      return (<div><LinearProgress /></div>);
  }
  const indicatorLength = indicators.length;
console.log('M');

  return (
    <div>
      <TableContainer className={fullScreen ? classes.fullScreenTableContainer : classes.tableContainer}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow >
              <TableCell className={`${classes.head} ${classes.stickyTop} ${classes.stickyLeft} ${classes.stickyLeftTopZIndex}`} >
              </TableCell>
              <TableCell className={`${classes.head} ${classes.stickyTop} ${classes.stickyLeftSecond} ${classes.stickyLeftTopZIndex}`} >
                  <Checkbox
                        size="small"
                        checked={fullScreen}
                        icon={<FullscreenIcon />} 
                        checkedIcon={<FullscreenIcon />}
                        onChange={(e) => setFullScreen(e.target.checked)}
                      />
              </TableCell>
              {profiles.map((profile) => {
                return (
                  <TableCell align="center" colSpan={indicatorLength} className={`${classes.head} ${classes.stickyTop}`} key={profile.id}>
                      <span style={ {whiteSpace: 'nowrap', overflow: 'hidden'} }><Link component={RouterLink} to={`./${nodeId}/profile/${profile.id}`}>{profile.name}</Link></span>
                  </TableCell>
                  );
                })}
              
              <TableCell className={clsx(classes.head, classes.stickyTop, classes.stickyLeftTopZIndex, {[classes['stickyRight'+indicatorLength]]:fixedTotal})} >
              </TableCell>
              <TableCell colSpan={indicatorLength-1} className={clsx(classes.head, classes.stickyTop, classes.stickyLeftTopZIndex, {[classes.stickyRight]:fixedTotal})} >
                Итого (
                <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={fixedTotal}
                        onChange={(e) => setFixedTotal(e.target.checked)}
                      />
                    }
                    label="закрепить колонку"
                  />)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={`${classes.head} ${classes.stickyTopSecond} ${classes.stickyLeft} ${classes.stickyLeftTopZIndex}`} >
              </TableCell>
              <TableCell className={`${classes.head} ${classes.stickyTopSecond} ${classes.stickyLeftSecond} ${classes.stickyLeftTopZIndex}`} >
                Медицинская организация
              </TableCell>
              {profiles.map((profile) => {
                return (
                    <React.Fragment key={profile.id}>
                      {indicators.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center" className={`${classes.head} ${classes.stickyTopSecond}`} >
                                  {indicator.name}
                              </TableCell>
                            )
                      })}
                    </React.Fragment>
                );
              })}
              <React.Fragment>
                  {indicators.map((indicator, index) => {
                        return (
                          <TableCell key={indicator.id} align="center" className={clsx(classes.head, classes.stickyTopSecond, classes.stickyLeftTopZIndex, {[classes['stickyRight'+(indicatorLength-index)]]:fixedTotal})} >
                              {indicator.name}
                          </TableCell>
                        )
                  })}
              </React.Fragment>
            </TableRow>
          </TableHead>
          <TableBody>
            {mo.map((medOrg) => {
              return (
                <StyledTableRow key={medOrg.id}>
                  <TableCell align="left" className={`${classes.cell} ${classes.stickyLeft}`} >
                      {medOrg.order}
                  </TableCell>
                  <TableCell align="left" className={`${classes.cell} ${classes.stickyLeftSecond}`} >
                    <Tooltip title={medOrg.name} disableInteractive>
                      <Typography>
                        {medOrg.short_name}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  {profiles.map((profile) => {
                    return (
                      <React.Fragment key={profile.id}>
                      {indicators.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center" className={classes.cell}>
                                <TotalValueField 
                                    moIds={[medOrg.id]}
                                    profileId={profile.id}
                                    indicatorId={indicator.id}
                                    periodIds={periodIds}
                                />

                              </TableCell>
                            );
                      })}
                      </React.Fragment>
                    );
                  })}
                  <React.Fragment>
                  {indicators.map((indicator, index) => {
                        return (
                          <TableCell key={indicator.id} align="center" className={clsx(classes.cell, {[classes['stickyRight'+(indicatorLength-index)]]:fixedTotal})} >
                            <TotalValueField 
                                moIds={[medOrg.id]}
                                indicatorId={indicator.id}
                                periodIds={periodIds}
                            />
                          </TableCell>
                        )
                  })}
                  </React.Fragment>
                </StyledTableRow>
              );
            })}
            {/* ИТОГО */}
            <StyledTableRow>
                  <TableCell align="left" className={`${classes.cell} ${classes.stickyLeft}`} ></TableCell>
                  <TableCell align="left" className={`${classes.cell} ${classes.stickyLeftSecond}`} >
                      <Typography>ИТОГО:</Typography>
                  </TableCell>
                  {profiles.map((profile) => {
                    return (
                      <React.Fragment key={profile.id}>
                      {indicators.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center" className={classes.cell}>
                                <TotalValueField 
                                    moIds={moIds}
                                    profileId={profile.id}
                                    indicatorId={indicator.id}
                                    periodIds={periodIds}
                                />
                              </TableCell>
                            );
                      })}
                      </React.Fragment>
                    );
                  })}
                  <React.Fragment>
                  {indicators.map((indicator, index) => {
                        return (
                          <TableCell key={indicator.id} align="center" className={clsx(classes.cell, {[classes['stickyRight'+(indicatorLength-index)]]:fixedTotal})} >
                            <TotalValueField
                                moIds={moIds}
                                indicatorId={indicator.id}
                                periodIds={periodIds}
                            />
                          </TableCell>
                        )
                  })}
                  </React.Fragment>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default React.memo(MainTable);