import TABLE_VENDOR_REWARDS from '../../wiki/tables/VendorRewardsTable';
import type { SyncDataset } from '../syncData';

const VENDOR_REWARDS_SYNC: SyncDataset = {
    dataset: 'vendor_rewards',
    databaseTable: 'vendor_rewards',
    cargo: TABLE_VENDOR_REWARDS,
};

export default VENDOR_REWARDS_SYNC;
