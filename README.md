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

**text:** The content to be checked must be sent to the function in the text variable.

**start_index:** Repetitive word groups are searched in the content by dividing them into parts as 1, 2, 3 in order. You can use this variable to determine how many parts to start checking. For example, if it is not important how many times groups of 1 word occur in the content, you can send this variable as 2. If 2 is sent, it starts checking by dividing into groups of 2. It continues the check by dividing into groups of 2, 3, 4, 5 words.


**Sample Response**

```js
[
  { item: "Norton's theorem", count: 2, parseCount: 2 },
  { item: "Norton's", count: 2, parseCount: 1 },
  { item: 'a', count: 20, parseCount: 1 },
  { item: 'in', count: 5, parseCount: 1 },
  { item: 'the', count: 5, parseCount: 1 },
  { item: 'analysis', count: 2, parseCount: 1 },
  { item: 'of', count: 2, parseCount: 1 },
]
```
The start_index variable is not sent in this query. If it was sent as 2, it would return an array with only 1 variable. 

**item:** This variable returns multiple occurrences within the content. 

**count:** This variable returns the number of times the fragment is used in the content.

**parseCount:** This variable returns how many words the fragment consists of.
