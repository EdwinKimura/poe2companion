import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'vendor_rewards._ID=id',
    'vendor_rewards._pageID=pageID',
    'vendor_rewards._pageName=pageName',
    'vendor_rewards.act',
    'vendor_rewards.class_ids',
    'vendor_rewards.classes',
    'vendor_rewards.npc',
    'vendor_rewards.quest',
    'vendor_rewards.quest_id',
] as const;

const TABLE_VENDOR_REWARDS : CargoTable = {
    table: 'vendor_rewards',
    fields: FIELDS,
};

export default TABLE_VENDOR_REWARDS;
