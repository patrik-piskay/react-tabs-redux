import assert from 'assert';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import TabContent, { styles } from '../src/components/TabContent.js';

describe('TabContent component', () => {
    it('should have correct default values set', () => {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <TabContent
                for="tab1"
            />
        );
        const result1 = renderer.getRenderOutput();

        renderer.render(
            <TabContent
                for="tab1"
                isVisible={false}
            />
        );
        const result2 = renderer.getRenderOutput();

        assert.equal(result1.props.className, 'tab-content');
        assert.deepEqual(result1.props.style, styles.hidden);
        assert.deepEqual(result2.props.style, styles.hidden);
    });

    it('should be visible when "isVisible" prop is set', () => {
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <TabContent
                for="tab1"
                isVisible={true}
            />
        );
        const result = renderer.getRenderOutput();

        assert.deepEqual(result.props.style, styles.visible);
    });

    it('should use custom styles when provided', () => {
        const style = { backgroundColor: 'green' };
        let renderer = ReactTestUtils.createRenderer();
        renderer.render(
            <TabContent
                for="tab1"
                isVisible={true}
                style={style}
            />
        );
        const result = renderer.getRenderOutput();

        assert.deepEqual(result.props.style, {
            ...style,
            ...styles.visible
        });
    });
});