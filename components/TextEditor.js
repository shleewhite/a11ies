// /* eslint-disable react/no-unused-state */
import React, { useState, useEffect, useRef } from "react";
import Turndown from "turndown";

const turndownService = new Turndown();

const CONFIG = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'strikethrough',
      'underline',
      '|',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'blockQuote',
      'indent',
      'outdent',
      '|',
      'undo',
      'redo',
      'removeFormat'
    ]
  }
};

const TextEditor = ({
  id,
  name,
  label,
  required,
  defaultValue,
  error,
  whenMarkdownUpdates
}) => {
  const editorRef = useRef();
  const {CKEditor, CustomEditor} = editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [markdown, setMarkdown] = useState(turndownService.turndown(defaultValue));
  const keyboardInfoId = `${id}-keyboard-info`;
  const errorId = `${id}-error-info`;

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react'),
      CustomEditor: require('ckeditor5-build-custom/build/ckeditor')
    }
    setEditorLoaded(true)
  }, []);

  return (
    <>
      <span>
        <span className="b">{label}</span>
        {required ? <span> (required)</span> : null}
      </span>
      <small id={keyboardInfoId}>
        Press Alt + F10 to navigate to text editor toolbar. Use the text
        editor toolbar or markdown syntax to format.
      </small>
      {editorLoaded ? (
        <CKEditor
          editor={CustomEditor}
          // eslint-disable-next-line no-unused-vars
          onBlur={(event, editor) => {
            const md = turndownService.turndown(editor.getData());
            if (whenMarkdownUpdates) {
              whenMarkdownUpdates(md);
            }
            setMarkdown(md);
          }}
          config={CONFIG}
          data={defaultValue}
          onInit={(editor) => {
            /* Hack to set aria-label */
            editor.editing.view.change((writer) => {
              const viewEditableRoot = editor.editing.view.document.getRoot();
              writer.setAttribute(
                "aria-label",
                `${label}, Rich Text Editor`,
                viewEditableRoot
              );
              writer.setAttribute(
                "aria-describedby",
                `${errorId} ${keyboardInfoId}`,
                viewEditableRoot
              );
              writer.setAttribute("id", id, viewEditableRoot);
            });
          }}
        />
      ) : (
        <div role="status">Loading editor...</div>
      )}
      <textarea
        name={name}
        readOnly
        style={{ display: "none" }}
        value={markdown}
      />
      <div className="input-error" id={errorId}>
        {error}
      </div>
      <style jsx>
        {`
          small {
            display: block;
            font-size: var(--text-s);
            padding-bottom: var(--space-s);
          }

          .input-error {
            color: var(--emphasis-c);
            font-weight: 800;
          }

          *[role="status"] {
            height: 25em;
          }
        `}
      </style>
    </>
  );
}

TextEditor.defaultProps = {
  name: "textEditor",
  label: "Text Editor",
  error: null,
  id: "SOMETHING_UNIQUE",
  defaultValue: ""
};

export default TextEditor;
