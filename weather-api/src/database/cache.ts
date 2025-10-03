import { Keyv } from 'keyv';
import KeyvRedis from '@keyv/redis';
import { createCache } from 'cache-manager';

import { CACHE_HOST, CACHE_PORT } from '../config/env'

const cache = new Keyv({
  store: new KeyvRedis(`${CACHE_HOST}:${CACHE_PORT}`),
  ttl: 10000
});

export default cache;