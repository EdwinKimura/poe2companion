import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'events._ID=id',
    'events._pageID=pageID',
    'events._pageName=pageName',
    'events.end_date',
    'events.id=cargo_id',
    'events.is_hardcore',
    'events.is_standard',
    'events.links',
    'events.name',
    'events.number_of_events',
    'events.ordinal',
    'events.prize',
    'events.release_date',
    'events.release_version',
    'events.rewards',
    'events.short_name',
    'events.type',
] as const;

const TABLE_EVENTS : CargoTable = {
    table: 'events',
    fields: FIELDS,
};

export default TABLE_EVENTS;
