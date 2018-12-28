import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import debounce from '../helpers/Debounce';
import { inject } from 'mobx-react';
import { Buscador } from '../api/Buscadores';

const SelectAutocomplete = inject('login')(
  class extends Component {
    state = {
      data: []
    };

    AJAXData = debounce(async value => {
      const filtro = `${this.props.campoFiltro} LIKE '%${value}%'`;
      const datos = await Buscador(this.props.login.UserSession, this.props.clase, filtro);
      this.setState({ data: datos });
    }, 500);

    handleChange = value => {
      this.props.onChange(value);
      this.AJAXData(value);
    };

    getItemValue = item => {
      return item.value;
    };

    renderItem = (item, isHighlighted) => {
      return (
        <div key={item.value} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
          {item.label}
        </div>
      );
    };

    handleSelect = item => {
      this.props.onChange(item);
    };

    render() {
      return (
        <>
          <Autocomplete
            getItemValue={this.getItemValue}
            renderItem={this.renderItem}
            items={this.state.data}
            value={this.props.value}
            onChange={e => this.handleChange(e.target.value)}
            onSelect={this.handleSelect}
            wrapperStyle={{ position: 'relative', display: 'inline-block', zIndex: '999' }}
            selectOnBlur={true}
          />
        </>
      );
    }
  }
);

export default SelectAutocomplete;
