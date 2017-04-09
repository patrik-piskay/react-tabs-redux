import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export const defaultActiveStyle = {
    fontWeight: 'bold'
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
        let style = { ...this.props.style };
        if (this.props.isActive) {
            style = {
                ...style,
                ...(this.props.activeStyle || defaultActiveStyle)
            };
        }

        const className = this.props.className || 'tab-link';

        const activeClassName = this.props.activeClassName || 'tab-link-active';

        return (
            <div
                className={classNames({
                    [className]: true,
                    [activeClassName]: this.props.isActive
                })}
                style={style}
                onClick={this.handleClick}
            >
                {this.props.children}
            </div>
        );
    }
}

TabLink.propTypes = {
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    handleSelect: PropTypes.func,
    isActive: PropTypes.bool,
    namespace: PropTypes.string,
    activeStyle: PropTypes.object,
    className:  PropTypes.string,
    activeClassName:  PropTypes.string
};

export default TabLink;
