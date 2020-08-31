import React from 'react';
import { Dialog } from '@progress/kendo-react-dialogs';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { leadSource } from '../../Data/leadSource';

const requiredDropDownValidator = (value) => {
  if (value === undefined) return 'required';
};
const requiredFieldValidator = (value) => (!!value ? '' : 'Required');
const AddContactForm = (props) => {
  return (
    <Dialog title={`Add Contact`} onClose={props.cancelForm}>
      <Form
        onSubmit={props.onSubmit}
        render={(formRenderProps) => (
          <FormElement style={{ maxWidth: 650 }}>
            <fieldset className={'k-form-fieldset'}>
              <div className='mb-3'>
                <Field
                  name={'Account'}
                  component={DropDownList}
                  data={props.accounts}
                  textField={'Name'}
                  label={'Account'}
                  validator={requiredDropDownValidator}
                />
              </div>
              <div className='mb-3'>
                <Field
                  name={'Name'}
                  component={Input}
                  label={'Name'}
                  validator={requiredFieldValidator}
                />
              </div>
              <div className='mb-3'>
                <Field name={'Phone'} component={Input} label={'Phone'} />
              </div>
              <div className='mb-3'>
                <Field name={'Email'} component={Input} label={'Email'} />
              </div>
              <div className='mb-3'>
                <Field
                  name={'LeadSource'}
                  component={DropDownList}
                  data={leadSource}
                  textField={'Description'}
                  label={'Lead Source'}
                />
              </div>
            </fieldset>
            <div className='k-form-buttons'>
              <button
                type={'submit'}
                className='k-button k-primary'
                disabled={!formRenderProps.allowSubmit}
              >
                Update
              </button>
              <button
                type={'submit'}
                className='k-button'
                onClick={props.cancelForm}
              >
                Cancel
              </button>
            </div>
          </FormElement>
        )}
      />
    </Dialog>
  );
};
export default AddContactForm;
