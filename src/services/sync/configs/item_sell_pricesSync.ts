import TABLE_ITEM_SELL_PRICES from '../../wiki/tables/ItemSellPricesTable';
import type { SyncDataset } from '../syncData';

const ITEM_SELL_PRICES_SYNC: SyncDataset = {
    dataset: 'item_sell_prices',
    databaseTable: 'item_sell_prices',
    cargo: TABLE_ITEM_SELL_PRICES,
};

export default ITEM_SELL_PRICES_SYNC;
