import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export const styles = {
    hidden: {
        display: 'none'
    }
};

class TabContent extends Component {
    canRenderChildren() {
        return this.props.isVisible || !this.props.renderActiveTabContentOnly;
    }

    render() {
        const visibleStyle = this.props.visibleStyle || {};

        const displayStyle = this.props.isVisible ? visibleStyle : styles.hidden;

        return (
            <div
                className={classNames({
                    'tab-content': true,
                    'tab-content-visible': !!this.props.isVisible
                })}
                style={{ ...this.props.style, ...displayStyle }}
            >
                {this.canRenderChildren() && (
                  this.props.children
                )}
            </div>
        );
    }
}

TabContent.propTypes = {
    for: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    visibleStyle: PropTypes.object,
    isVisible: PropTypes.bool,
    renderActiveTabContentOnly: PropTypes.bool
};

export default TabContent;