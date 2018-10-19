# React tabs (Redux compatible)

[![Travis](https://img.shields.io/travis/patrik-piskay/react-tabs-redux.svg?style=flat-square)](https://travis-ci.org/patrik-piskay/react-tabs-redux) [![npm](https://img.shields.io/npm/v/react-tabs-redux.svg?style=flat-square)](https://www.npmjs.com/package/react-tabs-redux)

Simple, fully customizable, accessible React tabs component that can be used in plain React application or with any Flux-like architecture with external application state, e.g. Redux.

![React Tabs](https://res.cloudinary.com/web-development/image/upload/v1452427467/anim_fazjn9.gif)

## Installation

Using npm:

    $ npm install react-tabs-redux

UMD build is also available:

```html
<script src="https://unpkg.com/react-tabs-redux/dist/react-tabs.min.js"></script>
```

with components accessible via `window.ReactTabs` object.

**_NOTE:_** _This component requires_ **_React_** _to be installed separately._

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

The only change needed from _plain React_ example is to provide `handleSelect` and `selectedTab` (`name` as well if you want to have multiple `<Tabs />` instances in your app) props to `<Tabs />` component so that you are able to save and retrieve information about which tab is currently active from your external application state.

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

---

By default, the first `<TabLink />` component is set to active. You can change this by specifying `default` in props of the `<TabLink />` component you want to become active instead.

```jsx
<Tabs>
  <TabLink to="tab1">Tab1</TabLink>
  <TabLink to="tab2" default>
    Tab2
  </TabLink>
  <TabLink to="tab3">Tab3</TabLink>
  <TabContent for="tab1">...</TabContent>
  <TabContent for="tab2">...</TabContent> // this gets visible
  <TabContent for="tab3">...</TabContent>
</Tabs>
```

---

`<TabLink />` and `<TabContent />` **don't need** to be first level children of `<Tabs />` component. You can put them as deep in your markup as you need to (_e.g. because of styling_) making `<Tabs />` component **fully customizable**.

This will work then:

```jsx
<Tabs>
  <ul>
    <li>
      <TabLink to="tab1">Tab1</TabLink>
    </li>
    <li>
      <TabLink to="tab2">Tab2</TabLink>
    </li>
    <li>
      <TabLink to="tab3">Tab3</TabLink>
    </li>
  </ul>

  <div>
    <TabContent for="tab1">...</TabContent>
    <TabContent for="tab2">...</TabContent>
    <TabContent for="tab3">...</TabContent>
  </div>
</Tabs>
```

---

If, for performance or other reasons, you wish to render only the content of the active tab to HTML and not render anything for the rest (not visible content), you may set an `renderActiveTabContentOnly` prop on `<Tabs />` component.

```jsx
<Tabs renderActiveTabContentOnly={true}>
  <ul>
    <li>
      <TabLink to="tab1" default>
        Tab1
      </TabLink>
    </li>
    <li>
      <TabLink to="tab2">Tab2</TabLink>
    </li>
    <li>
      <TabLink to="tab3">Tab3</TabLink>
    </li>
  </ul>

  <div>
    <TabContent for="tab1">Content 1 /* rendered in HTML */</TabContent>
    <TabContent for="tab2">Content 2 /* empty in HTML */</TabContent>
    <TabContent for="tab3">Content 3 /* empty in HTML */</TabContent>
  </div>
</Tabs>
```

---

### `<Tabs />` props

| Prop name                  | Type                          | Default value | Description                                                                                                                                                                                                           |
| :------------------------- | :---------------------------- | :------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                       | _string_                      |               | Sets namespace of a `<Tabs />` component. Useful when multiple instances are used                                                                                                                                     |
| onChange                   | _function(selectedTab, name)_ |               | Called everytime the selected tab is changed. _(it gets called for the initial selected tab too)_                                                                                                                     |
| handleSelect               | _function(tab, name)_         |               | **(Optional) control prop** - called everytime a Tab Link is clicked <br><br> _Useful in an "external state" scenario (Redux, etc.), use `onChange` for tracking purposes._                                           |
| selectedTab                | _string_                      |               | **(Optional) control prop** - controls which tab is currently active. <br><br> _Useful in an "external state" scenario (Redux, etc.), when not set, the `<Tabs />` component will maintain the "selected tab" state._ |
| activeLinkStyle            | _object_                      |               | Style that gets applied to the selected `<TabLink />`                                                                                                                                                                 |
| visibleTabStyle            | _object_                      |               | Style that gets applied to the visible `<TabContent />`                                                                                                                                                               |
| disableInlineStyles        | _boolean_                     | false         | Useful if you are using `className` to style the components and don't want the default inline styles to get applied.                                                                                                  |
| renderActiveTabContentOnly | _boolean_                     | false         | _Performance_: When set, only the visible content gets actually rendered to DOM _(instead of all `<TabContent />` being rendered and hidden)_.                                                                        |
| tabComponent               | _string_                      |               | DOM element all `<TabLink />` render to. <br><br>_This can be set on `<TabLink />` level too, by setting the `component` prop on `<TabLink />` components._                                                           |

### `<TabLink />` props

| Prop name       | Type     | Default value     | Description                                                           |
| :-------------- | :------- | ----------------- | --------------------------------------------------------------------- |
| component       | _string_ | "button"          | DOM element `<TabLink />` renders to.                                 |
| className       | _string_ | "tab-link"        | Class name that's applied to <TabLink /> elements                     |
| activeClassName | _string_ | "tab-link-active" | Class name that's applied to the <TabLink /> element when it's active |

### `<TabContent />` props

| Prop name       | Type     | Default value         | Description                                                               |
| :-------------- | :------- | --------------------- | ------------------------------------------------------------------------- |
| className       | _string_ | "tab-content"         | Class name that's applied to <TabContent /> elements                      |
| activeClassName | _string_ | "tab-content-visible" | Class name that's applied to the <TabContent /> element when it's visible |

---

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

---

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

By default, react-tabs-redux will apply `display: none` styles to the appropriate `<TabContent/>` component, and `font-weight: bold` to the appropriate `<TabLink/>` component. If you would like to use classes to handle all of the styling, and disable even the default inline styles, you may pass `disableInlineStyles` as a prop to the parent `<Tabs/>` component.

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

---

In each [example](https://github.com/patrik-piskay/react-tabs-redux/tree/master/demo) there is one `<Tabs />` components styled using class names and the other one styled using inline styles.

## License

MIT
