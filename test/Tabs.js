import assert from 'assert';
import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import Tabs from '../src/components/Tabs.js';
import { TabLink, TabContent } from '../src/index.js';

describe('Tabs component', () => {
    it('should have correct default values set', () => {
        const style = { backgroundColor: 'green' };

        let renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <Tabs className="tabs" style={style}>
                <TabLink to="tab1" />
                <TabContent for="tab1" />
            </Tabs>
        );
        const result = renderer.getRenderOutput();

        assert.equal(result.type, 'div');
        assert.deepEqual(result.props.style, style);
        assert.deepEqual(result.props.className, 'tabs');
    });

    it('should set correct default props to each <TabLink /> component', () => {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <Tabs name="tabs">
                <TabLink to="tab1" />
                <TabLink to="tab2" />
            </Tabs>
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

        let renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <Tabs name="tabs" activeLinkStyle={activeLinkStyle}>
                <TabLink to="tab1" />
                <TabLink to="tab2" />
            </Tabs>
        );
        const result = renderer.getRenderOutput();
        const tabLinks = result.props.children;

        tabLinks.forEach(tabLink => {
            assert.deepEqual(tabLink.props.activeStyle, activeLinkStyle);
        });
    });

    it('should set correct default props to each <TabContent /> component', () => {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <Tabs name="tabs">
                <TabContent for="tab1" />
                <TabContent for="tab2" />
            </Tabs>
        );
        const result = renderer.getRenderOutput();
        const tabContents = result.props.children;

        tabContents.forEach(tabLink => {
            assert.equal(tabLink.props.isVisible, false);
        });
    });

    it('should set the first TabLink to active and its content to visible when initialized', () => {
        let tabs = ReactTestUtils.renderIntoDocument(
            <Tabs name="tabs">
                <TabLink to="tab1" />
                <TabLink to="tab2" />
                <TabContent for="tab1" />
                <TabContent for="tab2" />
            </Tabs>
        );

        const tabLinks = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-link');
        const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-content');

        assert.equal(findDOMNode(tabLinks[0]).getAttribute('class'), 'tab-link tab-link-active');
        assert.equal(findDOMNode(tabLinks[1]).getAttribute('class'), 'tab-link');

        assert.equal(findDOMNode(tabContents[0]).style.overflow, '');
        assert.equal(findDOMNode(tabContents[1]).style.overflow, 'hidden');
    });

    it('should set the TabLink with "default" prop to active and its content to visible when initialized', () => {
        let tabs = ReactTestUtils.renderIntoDocument(
            <Tabs name="tabs">
                <TabLink to="tab1" />
                <TabLink to="tab2" default />
                <TabContent for="tab1" />
                <TabContent for="tab2" />
            </Tabs>
        );

        const tabLinks = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-link');
        const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-content');

        assert.equal(findDOMNode(tabLinks[0]).getAttribute('class'), 'tab-link');
        assert.equal(findDOMNode(tabLinks[1]).getAttribute('class'), 'tab-link tab-link-active');

        assert.equal(findDOMNode(tabContents[0]).style.overflow, 'hidden');
        assert.equal(findDOMNode(tabContents[1]).style.overflow, '');
    });

    it('should set TabContent to visible when TabLink is clicked', () => {
        let tabs = ReactTestUtils.renderIntoDocument(
            <Tabs name="tabs">
                <TabLink to="tab1" />
                <TabLink to="tab2" />
                <TabContent for="tab1" />
                <TabContent for="tab2" />
            </Tabs>
        );

        const tabLinks = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-link');
        const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-content');

        ReactTestUtils.Simulate.click(tabLinks[1]);

        assert.equal(findDOMNode(tabLinks[0]).getAttribute('class'), 'tab-link');
        assert.equal(findDOMNode(tabLinks[1]).getAttribute('class'), 'tab-link tab-link-active');

        assert.equal(findDOMNode(tabContents[0]).getAttribute('class'), 'tab-content');
        assert.equal(findDOMNode(tabContents[0]).style.overflow, 'hidden');
        assert.equal(
            findDOMNode(tabContents[1]).getAttribute('class'),
            'tab-content tab-content-visible'
        );
        assert.equal(findDOMNode(tabContents[1]).style.display, '');
    });

    it('should use custom styles for visible TabContent', () => {
        const visibleTabStyle = {
            display: 'flex',
            backgroundColor: 'red'
        };

        let tabs = ReactTestUtils.renderIntoDocument(
            <Tabs name="tabs" visibleTabStyle={visibleTabStyle}>
                <TabLink to="tab1" default />
                <TabContent for="tab1" />
            </Tabs>
        );

        const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-content');

        assert.equal(findDOMNode(tabContents[0]).style.display, 'flex');
        assert.equal(findDOMNode(tabContents[0]).style.backgroundColor, 'red');
    });

    it('should call custom "handleSelect" function when TabLink is clicked', () => {
        let namespace = '';
        let tab = '';

        const customSelectHandler = (selectedTab, selectedNamespace) => {
            tab = selectedTab;
            namespace = selectedNamespace;
        };

        let tabs = ReactTestUtils.renderIntoDocument(
            <Tabs name="tabs" handleSelect={customSelectHandler}>
                <TabLink to="tab1" />
                <TabLink to="tab2" />
            </Tabs>
        );

        const tabLinks = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-link');

        // handleSelect should not be called during initialization
        assert.equal(tab, '');
        assert.equal(namespace, '');

        ReactTestUtils.Simulate.click(tabLinks[1]);

        assert.equal(tab, 'tab2');
        assert.equal(namespace, 'tabs');
    });

    it('should use "selectedTab" prop on <Tabs /> to set selected tab', () => {
        let tabs = ReactTestUtils.renderIntoDocument(
            <Tabs name="tabs" selectedTab="tab2">
                <TabLink to="tab1" />
                <TabLink to="tab2" />
                <TabContent for="tab1" />
                <TabContent for="tab2" />
            </Tabs>
        );

        const tabLinks = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-link');
        const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-content');

        assert.equal(findDOMNode(tabLinks[0]).getAttribute('class'), 'tab-link');
        assert.equal(findDOMNode(tabLinks[1]).getAttribute('class'), 'tab-link tab-link-active');

        assert.equal(findDOMNode(tabContents[0]).style.overflow, 'hidden');
        assert.equal(findDOMNode(tabContents[1]).style.overflow, '');
    });

    it('should render only content of active tab', () => {
        let tabs = ReactTestUtils.renderIntoDocument(
            <Tabs name="tabs" selectedTab="tab2" renderActiveTabContentOnly>
                <TabLink to="tab1" />
                <TabLink to="tab2" />
                <TabContent for="tab1">tabcontent1</TabContent>
                <TabContent for="tab2">tabcontent2</TabContent>
            </Tabs>
        );

        const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-content');

        assert.equal(findDOMNode(tabContents[0]).textContent, '');
        assert.equal(findDOMNode(tabContents[1]).textContent, 'tabcontent2');
    });

    it('should render content of all tab, not just the active one', () => {
        let tabs = ReactTestUtils.renderIntoDocument(
            <Tabs name="tabs" selectedTab="tab2">
                <TabLink to="tab1" />
                <TabLink to="tab2" />
                <TabContent for="tab1">tabcontent1</TabContent>
                <TabContent for="tab2">tabcontent2</TabContent>
            </Tabs>
        );

        const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-content');

        assert.equal(findDOMNode(tabContents[0]).textContent, 'tabcontent1');
        assert.equal(findDOMNode(tabContents[1]).textContent, 'tabcontent2');
    });
    it('should not crash when a child is null', () => {
        let showTab3 = false;
        let tabs = ReactTestUtils.renderIntoDocument(
            <Tabs name="tabs" selectedTab="tab2">
                <TabLink to="tab1" />
                <TabLink to="tab2" />
                {showTab3 && <TabLink to="tab2" />}
                <TabContent for="tab1">tabcontent1</TabContent>
                <TabContent for="tab2">tabcontent2</TabContent>
                {showTab3 && <TabContent for="tab3">tabcontent3</TabContent>}
            </Tabs>
        );

        const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-content');

        assert.equal(findDOMNode(tabContents[0]).textContent, 'tabcontent1');
        assert.equal(findDOMNode(tabContents[1]).textContent, 'tabcontent2');
    });

    it('should set "disableInlineStyles" prop to each child component', () => {
        const activeLinkStyle = { color: 'red' };

        let renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <Tabs name="tabs" disableInlineStyles={true}>
                <TabLink to="tab1" />
                <TabLink disableInlineStyles={false} to="tab2" />
                <TabContent for="tab1" />
                <TabContent disableInlineStyles={false} for="tab2" />
            </Tabs>
        );
        const result = renderer.getRenderOutput();
        const tabsChildren = result.props.children;

        tabsChildren.forEach(child => {
            assert.equal(child.props.disableInlineStyles, true);
        });
    });

    it('should change current tab when focusing an input from another tab', () => {
        let firedFocus = 0;

        let tabs = ReactTestUtils.renderIntoDocument(
            <Tabs name="tabs">
                <TabLink to="tab1" />
                <TabLink to="tab2" />
                <TabContent for="tab1"><input /></TabContent>
                <TabContent for="tab2" onFocus={e => {
                    ++firedFocus;
                }}><input /></TabContent>
            </Tabs>
        );

        const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-content');
        const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(tabs, 'input');

        assert.equal(inputs.length, 2);

        assert.equal(firedFocus, 0);
        assert.equal(findDOMNode(tabContents[0]).style.overflow, '');
        assert.equal(findDOMNode(tabContents[1]).style.overflow, 'hidden');

        ReactTestUtils.Simulate.focus(inputs[1]);

        assert.equal(firedFocus, 1);
        assert.equal(findDOMNode(tabContents[0]).style.overflow, 'hidden');
        assert.equal(findDOMNode(tabContents[1]).style.overflow, '');

        ReactTestUtils.Simulate.focus(inputs[1]);

        assert.equal(firedFocus, 2);
        assert.equal(findDOMNode(tabContents[0]).style.overflow, 'hidden');
        assert.equal(findDOMNode(tabContents[1]).style.overflow, '');
    });

    it('should call custom "handleSelect" function when navigating between tabs', () => {
        let firedSelectHandler = 0;
        let firedFocus = 0;
        let selectedTab = "tab1";

        const render = (visibleTabIndex, focusCounter, handlerCounter) => {
            let tabs = ReactTestUtils.renderIntoDocument(
                <Tabs name="tabs" handleSelect={(tab) => {
                    ++firedSelectHandler;
                    selectedTab = tab;
                }} selectedTab={selectedTab}>
                    <TabLink to="tab1" />
                    <TabLink to="tab2" />
                    <TabContent for="tab1"><input /></TabContent>
                    <TabContent for="tab2" onFocus={e => {
                        ++firedFocus;
                    }}><input /></TabContent>
                </Tabs>
            );

            const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-content');
            const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(tabs, 'input');

            assert.equal(inputs.length, 2);

            assert.equal(selectedTab, "tab" + (1 + visibleTabIndex));
            assert.equal(firedFocus, focusCounter);
            assert.equal(firedSelectHandler, handlerCounter);
            assert.equal(findDOMNode(tabContents[visibleTabIndex]).style.overflow, '');
            assert.equal(findDOMNode(tabContents[(1 + visibleTabIndex) % 2]).style.overflow, 'hidden');

            ReactTestUtils.Simulate.focus(inputs[1]);
        }

        render(0, 0, 0);

        render(1, 1, 1);

        render(1, 2, 1);
    });

    it('should not to change current tab when only content of active tab is rendered', () => {
        let tabs = ReactTestUtils.renderIntoDocument(
            <Tabs name="tabs" renderActiveTabContentOnly>
                <TabLink to="tab1" />
                <TabLink to="tab2" />
                <TabContent for="tab1"><input /></TabContent>
                <TabContent for="tab2"><input /></TabContent>
            </Tabs>
        );

        const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-content');
        const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(tabs, 'input');

        assert.equal(inputs.length, 1);

        assert.equal(findDOMNode(tabContents[0]).style.overflow, '');
        assert.equal(findDOMNode(tabContents[1]).style.overflow, 'hidden');
    });

    it('should not to call internal "setState"', () => {
        let tabs = ReactTestUtils.renderIntoDocument(
            <Tabs name="tabs" handleSelect={(tab) => {
                // prevents from internal setState executing
            }}>
                <TabLink to="tab1" />
                <TabLink to="tab2" />
                <TabContent for="tab1"><input /></TabContent>
                <TabContent for="tab2"><input /></TabContent>
            </Tabs>
        );

        const tabContents = ReactTestUtils.scryRenderedDOMComponentsWithClass(tabs, 'tab-content');
        const inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(tabs, 'input');

        assert.equal(inputs.length, 2);

        assert.equal(findDOMNode(tabContents[0]).style.overflow, '');
        assert.equal(findDOMNode(tabContents[1]).style.overflow, 'hidden');

        ReactTestUtils.Simulate.focus(inputs[1]);

        assert.equal(findDOMNode(tabContents[0]).style.overflow, '');
        assert.equal(findDOMNode(tabContents[1]).style.overflow, 'hidden');
    });
});
