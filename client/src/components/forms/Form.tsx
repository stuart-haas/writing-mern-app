import React, { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import api from 'services/api';
import { AxiosResponse } from 'axios';

export interface FormData {
  [key: string]: string;
}

export interface FormField {
  name?: string;
  type?: string;
  placeholder?: string;
  class?: string;
  required?: boolean;
  match?: string;
  matchError?: string;
  lookup?: string;
  lookupError?: string;
}

interface FormFieldError {
  param?: string;
  msg?: string;
}

interface FormFieldStatus {
  name: string;
  message: string;
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
  });
  return data;
}

const Form = (props: Props) => {
  const [data, setData] = useState<FormData>(mapData(props.fields));
  const [errors, setErrors] = useState<FormFieldError[]>([]);
  const [status, setStatus] = useState<FormFieldStatus[]>([]);
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

  const debounceLookup = useCallback(debounce(handleLookup, 500), []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    handleErrors(name, value);

    setData({
      ...data,
      [name]: value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { errors }: any = await props.submit(data!);
    if (errors) {
      setErrors(errors.data);
    } else {
      setErrors([]);
    }
  }

  function handleErrors(name: string, value: string) {
    handleMatch(name, value);
    debounceLookup(name, value);
  }

  function handleMatch(name: string, value: string) {
    const field = findFieldByName(name);
    if (field.match) {
      if (value !== data[field.match]) {
        handleError(field, field.matchError);
      } else {
        handleError(field);
      }
    }
  }

  function handleLookup(name: string, value: string) {
    const field = findFieldByName(name);
    if (field.lookup && value) {
      handleStatus(field, 'is-loading');
      api.get(`${field.lookup}${value}`).then((response: AxiosResponse) => {
        setTimeout(() => {
          handleStatus(field);
        }, 500);
        if (response.data) {
          handleError(field, field.lookupError);
        } else {
          handleError(field);
        }
      });
    }
  }

  function handleStatus(field: FormField, message = '') {
    if (message) {
      setStatus([...status, { name: field.name!, message }]);
    } else {
      setStatus(
        [...status].filter((e: FormFieldStatus) => {
          return e.name !== field.name;
        })
      );
    }
  }

  function handleError(field: FormField, message = '') {
    if (message) {
      setErrors([...errors, { param: field.name, msg: message }]);
    } else {
      setErrors(
        [...errors].filter((e: FormFieldError) => {
          return e.param !== field.name;
        })
      );
    }
  }

  function findFieldByName(name: string) {
    return props.fields.filter((field: FormField) => {
      return field.name === name;
    })[0];
  }

  function findErrorsByName(name: string) {
    return errors.filter((error: FormFieldError) => {
      return error.param === name;
    });
  }

  function findStatusByName(name: string) {
    return status.filter((status: FormFieldStatus) => {
      return status.name === name;
    });
  }

  function hasFieldError(name: string) {
    const errors = findErrorsByName(name);
    return errors.length === 0 ? false : true;
  }

  function fieldError(name: string) {
    const errors = findErrorsByName(name);
    return errors[0].msg;
  }

  function hasFieldStatus(name: string) {
    const status = findStatusByName(name);
    return status.length === 0 ? false : true;
  }

  function fieldStatus(name: string) {
    const status = findStatusByName(name);
    return status[0].message;
  }

  function applyRef(index: number) {
    if (index === 0) {
      return ref;
    }
  }

  return (
    <form
      className={`form ${props.class} ${errors.length > 0 ? 'has-errors' : ''}`}
      onSubmit={handleSubmit}
    >
      {props.title && <h2 className='h2'>{props.title}</h2>}
      <div className='fields'>
        {props.fields.map((field: FormField, index: number) => (
          <div
            key={index}
            className={`field ${
              hasFieldError(field.name!) ? 'has-error' : ''
            } ${hasFieldStatus(field.name!) ? fieldStatus(field.name!) : ''}`}
          >
            <input
              ref={applyRef(index)}
              className={field.class ? field.class : 'input'}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={(data && data[field.name!]) || ''}
              onChange={(e) => handleChange(e)}
            />
            {hasFieldError(field.name!) && (
              <label className='field-error'>{fieldError(field.name!)}</label>
            )}
          </div>
        ))}
      </div>
      <button
        disabled={errors.length > 0}
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
