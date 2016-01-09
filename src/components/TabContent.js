import React, { Component, PropTypes } from 'react';

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
        const displayStyle = this.props.isVisible ? styles.visible : styles.hidden;

        return (
            <div
                className="tab-content"
                style={{ ...this.props.style, ...displayStyle }}
            >
                {this.props.children}
            </div>
        );
    }
}

TabContent.propTypes = {
    for: PropTypes.string.isRequired,
    isVisible: PropTypes.bool
};

export default TabContent;