import React from 'react';
//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// const styles = theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing.unit * 3,
//     overflowX: 'auto'
//   },
//   table: {
//     minWidth: 700
//   }
// });

const SimpleTable = ({ data }) => {
  const rows = data;

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Empresa</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Nro</TableCell>
            <TableCell>Importe</TableCell>
            <TableCell>Saldo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.ID}>
                <TableCell component='th' scope='row'>
                  {row.FK_ERP_EMPRESAS}
                </TableCell>
                <TableCell>{row.FECHA}</TableCell>
                <TableCell>{row.FK_ERP_COM_VEN}</TableCell>
                <TableCell numeric>{row.IMPORTE}</TableCell>
                <TableCell numeric>{row.SALDO}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

// SimpleTable.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default SimpleTable;
