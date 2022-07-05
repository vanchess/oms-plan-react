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

import ValueField from './ValueField';
import TotalValueField from './TotalValueField';
import OmsPlanTableRow from "./OmsPlanTableRow";
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

function OmsPlanTable(props) {
    const [fixedTotal, setFixedTotal] = useState(true);
    const { columnDefs, mo, moIds, controlPanel, onKeyDown, variant, totalFilter } = props;
console.log('OmsPlanTable')
    const indicators = [];
    columnDefs.map((c) => {
            c.children.map((ind) => {
                indicators[ind.id] = ind;
            });
        }
    );

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
                            colDef.name
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
            {mo.map((medOrg) => {
              return (
                <OmsPlanTableRow key={medOrg.id} >
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
                  {columnDefs.map((colDef) => {
                    return (
                      <React.Fragment key={colDef.id}>
                      {colDef.children.map((indicator) => {
                            return (
                              <TableCell key={indicator.id} align="center" >
                                {(variant==='summary') ?
                                (
                                <TotalValueField 
                                    moIds={[medOrg.id]}
                                    profileId={colDef.profileId}
                                    careProfileId={colDef.careProfileId}
                                    indicatorId={indicator.id}
                                />
                                ) :
                                (<ValueField 
                                    moId={medOrg.id}
                                    profileId={colDef.profileId}
                                    careProfileId={colDef.careProfileId}
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
                                moIds={[medOrg.id]}
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
                                    profileId={colDef.profileId}
                                    careProfileId={colDef.careProfileId}
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