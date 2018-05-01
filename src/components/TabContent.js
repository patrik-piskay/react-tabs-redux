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
    const disableInlineStyles = this.props.disableInlineStyles;
    const className = this.props.className || 'tab-content';
    const visibleClassName =
      this.props.visibleClassName || 'tab-content-visible';

    return (
      <div
        className={classNames({
          [className]: true,
          [visibleClassName]: !!this.props.isVisible,
        })}
        style={
          (!disableInlineStyles && { ...this.props.style, ...displayStyle }) ||
          undefined
        }
      >
        {this.canRenderChildren() && this.props.children}
      </div>
    );
  }
}

TabContent.propTypes = {
  for: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  visibleStyle: PropTypes.object,
  isVisible: PropTypes.bool,
  renderActiveTabContentOnly: PropTypes.bool,
  disableInlineStyles: PropTypes.bool,
  className: PropTypes.string,
  visibleClassName: PropTypes.string,
};

export default TabContent;
