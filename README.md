# Ascent Component Library

The Ascent Component Library is a collection of reusable React components designed for building modern web applications. The library includes a variety of UI components, all styled with Tailwind CSS and bundled with Vite.

## Directory Structure

- **lib**: All components should be written inside the `lib` directory since we're bundling the app to release as a library.
- **lib/assets**: All styles should be placed under the `/lib/assets` directory.

## Available Scripts

### `npm run test`

Runs the test cases for the components.

### `npm run storybook`

Starts Storybook to visualize and interact with your components in an isolated environment.

### `npm run build`

Builds the app. This should be done before raising a Pull Request.

## Getting Started

To get started with the Ascent Component Library, clone the repository and install the dependencies:

```sh
git clone <repository-url>
cd ascent-component-library
npm install
