import React, { Component, PropTypes } from 'react';

class Tabs extends Component {
    constructor() {
        super();

        this.state = {
            selectedTab: null
        };
    }

    handleSelect(tab) {
        this.setState({
            selectedTab: tab
        });
    }

    transformChildren(children, { handleSelect, selectedTab, firstLinkFound }) {
        if (typeof children !== 'object') {
            return children;
        }

        return React.Children.map(children, (child) => {
            if (child.props && child.props.to) {
                const { activeLinkStyle, name } = this.props;
                const firstLink = !firstLinkFound;

                firstLinkFound = true;

                return React.cloneElement(child, {
                    handleSelect,
                    isActive: child.props.to === selectedTab,
                    activeStyle: activeLinkStyle,
                    namespace: name,
                    firstLink
                });
            }

            if (child.props && child.props.for) {
                return React.cloneElement(child, {
                    isVisible: child.props.for === selectedTab
                });
            }

            return React.cloneElement(
                child, {},
                this.transformChildren(child.props && child.props.children, {
                    handleSelect,
                    selectedTab,
                    firstLinkFound
                })
            );
        });
    }

    render() {
        const handleSelect = this.props.handleSelect || this.handleSelect.bind(this);
        const selectedTab = this.props.selectedTab || this.state.selectedTab;

        const children = this.transformChildren(this.props.children, {
            handleSelect,
            selectedTab
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
    activeLinkStyle: PropTypes.object
};

export default Tabs;