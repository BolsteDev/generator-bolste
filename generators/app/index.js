'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = require('path');

var ReactComponent = require('../react/index');
var ScssComponent = require('../scss/index');
var StoryComponent = require('../story/index');
var TestComponent = require('../test/index');

module.exports = function (_Generator) {
  _inherits(_class, _Generator);

  function _class(args, opts) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, args, opts));

    _this.pkg = require('../../package.json');
    _this.argument('name', { type: String, required: false });
    return _this;
  }

  _createClass(_class, [{
    key: 'prompting',
    value: function prompting() {
      var _this2 = this;

      var done = this.async();

      this.log(_chalk2.default.bold.underline('Creating a React Modlet') + '\u2026');

      if (this.options.name) {
        this.componentName = this.options.name;
        done();
        return;
      }

      var prompts = [{
        type: 'input',
        name: 'componentName',
        message: 'What is the name of your component?',
        default: 'New Component'
      }];

      this.prompt(prompts).then(function (props) {
        Object.keys(props).forEach(function (key) {
          _this2[key] = props[key];
        });
        done();
      });
    }
  }, {
    key: 'writing',
    value: function writing() {
      var _this3 = this;

      var original = this.componentName;
      [{
        component: ReactComponent,
        path: '../react/templates/_Component.js',
        outExtension: 'js'
      }, {
        component: ScssComponent,
        path: '../scss/templates/_Component.scss',
        outExtension: 'scss'
      }, {
        component: StoryComponent,
        path: '../story/templates/_Component.story.js',
        outExtension: 'story.js'
      }, {
        component: TestComponent,
        path: '../test/templates/_Component.test.js',
        outExtension: 'test.js'
      }].forEach(function (item) {
        // Reset the original name
        _this3.componentName = original;

        item.component.prototype._createTemplateVars.call(_this3);
        _this3.fs.copyTpl(path.resolve(path.join(__dirname, item.path)), _this3.destinationPath(_this3.componentName + '.' + item.outExtension), _this3);
      });
    }
  }, {
    key: 'end',
    value: function end() {
      this.log('' + _chalk2.default.green('Done!'));
    }
  }]);

  return _class;
}(_yeomanGenerator2.default);
