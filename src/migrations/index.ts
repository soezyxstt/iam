import * as migration_20260521_174128_add_lowongan_fields from './20260521_174128_add_lowongan_fields';

export const migrations = [
  {
    up: migration_20260521_174128_add_lowongan_fields.up,
    down: migration_20260521_174128_add_lowongan_fields.down,
    name: '20260521_174128_add_lowongan_fields'
  },
];
