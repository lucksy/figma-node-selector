
# Tags & Attributes

The "figma-node-selector" package offers a straightforward and powerful interface for Figma plugin developers, enabling them to select and manipulate Figma nodes through an intuitive syntax. This package is designed to be used in conjunction with the "Tags & Attributes" plugin.

Utilizing custom tags and attributes stored within figmaSharedPluginData by the "Tags & Attributes" plugin, this module facilitates an easy way to select and retrieve nodes, thus simplifying node manipulation.

Once you have applied tags to your Figma file, you can query and select nodes using the simple syntax e.g., (`$F('tagName')`, `$F('.classname')`, `$F('#id')`).

## Installation

To install the package, run the following command in your terminal:

```sh
npm install figma-node-selector
```

## Usage

First, ensure, your design elements applied data via the "Tags & Attributes" plugin
Secound, ensure your have permission to access the `figmaSharedPluginData`.

Then, you can use the package as follows:

```javascript
const FigmaNodeSelector = require('figma-node-selector');

// Initialize the selector
const $F = new FigmaNodeSelector();

// Select nodes by class name
const buttons = $F('.button');

// Select nodes by tag name
const textNodes = $F('tagName');

// Select nodes by ID
const primaryButton = $F('#primaryButton');

// Further selections and manipulations can be implemented as needed
```

## API Reference

### `$F(selectorString)`

Selects nodes based on the provided selector string. The string can be formatted to select by class name (`.className`), tag name (`tagName`), or ID (`#id`).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
