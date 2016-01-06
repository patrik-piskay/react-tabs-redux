import React, { Component } from 'react';

const styles = {
    visible: {
        display: 'block'
    },
    hidden: {
        display: 'none'
    }
};

class TabContent extends Component {
    render() {
        const displayStyle = this.props.visible ? styles.visible : styles.hidden;

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

export default TabContent;