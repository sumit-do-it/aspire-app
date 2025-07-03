module.exports = {
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            src: "./src",
            "@components": "./src/components",
            "@redux": "./src/redux",
            "@screens": "./src/screens",
            "@typings": "./src/typings",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
    presets: ["babel-preset-expo", "@babel/preset-typescript"],
  };
  