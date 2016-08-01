import assert from 'assert';
import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import TabLink, { defaultActiveStyle } from '../src/components/TabLink.js';

describe('TabLink component', () => {
    it('should have correct props set on an inactive tab', () => {
        const linkStyle = { color: 'red' };

        let renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <TabLink
                to="tab1"
                handleSelect={() => {}}
                style={linkStyle}
            />
        );
        const result = renderer.getRenderOutput();

        assert.equal(result.props.className, 'tab-link');
        assert.deepEqual(result.props.style, linkStyle);
    });

    it('should have correct props set on an active tab', () => {
        const linkStyle = { color: 'red' };

        let renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <TabLink
                to="tab1"
                handleSelect={() => {}}
                style={linkStyle}
                isActive={true}
            />
        );
        const result = renderer.getRenderOutput();

        assert.equal(result.props.className, 'tab-link tab-link-active');
        assert.deepEqual(result.props.style, {
            ...linkStyle,
            ...defaultActiveStyle
        });
    });

    it('should have "activeStyle" prop content set on an active tab when provided (instead of default active style)', () => {
        const linkStyle = { color: 'red' };
        const activeStyle = { textDecoration: 'underline' };

        let renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <TabLink
                to="tab1"
                handleSelect={() => {}}
                style={linkStyle}
                isActive={true}
                activeStyle={activeStyle}
            />
        );
        const result = renderer.getRenderOutput();

        assert.equal(result.props.className, 'tab-link tab-link-active');
        assert.deepEqual(result.props.style, {
            ...linkStyle,
            ...activeStyle
        });
    });

    it('should have onClick handler set', () => {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <TabLink
                to="tab1"
                handleSelect={() => {}}
            />
        );
        const result = renderer.getRenderOutput();

        assert.equal(typeof result.props.onClick, 'function');
    });

    it('should call "handleSelect" function on click providing "tab" and "namespace" values', () => {
        let clickedTab = '';
        let clickedNamespace = '';

        let renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <TabLink
                to="tab1"
                namespace="tabs"
                handleSelect={(tab, namespace) => {
                    clickedTab = tab;
                    clickedNamespace = namespace;
                }}
            />
        );
        const result = renderer.getRenderOutput();

        result.props.onClick();

        assert.equal(clickedTab, 'tab1');
        assert.equal(clickedNamespace, 'tabs');
    });

    it('should call custom "onChange" function if provided', () => {
        let clickedTab = '';
        let clickedNamespace = '';
        let customOnClick = false;

        let renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <TabLink
                to="tab1"
                namespace="tabs"
                handleSelect={(tab, namespace) => {
                    clickedTab = tab;
                    clickedNamespace = namespace;
                }}
                onClick={() => {
                    customOnClick = true;
                }}
            />
        );
        const result = renderer.getRenderOutput();

        result.props.onClick();

        assert.equal(clickedTab, 'tab1');
        assert.equal(clickedNamespace, 'tabs');
        assert.equal(customOnClick, true);
    });

    it('should have "isActive" prop when initialized', () => {
        let tabs = ReactTestUtils.renderIntoDocument(
            <TabLink
                to="tab1"
                isActive={true}
                handleSelect={() => {}}
            />
        );

        const tabLink = ReactTestUtils.findRenderedDOMComponentWithClass(tabs, 'tab-link');

        assert.equal(findDOMNode(tabLink).getAttribute('class'), 'tab-link tab-link-active');
    });
});