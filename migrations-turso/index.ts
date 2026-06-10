import * as migration_20260609_165001 from './20260609_165001';
import * as migration_20260609_181816 from './20260609_181816';

export const migrations = [
  {
    up: migration_20260609_165001.up,
    down: migration_20260609_165001.down,
    name: '20260609_165001',
  },
  {
    up: migration_20260609_181816.up,
    down: migration_20260609_181816.down,
    name: '20260609_181816'
  },
];
