import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ComTesStep1 from './ComTesStep1';
import { observer, inject } from 'mobx-react';
import ComTesStep2 from './ComTesStep2';
import ComTesStep3 from './ComTesStep3';
import DialogSnack from '../../../ui/DialogSnack';
import { itsGetClassSimple, itsClassInsert } from '../../../api/itrisApiConnect';
import { CircularProgress } from '@material-ui/core';
import Done from '@material-ui/icons/Done';

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
  return ['Datos del comprobante', 'Forma de pago', 'Confirmación'];
}

function getStepContent(step) {
  switch (step) {
    case 1:
      return 'Ingrese los datos del comprobante';
    case 2:
      return 'Cómo abona?';
    case 3:
      return 'Verifique que todo esté OK';
    default:
      return 'Unknown';
  }
}

const ComTes = inject('comtes', 'login')(
  observer(
    class ComTes extends Component {
      state = {
        activeStep: 1
      };

      handleNext = async () => {
        const { comtes, login } = this.props;
        const { activeStep } = this.state;
        if (this.validaciones()) {
          this.setState({
            activeStep: activeStep + 1
          });
        }

        if (activeStep === 3) {
          comtes.Loading(true);
          try {
            const newCheques = [];
            for (const cheque of comtes.cheques) {
              const tmpCheque = { ...cheque };
              delete tmpCheque.descCuenta;
              if (!tmpCheque.ID) {
                tmpCheque.FK_ERP_BANCOS = parseInt(tmpCheque.FK_ERP_BANCOS);
                tmpCheque.IMPORTE = parseFloat(tmpCheque.IMPORTE);
                tmpCheque.NO_ALAORDEN = tmpCheque.NO_ALAORDEN === 'true';
                const responseCheque = await itsClassInsert(login.UserSession, 'ERP_CHE_TER', tmpCheque);
                if (responseCheque.data) {
                  tmpCheque.ID = responseCheque.data.data[0].ID;
                }
              }
              newCheques.push(tmpCheque);
            }
            comtes.Cheques(newCheques);
            const responseParam = await itsGetClassSimple(login.UserSession, '_APP_PARAMETROS');
            const tipCom = responseParam[0].FK_ERP_T_COM_VEN_REC;

            const data = {
              FECHA: comtes.fecha,
              FK_ERP_T_COM_VEN: tipCom,
              FK_ERP_EMPRESAS: comtes.fk_erp_empresas,
              OBSERVACIONES: comtes.observaciones,
              FK_ERP_UNI_NEG: comtes.fk_erp_uni_neg,
              ERP_DET_TES: [
                {
                  FK_ERP_CUE_TES: responseParam[0].FK_ERP_CUE_TES,
                  TIPO: 'H',
                  UNIDADES: parseFloat(parseFloat(comtes.saldo).toFixed(2))
                },
                ...comtes.list_medios_cobro
                  .filter(medio => medio.saldo && medio.tipo !== 'V')
                  .map(medio => {
                    return {
                      FK_ERP_CUE_TES: medio.value,
                      TIPO: 'D',
                      UNIDADES: parseFloat(parseFloat(medio.saldo).toFixed(2))
                    };
                  }),
                ...comtes.cheques.map(cheque => {
                  return {
                    FK_ERP_CUE_TES: parseInt(cheque.FK_ERP_CUE_TES),
                    TIPO: 'D',
                    UNIDADES: parseFloat(cheque.IMPORTE),
                    FK_ERP_CHE_TER: parseInt(cheque.ID)
                  };
                })
              ]
            };
            const response = await itsClassInsert(login.UserSession, 'ERP_COM_VEN_REC', data);
            comtes.Loading(false);
            if (typeof response === 'string' && response !== '') {
              this.props.comtes.Loading(false);
              this.props.comtes.Error(response);
              this.handleBack();
            } else {
              comtes.Generado(true);
            }
          } catch (error) {
            this.props.comtes.Loading(false);
            this.props.comtes.Error(error);
            this.handleBack();
          }
        }
      };

      handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1
        }));
      };

      handleReset = () => {
        const { comtes } = this.props;
        comtes.Inicializar();
        comtes.Generado(false);
        this.setState({
          activeStep: 1
        });
      };

      validaciones = () => {
        let error = '';
        const { activeStep } = this.state;
        const { comtes } = this.props;
        if (activeStep === 1) {
          if (comtes.saldo <= 0) {
            error = 'El importe del comprobante debe ser mayor a 0';
          }
          if (comtes.fk_erp_uni_neg === '') {
            error = 'El campo unidad de negocios debe contener un valor';
          }
        }
        if (activeStep === 2) {
          if (+comtes.importeRestanteCuentas > 0) {
            error = `Faltan imputar $${comtes.importeRestanteCuentas} a alguna cuenta de tesorería`;
          } else if (+comtes.importeRestanteCuentas < 0) {
            error = `No se puede continuar porque se imputaron en las cuentas de tesorería $${+comtes.importeRestanteCuentas *
              -1} más que el importe del comprobante`;
          }
        }
        if (error === '') {
          comtes.Error('');
          return true;
        } else {
          comtes.Error(error);
          return false;
        }
      };

      render() {
        const steps = getSteps();
        const { activeStep } = this.state;
        const { comtes } = this.props;
        let StepActivo;
        if (activeStep === 1) StepActivo = <ComTesStep1 />;
        else if (activeStep === 2) StepActivo = <ComTesStep2 />;
        else StepActivo = <ComTesStep3 />;

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
                  <Typography>Comprobante de tesorería</Typography>
                  <Button onClick={this.handleReset} disabled={comtes.loading}>
                    Ir al principio
                  </Button>
                  {comtes.loading ? (
                    <>
                      <br />
                      <CircularProgress />
                      <br />
                    </>
                  ) : null}
                  {comtes.generado ? (
                    <>
                      <br />
                      <Done style={{ color: 'green' }} />
                      <br />
                    </>
                  ) : null}
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
            <DialogSnack open={comtes.error !== ''} handleClose={() => comtes.Error('')} msg={comtes.error} />
          </div>
        );
      }
    }
  )
);

export default withStyles(styles)(ComTes);
