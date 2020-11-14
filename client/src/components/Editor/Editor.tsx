import React, { useCallback, useEffect, useState } from 'react';
import { updateStory } from 'services/api';
import Element, { ElementData } from './Element';
import { usePrevious } from 'utils/hooks';
import styles from './Editor.module.scss';

interface EditorProps {
  id: string;
  title: string;
  content: ElementData[];
}

const Editor = (props: EditorProps) => {
  const [content, setContent] = useState<ElementData[]>(props.content);
  const [shadowContent, setShadowContent] = useState<ElementData[]>(
    props.content
  );
  const [title, setTitle] = useState<string>(props.title);
  const prevTitle = usePrevious(props.title);

  const [toolbarPosition, setToolbarPosition] = useState<DOMRect>();
  const [selectedText, setSelectedText] = useState<string>();
  const [selectedRange, setSelectedRange] = useState<Range>();

  const [prevContext, setPrevContext] = useState<ElementData[]>([]);
  const [prevContent] = useState<string>(JSON.stringify(content));

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [dirty, setDirty] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (prevTitle && title) {
      setDirty(prevTitle !== title);
    }
  }, [prevTitle, title]);

  useEffect(() => {
    setPrevContext(JSON.parse(prevContent));
  }, [content]);

  useEffect(() => {
    if (dirty) {
      setMessage('You have unsaved changes');
      setSaved(false);
    }
  }, [dirty]);

  useEffect(() => {
    if (saved) {
      setMessage('Saved!');
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }
  }, [saved]);

  const handleDirty = useCallback((value: boolean) => {
    setDirty(value);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const response = await updateStory(props.id, {
        title,
        content: JSON.stringify(shadowContent),
      });
      const { data } = response;
      setTitle(data.title);
      setContent(JSON.parse(data.content));
      setShadowContent(JSON.parse(data.content));
      setDirty(false);
      setSaved(true);
    } catch (error) {
      console.log(error);
    }
  }, [title, shadowContent]);

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
      <div className={styles.controls}>
        <button className={styles.button} onClick={() => handleSave()}>
          Save
        </button>
        <span
          className={`${styles.message} ${
            dirty || saved ? 'is-visible' : 'is-hidden'
          }`}
        >
          {message}
        </span>
      </div>
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
              dirty={dirty}
              focused={currentIndex === index}
              prevContext={prevContext[index]}
              onDirty={handleDirty}
              onChange={handleChange}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onFocus={handleFocus}
              onNext={handleNext}
              onPrev={handlePrev}
              onSelect={handleSelect}
              {...element}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Editor;
