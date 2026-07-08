import * as migration_20260609_165001 from './20260609_165001';
import * as migration_20260609_181816 from './20260609_181816';
import * as migration_20260708_072427_fix_nilai_filosofi_enum_length from './20260708_072427_fix_nilai_filosofi_enum_length';

export const migrations = [
  {
    up: migration_20260609_165001.up,
    down: migration_20260609_165001.down,
    name: '20260609_165001',
  },
  {
    up: migration_20260609_181816.up,
    down: migration_20260609_181816.down,
    name: '20260609_181816',
  },
  {
    up: migration_20260708_072427_fix_nilai_filosofi_enum_length.up,
    down: migration_20260708_072427_fix_nilai_filosofi_enum_length.down,
    name: '20260708_072427_fix_nilai_filosofi_enum_length'
  },
];
