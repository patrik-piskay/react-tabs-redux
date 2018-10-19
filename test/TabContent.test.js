import assert from 'assert';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import TabContent, { styles } from '../src/components/TabContent';

describe('TabContent component', () => {
  it('should have correct default values set', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<TabContent for="tab1" />);
    const result1 = renderer.getRenderOutput();

    renderer.render(<TabContent for="tab1" isVisible={false} />);
    const result2 = renderer.getRenderOutput();

    assert.equal(result1.props.className, 'tab-content');
    assert.equal(result1.props.id, 'tabpanel-tab1');
    assert.equal(result1.props.role, 'tabpanel');
    assert.equal(result1.props['aria-labelledby'], 'tab-tab1');
    assert.deepEqual(result1.props.style, styles.hidden);
    assert.deepEqual(result2.props.style, styles.hidden);
  });

  it('should not set hidden styles when "isVisible" prop is set', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<TabContent for="tab1" isVisible />);
    const result = renderer.getRenderOutput();

    assert.deepEqual(result.props.style, {});
  });

  it('should use custom styles when provided', () => {
    const style = { backgroundColor: 'green' };
    const renderer = new ShallowRenderer();
    renderer.render(<TabContent for="tab1" isVisible style={style} />);
    const result = renderer.getRenderOutput();

    assert.deepEqual(result.props.style, {
      ...style,
      ...styles.visible,
    });
  });

  it('should not set inline styles when "disableInlineStyles" props is set', () => {
    const style = { backgroundColor: 'green' };
    const renderer = new ShallowRenderer();

    renderer.render(
      <TabContent for="tab1" isVisible style={style} disableInlineStyles />,
    );
    const result = renderer.getRenderOutput();

    assert.equal(result.props.style, undefined);
  });

  it('should support custom class names', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<TabContent for="tab1" isVisible />);

    const result1 = renderer.getRenderOutput();

    renderer.render(
      <TabContent
        for="tab1"
        isVisible
        className="test-custom-class"
        visibleClassName="test-custom-class--visible"
      />,
    );
    const result2 = renderer.getRenderOutput();

    assert.equal(
      result1.props.className
        .split(' ')
        .sort()
        .join(' '),
      'tab-content tab-content-visible',
    );

    assert.equal(
      result2.props.className
        .split(' ')
        .sort()
        .join(' '),
      'test-custom-class test-custom-class--visible',
    );
  });
});
