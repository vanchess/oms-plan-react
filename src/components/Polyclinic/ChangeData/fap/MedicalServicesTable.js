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

import MedicalServicesDialog from '../MedicalServicesDialog';
import ValueField from '../../../Hospital/ChangeData/ValueField';
import TotalValueField from '../../../Hospital/ChangeData/TotalValueField';
import {
  useParams
} from "react-router-dom";

import { indicatorForNodeIsLoadingSelector, indicatorsForSelectedNodeSelector, selectedNodeIdSelector, selectedYearSelector } from '../../../../store/nodeData/nodeDataSelectors';

import { useLocation, useHistory } from "react-router-dom";
import { periodIdsByYearSelector, periodsSelector } from "../../../../store/period/periodSelectors";
import { DateTime } from "../../../../_helpers/dateTime";
import { selectedMoIdSelector } from "../../../../store/nodeData/nodeDataSelectors";
import { medicalServiceByIdSelector } from "../../../../store/medicalServices/medicalServicesSelectors";
import { moDepartmentsArrByMoIdSelector } from "../../../../store/moDepartment/moDepartmentSelectors";
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

const ProfileTable = (props) => {

  const [fixedTotal, setFixedTotal] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [isOpenServiceDialog, setIsOpenServiceDialog] = useState(false);
  const classes = useStyles();

  const location = useLocation();
  const history = useHistory();
  
  const handleCloseServiceDialog = (serviceId) => {
      setIsOpenServiceDialog(false);
      
      if(serviceId) {
        history.push(`./${serviceId}`);
      }
  };
  const openServiceDialog = () => setIsOpenServiceDialog(true);

  let { moId, serviceId } = useParams();
  moId = Number(moId);
  serviceId = Number(serviceId);
  const nodeId = useSelector(selectedNodeIdSelector);
  const profile = useSelector((store) => medicalServiceByIdSelector(store, serviceId));
  const indicators = useSelector(indicatorsForSelectedNodeSelector);
  const year = useSelector(store => selectedYearSelector(store));
  const periods = useSelector(periodsSelector);
  const periodIds = useSelector(store => periodIdsByYearSelector(store, year));
  const moDepartments = useSelector((state) => moDepartmentsArrByMoIdSelector(state,moId));
  const moDepartmentsIds = moDepartments ? moDepartments.map(depatment => depatment.id) : null;

  const isLoading = useSelector((store) => {
    return (
      plannedIndicatorChangeItemsIsLoadingSelector(store) 
      || indicatorForNodeIsLoadingSelector(store, nodeId)
    )
  });

  console.log('Polycl Change FapServices 0');
  if (isLoading || !indicators === 0 || !moDepartments || periodIds.length === 0 || Object.keys(periods).length === 0 || !profile || !moId) {
      return (
        <div>
          <LinearProgress />
          <Link component="button" variant="body2" onClick={openServiceDialog}>(выбрать услугу)</Link>
        </div>
      );
  }
  console.log('Polycl Change FapServices 1');

  const indicatorLength = indicators.length;

  return (
    <div>
      <MedicalServicesDialog open={isOpenServiceDialog} onClose={handleCloseServiceDialog} />
      
      {profile.name} <Link component="button" variant="body2" onClick={openServiceDialog}>(выбрать услугу)</Link>
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
                Итого&nbsp;
                <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={fixedTotal}
                        onChange={(e) => setFixedTotal(e.target.checked)}
                      />
                    }
                    label=""
                  />
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
            {moDepartments.map((department) => {
              return (
                <StyledTableRow key={department.id}>
                  <TableCell align="left" className={`${classes.cell} ${classes.stickyLeft}`} >
                      {department.order}
                  </TableCell>
                  <TableCell align="left" className={`${classes.cell} ${classes.stickyLeftSecond}`} >
                    <Tooltip title={department.name}>
                      <Typography>
                        {department.name.replace('Фельдшерско-акушерский пункт','ФАП').replace('Фельдшерский пункт','ФП')}
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
                                    moId={moId}
                                    moDepartmentId={department.id}
                                    serviceId={profile.id}
                                    indicatorId={indicator.id}
                                    periodId={periodId}
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
                                moIds={[moId]}
                                moDepartmentIds={[department.id]}
                                serviceId={profile.id}
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
                  {periodIds.map((periodId) => {
                    return (
                      <React.Fragment key={periodId}>
                      {indicators.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center" className={classes.cell}>
                                <TotalValueField 
                                    moIds={[moId]}
                                    moDepartmentIds={moDepartmentsIds}
                                    serviceId={profile.id}
                                    indicatorId={indicator.id}
                                    periodIds={[periodId]}
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
                                moIds={[moId]}
                                moDepartmentIds={moDepartmentsIds}
                                serviceId={profile.id}
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

export default React.memo(ProfileTable);