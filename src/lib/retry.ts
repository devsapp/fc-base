'use strict';

import retry from 'promise-retry';

const defaultRetries = 2;

export default async function promiseRetry(fn: any): Promise<any> {
  const retryOptions = {
    retries: defaultRetries,
    factor: 2,
    minTimeout: 1 * 1000,
    randomize: true,
  };
  return retry(fn, retryOptions);
}
