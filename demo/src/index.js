import React from 'react';
import { render } from 'react-dom';

import { Tabs, TabLink, TabContent } from '../../src';
import PlainReactExample from './plain-react';
import ReduxExample from './redux';

const styles = {
  tabLink: {
    height: '40px',
    padding: '0 15px',
  },
  activeLinkStyle: {
    border: '1px solid black',
  },
  content: {
    padding: '15px',
  },
};

const Demo = () => (
  <Tabs activeLinkStyle={styles.activeLinkStyle}>
    <TabLink to="react" style={styles.tabLink}>
      React example
    </TabLink>
    <TabLink to="redux" style={styles.tabLink}>
      Redux example
    </TabLink>

    <div style={styles.content}>
      <TabContent for="react">
        <h2>React internal state example</h2>
        <PlainReactExample />
      </TabContent>
      <TabContent for="redux">
        <h2>Using Redux</h2>
        <ReduxExample />
      </TabContent>
    </div>
  </Tabs>
);

render(<Demo />, document.querySelector('#demo'));
