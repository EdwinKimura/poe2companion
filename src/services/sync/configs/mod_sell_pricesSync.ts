import TABLE_MOD_SELL_PRICES from '../../wiki/tables/ModSellPricesTable';
import type { SyncDataset } from '../syncData';

const MOD_SELL_PRICES_SYNC: SyncDataset = {
    dataset: 'mod_sell_prices',
    databaseTable: 'mod_sell_prices',
    cargo: TABLE_MOD_SELL_PRICES,
};

export default MOD_SELL_PRICES_SYNC;
