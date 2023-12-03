# Density Detection

This library allows you to detect content density. It thoroughly analyzes a string you send and returns the most used words and phrases with the usage count and length variables.

```bash
npm i density-detection
```

```js
const detector = require("density-detection");
var check = detector.detect({
    text:`<text>`,
    start_index:1 // not mandatory default 1
})
console.log(check)
```