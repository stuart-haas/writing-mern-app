import React, { useState, useEffect, useRef } from 'react';
import { updateStory } from 'services/api';
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
      setContent([...content.slice(0, index)]);
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

  function setFormat(type: string, tag: string) {
    const contentCopy = [...content];
    const el = contentCopy[currentIndex];
    el.type = type;
    el.tag = tag;
    contentCopy[currentIndex] = el;
    setContent(contentCopy);
    setCurrentIndex(currentIndex);
  }

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
        <div className='editor-tools'>
          <div
            className='editor-tool'
            onClick={() => {
              setFormat('heading', 'h1');
            }}
          >
            Heading
          </div>
          <div
            className='editor-tool'
            onClick={() => {
              setFormat('paragraph', 'p');
            }}
          >
            Paragraph
          </div>
        </div>
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
    focused,
  } = props;

  const ref = useRef<(HTMLInputElement & Node) | undefined>();

  useEffect(() => {
    if (focused) {
      ref.current?.focus();
      focusEndOfContenteditable(ref.current);
    }
  }, [focused]);

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
    const { keyCode } = e;
    if (keyCode === 13) {
      e.preventDefault();
      onAdd(index, element);
    }
    if (keyCode == 8) {
      if (!text) {
        e.preventDefault();
        onRemove(index);
      }
    }
    if (keyCode == 38) {
      onPrev();
    }
    if (keyCode == 40) {
      onNext();
    }
  }

  function handleOnFocus() {
    onFocus(index);
    ref.current?.focus();
    focusEndOfContenteditable(ref.current);
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
        onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => {
          handleInput(e);
        },
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
          handleOnKeyDown(e, { type, tag });
        },
        onFocus: () => {
          handleOnFocus();
        },
        dangerouslySetInnerHTML: { __html: text },
      })}
    </div>
  );
};

function focusEndOfContenteditable(
  element: (HTMLInputElement & Node) | undefined
) {
  let range, selection;
  if (document.createRange) {
    range = document.createRange();
    range.selectNodeContents(element as Node);
    range.collapse(false);
    selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}

export default Editor;
