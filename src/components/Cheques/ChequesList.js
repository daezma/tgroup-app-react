import React from 'react';
import { Button } from '@material-ui/core';
const ChequesList = props => {
  return (
    <table>
      <tbody>
        {props.cheques.map(cheque => (
          <tr key={cheque.NUMERO}>
            <td>{cheque.NUMERO}</td>
            <td>{cheque.IMPORTE}</td>
            <td>
              <Button onClick={() => props.click(cheque.NUMERO)}>Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ChequesList;
