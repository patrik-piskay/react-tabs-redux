import React from 'react';

import { Tabs, TabLink, TabContent } from '../../../../src';

import './styles.css';

const styles = {
    tabs: {
        width: '400px',
        display: 'inline-block',
        marginRight: '30px',
        verticalAlign: 'top'
    },
    links: {
        margin: 0,
        padding: 0
    },
    tabLink: {
        height: '30px',
        lineHeight: '30px',
        padding: '0 15px',
        cursor: 'pointer',
        borderBottom: '2px solid transparent',
        display: 'inline-block'
    },
    activeLinkStyle: {
        borderBottom: '2px solid #333'
    },
    visibleTabStyle: {
        display: 'inline-block'
    },
    content: {
        padding: '0 15px'
    }
};

const App = (props) => (
    <div>
        <Tabs
            name="tabs1"
            className="tabs tabs-1"
            handleSelect={props.changeSelectedTab}
            selectedTab={props.tabs1}
        >
            <div className="tab-links">
                <TabLink to="tab1">Tab1</TabLink>
                <TabLink to="tab2">Tab2</TabLink>
                <TabLink to="tab3">Tab3</TabLink>
            </div>

            <div className="content">
                <TabContent for="tab1">
                    <h2>Tab1 content</h2>
                    <p>
                        Lorem ipsum dolor sit amet, in vel malorum adipiscing. Duis deleniti ei cum, amet graece nec an.
                        Eu vix sumo atqui apeirian, nullam integre accusamus his at, animal feugiat in sed.
                    </p>
                    <p>
                        Pro vitae percipit no. Per ignota audire no. Ex hinc mutat delicata sit, sit eu erant tempor vivendo. Ad modus nusquam recusabo sit. Per ne deserunt periculis, ad sea saepe perfecto expetendis, est nonumy contentiones voluptatibus cu.
                    </p>
                </TabContent>
                <TabContent for="tab2">
                    <h2>Tab2 content</h2>
                    <div>¯\_(ツ)_/¯</div>
                </TabContent>
                <TabContent for="tab3">
                    <h2>Tab3 content</h2>
                    <div>(╯°□°）╯︵ ┻━┻)</div>
                </TabContent>
            </div>
        </Tabs>

        <Tabs
            name="tabs2"
            handleSelect={props.changeSelectedTab}
            selectedTab={props.tabs2}
            activeLinkStyle={styles.activeLinkStyle}
            visibleTabStyle={styles.visibleTabStyle}
            style={styles.tabs}
        >
            <div style={styles.links}>
                <TabLink to="tab1" style={styles.tabLink}>Tab1</TabLink>
                <TabLink to="tab2" default style={styles.tabLink}>Tab2</TabLink>
                <TabLink to="tab3" style={styles.tabLink}>Tab3</TabLink>
            </div>

            <div style={styles.content}>
                <TabContent for="tab1">
                    <h2>Tab1 content</h2>
                    <p>
                        Lorem ipsum dolor sit amet, in vel malorum adipiscing. Duis deleniti ei cum, amet graece nec an.
                        Eu vix sumo atqui apeirian, nullam integre accusamus his at, animal feugiat in sed.
                    </p>
                    <p>
                        Pro vitae percipit no. Per ignota audire no. Ex hinc mutat delicata sit, sit eu erant tempor vivendo. Ad modus nusquam recusabo sit. Per ne deserunt periculis, ad sea saepe perfecto expetendis, est nonumy contentiones voluptatibus cu.
                    </p>
                </TabContent>
                <TabContent for="tab2">
                    <h2>Tab2 content</h2>
                    <div>¯\_(ツ)_/¯</div>
                </TabContent>
                <TabContent for="tab3">
                    <h2>Tab3 content</h2>
                    <div>(╯°□°）╯︵ ┻━┻)</div>
                </TabContent>
            </div>
        </Tabs>
    </div>
);

export default App;