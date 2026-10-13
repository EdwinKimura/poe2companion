import TABLE_QUEST_REWARDS from '../../wiki/tables/QuestRewardsTable';
import type { SyncDataset } from '../syncData';

const QUEST_REWARDS_SYNC: SyncDataset = {
    dataset: 'quest_rewards',
    databaseTable: 'quest_rewards',
    cargo: TABLE_QUEST_REWARDS,
};

export default QUEST_REWARDS_SYNC;
