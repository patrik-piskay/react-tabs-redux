import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export const defaultActiveStyle = {
    fontWeight: 'bold'
};

class TabLink extends Component {
    componentDidMount() {
        if (this.props.firstLink || this.props.default) {
            this.props.handleSelect(this.props.to, this.props.namespace);
        }
    }

    render() {
        let style = { ...this.props.style };
        if (this.props.isActive) {
            style = {
                ...style,
                ...(this.props.activeStyle || defaultActiveStyle)
            };
        }

        return (
            <div
                className={classNames({
                    'tab-link': true,
                    'tab-link-active': this.props.isActive
                })}
                style={style}
                onClick={this.props.handleSelect.bind(this, this.props.to, this.props.namespace)}
            >
                {this.props.children}
            </div>
        );
    }
}

TabLink.propTypes = {
    to: PropTypes.string.isRequired,
    handleSelect: PropTypes.func,
    isActive: PropTypes.bool,
    namespace: PropTypes.string,
    activeStyle: PropTypes.object,
    firstLink: PropTypes.bool
};

export default TabLink;