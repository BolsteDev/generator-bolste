import chalk from 'chalk';
import Generator from 'yeoman-generator';

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.pkg = require('../../package.json');
    this.argument('name', { type: String, required: false });
  }

  prompting() {
    const done = this.async();

    this.log(
      `${chalk.bold.underline('Creating a story file')}…`
    );

    if (this.options.name) {
      this.componentName = this.options.name;
      done();
      return;
    }

    const prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'What is the name of your story?',
      default: 'New Component',
    }];

    this.prompt(prompts, (props) => {
      Object.keys(props).forEach((key) => {
        this[key] = props[key];
      });
      done();
    });
  }

  _createTemplateVars() {
    const original = this.componentName;

    this.originalName = original;
    this.componentName = original
      .split(' ')
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .reduce((a, b) => a + b);
    this.lowerComponentName = this.componentName
        .slice(0, 1)
        .toLowerCase() + this.componentName.slice(1);
  }

  writing() {
    this._createTemplateVars();
    this.fs.copyTpl(
      this.templatePath('_Component.story.js'),
      this.destinationPath(`${this.componentName}.story.js`),
      this
    );
  }

  end() {
    this.log(
      `${chalk.green('Done!')}`
    );
  }
};
