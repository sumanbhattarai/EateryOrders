import {useState, useEffect, useCallback} from 'react';

import {useAppSelector} from 'services/TypedRedux';
import {IMappedMenus} from 'store/utils';

interface Props {
  menus: IMappedMenus;
  search: string;
}

const useFoodSearch = ({menus, search}: Props) => {
  const {entities} = useAppSelector((state) => state.menu);
  const [searchedMenus, setSearchedMenus] = useState<IMappedMenus>();

  const handleSearch = useCallback(() => {
    const data = {} as IMappedMenus;
    for (const cat in menus) {
      const arr = menus[cat].filter((el) =>
        entities[el]?.name.toUpperCase().includes(search.toUpperCase()),
      );
      if (arr.length > 0) {
        data[cat] = arr;
      }
    }
    setSearchedMenus(data);
  }, [entities, menus, search]);

  useEffect(() => {
    handleSearch();
  }, [search, handleSearch]);

  return search ? (searchedMenus as IMappedMenus) : menus;
};

export default useFoodSearch;
