/**
 * Replace with custom client implementation when needed.
 * @module client
 */

import client from './start-client';

console.log('Starting');
client();

if (module.hot) {
  module.hot.accept();
}
