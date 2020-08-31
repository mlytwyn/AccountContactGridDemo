import React from 'react';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import {
  insertItem,
  deleteItem,
  insertContactItem,
  deleteContact,
} from '../../Services/service';
import accounts from '../../Data/accounts.json';
import contacts from '../../Data/contacts.json';
import { industry } from '../../Data/industry.js';
import { rating } from '../../Data/rating';
import DetailComponent from './detailComponent.js';
import DropdownFilterCell from '../../Helpers/Grid/dropDownFilterCell.js';
import DateRangeFilterCell from '../../Helpers/Grid/dateRangeFilterCell.js';
import MyCommandCell from '../../Helpers/Grid/commandCell.js';
import RangeFilterCell from '../../Helpers/Grid/rangeFilterCell.js';
import AddAccountForm from '../GridForms/addAccountForm.js';
import AddContactForm from '../GridForms/addContactForm.js';
import EditContactForm from '../GridForms/editContactForm.js';
import EditAccountForm from '../GridForms/editAccountForm.js';

const dataState = {
  sort: [{ field: 'Name', dir: 'asc' }],
};

class ItemGrid2 extends React.Component {
  minGridWidth = 0;
  constructor(props) {
    super(props);
    this.state = {
      openEditForm: false,
      openAddForm: false,
      openAddContactForm: false,
      openEditContactForm: false,
      editItem: {},
      accounts: [...accounts],
      contacts: [...contacts],

      dataState: dataState,
    };

    this.removeContact = this.removeContact.bind(this);
  }

  CategoryFilterCell = DropdownFilterCell(industry, 'Select industry');

  CommandCell = (props) => (
    <MyCommandCell {...props} edit={this.enterEdit} remove={this.remove} />
  );

  GridDetailComponent = (props) => (
    <DetailComponent
      {...props}
      add={this.enterContactAdd}
      edit={this.enterContactEdit}
      remove={this.removeContact}
      open={this.state.openEditContactForm}
      contacts={this.state.contacts}
    />
  );

  enterEdit = (item) => {
    this.setState({
      openEditForm: true,
      editItem: item,
    });
  };

  enterContactEdit = (item) => {
    this.setState({
      openEditContactForm: true,
      editItem: item,
    });
  };

  enterAdd = () => {
    this.setState({
      openAddForm: true,
    });
  };

  enterContactAdd = () => {
    this.setState({
      openAddContactForm: true,
    });
  };

  remove = (dataItem) => {
    const accounts = deleteItem(dataItem);
    this.setState({ accounts });
  };

  removeContact = (dataItem) => {
    const updated = deleteContact(dataItem);
    this.setState({ contacts: updated });
  };

  handleSubmit = (event) => {
    if (this.state.openEditForm === true) {
      this.setState({
        accounts: this.state.accounts.map((item) => {
          if (event.AccountID === item.AccountID) {
            item = { ...event };
          }
          return item;
        }),
        openEditForm: false,
      });
    }

    if (this.state.openAddForm === true) {
      const data = insertItem(event);
      this.setState({
        accounts: data,
        openAddForm: false,
      });
    }
  };

  handleContactSubmit = (event) => {
    if (this.state.openEditContactForm === true) {
      this.setState({
        contacts: this.state.contacts.map((item) => {
          if (
            event.AccountID === item.AccountID &&
            event.ContactID === item.ContactID
          ) {
            item.Name = event.Name;
            item.Phone = event.Phone;
            item.Email = event.Email;
            item.LeadSource = event.LeadSource;
          }
          return item;
        }),

        openEditContactForm: false,
      });
    }

    if (this.state.openAddContactForm === true) {
      const data = insertContactItem(event);
      this.setState({
        contacts: [...data],
        openAddContactForm: false,
      });
    }
  };

  handleCancelForm = () => {
    this.setState({
      openEditForm: false,
      openAddForm: false,
      openAddContactForm: false,
      openEditContactForm: false,
    });
  };

  expandChange = (event) => {
    event.dataItem.expanded = !event.dataItem.expanded;
    this.forceUpdate();
  };

  render() {
    const { accounts } = this.state;
    const industries = Array.from(new Set(industry.map((p) => p.Description)));
    const ratings = Array.from(new Set(rating.map((p) => p.Description)));
    const IndustryFilterCell = DropdownFilterCell(
      industries,
      'Select Industry'
    );
    const RatingFilterCell = DropdownFilterCell(ratings, 'Select Rating');

    return (
      <React.Fragment>
        <Grid
          style={{ height: '750px' }}
          detail={this.GridDetailComponent}
          expandField='expanded'
          data={process(accounts, this.state.dataState)}
          {...this.state.dataState}
          onDataStateChange={(e) => {
            this.setState({ dataState: e.data });
          }}
          filterable={true}
          onExpandChange={this.expandChange}
          sortable
        >
          <GridToolbar>
            <button
              title='Add Account'
              className='k-button k-primary'
              onClick={this.enterAdd}
            >
              Add Account
            </button>

            <button
              style={{ marginLeft: '20px' }}
              title='Add Contact'
              className='k-button k-primary'
              onClick={this.enterContactAdd}
            >
              Add Contact
            </button>
          </GridToolbar>

          <GridColumn field='Name' title='Account Name' filter={'text'} />
          <GridColumn field='Address' title='Physical Address' />
          <GridColumn
            width={275}
            field='Industry.Description'
            title='Industry'
            filterCell={IndustryFilterCell}
          />
          <GridColumn
            width={280}
            field='AnnualRevenue'
            title='Annual Revenue'
            filterCell={RangeFilterCell}
          />
          <GridColumn
            width={195}
            field='Rating.Description'
            title='Rating'
            filterCell={RatingFilterCell}
          />
          <GridColumn
            width='350px'
            field='EstablishedDate'
            title='Established Date'
            format='{0:MM/dd/yyyy}'
            filterCell={DateRangeFilterCell}
          />
          <GridColumn
            cell={this.CommandCell}
            filterable={false}
            width='175px'
          />
        </Grid>
        {this.state.openEditForm && (
          <EditAccountForm
            cancelForm={this.handleCancelForm}
            onSubmit={this.handleSubmit}
            item={this.state.editItem}
          />
        )}
        {this.state.openAddForm && (
          <AddAccountForm
            cancelForm={this.handleCancelForm}
            onSubmit={this.handleSubmit}
            item={this.state.editItem}
          />
        )}
        {this.state.openEditContactForm && (
          <EditContactForm
            cancelForm={this.handleCancelForm}
            onSubmit={this.handleContactSubmit}
            item={this.state.editItem}
          />
        )}
        {this.state.openAddContactForm && (
          <AddContactForm
            cancelForm={this.handleCancelForm}
            onSubmit={this.handleContactSubmit}
            item={this.state.editItem}
            accounts={this.state.accounts}
          />
        )}
      </React.Fragment>
    );
  }
}

export default ItemGrid2;
