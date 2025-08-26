# CodeMirror language support for Pkl

This package provides CodeMirror 6 language support for [Pkl](https://pkl-lang.org/): syntax highlighting, indentation, and basic folding.

## Install

```bash
npm install codemirror-lang-pkl
```

## Use

```ts
import {EditorState} from "@codemirror/state"
import {EditorView, basicSetup} from "codemirror"
import {pkl} from "codemirror-lang-pkl"

new EditorView({
  state: EditorState.create({
    doc: "module com.example\n\nfunction add(x: Int) = x + 1\n",
    extensions: [basicSetup, pkl()]
  }),
  parent: document.querySelector("#editor")!
})
```

## Features

- Highlighting for Pkl keywords, operators, built-in types
- Indentation for blocks, calls, object literals
- Folding for blocks, classes, object declarations, and `new { ... }`

## File types

- Recognized extensions: `.pkl`, `.pcf`

## Status / Known limitations

- Grammar cover core expressions, declarations, and common constructs used in Pkl code. 
- Some advanced or less common features may be incomplete, such as string interpolation.
- If you run into a construct that should parse but doesn’t, please open an issue with a minimal example.

## Build & Test

```bash
npm run prepare
npm test
```
