import {LRLanguage, LanguageSupport, indentNodeProp, delimitedIndent, foldNodeProp} from "@codemirror/language"
import {styleTags, tags as t} from "@lezer/highlight"
import {parser} from "./syntax.grammar"

export const pklLanguage = LRLanguage.define({
  name: "pkl",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Call: delimitedIndent({closing: ")", align: false}),
        LambdaExpression: delimitedIndent({closing: ")", align: false}),
        Block: delimitedIndent({closing: "}", align: true}),
        ObjectLiteral: delimitedIndent({closing: "}", align: true})
      }),
      foldNodeProp.add({
        ObjectLiteral(node) {
          const open = node.getChild("{")
          const close = node.getChild("}")
          return open && close && open.to < close.from ? {from: open.to, to: close.from} : null
        },
        ObjectDeclaration(node) {
          const open = node.getChild("{")
          const close = node.getChild("}")
          return open && close && open.to < close.from ? {from: open.to, to: close.from} : null
        },
        ClassDeclaration(node) {
          const open = node.getChild("{")
          const close = node.getChild("}")
          return open && close && open.to < close.from ? {from: open.to, to: close.from} : null
        },
        Block(node) {
          const open = node.getChild("{")
          const close = node.getChild("}")
          return open && close && open.to < close.from ? {from: open.to, to: close.from} : null
        },
        NewExpression(node) {
          const open = node.getChild("{")
          const close = node.getChild("}")
          return open && close && open.to < close.from ? {from: open.to, to: close.from} : null
        }
      }),
      styleTags({
        "amends import module": t.moduleKeyword,
        
        "hidden local abstract external open in out fixed const extends": t.modifier,
        
        "when for let read read? throw trace is": t.controlKeyword,
        "if else": t.controlKeyword,
        
        "function class typealias": t.definitionKeyword,
        
        // Variable language keywords
        "this module outer super": t.self,
        "new": t.controlKeyword,
        
        // Built-in Pkl types
        "String Int Int8 Int16 Int32 UInt UInt8 UInt16 UInt32 Float Boolean Duration DataSize Uri Regex Any Dynamic Typed Listing Mapping Set Map List Collection Iterable Function IntSeq Class TypeAlias Module Resource VarArgs": t.typeName,
        "unknown never": t.typeName,
        
        // Grammar nodes
        "SimpleType UnionType NullableType ParenthesizedType": t.typeName,
        "TypeAtom": t.typeName,
        "BuiltinType": t.typeName,
        "LambdaExpression": t.function(t.variableName),
        "ForStatement": t.controlKeyword,
        "ModuleDeclaration": t.moduleKeyword,
        "ClassDeclaration": t.definitionKeyword,
        "TypeAliasDeclaration": t.definitionKeyword,
        
        // Contextual identifiers
        ModuleName: t.namespace,
        Definition: t.variableName,
        ForVariable: t.variableName,
        MemberName: t.propertyName,
        
        // Basic identifiers - Path overrides for parity with text mate (target leaf identifiers)
        "FunctionDeclaration/Definition/Identifier": t.function(t.variableName),
        "ObjectDeclaration/Definition/Identifier": t.propertyName,
        "objectEntry/Definition/Identifier": t.propertyName,
        "ForStatement/ForVariable/Definition/Identifier": t.propertyName,
        
        "ClassDeclaration/Identifier": t.typeName,
        "TypeAliasDeclaration/Identifier": t.typeName,
        "SimpleType/Identifier": t.typeName,
        "SimpleType/QualifiedType/Identifier": t.typeName,
        "QualifiedType/Identifier": t.typeName,
        "UnionType/Identifier": t.typeName,
        "ParenthesizedType/Identifier": t.typeName,
        "NewExpression/Identifier": t.typeName,
        "NewExpression/QualifiedType/Identifier": t.typeName,
        Identifier: t.variableName,
        QuotedIdentifier: t.propertyName,
        Annotation: t.annotation,
        Boolean: t.bool,
        '"null"': t.null,
        String: t.string,
        Number: t.number,
        SupportType: t.typeName,
        
        LineComment: t.lineComment,
        BlockComment: t.blockComment, 
        DocComment: t.docComment,
        
        // Punctuation
        "( )": t.paren,
        "{ }": t.brace,
        "[ ]": t.squareBracket,
        ".": t.punctuation,
        "?.": t.punctuation,
        "< >": t.punctuation,
        ":": t.punctuation,
        ";": t.punctuation,
        ",": t.separator,
        "`": t.punctuation,
        "@": t.punctuation,
        
        // Operators
        '"as"': t.operatorKeyword,
        '"is"': t.operatorKeyword,
        "BinaryExpression": t.operator,
        "UnaryExpression": t.operator,
        "=": t.definitionOperator
      })
    ]
  }),
  languageData: {
    commentTokens: {line: "//", block: {open: "/*", close: "*/"}},
    fileExtensions: ["pkl", "pcf"]
  }
})

export function pkl() {
  return new LanguageSupport(pklLanguage)
}
