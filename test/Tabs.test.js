import assert from 'assert';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactTestUtils from 'react-dom/test-utils';

import Tabs from '../src/components/Tabs';
import { TabLink, TabContent } from '../src/index';

describe('Tabs component', () => {
  it('should have correct default values set', () => {
    const style = { backgroundColor: 'green' };

    const renderer = new ShallowRenderer();
    renderer.render(
      <Tabs className="tabs" style={style}>
        <TabLink to="tab1" />
        <TabContent for="tab1" />
      </Tabs>,
    );
    const result = renderer.getRenderOutput();

    assert.equal(result.type, 'div');
    assert.deepEqual(result.props.style, style);
    assert.deepEqual(result.props.className, 'tabs');
  });

  it('should set correct default props to each <TabLink /> component', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <Tabs name="tabs">
        <TabLink to="tab1" />
        <TabLink to="tab2" />
      </Tabs>,
    );
    const result = renderer.getRenderOutput();
    const tabLinks = result.props.children;

    tabLinks.forEach((tabLink, index) => {
      assert.equal(tabLink.props.namespace, 'tabs');
      assert.equal(tabLink.props.isActive, index === 0);
      assert.equal(typeof tabLink.props.activeStyle, 'undefined');
      assert.equal(typeof tabLink.props.handleSelect, 'function');
    });
  });

  it('should set "activeLinkStyle" prop to each <TabLink /> component', () => {
    const activeLinkStyle = { color: 'red' };

    const renderer = new ShallowRenderer();
    renderer.render(
      <Tabs name="tabs" activeLinkStyle={activeLinkStyle}>
        <TabLink to="tab1" />
        <TabLink to="tab2" />
      </Tabs>,
    );
    const result = renderer.getRenderOutput();
    const tabLinks = result.props.children;

    tabLinks.forEach(tabLink => {
      assert.deepEqual(tabLink.props.activeStyle, activeLinkStyle);
    });
  });

  it('should set correct default props to each <TabContent /> component', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <Tabs name="tabs">
        <TabContent for="tab1" />
        <TabContent for="tab2" />
      </Tabs>,
    );
    const result = renderer.getRenderOutput();
    const tabContents = result.props.children;

    tabContents.forEach(tabLink => {
      assert.equal(tabLink.props.isVisible, false);
    });
  });

  it('should set the first TabLink to active and its content to visible when initialized', () => {
    const tabs = ReactTestUtils.renderIntoDocument(
      <Tabs name="tabs">
        <TabLink to="tab1" />
        <TabLink to="tab2" />
        <TabContent for="tab1" />
        <TabContent for="tab2" />
      </Tabs>,
    );

    const tabLinks = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      tabs,
      'tab-link',
    );
    const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      tabs,
      'tab-content',
    );

    assert.equal(tabLinks[0].getAttribute('class'), 'tab-link tab-link-active');
    assert.equal(tabLinks[1].getAttribute('class'), 'tab-link');

    assert.equal(tabContents[0].style.display, '');
    assert.equal(tabContents[1].style.display, 'none');
  });

  it('should set the TabLink with "default" prop to active and its content to visible when initialized', () => {
    const tabs = ReactTestUtils.renderIntoDocument(
      <Tabs name="tabs">
        <TabLink to="tab1" />
        <TabLink to="tab2" default />
        <TabContent for="tab1" />
        <TabContent for="tab2" />
      </Tabs>,
    );

    const tabLinks = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      tabs,
      'tab-link',
    );
    const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      tabs,
      'tab-content',
    );

    assert.equal(tabLinks[0].getAttribute('class'), 'tab-link');
    assert.equal(tabLinks[1].getAttribute('class'), 'tab-link tab-link-active');

    assert.equal(tabContents[0].style.display, 'none');
    assert.equal(tabContents[1].style.display, '');
  });

  it('should set TabContent to visible when TabLink is clicked', () => {
    const tabs = ReactTestUtils.renderIntoDocument(
      <Tabs name="tabs">
        <TabLink to="tab1" />
        <TabLink to="tab2" />
        <TabContent for="tab1" />
        <TabContent for="tab2" />
      </Tabs>,
    );

    const tabLinks = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      tabs,
      'tab-link',
    );
    const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      tabs,
      'tab-content',
    );

    ReactTestUtils.Simulate.click(tabLinks[1]);

    assert.equal(tabLinks[0].getAttribute('class'), 'tab-link');
    assert.equal(tabLinks[1].getAttribute('class'), 'tab-link tab-link-active');

    assert.equal(tabContents[0].getAttribute('class'), 'tab-content');
    assert.equal(tabContents[0].style.display, 'none');
    assert.equal(
      tabContents[1].getAttribute('class'),
      'tab-content tab-content-visible',
    );
    assert.equal(tabContents[1].style.display, '');
  });

  it('should use custom styles for visible TabContent', () => {
    const visibleTabStyle = {
      display: 'inline-block',
      backgroundColor: 'red',
    };

    const tabs = ReactTestUtils.renderIntoDocument(
      <Tabs name="tabs" visibleTabStyle={visibleTabStyle}>
        <TabLink to="tab1" default />
        <TabContent for="tab1" />
      </Tabs>,
    );

    const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      tabs,
      'tab-content',
    );

    assert.equal(tabContents[0].style.display, 'inline-block');
    assert.equal(tabContents[0].style.backgroundColor, 'red');
  });

  it('should call custom "handleSelect" function when TabLink is clicked', () => {
    let namespace = '';
    let tab = '';

    const customSelectHandler = (selectedTab, selectedNamespace) => {
      tab = selectedTab;
      namespace = selectedNamespace;
    };

    const tabs = ReactTestUtils.renderIntoDocument(
      <Tabs name="tabs" handleSelect={customSelectHandler}>
        <TabLink to="tab1" />
        <TabLink to="tab2" />
      </Tabs>,
    );

    const tabLinks = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      tabs,
      'tab-link',
    );

    // handleSelect should not be called during initialization
    assert.equal(tab, '');
    assert.equal(namespace, '');

    ReactTestUtils.Simulate.click(tabLinks[1]);

    assert.equal(tab, 'tab2');
    assert.equal(namespace, 'tabs');
  });

  it('should use "selectedTab" prop on <Tabs /> to set selected tab', () => {
    const tabs = ReactTestUtils.renderIntoDocument(
      <Tabs name="tabs" selectedTab="tab2">
        <TabLink to="tab1" />
        <TabLink to="tab2" />
        <TabContent for="tab1" />
        <TabContent for="tab2" />
      </Tabs>,
    );

    const tabLinks = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      tabs,
      'tab-link',
    );
    const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      tabs,
      'tab-content',
    );

    assert.equal(tabLinks[0].getAttribute('class'), 'tab-link');
    assert.equal(tabLinks[1].getAttribute('class'), 'tab-link tab-link-active');

    assert.equal(tabContents[0].style.display, 'none');
    assert.equal(tabContents[1].style.display, '');
  });

  it('should render only content of active tab', () => {
    const tabs = ReactTestUtils.renderIntoDocument(
      <Tabs name="tabs" selectedTab="tab2" renderActiveTabContentOnly>
        <TabLink to="tab1" />
        <TabLink to="tab2" />
        <TabContent for="tab1">tabcontent1</TabContent>
        <TabContent for="tab2">tabcontent2</TabContent>
      </Tabs>,
    );

    const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      tabs,
      'tab-content',
    );

    assert.equal(tabContents[0].textContent, '');
    assert.equal(tabContents[1].textContent, 'tabcontent2');
  });

  it('should render content of all tab, not just the active one', () => {
    const tabs = ReactTestUtils.renderIntoDocument(
      <Tabs name="tabs" selectedTab="tab2">
        <TabLink to="tab1" />
        <TabLink to="tab2" />
        <TabContent for="tab1">tabcontent1</TabContent>
        <TabContent for="tab2">tabcontent2</TabContent>
      </Tabs>,
    );

    const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      tabs,
      'tab-content',
    );

    assert.equal(tabContents[0].textContent, 'tabcontent1');
    assert.equal(tabContents[1].textContent, 'tabcontent2');
  });
  it('should not crash when a child is null', () => {
    const showTab3 = false;
    const tabs = ReactTestUtils.renderIntoDocument(
      <Tabs name="tabs" selectedTab="tab2">
        <TabLink to="tab1" />
        <TabLink to="tab2" />
        {showTab3 && <TabLink to="tab2" />}
        <TabContent for="tab1">tabcontent1</TabContent>
        <TabContent for="tab2">tabcontent2</TabContent>
        {showTab3 && <TabContent for="tab3">tabcontent3</TabContent>}
      </Tabs>,
    );

    const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      tabs,
      'tab-content',
    );

    assert.equal(tabContents[0].textContent, 'tabcontent1');
    assert.equal(tabContents[1].textContent, 'tabcontent2');
  });

  it('should set "disableInlineStyles" prop to each child component', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <Tabs name="tabs" disableInlineStyles>
        <TabLink to="tab1" />
        <TabLink disableInlineStyles={false} to="tab2" />
        <TabContent for="tab1" />
        <TabContent disableInlineStyles={false} for="tab2" />
      </Tabs>,
    );
    const result = renderer.getRenderOutput();
    const tabsChildren = result.props.children;

    tabsChildren.forEach(child => {
      assert.equal(child.props.disableInlineStyles, true);
    });
  });

  it('should call "onChange" function on tab change', () => {
    const clicks = [];

    const onChange = (selectedTab, selectedNamespace) => {
      clicks.push([selectedTab, selectedNamespace]);
    };

    const tabs = ReactTestUtils.renderIntoDocument(
      <Tabs name="tabs" onChange={onChange}>
        <TabLink to="tab1" />
        <TabLink to="tab2" default />
      </Tabs>,
    );

    const tabLinks = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      tabs,
      'tab-link',
    );

    // onChange should be called after the initial render
    assert.deepEqual(clicks, [['tab2', 'tabs']]);

    ReactTestUtils.Simulate.click(tabLinks[1]);

    assert.deepEqual(clicks, [['tab2', 'tabs']]);

    ReactTestUtils.Simulate.click(tabLinks[0]);

    assert.deepEqual(clicks, [['tab2', 'tabs'], ['tab1', 'tabs']]);
  });
});
