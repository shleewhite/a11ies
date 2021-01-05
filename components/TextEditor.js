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
      errorId: nanoid(8)
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
        <span>
          <span className="b">{this.props.label}</span>
          {this.props.required ? (<span> (required)</span>) : null}
        </span>
        <small id={this.state.keyboardInfoId}>
          Press Alt + F10 to navigate to text editor toolbar. Use the text editor toolbar or markdown syntax to format. 
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
                  `${this.props.label}, Rich Text Editor`,
                  viewEditableRoot
                );
                writer.setAttribute(
                  "aria-describedby",
                  `${this.state.errorId} ${this.state.keyboardInfoId}`,
                  viewEditableRoot
                );
                writer.setAttribute(
                  "id",
                  this.props.id,
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
        <div className="input-error" id={this.state.errorId}>
          {this.props.error}
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
          `}
        </style>
      </>
    );
  }
}

TextEditor.defaultProps = {
  name: "textEditor",
  label: "Text Editor",
  error: null,
  id: "SOMETHING_UNIQUE"
};

export default TextEditor;
