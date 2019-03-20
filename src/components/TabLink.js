import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const defaultActiveStyle = {
  fontWeight: 'bold',
};

class TabLink extends Component {
  static displayName = 'TabLink';

  handleClick = e => {
    this.props.handleSelect(this.props.to, this.props.namespace);

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  handleKeyPress = e => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();

      this.handleClick(e);
    }
  };

  render() {
    const {
      to,
      handleSelect,
      isActive,
      namespace,
      activeStyle,
      disableInlineStyles,
      className,
      activeClassName,
      style,
      ...passedProps
    } = this.props;

    const _className = className || 'tab-link';
    const _activeClassName = activeClassName || 'tab-link-active';
    const _style = {
      ...style,
      ...((isActive && (activeStyle || defaultActiveStyle)) || {}),
    };
    const componentType = this.props.component || 'button';

    return React.createElement(
      componentType,
      {
        id: `tab-${to}`,
        role: 'tab',
        'aria-selected': isActive ? 'true' : 'false',
        'aria-controls': `tabpanel-${to}`,
        className: classNames({
          [_className]: true,
          [_activeClassName]: isActive,
        }),
        style: (!disableInlineStyles && _style) || undefined,
        ...passedProps,
        onKeyPress: this.handleKeyPress,
        onClick: this.handleClick,
      },
      this.props.children,
    );
  }
}

TabLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  component: PropTypes.string,
  handleSelect: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.node,
  isActive: PropTypes.bool,
  namespace: PropTypes.string,
  activeStyle: PropTypes.object,
  disableInlineStyles: PropTypes.bool,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
  style: PropTypes.object,
  default: PropTypes.bool
};

export default TabLink;
