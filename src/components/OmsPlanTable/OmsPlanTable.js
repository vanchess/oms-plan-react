import React from 'react';
import clsx from 'clsx';
import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Checkbox,
    Tooltip,
    Typography,
    Link
} from '@mui/material';

import PushPinIcon from '@mui/icons-material/PushPin';

import OmsPlanTableRow from "./OmsPlanTableRow";
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import TotalValueField from './TotalValueField';
import ValueField from './ValueField';

function OmsPlanTable(props) {
    const [fixedTotal, setFixedTotal] = useState(true);
    const { columnDefs, rowDefs, controlPanel, onKeyDown, variant, totalFilter } = props;
console.log('OmsPlanTable')
    const indicators = [];
    const moIds = [];
    let moDepartmentIds = null;
    columnDefs.map((c) => {
        c.children.map((ind) => {
            indicators[ind.id] = ind;
        });
    });
    rowDefs.map((r) => {
      moIds[r.moId] = r.moId;
      if (r.moDepartmentId) {
        if (moDepartmentIds === null) {
          moDepartmentIds = [];
        }
        moDepartmentIds[r.moDepartmentId] = r.moDepartmentId;
      }
    });

    indicators.sort((a,b) => a.order - b.order);

    const indicatorLength = indicators.length;

    return (
      <Table onKeyDown={onKeyDown}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                  { controlPanel }
              </TableCell>
              {columnDefs.map((colDef) => {
                return (
                  <TableCell align="center" colSpan={colDef.children.length} key={colDef.id}>
                        { colDef.head || ( colDef.link ? (
                            <div style={ {whiteSpace: 'nowrap', overflow: 'hidden'} }>
                              <Link component={RouterLink} to={colDef.link}>
                                {colDef.name}
                              </Link>
                            </div>
                          ) : 
                            <span style={ {whiteSpace: 'nowrap', overflow: 'hidden'} }>{colDef.name}</span>
                          )
                        }
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
              {columnDefs.map((colDef) => {
                return (
                    <React.Fragment key={colDef.id}>
                      {colDef.children.map((indicator) => {
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
            {rowDefs.map((rowDef, index) => {
              return (
                <OmsPlanTableRow key={rowDef.id} >
                  <TableCell align="left">
                      {index+1}
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip title={rowDef.name} disableInteractive>
                      <Typography>
                        {rowDef.short_name ?? rowDef.name}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  {columnDefs.map((colDef) => {
                    return (
                      <React.Fragment key={colDef.id}>
                      {colDef.children.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center" >
                                {(variant==='summary') ?
                                (
                                <TotalValueField 
                                    moIds={[rowDef.moId]}
                                    moDepartmentIds={rowDef.moDepartmentId ? [rowDef.moDepartmentId] : null}
                                    profileId={colDef.profileId}
                                    careProfileId={colDef.careProfileId}
                                    assistanceTypeId={colDef.assistanceTypeId}
                                    serviceId={colDef.serviceId}
                                    indicatorId={indicator.id}
                                />
                                ) :
                                (<ValueField 
                                    moId={rowDef.moId}
                                    moDepartmentId={rowDef.moDepartmentId}
                                    profileId={colDef.profileId}
                                    careProfileId={colDef.careProfileId}
                                    assistanceTypeId={colDef.assistanceTypeId}
                                    serviceId={colDef.serviceId}
                                    vmpGroupId={colDef.vmpGroupId}
                                    vmpTypeId={colDef.vmpTypeId}
                                    indicatorId={indicator.id}
                                />)
                                }
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
                                moIds={[rowDef.moId]}
                                moDepartmentIds={rowDef.moDepartmentId ? [rowDef.moDepartmentId] : null}
                                indicatorId={indicator.id}
                                careProfileId={totalFilter && totalFilter.careProfileId}
                            />
                          </TableCell>
                        )
                  })}
                  </React.Fragment>
                </OmsPlanTableRow>
              );
            })}
            {/* ИТОГО */}
            <TableRow>
                  <TableCell align="left" />
                  <TableCell align="left">
                      <Typography>ИТОГО:</Typography>
                  </TableCell>
                  {columnDefs.map((colDef) => {
                    return (
                      <React.Fragment key={colDef.id}>
                      {colDef.children.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center">
                                <TotalValueField 
                                    moIds={moIds}
                                    moDepartmentIds={moDepartmentIds}
                                    profileId={colDef.profileId}
                                    careProfileId={colDef.careProfileId}
                                    assistanceTypeId={colDef.assistanceTypeId}
                                    serviceId={colDef.serviceId}
                                    vmpGroupId={colDef.vmpGroupId}
                                    vmpTypeId={colDef.vmpTypeId}
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
                                moDepartmentIds={moDepartmentIds}
                                indicatorId={indicator.id}
                                careProfileId={totalFilter && totalFilter.careProfileId}
                            />
                          </TableCell>
                        )
                  })}
                  </React.Fragment>
            </TableRow>
          </TableBody>
      </Table>
    );
}

export default React.memo(OmsPlanTable);