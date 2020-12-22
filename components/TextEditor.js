/* eslint-disable react/no-unused-state */
import React from "react";
import { english as nanoid } from "nanoid-generate"; // generates unique id without characters that look similar ie. 1 and I
import Turndown from "turndown";

const turndownService = new Turndown();

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
    ],
  }
};

class TextEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      markdown: "",
      isServer: true,
      keyboardInfoId: nanoid(8),
    };

    this.getMarkdownFromEditor = this.getMarkdownFromEditor.bind(this);
  }

  // CKEditor doesn't work with Next.js OOTB, need to hack it.
  // https://github.com/ckeditor/ckeditor5-react/issues/36
  componentDidMount() {
    this.CKEditor = require("@ckeditor/ckeditor5-react");
    this.ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
    this.setState({ isServer: false });
  }

  getMarkdownFromEditor(editor) {
    const markdown = turndownService.turndown(editor.getData());
    this.setState({ markdown });
    if (this.props.whenMarkdownUpdates) {
      this.props.whenMarkdownUpdates(markdown);
    }
  }

  render() {
    return (
      <>
        <small id={this.state.keyboardInfoId}>
          Press Alt + F10 to navigate to text editor toolbar.
        </small>
        {this.CKEditor && (
          <this.CKEditor
            editor={this.ClassicEditor}
            config={CONFIG}
            onBlur={(event, editor) => {
              this.getMarkdownFromEditor(editor);
            }}
            onInit={(editor) => {
              /* Hack to set aria-label */
              editor.editing.view.change((writer) => {
                const viewEditableRoot = editor.editing.view.document.getRoot();
                writer.setAttribute(
                  "aria-label",
                  this.props.label,
                  viewEditableRoot
                );
                writer.setAttribute(
                  "aria-describedby",
                  this.state.keyboardInfoId,
                  viewEditableRoot
                );
              });
            }}
          />
        )}
        <textarea
          name={this.props.name}
          readOnly
          style={{ display: "none" }}
          value={this.state.markdown}
        />
        <style jsx>
          {`
            .ck-editor__editable_inline {
              min-height: 20em;
            }

            small {
              display: block;
              font-size: var(--text-s);
              padding-bottom: var(--space-s);
            }
          `}
        </style>
      </>
    );
  }
}

TextEditor.defaultProps = {
  name: "textEditor",
  label: "Rich Text Editor",
};

export default TextEditor;
