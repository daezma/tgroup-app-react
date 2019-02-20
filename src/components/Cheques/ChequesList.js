import React from 'react';
import { Button } from '@material-ui/core';
const ChequesList = props => {
  return (
    <table>
      <tbody>
        {props.cheques.map(cheque => (
          <tr key={cheque.numero}>
            <td>{cheque.numero}</td>
            <td>{cheque.importe}</td>
            <td>
              <Button onClick={() => props.click(cheque.numero)}>Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ChequesList;
