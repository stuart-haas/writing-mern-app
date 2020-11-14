import React, { useCallback, useEffect, useState } from 'react';
import { updateStory } from 'services/api';
import Element, { DirtyData, ElementData } from './Element';
import { usePrevious } from 'utils/hooks';
import styles from './Editor.module.scss';

interface EditorProps {
  id: string;
  title: string;
  content: ElementData[];
}

const Editor = (props: EditorProps) => {
  const [elements, setElements] = useState<ElementData[]>(props.content);
  const [content, setContent] = useState<string>(JSON.stringify(elements));
  const [title, setTitle] = useState<string>(props.title);
  const prevTitle = usePrevious(props.title);

  const [toolbarPosition, setToolbarPosition] = useState<DOMRect>();
  const [selectedText, setSelectedText] = useState<string>();
  const [selectedRange, setSelectedRange] = useState<Range>();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [dirty, setDirty] = useState<DirtyData[]>([]);
  const [saved, setSaved] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (prevTitle && title) {
      //setDirty(prevTitle !== title);
    }
  }, [prevTitle, title]);

  useEffect(() => {
    console.log(dirty);
    if (dirty.length) {
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

  const handleDirty = useCallback((element: DirtyData) => {
    if (element.localDirty) {
      setDirty((d: DirtyData[]) => d.concat(element));
    } else {
      setDirty((d: DirtyData[]) =>
        d.filter((el: DirtyData) => el.id !== element.id)
      );
    }
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const response = await updateStory(props.id, {
        title,
        content,
      });
      setDirty([]);
      setSaved(true);
      setTitle(title);
      setElements(JSON.parse(response.data.content));
      setContent(response.data.content);
    } catch (error) {
      console.log(error);
    }
  }, [props.id, title, content]);

  const handleChange = useCallback(
    (index: number, element: ElementData) => {
      const contentCopy = [...elements];
      contentCopy[index] = element;
      setContent(JSON.stringify(contentCopy));
    },
    [elements]
  );

  function handleAdd(index: number, element: ElementData) {
    const contentCopy = [...elements];
    element.id = contentCopy.length + 1;
    contentCopy.splice(index + 1, 0, element);
    setElements(contentCopy);
    setCurrentIndex(index + 1);
    setContent(JSON.stringify(contentCopy));
  }

  function handleRemove(index: number) {
    if (elements.length > 1) {
      const contentCopy = [...elements];
      contentCopy.splice(index, 1);
      setElements(contentCopy);
      setCurrentIndex((prevIndex: number) => prevIndex - 1);
      setContent(JSON.stringify(contentCopy));
    }
  }

  function handleNext() {
    if (currentIndex < elements.length - 1) {
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
    const contentCopy = [...JSON.parse(content)];
    const el = contentCopy[currentIndex];
    el.type = type;
    el.tag = tag;
    contentCopy[currentIndex] = el;
    setElements(contentCopy);
    setCurrentIndex(currentIndex);
    setContent(JSON.stringify(contentCopy));
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
            dirty.length ? 'is-visible' : 'is-hidden'
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
          {elements.map((element: ElementData, index: number) => (
            <Element
              key={element.id}
              index={index}
              dirty={dirty}
              focused={currentIndex === index}
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
