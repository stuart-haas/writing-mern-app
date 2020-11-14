import React, { useEffect, useState } from 'react';
import { updateStory } from 'services/api';
import Element, { ElementData } from './Element';
import styles from './Editor.module.scss';

interface EditorProps {
  id: string;
  title: string;
  content: ElementData[];
}

const Editor = (props: EditorProps) => {
  const [content, setContent] = useState<ElementData[]>([...props.content]);
  const [shadowContent, setShadowContent] = useState<ElementData[]>([
    ...props.content,
  ]);
  const [title, setTitle] = useState(props.title);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [toolbarPosition, setToolbarPosition] = useState<DOMRect>();
  const [selectedText, setSelectedText] = useState<string>();
  const [selectedRange, setSelectedRange] = useState<Range>();
  const [prevContext, setPrevContext] = useState<ElementData[]>([]);
  const [prevContent] = useState(JSON.stringify(content));

  useEffect(() => {
    setPrevContext(JSON.parse(prevContent));
  }, [content]);

  async function handleSave() {
    const response = await updateStory(props.id, {
      title,
      content: JSON.stringify(shadowContent),
    });
    console.log(response);
  }

  function handleChange(index: number, element: ElementData) {
    const contentCopy = [...shadowContent];
    contentCopy[index] = element;
    setShadowContent(contentCopy);
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

  function handleFocus(index: number) {
    setCurrentIndex(index);
  }

  function handleSelect(
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
    const contentCopy = [...shadowContent];
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
    <div className={styles.root}>
      <button onClick={() => handleSave()}>Save</button>
      <input
        className={styles.title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />
      <div className={styles.editorContent}>
        {selectedText && (
          <div
            className={styles.tools}
            style={{ left: `${toolbarX}px`, top: `${toolbarY}px` }}
          >
            <div
              className={styles.tool}
              onClick={() => {
                setFormat('heading', 'h1');
              }}
            >
              H1
            </div>
            <div
              className={styles.tool}
              onClick={() => {
                setFormat('paragraph', 'p');
              }}
            >
              P
            </div>
            <div
              className={styles.tool}
              onClick={() => {
                document.execCommand('bold');
              }}
            >
              B
            </div>
          </div>
        )}
        <div className={styles.elements}>
          {content.map((element: ElementData, index: number) => (
            <Element
              key={index}
              index={index}
              focused={currentIndex === index}
              onChange={handleChange}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onFocus={handleFocus}
              onNext={handleNext}
              onPrev={handlePrev}
              onSelect={handleSelect}
              prevContext={prevContext[index]}
              {...element}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Editor;
