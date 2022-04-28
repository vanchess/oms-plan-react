import React, { useState } from "react";
import { useSelector } from 'react-redux'
import clsx from 'clsx';
import {
  makeStyles,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  withStyles,
  LinearProgress
} from "@material-ui/core";

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import CareProfileDialog from '../../vmp/CareProfileDialog';
import ValueField from '../ValueField';
import TotalValueField from '../TotalValueField';
import {
  useParams
} from "react-router-dom";

import { indicatorsForSelectedNodeSelector, selectedNodeIdSelector, selectedYearSelector } from '../../../../store/nodeData/nodeDataSelectors';

import { useLocation, useHistory } from "react-router-dom";
import { periodIdsByYearSelector, periodsSelector } from "../../../../store/period/periodSelectors";
import { DateTime } from "../../../../_helpers/dateTime";
import { vmpTypeByIdSelector } from "../../../../store/vmpTypes/vmpTypesSelectors";
import { vmpGroupByIdSelector } from "../../../../store/vmpGroups/vmpGroupsSelectors";
import { careProfileById } from "../../../../store/careProfiles/careProfilesSelectors";
import { moArrSelector, moIdsSelector } from "../../../../store/mo/moSelectors";
import { plannedIndicatorChangeItemsIsLoadingSelector } from "../../../../store/plannedIndicatorChange/plannedIndicatorChangeSelectors";

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
    maxHeight: `${firstHeadHeight}px`,
    position: "sticky",
    zIndex: theme.zIndex.appBar + 2
  },
  stickyTopDiv: {
    height: `${firstHeadHeight}px`,
    overflow: 'hidden',
  },
  /*
  lineClamp: {
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',  
    overflow: 'hidden',
    marginBottom: 0,
  },
  */
  noMargin: {
    margin: 0,
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

const PeriodTable = (props) => {

  const [fixedTotal, setFixedTotal] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [isOpenCareProfileDialog, setIsOpenCareProfileDialog] = useState(false);
  const classes = useStyles();

  const history = useHistory();
  
  const handleCloseCareProfileDialog = (careProfileId) => {
      setIsOpenCareProfileDialog(false);
      
      if(careProfileId) {
        goToProfileId(careProfileId);
      }
  };
  const goToProfileId = (profileId) => {
    history.push(`../../../../${profileId}`);
  }
  const openCareProfileDialog = () => setIsOpenCareProfileDialog(true);

  let { careProfileId } = useParams();
  careProfileId = Number(careProfileId);
  let { vmpGroupId } = useParams();
  vmpGroupId = Number(vmpGroupId);
  let { vmpTypeId } = useParams();
  vmpTypeId = Number(vmpTypeId);
  
  // const nodeId = useSelector(selectedNodeIdSelector);
  const vmpGroup = useSelector(store => vmpGroupByIdSelector(store, vmpGroupId));
  const vmpType = useSelector(store => vmpTypeByIdSelector(store, vmpTypeId));
  const mo = useSelector(moArrSelector);
  const moIds = useSelector(moIdsSelector);
  const profile = useSelector((store) => careProfileById(store, careProfileId));
  const indicators = useSelector(indicatorsForSelectedNodeSelector);
  const year = useSelector(store => selectedYearSelector(store));
  const periods = useSelector(periodsSelector);
  const periodIds = useSelector(store => periodIdsByYearSelector(store, year));

  const changeIsLoading = useSelector(plannedIndicatorChangeItemsIsLoadingSelector);
  const isLoading = changeIsLoading;

  console.log('M0');
  if (isLoading
        || !indicators
        || mo.length === 0
        || periodIds.length === 0
        || Object.keys(periods).length === 0
        || !profile
        || !vmpType
        || !vmpGroup
  ) {
      return (
        <div>
          <LinearProgress />
          <Link component="button" variant="body2" onClick={openCareProfileDialog}>(выбрать профиль)</Link>
        </div>
      );
  }
  console.log('M12');

  const indicatorLength = indicators.length;

  return (
    <div>
      <CareProfileDialog open={isOpenCareProfileDialog} onClose={handleCloseCareProfileDialog} />
      
      <p>
        <Link component="button" variant="body2" onClick={() => goToProfileId(careProfileId)}>{profile.name}</Link>&ensp;
        <Link component="button" variant="body2" onClick={openCareProfileDialog}>(выбрать профиль)</Link>
      </p>
      <p>{vmpType.name} (Номер группы ВМП: {vmpGroup.code})</p>
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
              {periodIds.map((periodId) => {
                return (
                  <TableCell align="center" colSpan={indicatorLength} className={`${classes.head} ${classes.stickyTop}`} key={periodId}>
                      <div className={classes.stickyTopDiv} >
                      <span style={ {whiteSpace: 'nowrap', overflow: 'hidden'} }>{ DateTime.toMonthString(periods[periodId].from) }</span>
                      </div>
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
              {periodIds.map((periodId) => {
                return (
                    <React.Fragment key={periodId}>
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
                    <Tooltip title={medOrg.name}>
                      <Typography>
                        {medOrg.short_name}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  {periodIds.map((periodId) => {
                    return (
                      <React.Fragment key={periodId}>
                      {indicators.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center" className={classes.cell}>
                                <ValueField 
                                    moId={medOrg.id}
                                    careProfileId={profile.id}
                                    indicatorId={indicator.id}
                                    periodId={periodId}
                                    vmpGroupId={vmpGroupId}
                                    vmpTypeId={vmpTypeId}
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
                                careProfileId={profile.id}
                                indicatorId={indicator.id}
                                periodIds={periodIds}
                                vmpGroupId={vmpGroupId}
                                vmpTypeId={vmpTypeId}
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
                  {periodIds.map((periodId) => {
                    return (
                      <React.Fragment key={periodId}>
                      {indicators.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center" className={classes.cell}>
                                <TotalValueField 
                                    moIds={moIds}
                                    careProfileId={profile.id}
                                    indicatorId={indicator.id}
                                    periodIds={[periodId]}
                                    vmpGroupId={vmpGroupId}
                                    vmpTypeId={vmpTypeId}
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
                                careProfileId={profile.id}
                                indicatorId={indicator.id}
                                periodIds={periodIds}
                                vmpGroupId={vmpGroupId}
                                vmpTypeId={vmpTypeId}
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

export default React.memo(PeriodTable);