/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Spin } from 'antd';
import * as BaseCommands from './commands';
import Bash from './bash';
import Styles from './styles';

const CTRL_CHAR_CODE = 17;
const L_CHAR_CODE = 76;
const C_CHAR_CODE = 67;
const UP_CHAR_CODE = 38;
const DOWN_CHAR_CODE = 40;
const TAB_CHAR_CODE = 9;
const noop = () => {};

export default class Terminal extends Component {
  constructor({ history, structure, extensions, prefix }) {
    super();
    this.Bash = new Bash(extensions);
    this.ctrlPressed = false;
    this.state = {
      settings: { user: { username: prefix.split('@')[1] } },
      history: history.slice(),
      structure: Object.assign({}, structure),
      cwd: '',
      isBusy: false,
      bashExecutionsObserver: null,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    this.refs.input.focus();
  }

  componentWillReceiveProps({ extensions, structure, history }) {
    const updatedState = {};
    if (structure) {
      updatedState.structure = Object.assign({}, structure);
    }
    if (history) {
      updatedState.history = history.slice();
    }
    if (extensions) {
      this.Bash.commands = { ...extensions, ...BaseCommands };
    }
    this.setState(updatedState);
  }

  /*
   * Utilize immutability
   */
  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState || this.props !== nextProps;
  }

  /*
   * Keep input in view on change
   */
  componentDidUpdate() {
    this.refs.input.scrollIntoView(false);
  }

  /*
   * Forward the input along to the Bash autocompleter. If it works,
   * update the input.
   */
  attemptAutocomplete() {
    const input = this.refs.input.value;
    const suggestion = this.Bash.autocomplete(input, this.state);
    if (suggestion) {
      this.refs.input.value = suggestion;
    }
  }

  /*
   * Handle keydown for special hot keys. The tab key
   * has to be handled on key down to prevent default.
   * @param {Event} evt - the DOM event
   */
  handleKeyDown(evt) {
    if (evt.which === CTRL_CHAR_CODE) {
      this.ctrlPressed = true;
    } else if (evt.which === TAB_CHAR_CODE) {
      // Tab must be on keydown to prevent default
      this.attemptAutocomplete();
      evt.preventDefault();
    }
  }

  /*
   * Handle keyup for special hot keys.
   * @param {Event} evt - the DOM event
   *
   * -- Supported hot keys --
   * ctrl + l : clear
   * ctrl + c : cancel current command
   * up - prev command from history
   * down - next command from history
   * tab - autocomplete
   */
  handleKeyUp(evt) {
    if (evt.which === L_CHAR_CODE) {
      if (this.ctrlPressed) {
        const observer = this.Bash.execute('clear', this.state).then(
          nextState => {
            return new Promise(resolve => {
              this.setState(nextState, resolve);
            });
          }
        );

        // Test instrumentation
        if (this.props.observeBashExecutions) {
          this.setState({ bashExecutionsObserver: observer });
        }
      }
    } else if (evt.which === C_CHAR_CODE) {
      if (this.ctrlPressed) {
        this.refs.input.value = '';
      }
    } else if (evt.which === UP_CHAR_CODE) {
      if (this.Bash.hasPrevCommand()) {
        this.refs.input.value = this.Bash.getPrevCommand();
      }
    } else if (evt.which === DOWN_CHAR_CODE) {
      if (this.Bash.hasNextCommand()) {
        this.refs.input.value = this.Bash.getNextCommand();
      } else {
        this.refs.input.value = '';
      }
    } else if (evt.which === CTRL_CHAR_CODE) {
      this.ctrlPressed = false;
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();

    // Execute command
    const input = evt.target[0].value;

    this.setState(
      Object.assign({}, this.Bash.pushInput(input, this.state), {
        isBusy: true,
      }),
      () => {
        this.refs.input.value = '';

        // Execute command
        const observer = this.Bash.execute(input, this.state, nextState => {
          return new Promise(resolve => {
            this.setState(nextState, resolve);
          });
        })
          .then(nextState => {
            return new Promise(resolve => {
              this.setState(
                Object.assign({}, nextState, { isBusy: false }),
                resolve
              );
            });
          })
          .then(() => this.refs.input.focus());

        // Test instrumentation
        if (this.props.observeBashExecutions) {
          this.setState({ bashExecutionsObserver: observer });
        }
      }
    );
  }

  renderHistoryItem(style) {
    return ({ cwd, value }, key) => {
      const prefix =
        cwd !== undefined ? (
          <span style={style.prefix}>
            {`${this.props.prefix}${cwd ? ` ~${cwd} ` : ''}>`}
          </span>
        ) : (
          undefined
        );
      return (
        <div data-test-id={`history-${key}`} key={key}>
          {prefix}
          {value}
        </div>
      );
    };
  }

  render() {
    const {
      onClose,
      onExpand,
      onMinimize,
      prefix,
      styles,
      theme,
      className,
    } = this.props;
    const { history, cwd } = this.state;
    const style = Object.assign({}, Styles[theme] || Styles.light, styles);

    // Hide the prompt while the terminal is busy
    const formStyle = Object.assign({}, style.form);
    if (this.state.isBusy) {
      formStyle.display = 'none';
    }

    return (
      <div
        className={classNames('ReactBash', className)}
        style={style.ReactBash}
      >
        <div style={style.header}>
          <span style={style.redCircle} onClick={onClose} />
          <span style={style.yellowCircle} onClick={onMinimize} />
          <span style={style.greenCircle} onClick={onExpand} />
        </div>
        <Spin spinning={this.state.isBusy}>
          <div style={style.body} onClick={() => this.refs.input.focus()}>
            {history.map(this.renderHistoryItem(style))}
            <form onSubmit={evt => this.handleSubmit(evt)} style={formStyle}>
              <span style={style.prefix}>
                {`${prefix}${cwd ? ` ~${cwd} ` : ''}> `}
              </span>
              <input
                autoComplete="off"
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                ref="input"
                style={style.input}
              />
            </form>
          </div>
        </Spin>
      </div>
    );
  }
}

Terminal.Themes = {
  LIGHT: 'light',
  DARK: 'dark',
};

Terminal.propTypes = {
  extensions: PropTypes.object,
  history: PropTypes.array,
  onClose: PropTypes.func,
  onExpand: PropTypes.func,
  onMinimize: PropTypes.func,
  prefix: PropTypes.string,
  structure: PropTypes.object,
  styles: PropTypes.object,
  theme: PropTypes.string,

  // This property serves to enable the instrumentation of the component, so
  // that asynchronous updates of its state can be observed during testing.
  observeBashExecutions: PropTypes.bool,
};

Terminal.defaultProps = {
  extensions: {},
  history: [],
  onClose: noop,
  onExpand: noop,
  onMinimize: noop,
  prefix: 'hacker@default',
  structure: {},
  styles: {},
  theme: Terminal.Themes.LIGHT,
  observeBashExecutions: false,
};
