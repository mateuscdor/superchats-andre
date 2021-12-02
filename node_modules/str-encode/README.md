# Usage

## Install

`$ npm install --save str-encode`

## Require

`const strEncode = require('str-encode');`

## Encode

```
let encoding = 'base64'; // output encoding

let str = 'Hello World';  // String to encode

let encodedStr = strEncode(str, encoding);

console.log("%s encoded to %s: %s", str, encoding, encodedStr);

// Returns: Hello World encoded to base64: SGVsbG8gV29ybGQ=
```
## Supported encodings

```
  'ascii',
  'base64',
  'binary',
  'hex',
  'ucs2',
  'ucs-2',
  'utf16le',
  'utf-16le',
  'utf8',
  'utf-8',
  'latin1'
```