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
  label?: string;
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

interface FormFieldInfo {
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
  const [info, setInfo] = useState<FormFieldInfo[]>([]);
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
    } else {
      if (value) {
        handleError(field, '');
      } else {
        handleError(field);
      }
    }
  }

  function handleLookup(name: string, value: string) {
    const field = findFieldByName(name);
    if (field.lookup && value) {
      handleInfo(field, 'is-loading');
      api.get(`${field.lookup}${value}`).then((response: AxiosResponse) => {
        setTimeout(() => {
          handleInfo(field);
        }, 500);
        if (response.data) {
          handleError(field, field.lookupError);
        }
      });
    }
  }

  function handleError(field: FormField, message = '') {
    if (message) {
      setErrors((prevState: any) => [
        ...prevState,
        { param: field.name, msg: message },
      ]);
    } else {
      setErrors(
        [...errors].filter((e: FormFieldError) => {
          return e.param !== field.name;
        })
      );
    }
  }

  function handleInfo(field: FormField, message = '') {
    if (message) {
      setInfo((prevState: any) => [
        ...prevState,
        { name: field.name!, message },
      ]);
    } else {
      setInfo(
        [...info].filter((e: FormFieldInfo) => {
          return e.name !== field.name;
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

  function findInfoByName(name: string) {
    return info.filter((info: FormFieldInfo) => {
      return info.name === name;
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

  function hasFieldInfo(name: string) {
    const info = findInfoByName(name);
    return info.length === 0 ? false : true;
  }

  function fieldInfo(name: string) {
    const info = findInfoByName(name);
    return info[0].message;
  }

  function applyRef(index: number) {
    if (index === 0) {
      return ref;
    }
  }

  return (
    <form
      className={`form ${props.class ? props.class : ''} ${
        errors.length > 0 ? 'has-errors' : ''
      }`}
      onSubmit={handleSubmit}
    >
      {props.title && <h2 className='h2'>{props.title}</h2>}
      <div className='fields'>
        {props.fields.map((field: FormField, index: number) => (
          <div
            key={index}
            className={`field ${
              hasFieldError(field.name!) ? 'has-error' : ''
            } ${hasFieldInfo(field.name!) ? fieldInfo(field.name!) : ''}`}
          >
            {field.label && (
              <label htmlFor={field.name} className='field-label'>
                {field.placeholder}
              </label>
            )}
            <input
              ref={applyRef(index)}
              id={field.name}
              className={field.class ? field.class : 'input'}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={(data && data[field.name!]) || ''}
              onChange={(e) => handleChange(e)}
            />
            {hasFieldError(field.name!) && (
              <span className='field-error'>{fieldError(field.name!)}</span>
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
