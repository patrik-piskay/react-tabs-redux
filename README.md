# React tabs (Redux compatible)

[![Travis](https://img.shields.io/travis/patrik-piskay/react-tabs-redux.svg?style=flat-square)](https://travis-ci.org/patrik-piskay/react-tabs-redux) [![npm](https://img.shields.io/npm/v/react-tabs-redux.svg?style=flat-square)](https://www.npmjs.com/package/react-tabs-redux)

Simple, fully customizable React tabs component that can be used in plain React application or with any Flux-like architecture with external application state, e.g. Redux.

![React Tabs](https://res.cloudinary.com/web-development/image/upload/v1452427467/anim_fazjn9.gif)

## Installation

Using npm:

    $ npm install react-tabs-redux

UMD build is also available:
```html
<script src="https://unpkg.com/react-tabs-redux/dist/react-tabs.min.js"></script>
```
with components accessible via `window.ReactTabs` object.

***NOTE:*** *This component requires* ***React*** *to be installed separately.*

## Usage

- **with plain React** (using component's internal state) - [see example](https://github.com/patrik-piskay/react-tabs-redux/tree/master/examples/plain-react)

```jsx
<Tabs>
    <TabLink to="tab1">Tab1</TabLink>
    <TabLink to="tab2">Tab2</TabLink>
    <TabLink to="tab3">Tab3</TabLink>

    <TabContent for="tab1">/* content for tab #1 */</TabContent>
    <TabContent for="tab2">/* content for tab #2 */</TabContent>
    <TabContent for="tab3">/* content for tab #3 */</TabContent>
</Tabs>
```

- **with Redux** (or any other external state management library) - [see example](https://github.com/patrik-piskay/react-tabs-redux/tree/master/examples/redux)

The only change needed from *plain React* example is to provide `handleSelect` and `selectedTab` (`name` as well if you want to have multiple `<Tabs />` instances in your app) props to `<Tabs />` component so that you are able to save and retrieve information about which tab is currently active from your external application state.

```jsx
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
    <TabLink to="tab1">Tab1</TabLink>
    <TabLink to="tab2">Tab2</TabLink>
    <TabLink to="tab3">Tab3</TabLink>

    <TabContent for="tab1">...</TabContent>
    <TabContent for="tab2">...</TabContent>
    <TabContent for="tab3">...</TabContent>
</Tabs>
```
-------------

By default, the first `<TabLink />` component is set to active. You can change this by specifying `default` in props of the `<TabLink />` component you want to become active instead.

```jsx
<Tabs>
    <TabLink to="tab1">Tab1</TabLink>
    <TabLink to="tab2" default>Tab2</TabLink>
    <TabLink to="tab3">Tab3</TabLink>

    <TabContent for="tab1">...</TabContent>
    <TabContent for="tab2">...</TabContent> // this gets visible
    <TabContent for="tab3">...</TabContent>
</Tabs>
```
-------------

`<TabLink />` and `<TabContent />` **don't need** to be first level children of `<Tabs />` component. You can put them as deep in your markup as you need to (*e.g. because of styling*) making `<Tabs />` component **fully customizable**.

This will work then:

```jsx
<Tabs>
    <ul>
        <li><TabLink to="tab1">Tab1</TabLink></li>
        <li><TabLink to="tab2">Tab2</TabLink></li>
        <li><TabLink to="tab3">Tab3</TabLink></li>
    </ul>

    <div>
        <TabContent for="tab1">...</TabContent>
        <TabContent for="tab2">...</TabContent>
        <TabContent for="tab3">...</TabContent>
    </div>
</Tabs>
```
-------------

If, for performance or other reasons, you wish to render only the content of the active tab to HTML and not render anything for the rest (not visible content), you may set an `renderActiveTabContentOnly` prop on `<Tabs />` component.

```jsx
<Tabs renderActiveTabContentOnly={true}>
    <ul>
        <li><TabLink to="tab1" default>Tab1</TabLink></li>
        <li><TabLink to="tab2">Tab2</TabLink></li>
        <li><TabLink to="tab3">Tab3</TabLink></li>
    </ul>

    <div>
        <TabContent for="tab1">Content 1 /* rendered in HTML */</TabContent>
        <TabContent for="tab2">Content 2 /* empty in HTML */</TabContent>
        <TabContent for="tab3">Content 3 /* empty in HTML */</TabContent>
    </div>
</Tabs>
```

-------------

See more in [examples](https://github.com/patrik-piskay/react-tabs-redux/tree/master/examples)

## Styling components

#### Class names

There is a couple of class names dynamically added to the components:

`<TabLink />` will receive `tab-link` class name with `tab-link-active` added when tab is active.

```jsx
/* will receive `className="tab-link"` in props */
<TabLink to="tab1">Tab1</TabLink>

/* will receive `className="tab-link tab-link-active"` in props */
<TabLink to="tab2" default>Tab1</TabLink>
```

To override the default class names, `<TabLink/>` accepts a `className` prop, as well as an `activeClassName` prop.

-------------

`<TabContent />` will receive `tab-content` class name with `tab-content-visible` added when the content is visible (its corresponding `<TabLink />` is active).

```jsx
/* will receive `className="tab-content"` or `className="tab-content tab-content-visible"` in props */
<TabContent for="tab1">...</TabContent>
```

To override the default class names, `<TabContent />` accepts a `className` prop, as well as a `visibleClassName` prop.


#### Inline styles

If you prefer to use inline styles, you can set `style` in props of each of `<Tabs />`, `<TabLink />` and `<TabContent />` components.

To apply style for an active tab link, set the style as `activeLinkStyle` in props of `<Tabs />` component.
To apply style for a visible tab content, set the style as `visibleTabStyle` in props of `<Tabs />` component.

By default, react-tabs-redux will apply `display: none` styles to the appropriate `<TabContent/>` component, and `font-weight: bold` to the appropriate `<TabLink/>` component.  If you would like to use classes to handle all of the styling, and disable even the default inline styles, you may pass `disableInlineStyles` as a prop to the parent `<Tabs/>` component.

```jsx
<Tabs
    style={/* styles for tabs wrapper */}
    activeLinkStyle={/* style that will be applied on the active `<TabLink />` */}
    visibleTabStyle={/* style that will be applied on the visible `<TabContent />` */}
    disableInlineStyles={/* Boolean to toggle all inline styles */}
>
    <TabLink to="tab1" style={/* styles for inactive tab link */}> Tab1 </TabLink>
    <TabLink to="tab2" style={/* styles for inactive tab link */}> Tab2 </TabLink>

    <TabContent for="tab1" style={/* styles for tab content */}>...</TabContent>
    <TabContent for="tab2" style={/* styles for tab content */}>...</TabContent>
</Tabs>
```
----------

In each [example](https://github.com/patrik-piskay/react-tabs-redux/tree/master/examples) there is one `<Tabs />` components styled using class names and the other one styled using inline styles.

## License

MIT
