import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RecVenStep1 from './RecVenStep1';
import { observer, inject } from 'mobx-react';
import RecVenStep2 from './RecVenStep2';
import RecVenStep3 from './RecVenStep3';
import DialogSnack from '../../ui/DialogSnack';

const styles = theme => ({
  root: {
    width: '90%'
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return ['Datos del recibo', 'Forma de pago', 'Confirmación'];
}

function getStepContent(step) {
  switch (step) {
    case 1:
      return 'Ingrese los datos del cliente';
    case 2:
      return 'Cómo abona?';
    case 3:
      return 'Verifique que todo esté OK';
    default:
      return 'Unknown';
  }
}

const RecVen = inject('recven', 'penven')(
  observer(
    class RecVen extends Component {
      state = {
        activeStep: 1
      };

      handleNext = () => {
        const { activeStep } = this.state;
        if (this.validaciones()) {
          this.setState({
            activeStep: activeStep + 1
          });
        }

        if (activeStep === 3) {
          //TODO: cargar recibo
        }
      };

      handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1
        }));
      };

      handleReset = () => {
        this.setState({
          activeStep: 1
        });
      };

      validaciones = () => {
        let error = '';
        const { activeStep } = this.state;
        const { recven, penven } = this.props;
        if (activeStep === 1) {
          if (recven.saldo + penven.SaldoImp <= 0) {
            error = 'El importe del recibo debe ser mayor a 0';
          }
          if (recven.fk_erp_empresas === '') {
            error = 'El campo empresa debe contener un valor';
          }
        }
        if (activeStep === 2) {
          if (+recven.importeRestanteCuentas > 0) {
            error = `Faltan imputar $${recven.importeRestanteCuentas} a alguna cuenta de tesorería`;
          } else if (+recven.importeRestanteCuentas < 0) {
            error = `No se puede continuar porque se imputaron en las cuentas de tesorería $${+recven.importeRestanteCuentas *
              -1} más que el importe del recibo`;
          }
        }
        if (error === '') {
          recven.Error('');
          return true;
        } else {
          recven.Error(error);
          return false;
        }
      };

      render() {
        const steps = getSteps();
        const { activeStep } = this.state;
        const { recven } = this.props;
        let StepActivo;
        if (activeStep === 1) StepActivo = <RecVenStep1 />;
        else if (activeStep === 2) StepActivo = <RecVenStep2 />;
        else StepActivo = <RecVenStep3 />;

        return (
          <div>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const props = {};
                const labelProps = {};
                return (
                  <Step key={label} {...props}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {StepActivo}
            <div>
              {activeStep === steps.length + 1 ? (
                <div>
                  <Typography>Generación de recibos</Typography>
                  <Button onClick={this.handleReset}>Reiniciar</Button>
                </div>
              ) : (
                <div>
                  <Typography>{getStepContent(activeStep)}</Typography>
                  <div>
                    <Button disabled={activeStep === 1} onClick={this.handleBack}>
                      Anterior
                    </Button>
                    <Button variant='contained' color='primary' onClick={this.handleNext}>
                      {activeStep === steps.length ? 'Finalizar' : 'Siguiente'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <DialogSnack open={recven.error !== ''} handleClose={() => recven.Error('')} msg={recven.error} />
          </div>
        );
      }
    }
  )
);

export default withStyles(styles)(RecVen);
