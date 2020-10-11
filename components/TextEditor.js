import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import shortid from 'shortid';
import Turndown from 'turndown';

let turndownService = new Turndown();

const CONFIG = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "bulletedList",
      "numberedList",
      "|",
      "link",
    ]
  }
};

const TextEditor = ({label, name, whenMarkdownUpdates}) => {
  const keyboardInfoId = shortid.generate();
  const [markdown, setMarkdown] = useState('');

  const getMarkdownFromEditor = (editor) => {
    let markdown = turndownService.turndown(
      editor.getData()
    );
    setMarkdown(markdown);
    if(henMarkdownUpdates) whenMarkdownUpdates(markdown);
  };

  return (
    <>
      <CKEditor 
        editor={ClassicEditor}
        config={CONFIG}
        onBlur={ ( event, editor ) => { getMarkdownFromEditor(editor); }}
        onInit={ (editor) => {
          /* Hack to set aria-label */
          editor.editing.view.change( writer => {
            const viewEditableRoot = editor.editing.view.document.getRoot();
            writer.setAttribute( 'aria-label', label, viewEditableRoot);
            writer.setAttribute( 'aria-describedby', keyboardInfoId, viewEditableRoot);
          });
        }}
      />
      <small className="f6 black-60 db mt1 mb3" id={keyboardInfoId}>
        Press Alt + F10 to navigate to text editor toolbar.
      </small>
      <textarea name={name} readOnly style={{display: 'none'}} value={markdown}/>
    </>
  );
}

TextEditor.defaultProps = {
  name: 'textEditor',
  label: 'Rich Text Editor'
}

export default TextEditor;