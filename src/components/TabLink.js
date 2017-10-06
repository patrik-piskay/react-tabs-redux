import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const defaultActiveStyle = {
  fontWeight: 'bold',
};

class TabLink extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.handleSelect(this.props.to, this.props.namespace);

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const disableInlineStyles = this.props.disableInlineStyles;
    const className = this.props.className || 'tab-link';
    const activeClassName = this.props.activeClassName || 'tab-link-active';
    const style = {
      ...this.props.style,
      ...((this.props.isActive &&
        (this.props.activeStyle || defaultActiveStyle)) ||
        {}),
    };

    return (
      <div
        className={classNames({
          [className]: true,
          [activeClassName]: this.props.isActive,
        })}
        style={(!disableInlineStyles && style) || undefined}
        onClick={this.handleClick}
      >
        {this.props.children}
      </div>
    );
  }
}

TabLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleSelect: PropTypes.func,
  isActive: PropTypes.bool,
  namespace: PropTypes.string,
  activeStyle: PropTypes.object,
  disableInlineStyles: PropTypes.bool,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
};

export default TabLink;
