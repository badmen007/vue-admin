module.exports = {
    // 环境 针对那些环境的语法进行检查
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        // 集成了一些规则
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential",
        "@vue/prettier",
    ],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "rules": {
      // 自定义规则
      "prettier/prettier": [
      "error",
      {
        singleQuote: true, // 使用单引号
        semi: false, // 不使用分号
        tabWidth: 2, // 缩进2个空格
        trailingComma: 'none', // 不使用尾逗号
        useTabs: false, // 不使用tab缩进
        endOfLine: 'auto', // 自动识别换行是LF还是CRLF，默认prettier是LF
      }
    ] 
    }
}
