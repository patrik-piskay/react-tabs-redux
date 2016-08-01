import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export const styles = {
    visible: {
        display: 'block'
    },
    hidden: {
        display: 'none'
    }
};

class TabContent extends Component {
    render() {
        const visibleStyle = this.props.visibleStyle || {};

        const displayStyle = this.props.isVisible ? {
            ...styles.visible,
            ...visibleStyle
        } : styles.hidden;

        return (
            <div
                className={classNames({
                    'tab-content': true,
                    'tab-content-visible': !!this.props.isVisible
                })}
                style={{ ...this.props.style, ...displayStyle }}
            >
                {this.props.children}
            </div>
        );
    }
}

TabContent.propTypes = {
    for: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    isVisible: PropTypes.bool
};

export default TabContent;