declare module 'eslint-plugin-promise' {
  export const configs: {
    recommended: FlatConfig.ConfigArray;
    all: FlatConfig.ConfigArray;
    'flat/recommended': FlatConfig.ConfigArray;
  };
}

declare module 'eslint-plugin-unicorn' {
  export const configs: {
    recommended: FlatConfig.ConfigArray;
    all: FlatConfig.ConfigArray;
    'flat/recommended': FlatConfig.ConfigArray;
  };
}

declare module 'eslint-plugin-functional' {
  export const configs: {
    recommended: {
      rules: {
        'functional/no-conditional-statements': [
          'error',
          {
            ignore: ['if', 'else if'];
          },
        ];
      };
    };
    all: FlatConfig.ConfigArray;
    'flat/recommended': FlatConfig.ConfigArray;
  };
}
