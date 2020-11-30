import React, { useEffect, useRef, useState } from 'react';

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
}
interface FormButton {
  label?: string;
  class?: string;
}

interface FormError {
  value?: string;
  msg?: string;
  param?: string;
  location?: string;
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
  const [errors, setErrors] = useState<FormError[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
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

  useEffect(() => {
    props.fields.forEach((field: FormField) => {
      if (field.name) {
        if (field.required) {
          if (data[field.name] === '') {
            setDisabled(true);
          } else {
            setDisabled(false);
          }
        }
        if (field.match) {
          if (data[field.name] !== data[field.match]) {
            setErrors([
              ...errors,
              { msg: field.matchError, param: field.name },
            ]);
          } else {
            setErrors(
              errors.filter((e: FormError) => {
                return e.param !== field.name;
              })
            );
          }
        }
      }
    });
  }, [data]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
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

  function applyRef(index: number) {
    if (index === 0) {
      return ref;
    }
  }

  function hasError(param: string) {
    const error: FormError[] = errors.filter((error: FormError) => {
      return error.param == param;
    });
    return error.length == 0 ? false : true;
  }

  function findError(param: string) {
    const error: FormError[] = errors.filter((error: FormError) => {
      return error.param == param;
    });
    return error[0].msg;
  }

  return (
    <form className={`form ${props.class}`} onSubmit={handleSubmit}>
      {props.title && <h2 className='h2'>{props.title}</h2>}
      <div className='fields'>
        {props.fields.map((field: FormField, index: number) => (
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
            {hasError(field.name!) && (
              <label className='field-error'>{findError(field.name!)}</label>
            )}
          </div>
        ))}
      </div>
      <button
        disabled={disabled}
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
