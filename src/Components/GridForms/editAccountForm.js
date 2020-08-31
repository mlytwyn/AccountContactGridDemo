import React from 'react';
import { Dialog } from '@progress/kendo-react-dialogs';
import {
  Form,
  Field,
  FormElement,
  FieldWrapper,
} from '@progress/kendo-react-form';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Error } from '@progress/kendo-react-labels';
import accounts from '../../Data/accounts.json';
import { industry } from '../../Data/industry';
import { rating } from '../../Data/rating';
import { DatePicker } from '@progress/kendo-react-dateinputs';

const requiredFieldValidator = (value) => (!!value ? '' : 'Required');
const minValueValidator = (value) =>
  value >= 0 ? '' : 'The value must be 0 or higher';
const NonNegativeNumericInput = (fieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <NumericTextBox {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const DateInput = (fieldRenderProps) => {
  const { label, value, onChange } = fieldRenderProps;

  return (
    <FieldWrapper>
      <DatePicker
        label={label}
        defaultValue={value}
        onChange={onChange}
      ></DatePicker>
    </FieldWrapper>
  );
};

const EditAccountForm = (props) => {
  return (
    <Dialog title={`Edit ${props.item.Name}`} onClose={props.cancelForm}>
      <Form
        onSubmit={props.onSubmit}
        initialValues={props.item}
        render={(formRenderProps) => (
          <FormElement style={{ maxWidth: 650 }}>
            <fieldset className={'k-form-fieldset'}>
              <div className='mb-3'>
                <Field
                  name={'Name'}
                  component={Input}
                  label={'Account Name'}
                  validator={requiredFieldValidator}
                />
              </div>
              <div className='mb-3'>
                <Field
                  name={'Address'}
                  component={Input}
                  data={accounts}
                  label={'Physical Address'}
                />
              </div>
              <div className='mb-3'>
                <Field
                  name={'Industry'}
                  component={DropDownList}
                  data={industry}
                  textField={'Description'}
                  label={'Industry'}
                />
              </div>
              <div className='mb-3'>
                <Field
                  name={'AnnualRevenue'}
                  component={NonNegativeNumericInput}
                  label={'Annual Revenue'}
                  validator={minValueValidator}
                />
              </div>
              <div className='mb-3'>
                <Field
                  name={'Rating'}
                  component={DropDownList}
                  data={rating}
                  textField={'Description'}
                  label={'Rating'}
                />
              </div>
              <div className='mb-3'>
                <span style={{ fontSize: '11px' }}>Established Date</span>
                <Field
                  style={{ margintop: '0px' }}
                  name={'EstablishedDate'}
                  component={DateInput}
                  value={new Date(props.item.EstablishedDate)}
                  label={'Established Date'}
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
export default EditAccountForm;
