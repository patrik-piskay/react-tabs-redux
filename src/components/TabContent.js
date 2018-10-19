import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const styles = {
  hidden: {
    display: 'none',
  },
};

class TabContent extends Component {
  static displayName = 'TabContent';

  canRenderChildren() {
    return this.props.isVisible || !this.props.renderActiveTabContentOnly;
  }

  render() {
    const visibleStyle = this.props.visibleStyle || {};
    const displayStyle = this.props.isVisible ? visibleStyle : styles.hidden;
    const className = this.props.className || 'tab-content';
    const visibleClassName =
      this.props.visibleClassName || 'tab-content-visible';

    return (
      <div
        id={`tabpanel-${this.props.for}`}
        role="tabpanel"
        aria-labelledby={`tab-${this.props.for}`}
        className={classNames({
          [className]: true,
          [visibleClassName]: !!this.props.isVisible,
        })}
        style={
          (!this.props.disableInlineStyles && {
            ...this.props.style,
            ...displayStyle,
          }) ||
          undefined
        }
      >
        {this.canRenderChildren() && this.props.children}
      </div>
    );
  }
}

TabContent.propTypes = {
  children: PropTypes.node,
  for: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // eslint-disable-line react/no-unused-prop-types
  visibleStyle: PropTypes.object,
  isVisible: PropTypes.bool,
  renderActiveTabContentOnly: PropTypes.bool,
  disableInlineStyles: PropTypes.bool,
  className: PropTypes.string,
  visibleClassName: PropTypes.string,
  style: PropTypes.object,
};

export default TabContent;
