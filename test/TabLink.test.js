import assert from 'assert';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactTestUtils from 'react-dom/test-utils';

import TabLink, { defaultActiveStyle } from '../src/components/TabLink';

describe('TabLink component', () => {
  it('should have correct props set on an inactive tab', () => {
    const linkStyle = { color: 'red' };

    const renderer = new ShallowRenderer();
    renderer.render(
      <TabLink to="tab1" handleSelect={() => {}} style={linkStyle} />,
    );
    const result = renderer.getRenderOutput();

    assert.equal(result.type, 'button');
    assert.equal(result.props.className, 'tab-link');
    assert.equal(result.props.id, 'tab-tab1');
    assert.equal(result.props.role, 'tab');
    assert.equal(result.props['aria-selected'], 'false');
    assert.equal(result.props['aria-controls'], 'tabpanel-tab1');
    assert.deepEqual(result.props.style, linkStyle);
  });

  it('should have correct props set on an active tab', () => {
    const linkStyle = { color: 'red' };

    const renderer = new ShallowRenderer();
    renderer.render(
      <TabLink to="tab1" handleSelect={() => {}} style={linkStyle} isActive />,
    );
    const result = renderer.getRenderOutput();

    assert.equal(result.type, 'button');
    assert.equal(result.props.className, 'tab-link tab-link-active');
    assert.equal(result.props.id, 'tab-tab1');
    assert.equal(result.props.role, 'tab');
    assert.equal(result.props['aria-selected'], 'true');
    assert.equal(result.props['aria-controls'], 'tabpanel-tab1');
    assert.deepEqual(result.props.style, {
      ...linkStyle,
      ...defaultActiveStyle,
    });
  });

  it('should pass extra props to TabLink', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <TabLink
        to="tab1"
        handleSelect={() => {}}
        isActive
        tabIndex="-1"
        disabled
      />,
    );
    const result = renderer.getRenderOutput();

    assert.equal(result.props.tabIndex, '-1');
    assert.equal(result.props.disabled, true);
  });

  it('should have "activeStyle" prop content set on an active tab when provided (instead of default active style)', () => {
    const linkStyle = { color: 'red' };
    const activeStyle = { textDecoration: 'underline' };

    const renderer = new ShallowRenderer();
    renderer.render(
      <TabLink
        to="tab1"
        handleSelect={() => {}}
        style={linkStyle}
        isActive
        activeStyle={activeStyle}
      />,
    );
    const result = renderer.getRenderOutput();

    assert.equal(result.props.className, 'tab-link tab-link-active');
    assert.deepEqual(result.props.style, {
      ...linkStyle,
      ...activeStyle,
    });
  });

  it('should have onClick handler set', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<TabLink to="tab1" handleSelect={() => {}} />);
    const result = renderer.getRenderOutput();

    assert.equal(typeof result.props.onClick, 'function');
  });

  it('should call "handleSelect" function on click providing "tab" and "namespace" values', () => {
    let clickedTab = '';
    let clickedNamespace = '';

    const renderer = new ShallowRenderer();
    renderer.render(
      <TabLink
        to="tab1"
        namespace="tabs"
        handleSelect={(tab, namespace) => {
          clickedTab = tab;
          clickedNamespace = namespace;
        }}
      />,
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

    const renderer = new ShallowRenderer();
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
      />,
    );
    const result = renderer.getRenderOutput();

    result.props.onClick();

    assert.equal(clickedTab, 'tab1');
    assert.equal(clickedNamespace, 'tabs');
    assert.equal(customOnClick, true);
  });

  it('should have "isActive" prop when initialized', () => {
    const tabs = ReactTestUtils.renderIntoDocument(
      <TabLink to="tab1" isActive handleSelect={() => {}} />,
    );

    const tabLink = ReactTestUtils.findRenderedDOMComponentWithClass(
      tabs,
      'tab-link',
    );

    assert.equal(tabLink.getAttribute('class'), 'tab-link tab-link-active');
  });

  it('should not set inline styles when "disableInlineStyles" props is set', () => {
    const linkStyle = { color: 'red' };

    const renderer = new ShallowRenderer();
    renderer.render(
      <TabLink
        to="tab1"
        handleSelect={() => {}}
        style={linkStyle}
        isActive
        disableInlineStyles
      />,
    );
    const result = renderer.getRenderOutput();

    assert.equal(result.props.style, undefined);
  });

  it('should support custom class names', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<TabLink to="tab1" isActive />);

    const result1 = renderer.getRenderOutput();

    renderer.render(
      <TabLink
        to="tab1"
        isActive
        className="tab-link-custom"
        activeClassName="tab-link-custom--active"
      />,
    );

    const result2 = renderer.getRenderOutput();

    assert.equal(
      result1.props.className
        .split(' ')
        .sort()
        .join(' '),
      'tab-link tab-link-active',
    );

    assert.equal(
      result2.props.className
        .split(' ')
        .sort()
        .join(' '),
      'tab-link-custom tab-link-custom--active',
    );
  });

  it('should render into "div"', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<TabLink to="tab1" component="div" />);
    const result = renderer.getRenderOutput();

    assert.equal(result.type, 'div');
  });
});
