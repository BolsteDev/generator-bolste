#!/bin/sh

babel generators/app/index.es6.js --out-file generators/app/index.js
babel generators/react/index.es6.js --out-file generators/react/index.js
babel generators/scss/index.es6.js --out-file generators/scss/index.js
babel generators/story/index.es6.js --out-file generators/story/index.js
babel generators/test/index.es6.js --out-file generators/test/index.js
