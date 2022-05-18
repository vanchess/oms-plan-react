import React, { useState } from "react";
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
} from "@mui/material";

import styled from "@emotion/styled";

import Checkbox from '@mui/material/Checkbox';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import PushPinIcon from '@mui/icons-material/PushPin';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import ValueField from './ValueField';
import TotalValueField from './TotalValueField';
import OmsPlanTable from "../OmsPlanTable";

import { 
  indicatorsForSelectedNodeSelector, 
  hospitalBedProfilesForSelectedNodeSelector, 
  selectedNodeIdSelector, 
  indicatorForNodeIsLoadingSelector, 
  hospitalBedProfilesForNodeIsLoadingSelector 
} from '../../store/nodeData/nodeDataSelectors';
import { moArrSelector, moIdsSelector } from "../../store/mo/moSelectors";
import { initialDataIsLoadingSelector } from "../../store/initialData/initialDataSelectors";

const firstHeadHeight = 25;
const leftColWidth = 20;
const rightColWidth = 120;

const TableRowStyled = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: ${({theme}) => theme.palette.action.hover};
  }
  &:hover td.MuiTableCell-root {
    background-color: ${({theme}) => theme.palette.grey[400]};
  }
  &.active td.MuiTableCell-root {
    background-color: ${({theme}) => theme.palette.primary.light};
    /* font-weight: 500; */
  }
`

const MainTable = (props) => {

  const [fixedTotal, setFixedTotal] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  
  const setActiveRow = (e) => {
    const row = e.target.closest('tr');
    const rowCollection = row.parentElement.children;
    for(let i = 0; i < rowCollection.length; i++)
    {
      rowCollection[i].classList.remove("active");
    }
    row.classList.add("active");
  }

  const nodeId = useSelector(selectedNodeIdSelector);
  const mo = useSelector(moArrSelector);
  const moIds = useSelector(moIdsSelector);
  const profiles = useSelector(hospitalBedProfilesForSelectedNodeSelector);
  const indicators = useSelector(indicatorsForSelectedNodeSelector);

  const isLoading = useSelector((store) => {
    return (
      initialDataIsLoadingSelector(store) 
      || hospitalBedProfilesForNodeIsLoadingSelector(store, nodeId)
      || indicatorForNodeIsLoadingSelector(store, nodeId)
    )
  });

  console.log('M0');

  if (isLoading || !indicators || mo.length === 0 || !profiles) {
      return (<div><LinearProgress /></div>);
  }
  console.log('MИ3');

  const indicatorLength = indicators.length;

  return (
    <div>
        <OmsPlanTable aria-label="sticky table" className={clsx({'FullScreen':fullScreen})} leftColWidth={leftColWidth} rightColWidth={rightColWidth} topRowHeight={firstHeadHeight}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
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
                  <TableCell align="center" colSpan={indicatorLength} key={profile.id}>
                      <span style={ {whiteSpace: 'nowrap', overflow: 'hidden'} }>{profile.name}</span>
                  </TableCell>
                  );
                })}
              <TableCell colSpan={indicatorLength} className={clsx({'stickyRight':fixedTotal})} align="center" >
                <Tooltip title={`${fixedTotal?'Открепить':'Закрепить'} столбец`} disableInteractive>
                    <Checkbox
                      size="small"
                      icon={<PushPinIcon />}
                      checkedIcon={<PushPinIcon />}
                      checked={fixedTotal}
                      onChange={(e) => setFixedTotal(e.target.checked)}
                      color='secondary'
                    />
                </Tooltip>    
                Итого
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell>
                Медицинская организация
              </TableCell>
              {profiles.map((profile) => {
                return (
                    <React.Fragment key={profile.id}>
                      {indicators.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center" >
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
                          <TableCell key={indicator.id} align="center" className={clsx({'stickyRight':fixedTotal})} >
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
                <TableRowStyled key={medOrg.id} onClick={setActiveRow}>
                  <TableCell align="left">
                      {medOrg.order}
                  </TableCell>
                  <TableCell align="left">
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
                              <TableCell key={indicator.id} align="center" >
                                <ValueField 
                                    moId={medOrg.id}
                                    profileId={profile.id}
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
                          <TableCell key={indicator.id} align="center" className={clsx({'stickyRight':fixedTotal})} >
                            <TotalValueField 
                                moIds={[medOrg.id]}
                                indicatorId={indicator.id}
                            />
                          </TableCell>
                        )
                  })}
                  </React.Fragment>
                </TableRowStyled>
              );
            })}
            {/* ИТОГО */}
            <TableRow>
                  <TableCell align="left" />
                  <TableCell align="left">
                      <Typography>ИТОГО:</Typography>
                  </TableCell>
                  {profiles.map((profile) => {
                    return (
                      <React.Fragment key={profile.id}>
                      {indicators.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center">
                                <TotalValueField 
                                    moIds={moIds}
                                    profileId={profile.id}
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
                          <TableCell key={indicator.id} align="center" className={clsx({'stickyRight':fixedTotal})} >
                            <TotalValueField
                                moIds={moIds}
                                indicatorId={indicator.id}
                            />
                          </TableCell>
                        )
                  })}
                  </React.Fragment>
            </TableRow>
          </TableBody>
        </OmsPlanTable>
    </div>
  );
};

export default React.memo(MainTable);