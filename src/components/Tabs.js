import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tabs extends Component {
  state = {
    selectedTab: null,
  };

  handleSelect = tab => {
    this.setState({
      selectedTab: tab,
    });
  };

  findDefault(children) {
    if (this.defaultTab) {
      return this.defaultTab;
    }

    let firstLink;
    let firstDefaultLink;

    const traverse = child => {
      if (!child || !child.props || firstDefaultLink) {
        return;
      }

      if (child.type.displayName === 'TabLink') {
        firstLink = firstLink || child.props.to;
        firstDefaultLink =
          firstDefaultLink || (child.props.default && child.props.to);
      }

      React.Children.forEach(child.props.children, traverse);
    };

    React.Children.forEach(children, traverse);

    this.defaultTab = firstDefaultLink || firstLink;
    return this.defaultTab;
  }

  transformChildren(
    children,
    {
      handleSelect,
      selectedTab,
      activeLinkStyle,
      visibleTabStyle,
      disableInlineStyles,
      name,
    },
  ) {
    if (typeof children !== 'object') {
      return children;
    }

    return React.Children.map(children, child => {
      if (!child) {
        return child;
      }
      if (child.type.displayName === 'TabLink') {
        return React.cloneElement(child, {
          handleSelect,
          isActive: child.props.to === selectedTab,
          activeStyle: activeLinkStyle,
          disableInlineStyles,
          namespace: name,
        });
      }

      if (child.type.displayName === 'TabContent') {
        return React.cloneElement(child, {
          isVisible: child.props.for === selectedTab,
          visibleStyle: visibleTabStyle,
          disableInlineStyles,
          renderActiveTabContentOnly: this.props.renderActiveTabContentOnly,
        });
      }

      return React.cloneElement(
        child,
        {},
        this.transformChildren(child.props && child.props.children, {
          handleSelect,
          selectedTab,
          activeLinkStyle,
          visibleTabStyle,
          disableInlineStyles,
          name,
        }),
      );
    });
  }

  render() {
    const {
      handleSelect: handleSelectProp,
      selectedTab: selectedTabProp,
      activeLinkStyle,
      visibleTabStyle,
      disableInlineStyles,
      name,
      renderActiveTabContentOnly, // eslint-disable-line
      ...divProps
    } = this.props;
    const handleSelect = handleSelectProp || this.handleSelect;
    const selectedTab =
      selectedTabProp ||
      this.state.selectedTab ||
      this.findDefault(this.props.children);

    const children = this.transformChildren(this.props.children, {
      handleSelect,
      selectedTab,
      activeLinkStyle,
      visibleTabStyle,
      disableInlineStyles,
      name: name,
    });

    return <div {...divProps}>{children}</div>;
  }
}

Tabs.propTypes = {
  name: PropTypes.string,
  handleSelect: PropTypes.func,
  selectedTab: PropTypes.string,
  activeLinkStyle: PropTypes.object,
  visibleTabStyle: PropTypes.object,
  disableInlineStyles: PropTypes.bool,
  renderActiveTabContentOnly: PropTypes.bool,
};

export default Tabs;
