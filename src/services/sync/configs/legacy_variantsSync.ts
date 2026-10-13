import TABLE_LEGACY_VARIANTS from '../../wiki/tables/LegacyVariantsTable';
import type { SyncDataset } from '../syncData';

const LEGACY_VARIANTS_SYNC: SyncDataset = {
    dataset: 'legacy_variants',
    databaseTable: 'legacy_variants',
    cargo: TABLE_LEGACY_VARIANTS,
};

export default LEGACY_VARIANTS_SYNC;
