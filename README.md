# React tabs (Redux compatible)

[![Travis](https://img.shields.io/travis/rust-lang/rust.svg?style=flat-square)](https://travis-ci.org/patrik-piskay/react-tabs-redux) [![npm](https://img.shields.io/npm/v/react-tabs-redux.svg?style=flat-square)](https://www.npmjs.com/package/react-tabs-redux)

Simple, fully customizable React tabs component that can be used in plain React application or with any Flux-like architecture with external state, e.g. Redux.

## Installation

Using npm:

    $ npm install react-tabs-redux

UMD build is also available:
```javascript
<script src="https://npmcdn.com/react-tabs-redux/dist/react-tabs.min.js"></script>
```
with components accessible via `window.ReactTabs` object.

***NOTE:*** *This component requires* ***React*** *to be installed separately.*

## Usage

- **with plain React** (using component's internal state) - [see example](https://github.com/patrik-piskay/react-tabs-redux/tree/master/examples/plain-react)

```javascript
<Tabs>
    <TabLink to="tab1" />
    <TabLink to="tab2" />
    <TabLink to="tab3" />

    <TabContent for="tab1" />
    <TabContent for="tab2" />
    <TabContent for="tab3" />
</Tabs>
```

- **with Redux** (or any other external state management library) - [see example](https://github.com/patrik-piskay/react-tabs-redux/tree/master/examples/redux)

The only change needed from plain React example is to provide `handleSelect` and `selectedTab` (`name` as well if you want to have multiple `<Tabs />` instances in your app) props to `<Tabs />` component so that you are able to save and retrieve information about which tab is currently active from your external state.

```javascript
<Tabs
    /* namespace for this <Tabs /> instance so you can keep track of
       multiple <Tabs /> instances in your external state */
    name="tabs1"
    handleSelect={(selectedTab, namespace) => {
        // fire Redux action here
    }}
    /* selected tab name retrieved from external state */
    selectedTab="tab2"
>
    <TabLink to="tab1" />
    <TabLink to="tab2" />
    <TabLink to="tab3" />

    <TabContent for="tab1" />
    <TabContent for="tab2" />
    <TabContent for="tab3" />
</Tabs>
```
-------------

By default, the first `<TabLink />` component is set to active. You can change this by specifying `default` in props of the `<TabLink />` component you want to become active instead.

```javascript
<Tabs>
    <TabLink to="tab1" />
    <TabLink to="tab2" default />
    <TabLink to="tab3" />

    <TabContent for="tab1" />
    <TabContent for="tab2" /> // this gets visible
    <TabContent for="tab3" />
</Tabs>
```
-------------

`<TabLink />` and `<TabContent />` **don't need** to be first level children of `<Tabs />` component. You can put them as deep in your markup as you need to (*e.g. because of styling*) making `<Tabs />` component **fully customizable**.

This will work then:

```javascript
<Tabs>
    <ul>
        <li><TabLink to="tab1" /></li>
        <li><TabLink to="tab2" /></li>
        <li><TabLink to="tab3" /></li>
    </ul>

    <div>
        <TabContent for="tab1" />
        <TabContent for="tab2" />
        <TabContent for="tab3" />
    </div>
</Tabs>
```
-------------
See more in [examples](https://github.com/patrik-piskay/react-tabs-redux/tree/master/examples)

## Styling components

#### Class names

There is couple of class names dynamically added to the components.

`<TabLink />` will receive `tab-link` class name with `tab-link-active` added when tab is active.

```javascript
/* will receive `className="tab-link"` in props */
<TabLink to="tab1" />

/* will receive `className="tab-link tab-link-active"` in props */
<TabLink to="tab2" default />
```

`<TabContent />` will receive `tab-content` class name.

```javascript
/* will receive `className="tab-content"` in props */
<TabContent for="tab1" />
```

#### Inline styles

If you prefer to use inline styles, you can set `style` in props of each of `<Tabs />`, `<TabLink />` and `<TabContent />` components.

To apply style for an active tab link, set the style as `activeLinkStyle` in props of `<Tabs />` component.

```javascript
<Tabs
    style={/* styles for tabs wrapper */}
    activeLinkStyle={/* style that will be applied on the active `<TabLink />` */}
>
    <TabLink to="tab1" style={/* styles for inactive tab link */} />
    <TabLink to="tab2" style={/* styles for inactive tab link */} />

    <TabContent for="tab1" style={/* styles for tab content */} />
    <TabContent for="tab2" style={/* styles for tab content */} />
</Tabs>
```
----------

In each [example](https://github.com/patrik-piskay/react-tabs-redux/tree/master/examples) there is one `<Tabs />` components styled using class names and the other one styled using inline styles.

## License

MIT