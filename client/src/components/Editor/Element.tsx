import React, { useState, useEffect, useRef } from 'react';
import { callbackOnKey, cursorToEnd } from 'services/functions';

export interface ElementData {
  type: string;
  tag: string;
  text?: string | null | undefined;
}

export interface ElementProps {
  index: number;
  focused: boolean;
  onChange: (index: number, element: ElementData) => void;
  onAdd: (index: number, element: ElementData) => void;
  onRemove: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onFocus: (index: number) => void;
  onSelect: (
    value?: string | undefined,
    range?: Range | undefined,
    rect?: DOMRect | undefined
  ) => void;
}

const Element = (props: ElementProps & ElementData) => {
  const {
    index,
    type,
    tag,
    text,
    onChange,
    onAdd,
    onRemove,
    onFocus,
    onNext,
    onPrev,
    onSelect,
    focused,
  } = props;

  const ref = useRef<(HTMLInputElement & Node) | undefined>();

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (focused && !selected) {
      ref.current?.focus();
    }
  }, [focused, selected]);

  function handleInput(e: React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const text = ref.current?.innerHTML;
    onChange(index, { type, tag, text });
  }

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const text = ref.current?.innerHTML;
    callbackOnKey(e, 13, () => {
      setSelected(false);
      onAdd(index, { type: 'paragraph', tag: 'p' });
    });
    callbackOnKey(
      e,
      8,
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!text) {
          e.preventDefault();
          setSelected(false);
          onRemove(index);
        }
      },
      false
    );
    callbackOnKey(e, 38, () => {
      setSelected(false);
      onPrev();
    });
    callbackOnKey(e, 40, () => {
      setSelected(false);
      onNext();
    });
  }

  function handleOnFocus() {
    setSelected(false);
    onFocus(index);
    ref.current?.focus();
    cursorToEnd();
  }

  function handleOnMouseDown() {
    setSelected(true);
    ref.current?.focus();
  }

  function handleOnSelect() {
    const selection = window?.getSelection();
    const value = selection?.toString();
    let rect: DOMRect | undefined = new DOMRect();
    let range: Range | undefined = new Range();
    if (value) {
      range = selection?.getRangeAt(0);
      rect = range?.getBoundingClientRect();
    }
    onSelect(value, range, rect);
  }

  return (
    <div className='editor-block'>
      {React.createElement(tag, {
        ref: ref,
        className: `editor-element editor-element--${type} ${
          focused ? 'has-focus' : ''
        }`,
        contentEditable: true,
        suppressContentEditableWarning: true,
        onInput: (e: React.KeyboardEvent<HTMLInputElement>) => {
          handleInput(e);
        },
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
          handleOnKeyDown(e);
        },
        onFocus: () => {
          handleOnFocus();
        },
        onMouseDown: () => {
          handleOnMouseDown();
        },
        onSelect: () => {
          handleOnSelect();
        },
        dangerouslySetInnerHTML: { __html: text },
      })}
    </div>
  );
};

export default Element;
