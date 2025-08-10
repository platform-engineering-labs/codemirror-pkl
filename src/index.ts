import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside, delimitedIndent} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"

export const pklLanguage = LRLanguage.define({
  name: "pkl",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        FunctionCall: delimitedIndent({closing: ")", align: false}),
        Block: delimitedIndent({closing: "}", align: true})
      }),
      foldNodeProp.add({
        Block: foldInside,
        FunctionCall: foldInside
      }),
      styleTags({
        "amends import module": t.moduleKeyword,
        Identifier: t.propertyName,
        Boolean: t.bool,
        String: t.string,
        NumberLiteral: t.number,
        LineComment: t.lineComment,
        BlockComment: t.blockComment, 
        DocComment: t.docComment,
        "( )": t.paren,
        "{ }": t.brace,
        "[ ]": t.squareBracket,
        "Function": t.function(t.keyword),
        "Return": t.controlKeyword
      })
    ]
  }),
  languageData: {
    commentTokens: {line: "//", block: {open: "/*", close: "*/"}}
  }
})

export function pkl() {
  return new LanguageSupport(pklLanguage)
}
