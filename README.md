This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the Create React App guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Getting Started

1. Install the npm dependencies:

### `npm install`

2. Create a `.env` file. There is a `sample.env` to show you a sample. Rename `sample.env` to `.env`

3. Run the development server:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

## Conventions

### Adding Components
To add a new component to the project, add the component itself to the `/components` directory as well as an accompanying test. The test should have the same filename as the component, with `.test` appended before the `.js` `(Sidebar.js ==> Sidebar.test.js)`. See the section about [running tests](#running-tests) for more information on writing them.

### Adding Styles to Components
If the component will have any custom styles, you should create a `.css` files with the same name as the component, place it in the `/styles` directory and import the file into the component itself.

### Adding Images to Components
If the component will have any static images, place the image in the `/images` directory and import the image into the component.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## Running Tests

This uses [Jest](https://facebook.github.io/jest/) as its test runner.

Jest is a Node-based runner. This means that the tests always run in a Node environment and not in a real browser. This lets us enable fast iteration speed and prevent flakiness.

### Writing Tests

To create tests, add `it()` (or `test()`) blocks with the name of the test and its code. You may optionally wrap them in `describe()` blocks for logical grouping but this is neither required nor recommended.

Jest provides a built-in `expect()` global function for making assertions. A basic test could look like this:

```js
import sum from './sum';

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});
```

All `expect()` matchers supported by Jest are [extensively documented here](http://facebook.github.io/jest/docs/api.html#expect-value).<br>
You can also use [`jest.fn()` and `expect(fn).toBeCalled()`](http://facebook.github.io/jest/docs/api.html#tobecalled) to create “spies” or mock functions.
