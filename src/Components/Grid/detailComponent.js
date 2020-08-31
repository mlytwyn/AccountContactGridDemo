import React from 'react';
import { Grid, GridColumn, GridDetailRow } from '@progress/kendo-react-grid';
import MyCommandCell from '../../Helpers/Grid/commandCell.js';

export default class DetailComponent extends GridDetailRow {
  CommandCell = (props) => (
    <MyCommandCell
      {...props}
      edit={this.props.edit}
      remove={this.props.remove}
    />
  );

  render() {
    const dataItem = this.props.dataItem;
    return (
      <React.Fragment>
        <Grid
          data={this.props.contacts.filter(
            (contact) => contact.AccountID === dataItem.AccountID
          )}
        >
          <GridColumn field='Name' title='Name' />
          <GridColumn field='Phone' title='Phone' />
          <GridColumn field='Email' title='Email' />
          <GridColumn field='LeadSource.Description' title='Lead Source' />
          <GridColumn
            cell={this.CommandCell}
            filterable={false}
            width='175px'
          />
        </Grid>
      </React.Fragment>
    );
  }
}
