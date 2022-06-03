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
} from '@mui/material';

import PushPinIcon from '@mui/icons-material/PushPin';

import ValueField from './ValueField';
import TotalValueField from './TotalValueField';
import OmsPlanTableRow from "./OmsPlanTableRow";
import { useState } from 'react';

export default function(props) {
    const [fixedTotal, setFixedTotal] = useState(true);
    const { columnDefs, mo, moIds, controlPanel, onKeyDown } = props;

    const indicators = [];
    columnDefs.map((c) => {
            c.children.map((ind) => {
                indicators[ind.id] = ind;
            });
        }
    );

    const indicatorLength = indicators.length;

    return (
      <Table onKeyDown={onKeyDown}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                  { controlPanel }
              </TableCell>
              {columnDefs.map((profile) => {
                return (
                  <TableCell align="center" colSpan={profile.children.length} key={profile.id}>
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
              {columnDefs.map((profile) => {
                return (
                    <React.Fragment key={profile.id}>
                      {profile.children.map((indicator) => {
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
                  {columnDefs.map((profile) => {
                    return (
                      <React.Fragment key={profile.id}>
                      {profile.children.map((indicator) => {
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
                </OmsPlanTableRow>
              );
            })}
            {/* ИТОГО */}
            <TableRow>
                  <TableCell align="left" />
                  <TableCell align="left">
                      <Typography>ИТОГО:</Typography>
                  </TableCell>
                  {columnDefs.map((profile) => {
                    return (
                      <React.Fragment key={profile.id}>
                      {profile.children.map((indicator) => {
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
      </Table>
    );
}