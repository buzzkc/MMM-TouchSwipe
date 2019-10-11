# MMM-TouchSwipe
This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

A MagicMirror module for touch screen swipe events to change pages in MMM-Pages. Displays as an area to swipe on to capture the events.

Home icon returns user to first page.

![](./images/MMM-TouchSwipe.png)


## Installation
### Setup the MagicMirror module
~MagicMirror/modules

git clone https://github.com/buzzkc/MMM-TouchSwipe.git


### Using the module

To use this module, add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
              module: "MMM-TouchSwipe",
              position: "bottom_bar",
              config: {
                    helpText: "Touch or Swipe Here",
              }
        },
    ]
}
```

### Configuration options

| Option            | Description
|-----------------  |-----------
| `helpText`        | *Optional* Help text to be displayed in touch area.
|                   |

## Future ideas
* Add swipe indicators

## Thanks To
* MichMich for developing [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
* The [MMM-Pages](https://github.com/edward-shen/MMM-pages) module by Edward Shen