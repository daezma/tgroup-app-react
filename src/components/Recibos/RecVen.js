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
    case 0:
      return 'Ingrese los datos del cliente';
    case 1:
      return 'Cómo abona?';
    case 2:
      return 'Verifique que todo esté OK';
    default:
      return 'Unknown';
  }
}

const RecVen = inject('recven')(
  observer(
    class RecVen extends Component {
      state = {
        activeStep: 0
      };

      handleNext = () => {
        const { activeStep } = this.state;
        if (this.validaciones()) {
          this.setState({
            activeStep: activeStep + 1
          });
        }
      };

      handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1
        }));
      };

      handleReset = () => {
        this.setState({
          activeStep: 0
        });
      };

      validaciones = () => {
        //TODO: continuar con las validaciones
        let error = '';
        // const { activeStep } = this.state;
        // const { recven } = this.props;
        // if (activeStep === 0) {
        //   if (recven.saldo <= 0) {
        //     error = 'El campo importe debe ser mayor a 0';
        //   }
        //   if (recven.fk_erp_empresas === '') {
        //     error = 'El campo empresa debe contener un valor';
        //   }
        // }

        if (error !== '') {
          return true;
        } else return false;
      };

      render() {
        const steps = getSteps();
        const { activeStep } = this.state;
        let StepActivo;
        if (activeStep === 0) StepActivo = <RecVenStep1 />;
        else if (activeStep === 1) StepActivo = <RecVenStep2 />;
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
              {activeStep === steps.length ? (
                <div>
                  <Typography>All steps completed - you&apos;re finished</Typography>
                  <Button onClick={this.handleReset}>Reiniciar</Button>
                </div>
              ) : (
                <div>
                  <Typography>{getStepContent(activeStep)}</Typography>
                  <div>
                    <Button disabled={activeStep === 0} onClick={this.handleBack}>
                      Anterior
                    </Button>
                    <Button variant='contained' color='primary' onClick={this.handleNext}>
                      {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }
    }
  )
);

export default withStyles(styles)(RecVen);
