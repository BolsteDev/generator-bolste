import chalk from 'chalk';
import Generator from 'yeoman-generator';

const path = require('path');

const ReactComponent = require('../react/index');
const ScssComponent = require('../scss/index');
const StoryComponent = require('../story/index');
const TestComponent = require('../test/index');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.pkg = require('../../package.json');
    this.argument('name', { type: String, required: false });
  }

  prompting() {
    const done = this.async();

    this.log(
      `${chalk.bold.underline('Creating a React Modlet')}…`
    );

    if (this.options.name) {
      this.componentName = this.options.name;
      done();
      return;
    }

    const prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'What is the name of your component?',
      default: 'New Component',
    }];

    this.prompt(prompts).then((props) => {
      Object.keys(props).forEach((key) => {
        this[key] = props[key];
      });
      done();
    });
  }

  writing() {
    const original = this.componentName;
    [
      {
        component: ReactComponent,
        path: '../react/templates/_Component.js',
        outExtension: 'js',
      },
      {
        component: ScssComponent,
        path: '../scss/templates/_Component.scss',
        outExtension: 'scss',
      },
      {
        component: StoryComponent,
        path: '../story/templates/_Component.story.js',
        outExtension: 'story.js',
      },
      {
        component: TestComponent,
        path: '../test/templates/_Component.test.js',
        outExtension: 'test.js',
      },
    ].forEach((item) => {
      // Reset the original name
      this.componentName = original;

      item.component.prototype._createTemplateVars.call(this);
      this.fs.copyTpl(
        path.resolve(path.join(__dirname, item.path)),
        this.destinationPath(`${this.componentName}.${item.outExtension}`),
        this
      );
    });
  }

  end() {
    this.log(
      `${chalk.green('Done!')}`
    );
  }
};
