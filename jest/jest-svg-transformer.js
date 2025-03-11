const path = require('path');
const camelCase = require('lodash/camelCase');

module.exports = {
  process(_src, filename) {
    // Only process .svg files
    if (filename.endsWith('.svg')) {
      // Get the base file name as a JSON string (e.g., "arrow-left.svg")
      const assetFilename = JSON.stringify(path.basename(filename));
      // Convert the file name to PascalCase for the component name (e.g., "ArrowLeft")
      const pascalCaseFilename = camelCase(path.parse(filename).name, {pascalCase: true});
      const componentName = `Svg${pascalCaseFilename}`;

      // Create a dummy React component for the SVG.
      const code = `
        const React = require('react');
        // Export a default value (the filename) and a React component as ReactComponent.
        module.exports = {
          __esModule: true,
          default: ${assetFilename},
          ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
            return React.createElement('svg', { ref, ...props });
          }),
        };
      `;
      return {code};
    }
    // For non-svg files (shouldn't happen), export the filename as a string.
    return {code: `module.exports = ${JSON.stringify(path.basename(filename))};`};
  },
};
