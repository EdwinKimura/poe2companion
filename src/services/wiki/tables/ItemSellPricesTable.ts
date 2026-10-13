import type { CargoTable } from '../types/table.type';

const FIELDS = [
    'item_sell_prices._ID=id',
    'item_sell_prices._pageID=pageID',
    'item_sell_prices._pageName=pageName',
    'item_sell_prices.amount',
    'item_sell_prices.name',
] as const;

const TABLE_ITEM_SELL_PRICES : CargoTable = {
    table: 'item_sell_prices',
    fields: FIELDS,
};

export default TABLE_ITEM_SELL_PRICES;
