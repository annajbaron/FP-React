import { combineReducers } from 'redux';
import UserReducer from './reducer_user';
import BrandsReducer from './reducer_brands';
import ActiveBrandReducer from './reducer_active_brand';
import FollowedBrandReducer from './reducer_followed_brands';
import SiteReducer from './reducer_site';
import CollectionReducer from './reducer_collections';

const rootReducer = combineReducers({
  site: SiteReducer,
  user: UserReducer,
  brands: BrandsReducer,
  activeBrand: ActiveBrandReducer,
  followedBrands: FollowedBrandReducer,
  collections: CollectionReducer
});

export default rootReducer;
