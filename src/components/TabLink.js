import React, { Component } from 'react';
import classNames from 'classnames';

const styles = {
    defaultActiveStyle: {
        fontWeight: 'bold'
    }
};

class TabLink extends Component {
    componentDidMount() {
        if (this.props.default) {
            this.props.handleSelect(this.props.to, this.props.namespace);
        }
    }

    render() {
        let style = { ...this.props.style };
        if (this.props.isActive) {
            style = {
                ...style,
                ...(this.props.activeStyle || styles.defaultActiveStyle)
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

export default TabLink;