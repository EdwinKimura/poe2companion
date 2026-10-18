import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'quest_rewards._ID=id',
    'quest_rewards._pageID=pageID',
    'quest_rewards._pageName=pageName',
    'quest_rewards.act',
    'quest_rewards.class_ids',
    'quest_rewards.classes',
    'quest_rewards.item_level',
    'quest_rewards.notes',
    'quest_rewards.quest',
    'quest_rewards.quest_id',
    'quest_rewards.rarity',
    'quest_rewards.sockets',
] as const;

const TABLE_QUEST_REWARDS : CargoTable = {
    table: 'quest_rewards',
    fields: FIELDS,
};

export default TABLE_QUEST_REWARDS;
