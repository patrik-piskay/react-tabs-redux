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
                    visibleStyle: visibleTabStyle,
                    renderActiveTabContentOnly: this.props.renderActiveTabContentOnly
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
        const {
            handleSelect: handleSelectProp,
            selectedTab: selectedTabProp,
            activeLinkStyle,
            visibleTabStyle,
            name,
            ...divProps
        } = this.props;
        const handleSelect = handleSelectProp || this.handleSelect;
        const selectedTab = selectedTabProp || this.state.selectedTab ||
            this.findDefault(this.props.children);

        const children = this.transformChildren(this.props.children, {
            handleSelect,
            selectedTab,
            activeLinkStyle,
            visibleTabStyle,
            name: name
        });

        return (
            <div {...divProps}>
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
    visibleTabStyle: PropTypes.object,
    renderActiveTabContentOnly: PropTypes.bool
};

export default Tabs;