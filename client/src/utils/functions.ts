export function callbackOnKey(
  e: React.KeyboardEvent<HTMLInputElement>,
  key: number,
  callback: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  prevent = true
) {
  if (e.keyCode === key) {
    if (prevent) e.preventDefault();
    callback(e);
  }
}

export function cursorToEnd() {
  document.execCommand('selectAll', false, '');
  document?.getSelection()?.collapseToEnd();
}
