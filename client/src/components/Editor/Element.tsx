import React, { useState, useEffect, useRef } from 'react';
import { callbackOnKey, cursorToEnd } from 'utils/functions';
import { usePrevious } from 'utils/hooks';
import styles from './Editor.module.scss';

export interface ElementData {
  id: number;
  type: string;
  tag: string;
  text?: string | null | undefined;
}

export interface DirtyData extends ElementData {
  localDirty: boolean;
}

export interface ElementProps {
  index: number;
  focused: boolean;
  dirty: DirtyData[];
  onDirty: (element: DirtyData) => void;
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
    id,
    type,
    tag,
    text,
    focused,
    dirty,
    onDirty,
    onChange,
    onAdd,
    onRemove,
    onFocus,
    onNext,
    onPrev,
    onSelect,
  } = props;

  const ref = useRef<(HTMLInputElement & Node) | undefined>();

  const [selected, setSelected] = useState(false);

  const [localTag] = useState(tag);
  const [localText, setLocalText] = useState(text);
  const [localDirty, setLocalDirty] = useState(dirty.length > 0);

  const prevText = usePrevious(text);

  // Focus when not selected
  useEffect(() => {
    if (focused && !selected) {
      ref.current?.focus();
    }
  }, [focused, selected]);

  // Set local dirty to false if global dirty is false
  useEffect(() => {
    if (!dirty.length && !localDirty) {
      setLocalDirty(false);
    }
  }, [dirty, localDirty]);

  // Callback global dirty when local dirty changes
  useEffect(() => {
    onDirty({ id, localDirty, type, tag, text });
  }, [localDirty, onDirty, index, id, type, tag, text]);

  // Callback global change when local text changes
  useEffect(() => {
    onChange(index, { id, type, tag, text: localText });
  }, [onChange, index, id, type, tag, localText]);

  // Set local dirty if the local tag or local text is not equal to the tag or text props
  useEffect(() => {
    if (localTag !== tag) {
      setLocalDirty(true);
    } else if (prevText && localText !== prevText) {
      setLocalDirty(true);
    } else if (localText !== text) {
      setLocalDirty(true);
    } else {
      setLocalDirty(false);
    }
  }, [localTag, tag, localText, prevText, text]);

  function handleInput() {
    const text = ref.current?.innerHTML;
    setLocalText(text);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const text = ref.current?.innerHTML;
    callbackOnKey(e, 13, () => {
      setSelected(false);
      onAdd(index, { id, type: 'paragraph', tag: 'p' });
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

  function handleFocus() {
    setSelected(false);
    onFocus(index);
    ref.current?.focus();
    cursorToEnd();
  }

  function handleMouseDown() {
    setSelected(true);
    ref.current?.focus();
  }

  function handleSelect() {
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
    <div className={styles.block}>
      {React.createElement(tag, {
        ref: ref,
        className: `${styles.element} ${styles[type]} ${
          focused ? styles.focus : ''
        } ${localDirty ? styles.dirty : ''}`,
        contentEditable: true,
        suppressContentEditableWarning: true,
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
          handleKeyDown(e);
        },
        onInput: () => {
          handleInput();
        },
        onFocus: () => {
          handleFocus();
        },
        onMouseDown: () => {
          handleMouseDown();
        },
        onSelect: () => {
          handleSelect();
        },
        dangerouslySetInnerHTML: { __html: text },
      })}
    </div>
  );
};

export default Element;
