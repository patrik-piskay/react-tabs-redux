import React, { Component, PropTypes } from 'react';

class Tabs extends Component {
    constructor() {
        super();

        this.state = {
            selectedTab: null
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(tab) {
        this.setState({
            selectedTab: tab
        });
    }

    findDefault(children) {
        if (this.defaultTab) {
            return this.defaultTab;
        }

        let firstLink;
        let firstDefaultLink;

        const traverse = (child) => {
            if (!child.props || firstDefaultLink) {
                return;
            }

            if (child.props.to) {
                firstLink = firstLink || child.props.to;
                firstDefaultLink = firstDefaultLink || (child.props.default && child.props.to);
            }

            React.Children.forEach(child.props.children, traverse);
        };

        React.Children.forEach(children, traverse);

        this.defaultTab = firstDefaultLink || firstLink;
        return this.defaultTab;
    }

    transformChildren(children, { handleSelect, selectedTab, activeLinkStyle, visibleTabStyle, name }) {
        if (typeof children !== 'object') {
            return children;
        }

        return React.Children.map(children, (child) => {
            if (child.props && child.props.to) {
                return React.cloneElement(child, {
                    handleSelect,
                    isActive: child.props.to === selectedTab,
                    activeStyle: activeLinkStyle,
                    namespace: name
                });
            }

            if (child.props && child.props.for) {
                return React.cloneElement(child, {
                    isVisible: child.props.for === selectedTab,
                    visibleStyle: visibleTabStyle
                });
            }

            return React.cloneElement(
                child, {},
                this.transformChildren(child.props && child.props.children, {
                    handleSelect,
                    selectedTab,
                    activeLinkStyle,
                    visibleTabStyle,
                    name
                })
            );
        });
    }

    render() {
        const handleSelect = this.props.handleSelect || this.handleSelect;
        const selectedTab = this.props.selectedTab ||
            this.state.selectedTab ||
            this.findDefault(this.props.children);

        const children = this.transformChildren(this.props.children, {
            handleSelect,
            selectedTab,
            activeLinkStyle: this.props.activeLinkStyle,
            visibleTabStyle: this.props.visibleTabStyle,
            name: this.props.name
        });

        return (
            <div {...this.props}>
                {children}
            </div>
        );
    }
}

Tabs.propTypes = {
    name: PropTypes.string,
    handleSelect: PropTypes.func,
    selectedTab: PropTypes.string,
    activeLinkStyle: PropTypes.object,
    visibleTabStyle: PropTypes.object
};

export default Tabs;