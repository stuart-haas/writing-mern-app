import React, { useState, useEffect, useRef } from 'react';
import { updateStory } from 'services/api';
import { callbackOnKey, cursorToEnd } from 'services/functions';
import './Editor.scss';

export interface ElementData {
  type: string;
  tag: string;
  text?: string | null | undefined;
}

interface ElementProps {
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

interface EditorProps {
  id: string;
  title: string;
  content: ElementData[];
}

const Editor = (props: EditorProps) => {
  const [content, setContent] = useState<ElementData[]>(props.content);
  const [title, setTitle] = useState(props.title);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toolbarPosition, setToolbarPosition] = useState<DOMRect>();
  const [selectedText, setSelectedText] = useState<string>();
  const [selectedRange, setSelectedRange] = useState<Range>();

  async function handleSave() {
    const response = await updateStory(props.id, {
      title,
      content: JSON.stringify(content),
    });
    console.log(response);
  }

  function handleOnChange(index: number, element: ElementData) {
    content[index] = element;
    setContent(content);
  }

  function handleAdd(index: number, element: ElementData) {
    const contentCopy = [...content];
    contentCopy.splice(index + 1, 0, element);
    setContent(contentCopy);
    setCurrentIndex(index + 1);
  }

  function handleRemove(index: number) {
    if (content.length > 1) {
      const contentCopy = [...content];
      contentCopy.splice(index, 1);
      setContent(contentCopy);
      setCurrentIndex((prevIndex: number) => prevIndex - 1);
    }
  }

  function handleNext() {
    if (currentIndex < content.length - 1) {
      setCurrentIndex((prevIndex: number) => prevIndex + 1);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex: number) => prevIndex - 1);
    }
  }

  function handleOnFocus(index: number) {
    setCurrentIndex(index);
  }

  function handleOnSelect(
    value: string | undefined,
    range: Range | undefined,
    rect: DOMRect | undefined
  ) {
    if (value) {
      setSelectedRange(range);
      setSelectedText(value);
      setToolbarPosition(rect);
    } else {
      setSelectedText('');
    }
  }

  function setFormat(type: string, tag: string) {
    const contentCopy = [...content];
    const el = contentCopy[currentIndex];
    el.type = type;
    el.tag = tag;
    contentCopy[currentIndex] = el;
    setContent(contentCopy);
    setCurrentIndex(currentIndex);
  }

  const toolbarX = toolbarPosition && toolbarPosition?.x;
  const toolbarY =
    toolbarPosition && toolbarPosition?.y + toolbarPosition.height;

  return (
    <div className='editor'>
      <button onClick={() => handleSave()}>Save</button>
      <input
        className='editor-title'
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />
      <div className='editor-content'>
        {selectedText && (
          <div
            className='editor-toolbar'
            style={{ left: `${toolbarX}px`, top: `${toolbarY}px` }}
          >
            <div
              className='editor-tool'
              onClick={() => {
                setFormat('heading', 'h1');
              }}
            >
              H1
            </div>
            <div
              className='editor-tool'
              onClick={() => {
                setFormat('paragraph', 'p');
              }}
            >
              P
            </div>
          </div>
        )}
        <div className='editor-elements'>
          {content.map((element: ElementData, index: number) => (
            <Element
              key={index}
              index={index}
              focused={currentIndex == index}
              onChange={handleOnChange}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onFocus={handleOnFocus}
              onNext={handleNext}
              onPrev={handlePrev}
              onSelect={handleOnSelect}
              {...element}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

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
      cursorToEnd();
    }
  }, [focused, selected]);

  function handleInput(e: React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const text = ref.current?.innerHTML;
    onChange(index, { type, tag, text });
  }

  function handleOnKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    element: ElementData
  ) {
    const text = ref.current?.innerHTML;
    callbackOnKey(e, 13, () => {
      onAdd(index, element);
      setSelected(false);
    });
    callbackOnKey(
      e,
      8,
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!text) {
          e.preventDefault();
          onRemove(index);
          setSelected(false);
        }
      },
      false
    );
    callbackOnKey(e, 38, () => {
      onPrev();
      setSelected(false);
    });
    callbackOnKey(e, 40, () => {
      onNext();
      setSelected(false);
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
          handleOnKeyDown(e, { type, tag });
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

export default Editor;
