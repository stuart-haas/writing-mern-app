import React, { useEffect, useRef, useState } from 'react';

export interface FormData {
  [key: string]: string;
}

export interface FormField {
  name?: string;
  type?: string;
  placeholder?: string;
  class?: string;
  fieldGroup?: any;
}

export interface FormFieldGroup {
  label: string;
  fields: FormField[];
}

interface FormButton {
  label?: string;
  class?: string;
}

interface Props {
  title?: string;
  class?: string;
  button?: FormButton;
  autoFocus?: boolean;
  fields: FormField[];
  data?: FormData;
  submit: (data: FormData) => void;
}

export function mapData(fields: FormField[]) {
  const data: FormData = {};
  fields.forEach((field: FormField) => {
    if (field.name) {
      data[field.name] = '';
    }
    if (field.fieldGroup) {
      field.fieldGroup.fields.forEach((field: FormField) => {
        if (field.name) {
          data[field.name] = '';
        }
      });
    }
  });
  return data;
}

const Form = (props: Props) => {
  const [data, setData] = useState<FormData>(
    props.data || mapData(props.fields)
  );
  const ref = useRef<any>();

  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);

  useEffect(() => {
    if (props.autoFocus) {
      ref.current?.focus();
    }
  }, [props.autoFocus]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.submit(data!);
  }

  function applyRef(index: number) {
    if (index === 0) {
      return ref;
    }
  }

  return (
    <form className={`form ${props.class}`} onSubmit={handleSubmit}>
      {props.title && <h2 className='h2'>{props.title}</h2>}
      {props.fields.map((field: FormField, index: number) =>
        !field.fieldGroup ? (
          <div key={index} className='field'>
            <input
              ref={applyRef(index)}
              className={field.class ? field.class : 'input'}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={(data && data[field.name!]) || ''}
              onChange={(e) => handleChange(e)}
            />
          </div>
        ) : (
          <div key={index} className='field-group'>
            <div className='field-group-label'>{field.fieldGroup.label}</div>
            {field.fieldGroup.fields.map((field: FormField, index: number) => (
              <div key={index} className='field'>
                <input
                  className={field.class ? field.class : 'input'}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={data[field.name!] || ''}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            ))}
          </div>
        )
      )}
      <button
        className={`button ${
          props.button && props.button.class ? props.button.class : 'success'
        }`}
      >
        {props.button && props.button.label ? props.button.label : 'Submit'}
      </button>
    </form>
  );
};

export default Form;
