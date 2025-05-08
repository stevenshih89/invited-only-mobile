module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow direct import from '@react-native-firebase/firestore'. Use 'invitedOnlyBackendApi' instead.",
      category: "Best Practices",
      recommended: "warn",
    },
    fixable: null,
    schema: [], // no options
    messages: {
      noDirectFirestore: "Direct import of '{{ forbiddenModule }}' is not allowed. Use 'invitedOnlyBackendApi' to get data instead."
    }
  },
  create: function(context) {
    const forbiddenModuleName = '@react-native-firebase/firestore';

    return {
      ImportDeclaration(node) {
        if (node.source && node.source.type === 'Literal' && node.source.value === forbiddenModuleName) {
          context.report({
            node: node.source,
            messageId: "noDirectFirestore",
            data: {
              forbiddenModule: forbiddenModuleName
            }
          });
        }
      }
    };
  }
};
