# ThyQrcode

This is a web component to generate QR-Codes. It supports two types ("text" and "wifi") that can be 
set via the type-attribute. It then renders the inputs accordingly. Supports unicode emojis 😀.

![Screenshot](https://smart-sign.com/npm/thy-qrcode/screenshot.png)

## Features
 - small
 - lightweight
 - framework agnostic (like any other true web component)
 - integrates for example with vanilla, vue, react, angular, svelte, solid.js and many more

## Examples
```
    <thy-qrcode></thy-qrcode> // default type is "text"

    <thy-qrcode hide-inputs></thy-qrcode>

    <thy-qrcode width="300" hint="click QR code to download"></thy-qrcode>

    <thy-qrcode hint="click QR code to download" type="wifi" background-color="#acf2e2" color="#9440ad"></thy-qrcode>

    <thy-qrcode type="wifi"></thy-qrcode>
```


## Installation
```
npm install thy-qrcode
```

## Usage

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My fancy app</title>
    <script type="module">import 'thy-qrcode';</script>
  </head>
  <body>
    <thy-qrcode></thy-qrcode>
  </body>
</html>
```

## Attributes
The following attributes are available:
| attribute name | type | default value | info |
| --- | --- | --- | --- |
| ``` type ``` | ``` text\|wifi ``` | ```text```| |
| ``` value ``` | ``` string ``` | ```"Input some text"```| only relevant if type="text" |
| ``` width ``` | ``` number ``` | ``` 225 ```| width in px |
| ``` color ``` | ``` string ``` | ``` #333333 ```| foreground-color of qrcode (RGB Hex-string) |
| ``` background-color ``` | ``` string ``` | ``` #FFFFFF ```| background-color of qrcode (RGB Hex-string) |
| ``` hint ``` | ``` string\|null ``` | ``` null ```| text underneath QR code |
| ``` hide-inputs ``` | ``` boolean ``` | ``` false ```| hide all input elements |

## Demo (or it didn't happen)
[VISIT DEMO SITE](https://smart-sign.com/npm/thy-qrcode/)

## ✨ Happy QR coding ! 🕺