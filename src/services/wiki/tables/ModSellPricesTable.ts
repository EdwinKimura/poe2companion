import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'mod_sell_prices._ID=id',
    'mod_sell_prices._pageID=pageID',
    'mod_sell_prices._pageName=pageName',
    'mod_sell_prices.amount',
    'mod_sell_prices.name',
] as const;

const TABLE_MOD_SELL_PRICES : CargoTable = {
    table: 'mod_sell_prices',
    fields: FIELDS,
};

export default TABLE_MOD_SELL_PRICES;
