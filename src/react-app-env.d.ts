/// <reference types="react-scripts" />
// Handles typescript error for ethereum property not found on window object
// eslint-disable-next-line no-unused-vars
interface Window {
  ethereum: any;
}
