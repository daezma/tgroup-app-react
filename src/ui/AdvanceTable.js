import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import {
  Column,
  FilteringState,
  GroupingState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedPaging,
  IntegratedSelection,
  IntegratedSorting,
  PagingState,
  SelectionState,
  SortingState,
  DataTypeProvider,
  DataTypeProviderProps,
  SummaryState,
  IntegratedSummary
} from '@devexpress/dx-react-grid';
import {
  DragDropProvider,
  Grid,
  GroupingPanel,
  PagingPanel,
  Table,
  TableFilterRow,
  TableGroupRow,
  TableHeaderRow,
  TableSelection,
  TableSummaryRow,
  Toolbar
} from '@devexpress/dx-react-grid-material-ui';

interface IGridState {
  columns: Column[];
  rows: ISale[];
  pageSizes: number[];
  currencyColumns: string[];
}

const availableFilterOperations: string[] = [
  'equal',
  'notEqual',
  'greaterThan',
  'greaterThanOrEqual',
  'lessThan',
  'lessThanOrEqual'
];

const styles = ({ typography }: Theme) =>
  createStyles({
    currency: {
      fontWeight: typography.fontWeightMedium
    },
    numericInput: {
      width: '100%'
    }
  });
type CurrencyFormatterProps = DataTypeProvider.ValueFormatterProps & WithStyles<typeof styles>;
type CurrencyEditorProps = DataTypeProvider.ValueEditorProps & WithStyles<typeof styles>;

const getInputValue = (value?: string): string => (value === undefined ? '' : value);

const getColor = (amount: number): string => {
  if (amount > 0) {
    return 'green';
  }
  return 'red';
};

const CurrencyEditor = withStyles(styles)(({ onValueChange, classes, value }: CurrencyEditorProps) => {
  const handleChange = event => {
    const { value: targetValue } = event.target;
    if (targetValue.trim() === '') {
      onValueChange(undefined);
      return;
    }
    onValueChange(parseInt(targetValue, 10));
  };
  return (
    <Input
      type='number'
      classes={{
        input: classes.numericInput
      }}
      fullWidth={true}
      value={getInputValue(value)}
      inputProps={{
        min: 0,
        placeholder: 'Filtro...'
      }}
      onChange={handleChange}
    />
  );
});

const CurrencyFormatter = withStyles(styles)(({ value, classes }: CurrencyFormatterProps) => (
  <i className={classes.currency} style={{ color: getColor(value) }}>
    ${value.toFixed(2)}
  </i>
));

const CurrencyTypeProvider: React.ComponentType<DataTypeProviderProps> = (props: DataTypeProviderProps) => (
  <DataTypeProvider
    formatterComponent={CurrencyFormatter}
    editorComponent={CurrencyEditor}
    availableFilterOperations={availableFilterOperations}
    {...props}
  />
);

export default class AdvanceTable extends React.Component<object, IGridState> {
  pageSizes = [5, 10, 15, 25];

  filterMessages = {
    filterPlaceholder: 'Filtro...',
    contains: 'Contiene',
    notContains: 'No contiene',
    startsWith: 'Comienza con',
    endsWith: 'Termina con',
    equal: 'Igual a',
    notEqual: 'Distinto a',
    greaterThan: 'Mayor a',
    greaterThanOrEqual: 'Mayor o igual a',
    lessThan: 'Menor a',
    lessThanOrEqual: 'Menor o igual a'
  };

  pagingMessages = {
    all: 'Todos',
    rowsPerPage: 'Filas por página',
    info: ({ from, to, count }) => `${from} - ${to} de ${count}`
  };

  summaryMessages = {
    sum: 'Total',
    avg: 'Prom.',
    count: 'Cantidad'
  };

  render() {
    const {
      columns,
      data,
      currencyColumns,
      ordering,
      grouping,
      summaryGroup,
      summaryTotal,
      strictGrouping
    } = this.props;
    //console.log(this.props.data);
    let groupingState = null;
    if (strictGrouping) {
      groupingState = <GroupingState grouping={grouping} />;
    } else if (grouping) {
      groupingState = <GroupingState defaultGrouping={grouping} />;
    }
    return (
      <Paper>
        <Grid rows={data} columns={columns}>
          <FilteringState />
          <SortingState defaultSorting={ordering} />

          <SelectionState />

          {groupingState}
          <PagingState />
          {summaryTotal ? (
            <>
              <SummaryState groupItems={summaryGroup} totalItems={summaryTotal} />
            </>
          ) : null}

          <IntegratedGrouping />
          <IntegratedFiltering />
          <IntegratedSorting />
          <IntegratedPaging />
          <IntegratedSelection />
          <IntegratedSummary />

          {currencyColumns ? <CurrencyTypeProvider for={currencyColumns} /> : null}

          <DragDropProvider />

          <Table />
          <TableSelection showSelectAll={true} />

          <TableHeaderRow showSortingControls={true} />
          <TableFilterRow showFilterSelector={true} messages={this.filterMessages} />
          <PagingPanel pageSizes={this.pageSizes} messages={this.pagingMessages} />

          <TableGroupRow showColumnsWhenGrouped={true} />
          {summaryTotal ? <TableSummaryRow messages={this.summaryMessages} /> : null}
          <Toolbar />
          <GroupingPanel showSortingControls={true} />
        </Grid>
      </Paper>
    );
  }
}
