# JavaScript Utilities - (js-utils)
(so far just a few borrowed from Rails)

## blank
The opposite of [present](##present):  
```javascript
blank(x) === !present(x)
```

A value is `blank` if it is:
```javascript
false
null
undefined
NaN
''
'  '
[]
{}
```

Examples:
```javascript
const { blank } = require('js-utils');

blank('  ');
// => true
blank('');
// => true
blank([]);
// => true
blanks({});
// => true

blank('Hey there');
// => false
blank([1, 2, 3]);
// => false
blank({ a: 1, b: 2 });
// => false
```

`blank` is helpful for guard statements such as:
```javascript
function validateConfig(config) {
  if (blank(config)) {
    throw new Error("Whoops! Looks like you did not pass in a config.");
  }

  // ...

}
```

## present
The opposite of [blank](##blank):  
```javascript
present(x) === !blank(x)
```


Examples:
```javascript
const { present } = require('js-utils');

present({});
// => false
present({ a: 1, b: 2 });
// => true
```

`present` is helpful if your checking for a non empty value for something
```javascript
let response = makeRequest(someUrl);

if (present(response.errors)) {
  // response.errors is a non-empty string, array, or object
  // so we're pretty sure something is wrong
  console.error(response.errors);
}

// ...
```

## presence
`presence` returns false for a `blank` value, and returns the value if it's `present`  
So `presence` is equivalent to `present(x) ? x : false`

Examples:
```javascript
const { presence } = require('js-utils');

presence({});
// => false
presence({ a: 1 });
// => { a: 1 }
```

`presence` is helpful for dynamically assigning values
```javascript
let params = { state: null, country: 'France' };
let bestKnownLocation = presence(params.state) || presence(params.country) || 'US';

console.log(bestKnownLocation);
// => 'France'
```
