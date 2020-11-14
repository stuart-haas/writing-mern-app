import React, { useState } from 'react';
import { updateStory } from 'services/api';
import Element, { ElementData } from './Element';
import './Editor.scss';

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

export default Editor;
