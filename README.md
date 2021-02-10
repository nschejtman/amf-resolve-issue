# AMF parsing and resolving issue

The parsing and resolving process is split into 2 processes.

In the first process an API is parsed and LD+JSON model is generated. This way the model can be later on restored to the library as graph model.

The second process resolves generated graph model in the first process and generates a resolved model with the "editing" pipeline.

The issue surfaces in the second process during the resolution pipeline. It throws an error.

This works as expected on Linux and on macOS! **This has to be tested on Windows**.

## steps to reproduce

`1.` Install dependencies

```sh
npm i
```

`2.` Run the parsing script that parses an API and produces ld+json graph model.

```sh
node parse.js
```

This generates the `file.json` with the result of the parsing process.

`3.` Run the resolver process that parses generated ld+json file and resolves the model.

```sh
node resolve.js
```

## Current configuration

- Windows 10 PRO: 10.0.19042 Build 19042
- Node: v14.15.3
- AMF: 4.7.0
