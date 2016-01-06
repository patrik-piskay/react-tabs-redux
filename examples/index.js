import React from 'react';
import { render } from 'react-dom';

import '../src';

const App = () => <h1>Hello world</h1>;

render(<App />, document.getElementById('app'));