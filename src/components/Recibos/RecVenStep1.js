import React, { Component } from 'react';
import { TextField, Paper } from '@material-ui/core';
import style from './RecVen.module.css';

export default class RecVenStep1 extends Component {
  render() {
    return (
      <Paper className={style.paper}>
        <div>
          <TextField
            required
            id='fecha'
            placeholder='Fecha'
            variant='outlined'
            margin='normal'
            type='date'
            value={null}
            // onChange={this.handleChangeLogin()}
          />
          <br />
          <TextField
            required
            id='fk_erp_empresas'
            autoFocus={true}
            placeholder='Empresa'
            variant='outlined'
            margin='normal'
            value={null}
            //onChange={this.handleChangeLogin()}
          />
          <br />
          <TextField
            required
            id='fk_erp_uni_neg'
            select
            label='Unidad de negocio'
            className={style.menu}
            value={null}
            //onChange={this.handleChange('B')}
            margin='normal'
          >
            {/* {bases.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))} */}
          </TextField>
          <br />
          <TextField
            required
            id='importe'
            placeholder='Importe'
            variant='outlined'
            margin='normal'
            type='number'
            value={null}
            //onChange={this.handleChangeLogin()}
          />
          <br />
          <TextField
            required
            id='observaciones'
            placeholder='Observaciones'
            variant='outlined'
            margin='normal'
            value={null}
            //onChange={this.handleChangeLogin()}
          />
        </div>
      </Paper>
    );
  }
}
