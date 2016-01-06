import React from 'react';
import { render } from 'react-dom';

import { Tabs, TabLink, TabContent } from '../src';

const App = () => (
    <div>
        <Tabs>
            <ul>
                <li><TabLink to="tab1" default>Tab1</TabLink></li>
                <li><TabLink to="tab2">Tab2</TabLink></li>
                <li><TabLink to="tab3">Tab3</TabLink></li>
            </ul>

            <TabContent for="tab1">
                Lorem ipsum 1
            </TabContent>
            <TabContent for="tab2">
                Lorem ipsum 2
            </TabContent>
            <TabContent for="tab3">
                Lorem ipsum 3
            </TabContent>
        </Tabs>
    </div>
);

render(<App />, document.getElementById('app'));