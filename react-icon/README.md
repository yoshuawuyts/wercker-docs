# react-icon
Create a react icon with minimal styles set.

## Usage
```js
var icon = require('react-icon');
var react = require('react');

react.createClass({
  render: () => icon({
    className: 'icon-chique',
    children: '<svg>__valid svg string here__</svg>',
    onClick: () => console.log('icon was clicked')
  })
});
```

## API
#### icon(opts)
Of the `opts` object the only mandatory argument is `children`, which sets
the inner text of the icon. `className` appends a className to the `icon`
class.
