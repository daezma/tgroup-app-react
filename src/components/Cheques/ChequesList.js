import React from 'react';
import { Button } from '@material-ui/core';
const ChequesList = props => {
  return (
    <table style={{ marginLeft: '20px' }}>
      <tbody>
        {props.cheques.map(cheque => (
          <tr key={cheque.NUMERO2}>
            <td>Número: {cheque.NUMERO2}</td>
            <td>Importe: ${parseFloat(cheque.IMPORTE).toFixed(2)}</td>
            <td>
              <Button variant='outlined' color='secondary' onClick={() => props.click(cheque.NUMERO2)}>
                X
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ChequesList;
