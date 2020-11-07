/* eslint-disable react/no-unused-state */
import React from "react";
import nanoid from "nanoid";
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
  },
};

class TextEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      markdown: "",
      isServer: true,
      keyboardInfoId: undefined,
    };

    this.getMarkdownFromEditor = this.getMarkdownFromEditor.bind(this);
  }

  // CKEditor doesn't work with Next.js OOTB, need to hack it.
  // https://github.com/ckeditor/ckeditor5-react/issues/36
  componentDidMount() {
    this.CKEditor = require("@ckeditor/ckeditor5-react");
    this.ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
    this.setState({
      isServer: false,
      keyboardInfoId: nanoid(),
    });
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
        <small
          className="f6 black-60 db mt1 mb3"
          id={this.state.keyboardInfoId}
        >
          Press Alt + F10 to navigate to text editor toolbar.
        </small>
        <textarea
          name={this.props.name}
          readOnly
          style={{ display: "none" }}
          value={this.state.markdown}
        />
      </>
    );
  }
}

TextEditor.defaultProps = {
  name: "textEditor",
  label: "Rich Text Editor",
};

export default TextEditor;
