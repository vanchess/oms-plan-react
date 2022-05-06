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
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import CareProfileDialog from '../../vmp/CareProfileDialog';
import TotalValueField from '../TotalValueField';
import {
  useParams
} from "react-router-dom";

import { indicatorsForSelectedNodeSelector, selectedNodeIdSelector } from '../../../../store/nodeData/nodeDataSelectors';
import { plannedIndicatorsWhereSelector } from '../../../../store/plannedIndicator/plannedIndicatorSelectors'
import { vmpGroupsSelector, vmpGroupsSelectorIsLoadingSelector } from "../../../../store/vmpGroups/vmpGroupsSelectors";
import { vmpTypesIsLoadingSelector, vmpTypesSelector } from "../../../../store/vmpTypes/vmpTypesSelectors";
import { useLocation, useHistory } from "react-router-dom";
import { periodIdsByYearSelector } from '../../../../store/period/periodSelectors';
import { selectedYearSelector } from '../../../../store/nodeData/nodeDataSelectors';

import { Link as RouterLink } from 'react-router-dom';
import { careProfileById } from "../../../../store/careProfiles/careProfilesSelectors";
import { moArrSelector, moIdsSelector } from "../../../../store/mo/moSelectors";
import { plannedIndicatorChangeItemsIsLoadingSelector } from "../../../../store/plannedIndicatorChange/plannedIndicatorChangeSelectors";

const firstHeadHeight = 125;
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
  lineClamp: {
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',  
    overflow: 'hidden',
    marginBottom: 0,
  },
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

const MainTable = (props) => {

  const [fixedTotal, setFixedTotal] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [isOpenCareProfileDialog, setIsOpenCareProfileDialog] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  
  const handleCloseCareProfileDialog = (careProfileId) => {
      setIsOpenCareProfileDialog(false);
      
      if(careProfileId) {
        history.push(`./${careProfileId}`);
      }
  };
  const openCareProfileDialog = () => setIsOpenCareProfileDialog(true);

  let { careProfileId } = useParams();
  careProfileId = Number(careProfileId);
  const mo = useSelector(moArrSelector);
  const moIds = useSelector(moIdsSelector);
  const careProfile = useSelector((store) => careProfileById(store, careProfileId));
  const indicators = useSelector(indicatorsForSelectedNodeSelector);
  const selectedNodeId = useSelector(selectedNodeIdSelector);
  const vmpGroups = useSelector(vmpGroupsSelector);
  const vmpTypes = useSelector(vmpTypesSelector);
  const year = useSelector(store => selectedYearSelector(store));
  const periodIds = useSelector(store => periodIdsByYearSelector(store, year));

  const changeIsLoading = useSelector(plannedIndicatorChangeItemsIsLoadingSelector);
  const vmpGroupsIsLoading = useSelector(vmpGroupsSelectorIsLoadingSelector);
  const vmpTypesIsLoading = useSelector(vmpTypesIsLoadingSelector);
  const isLoading = changeIsLoading || vmpGroupsIsLoading || vmpTypesIsLoading;

  let plannedIndicatorIds = useSelector((store) => plannedIndicatorsWhereSelector(store, {nodeId:selectedNodeId, careProfileId}));
  plannedIndicatorIds = plannedIndicatorIds.filter((val,i,arr) => {
    const firstIndex = arr.findIndex(v => {
      return v.vmp_type_id === val.vmp_type_id && v.vmp_group_id === val.vmp_group_id;
    });
    return firstIndex === i;
  });

  console.log('M0');
  if (isLoading 
        || !indicators
        || mo.length === 0
        || plannedIndicatorIds.length === 0
        || Object.keys(vmpTypes).length === 0
        || Object.keys(vmpGroups).length === 0
        || periodIds.length === 0
        || !careProfile
  ) {
      return (
        <div>
          <LinearProgress />
          <Link component="button" variant="body2" onClick={openCareProfileDialog}>(выбрать профиль)</Link>
        </div>);
  }
  console.log('M3');
  const indicatorLength = indicators.length;

  return (
    <div>
      <CareProfileDialog open={isOpenCareProfileDialog} onClose={handleCloseCareProfileDialog} />
      
      {careProfile.name} <Link component="button" variant="body2" onClick={openCareProfileDialog}>(выбрать профиль)</Link>
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
              {plannedIndicatorIds.map((pi) => {
                return (
                  <TableCell align="center" colSpan={indicatorLength} className={`${classes.head} ${classes.stickyTop}`} key={pi.id}>
                      <div className={classes.stickyTopDiv} >
                        <Link component={RouterLink} to={`./${careProfileId}/group/${pi.vmp_group_id}/type/${pi.vmp_type_id}`}>
                          <Tooltip title={vmpTypes[pi.vmp_type_id].name} disableInteractive>
                            <p className={`${classes.lineClamp} ${classes.noMargin}`} >
                              { vmpTypes[pi.vmp_type_id].name }
                            </p>
                          </Tooltip>
                          <p className={ classes.noMargin } >(Номер группы ВМП: { vmpGroups[pi.vmp_group_id].code })</p>
                        </Link>
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
              {plannedIndicatorIds.map((pi) => {
                return (
                    <React.Fragment key={pi.id}>
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
                  {plannedIndicatorIds.map((pi) => {
                    return (
                      <React.Fragment key={pi.id}>
                      {indicators.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center" className={classes.cell}>
                                <TotalValueField 
                                    moIds={[medOrg.id]}
                                    careProfileId={careProfile.id}
                                    indicatorId={indicator.id}
                                    vmpGroupId={pi.vmp_group_id}
                                    vmpTypeId={pi.vmp_type_id}
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
                                careProfileId={careProfile.id}
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
                  {plannedIndicatorIds.map((pi) => {
                    return (
                      <React.Fragment key={pi.id}>
                      {indicators.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center" className={classes.cell}>
                                <TotalValueField 
                                    moIds={moIds}
                                    careProfileId={careProfile.id}
                                    indicatorId={indicator.id}
                                    vmpGroupId={pi.vmp_group_id}
                                    vmpTypeId={pi.vmp_type_id}
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
                                careProfileId={careProfile.id}
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