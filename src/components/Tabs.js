import React, { Component } from 'react';

class Tabs extends Component {
    constructor() {
        super();

        this.state = {
            selected: null
        };
    }

    handleSelect(tab) {
        this.setState({
            selected: tab
        });
    }

    transformChildren(children, handleSelect, selected) {
        if (typeof children !== 'object') {
            return children;
        }

        return React.Children.map(children, (child) => {
            if (child.props && child.props.to) {
                return React.cloneElement(child, {
                    handleSelect,
                    isActive: child.props.to === selected
                });
            }

            if (child.props && child.props.for) {
                return React.cloneElement(child, {
                    visible: child.props.for === selected
                });
            }

            return React.cloneElement(
                child, {},
                this.transformChildren(child.props && child.props.children, handleSelect, selected)
            );
        });
    }

    render() {
        const handleSelect = this.props.handleSelect || this.handleSelect.bind(this);
        const selected = this.props.selected || this.state.selected;

        const children = this.transformChildren(this.props.children, handleSelect, selected);

        return (
            <div>{children}</div>
        );
    }
}

export default Tabs;