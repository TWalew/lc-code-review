import { createContext } from 'react';

import { GlobalStore } from 'stores/index';

type IAppContext = {
  store: GlobalStore
};

export default createContext<IAppContext>({
  store: new GlobalStore(),
});