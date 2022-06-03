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
// import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import ValueField from '../../ValueField';
import TotalValueField from '../../TotalValueField';

import { 
  indicatorForNodeIsLoadingSelector,
  indicatorsForSelectedNodeSelector, 
  medicalAssistanceTypesArrForSelectedNodeSelector,
  medicalServicesArrForSelectedNodeSelector,
  selectedNodeIdSelector,  
} from '../../../store/nodeData/nodeDataSelectors';
import { initialDataIsLoadingSelector } from "../../../store/initialData/initialDataSelectors";
import { medicalServicesIsLoadingSelector } from "../../../store/medicalServices/medicalServicesSelectors";
import { medicalAssistanceTypesIsLoadingSelector } from "../../../store/medicalAssistanceType/medicalAssistenceTypeSelectors";
import { useParams } from "react-router-dom";
import { moDepartmentsArrByMoIdSelector } from "../../../store/moDepartment/moDepartmentSelectors";

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
    paddingLeft: 10,
    paddingRight: 10,
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
    paddingLeft: 2,
    paddingRight: 2,
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
  let { moId } = useParams();
  moId = Number(moId);

  const [fixedTotal, setFixedTotal] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const classes = useStyles();

  const nodeId = useSelector(selectedNodeIdSelector);
  const moDepartments = useSelector((state) => moDepartmentsArrByMoIdSelector(state,moId));
  const moDepartmentsIds = moDepartments ? moDepartments.map(depatment => depatment.id) : null;
  const assistanceTypes = useSelector(medicalAssistanceTypesArrForSelectedNodeSelector);
  const medicalServices = useSelector(medicalServicesArrForSelectedNodeSelector);
  const indicators = useSelector(indicatorsForSelectedNodeSelector);

  const isLoading = useSelector((store) => {
    return (
      initialDataIsLoadingSelector(store) 
      || medicalAssistanceTypesIsLoadingSelector(store, nodeId)
      || medicalServicesIsLoadingSelector(store, nodeId)
      || indicatorForNodeIsLoadingSelector(store, nodeId)
    )
  });

  console.log('Polycl Int Fap 0');
  if (isLoading || !indicators || !moDepartments || (!assistanceTypes && !medicalServices)) {
      return (<div><LinearProgress /></div>);
  }
  console.log('Polycl Int Fap 1');
    
  const indicatorLength = indicators.length;
    
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
              {assistanceTypes.map((profile) => {
                return (
                  <TableCell align="center" colSpan={indicatorLength} className={`${classes.head} ${classes.stickyTop}`} key={profile.id}>
                      <span style={ {whiteSpace: 'nowrap', overflow: 'hidden'} }>{profile.name}</span>
                  </TableCell>
                  );
                })}
              {medicalServices.map((profile) => {
                return (
                  <TableCell align="center" colSpan={indicatorLength} className={`${classes.head} ${classes.stickyTop}`} key={profile.id}>
                      <span style={ {whiteSpace: 'nowrap', overflow: 'hidden'} }>{profile.name}</span>
                  </TableCell>
                  );
                })}
              <TableCell align="center" colSpan={indicatorLength} className={clsx(classes.head, classes.stickyTop, classes.stickyLeftTopZIndex, {[classes.stickyRight]:fixedTotal})} >
                Итого 
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
                ФАП
              </TableCell>
              {assistanceTypes.map((profile) => {
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
              {medicalServices.map((profile) => {
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
            {moDepartments.map((department) => {
              return (
                <StyledTableRow key={department.id}>
                  <TableCell align="left" className={`${classes.cell} ${classes.stickyLeft}`} >
                      {department.order}
                  </TableCell>
                  <TableCell align="left" className={`${classes.cell} ${classes.stickyLeftSecond}`} >
                    <Tooltip title={department.name} disableInteractive>
                      <Typography>
                        {department.name.replace('Фельдшерско-акушерский пункт','ФАП').replace('Фельдшерский пункт','ФП')}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  {assistanceTypes.map((profile) => {
                    return (
                      <React.Fragment key={profile.id}>
                      {indicators.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center" className={classes.cell}>
                                <ValueField 
                                    moId={moId}
                                    moDepartmentId={department.id}
                                    assistanceTypeId={profile.id}
                                    indicatorId={indicator.id}
                                />

                              </TableCell>
                            );
                      })}
                      </React.Fragment>
                    );
                  })}
                  {medicalServices.map((profile) => {
                    return (
                      <React.Fragment key={profile.id}>
                      {indicators.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center" className={classes.cell}>
                                <ValueField 
                                    moId={moId}
                                    moDepartmentId={department.id}
                                    serviceId={profile.id}
                                    indicatorId={indicator.id}
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
                                indicatorId={indicator.id}
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
                  {assistanceTypes.map((profile) => {
                    return (
                      <React.Fragment key={profile.id}>
                      {indicators.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center" className={classes.cell}>
                                <TotalValueField 
                                    moIds={[moId]}
                                    moDepartmentIds={moDepartmentsIds}
                                    assistanceTypeId={profile.id}
                                    indicatorId={indicator.id}
                                />
                              </TableCell>
                            );
                      })}
                      </React.Fragment>
                    );
                  })}
                  {medicalServices.map((profile) => {
                    return (
                      <React.Fragment key={profile.id}>
                      {indicators.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center" className={classes.cell}>
                                <TotalValueField 
                                    moIds={[moId]}
                                    moDepartmentIds={moDepartmentsIds}
                                    serviceId={profile.id}
                                    indicatorId={indicator.id}
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
                                indicatorId={indicator.id}
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