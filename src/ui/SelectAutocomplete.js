import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import Select from 'react-select';
import { inject } from 'mobx-react';
import { Buscador } from '../api/Buscadores';

const SelectAutocomplete = inject('login')(
  class extends Component {
    state = {
      data: [],
      empresa: this.props.value
    };

    AJAXData = async empresa => {
      const filtro = `${this.props.campoFiltro} LIKE '%${empresa}%'`;
      console.log(filtro);
      const empresas = await Buscador(this.props.login.UserSession, this.props.clase, filtro);
      console.log(empresas);
      this.setState({ data: empresas });
    };

    handleChange = e => {
      console.log('a');
      this.setState({ empresa: e.target.value });
      this.AJAXData(e.target.value);
      this.props.onChange(e.target.value);
    };

    getItemValue = item => {
      return item.value;
    };

    renderItem = (item, isHighlighted) => {
      console.log(item);
      return <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>{item.label}</div>;
    };

    render() {
      return (
        <>
          <Autocomplete
            getItemValue={this.getItemValue}
            renderItem={this.renderItem}
            items={this.state.data}
            value={this.state.empresa}
            onChange={this.handleChange}
          />
        </>
      );
    }
  }
);

export default SelectAutocomplete;
