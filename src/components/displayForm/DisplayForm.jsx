import { Form } from '@bpmn-io/form-js';
import { useEffect } from 'react';
const DisplayForm = () => {
  useEffect(() => {
    (async () => {
      const schema = {
        schemaVersion: 3,
        exporter: {
          name: 'form-js (https://demo.bpmn.io)',
          version: '0.3.0',
        },
        components: [
          {
            key: 'name',
            label: 'Text Field',
            type: 'textfield',
            id: 'Field_1jfqw1v',
            description: 'Enter your name ...',
            validate: {
              required: true,
              minLength: 3,
              maxLength: 50,
            },
          },
        ],
        type: 'default',
        id: 'Form_1f88rws',
      };
      const schema2 = {
        components: [
          {
            label: "Borrower's Name",
            type: 'textfield',
            id: 'Field_1gukz22',
            key: 'borrowerName',
            disabled: true,
            validate: {
              required: true,
            },
          },
          {
            values: [
              {
                label: 'Male',
                value: 'Male',
              },
              {
                label: 'Female',
                value: 'Female',
              },
            ],
            label: 'Gender',
            type: 'checklist',
            id: 'Field_0xugn9w',
            key: 'gender',
            disabled: true,
            properties: {},
          },
          {
            text: 'Date of Birth of Borrower (from the system)\n',
            type: 'text',
            id: 'Field_0eiowvo',
          },
          {
            label: 'Date',
            type: 'select',
            id: 'Field_0ul9toj',
            key: 'dob_date_borrower',
            validate: {
              required: true,
            },
            disabled: true,
            defaultValue: 'value',
            valuesKey: '',
            properties: {},
          },
          {
            values: [],
            label: 'Month',
            type: 'select',
            id: 'Field_01njqka',
            key: 'dob_month_borrower',
            validate: {
              required: true,
            },
            disabled: true,
            properties: {},
            defaultValue: 'January',
          },
          {
            values: [],
            label: 'Year',
            type: 'select',
            id: 'Field_1ickdzc',
            key: 'dob_year_borrower',
            validate: {
              required: true,
            },
            disabled: true,
          },
          {
            label: 'Email',
            type: 'textfield',
            id: 'Field_06vhlly',
            key: 'borrowerEmail',
            properties: {},
            validate: {
              required: false,
            },
            disabled: true,
          },
          {
            label: 'Phone Number',
            type: 'textfield',
            id: 'Field_1et4rpg',
            key: 'borrowerPhoneNo',
            validate: {
              required: true,
              pattern: '([+,1-100])',
              minLength: 13,
              maxLength: 13,
            },
            description: 'Please input using the international standard',
            disabled: true,
          },
          {
            text: 'Guarantor Information',
            type: 'text',
            id: 'Field_1ou3924',
          },
          {
            label: "Guarantor's name",
            type: 'textfield',
            id: 'Field_0z5lghv',
            key: 'gurantorName',
            validate: {
              required: true,
            },
          },
          {
            label: "Guarantor's Phone Number",
            type: 'textfield',
            id: 'Field_1kn0mg5',
            key: 'guarantorPhoneNo',
            validate: {
              required: true,
            },
          },
          {
            label: "Guarantor 's Email Address",
            type: 'textfield',
            id: 'Field_1uz82uf',
            key: 'guarantorEmail',
          },
          {
            text: "Garanter's Address",
            type: 'text',
            id: 'Field_04zryt9',
          },
          {
            label: 'Country',
            type: 'textfield',
            id: 'Field_1jpl2o9',
            key: 'guarantor_address_country',
            defaultValue: 'Ethiopia',
            disabled: true,
          },
          {
            label: 'Region',
            type: 'textfield',
            id: 'Field_08gc8x3',
            key: 'guarantor_address_region',
          },
          {
            label: 'City',
            type: 'textfield',
            id: 'Field_1ycog6t',
            key: 'guarantor_address_city',
          },
          {
            label: 'Sub City/ Zone',
            type: 'textfield',
            id: 'Field_0syib46',
            key: 'guarantor_address_subcityZone',
          },
          {
            label: 'Woreda/Kebele',
            type: 'textfield',
            id: 'Field_0mi9who',
            key: 'guarantor_address_woredaKebele',
          },
          {
            label: 'House Number',
            type: 'number',
            id: 'Field_0nyzakx',
            key: 'guarantor_address_houseno',
            defaultValue: 0,
          },
          {
            text: 'Collateral Information',
            type: 'text',
            id: 'Field_0qkrwmd',
          },
          {
            values: [
              {
                label: 'House',
                value: 'House',
              },
              {
                label: 'Car',
                value: 'Car',
              },
            ],
            label: 'Collateral Type',
            type: 'select',
            id: 'Field_01ck5b9',
            key: 'collateralType',
            defaultValue: 'House',
            properties: {},
          },
          {
            label: 'Collateral Reference Number',
            type: 'number',
            id: 'Field_00r08ka',
            key: 'collateralRefNo',
          },
          {
            text: 'Collaral \nAddress',
            type: 'text',
            id: 'Field_0iqyvyk',
          },
          {
            label: 'Country',
            type: 'textfield',
            id: 'Field_0l88apx',
            key: 'collatoral_address_country',
            defaultValue: 'Ethiopia',
            disabled: true,
          },
          {
            label: 'Region',
            type: 'textfield',
            id: 'Field_1cweg4v',
            key: 'collatoral_address_region',
          },
          {
            values: [
              {
                label: 'Value',
                value: 'value',
              },
            ],
            label: 'Sub City/ Zone',
            type: 'select',
            id: 'Field_1i7rzmc',
            key: 'collatoral_address_subcityZone',
          },
          {
            label: 'Woreda / Kebele',
            type: 'textfield',
            id: 'Field_0xi36yb',
            key: 'collatoral_address_woredaKebele',
          },
          {
            label: 'House No.',
            type: 'textfield',
            id: 'Field_1m40di8',
            key: 'collatoral_address_houseNo',
          },
          {
            text: 'Loan Application',
            type: 'text',
            id: 'Field_1cvarey',
          },
          {
            label: 'Borrower Name(from the system)',
            type: 'textfield',
            id: 'Field_0ovovpg',
            key: 'borrower_name',
            validate: {
              required: true,
            },
            disabled: true,
          },
          {
            label: 'Spouse Name(from CBS if availabe)',
            type: 'textfield',
            id: 'Field_0myqcrj',
            key: 'spouce_name',
            disabled: true,
          },
          {
            values: [
              {
                label: 'Value',
                value: 'value',
              },
            ],
            label: 'Requested Credit Type',
            type: 'select',
            id: 'Field_1r0c1pd',
            key: 'requested_credit_type',
            disabled: true,
            validate: {
              required: true,
            },
          },
          {
            label: 'Requested credit amount',
            type: 'textfield',
            id: 'Field_0q9wxp3',
            key: 'requested_credit_amount',
            validate: {
              required: true,
            },
            disabled: true,
          },
          {
            label: 'Requested Amount',
            type: 'number',
            id: 'Field_02h2pun',
            key: 'requested_amount',
            validate: {
              required: true,
            },
            disabled: true,
          },
          {
            label: 'Requested Period',
            type: 'number',
            id: 'Field_1kv5iwe',
            key: 'requested_period',
            validate: {
              required: true,
            },
            disabled: true,
          },
          {
            values: [
              {
                label: 'Value',
                value: 'value',
              },
            ],
            label: 'Requested Repayment Frequency ',
            type: 'select',
            id: 'Field_04p8rus',
            key: 'requested_repayment_frequency',
            validate: {
              required: true,
            },
            disabled: true,
          },
          {
            values: [
              {
                label: 'Value',
                value: 'value',
              },
            ],
            label: 'Purpose of the Loan',
            type: 'select',
            id: 'Field_1k3nqnr',
            key: 'purpose_of_loan',
            validate: {
              required: true,
            },
            disabled: true,
          },
          {
            label: 'Income of Borrower',
            type: 'number',
            id: 'Field_13dwb5q',
            key: 'income_of_borrower',
            validate: {
              required: true,
            },
            disabled: true,
          },
          {
            label: 'Income of the spouse ',
            type: 'number',
            id: 'Field_16ijtvb',
            key: 'income_of_spouce',
            disabled: true,
          },
          {
            text: 'Date of Birth of Spouse (from the system)\n',
            type: 'text',
            id: 'Field_1ijx01b',
          },
          {
            values: [],
            label: 'Date',
            type: 'select',
            id: 'Field_17w66mx',
            key: 'dof_spouse_date',
            defaultValue: 'value',
            disabled: true,
          },
          {
            values: [
              {
                label: 'Value',
                value: 'value',
              },
            ],
            label: 'Month',
            type: 'select',
            id: 'Field_05705hk',
            key: 'dof_spouse_month',
            disabled: true,
          },
          {
            values: [
              {
                label: 'Value',
                value: 'value',
              },
            ],
            label: 'Year',
            type: 'select',
            id: 'Field_04rg7l6',
            key: 'dof_spouse_year',
            disabled: true,
          },
          {
            label: 'Source Of Payment',
            type: 'textfield',
            id: 'Field_1hkgvrq',
            key: 'source_of_payment',
            validate: {
              required: true,
            },
            disabled: true,
          },
          {
            label: 'TIN of the Borrower ',
            type: 'number',
            id: 'Field_1m66q93',
            key: 'tinNo_of_borrower',
            validate: {
              required: true,
            },
            disabled: true,
          },
          {
            label: 'TIN of the Spouse',
            type: 'textfield',
            id: 'Field_0izih57',
            key: 'tinNo_of_spouse',
            disabled: true,
          },
          {
            action: 'submit',
            label: 'Submit Form',
            type: 'button',
            id: 'Field_1mn46ne',
            key: 'field_0aqiewx',
            properties: {
              key1: 'value',
            },
          },
          {
            action: 'reset',
            label: 'Cancel',
            type: 'button',
            id: 'Field_12bn71k',
            key: 'field_05fzy4i',
            properties: {
              cancel: 'cancelField',
            },
          },
        ],
        type: 'default',
        id: 'Form_1g1tujy',
        exporter: {
          name: 'Camunda Modeler',
          version: '5.5.1',
        },
        executionPlatform: 'Camunda Platform',
        executionPlatformVersion: '7.18.0',
        schemaVersion: 5,
      };

      console.log(JSON.stringify(schema));

      //fill in form & get data
      const form = new Form({
        container: document.querySelector('#form'),
      });

      await form.importSchema(schema2);
    })();
  }, []);

  return (
    <>
      <div id='form'></div>
    </>
  );
};
export default DisplayForm;
