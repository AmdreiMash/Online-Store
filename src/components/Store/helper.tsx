import { IProductsForPage, ItemForCart, ProductItem, RangeValye, SearchParams } from '../../types/index';
import data from '../../Assets/products.json';

export const SHADOW = '11px 12px 5px 0px #35A3D6';
export const getMax = (data: ProductItem[], property: string): number => {
  return data.reduce((max: number, item: ProductItem) => {
    const current = item[property] as number;
    if (current > max) max = current;
    return max;
  }, 0);
};

export const getCategoryCount = (data: ProductItem[], category: string): number => {
  return data.reduce((result, item) => {
    if (item.category === category) result++;
    return result;
  }, 0 as number);
};

export const getBrandCount = (data: ProductItem[], brand: string): number => {
  return data.reduce((result, item: ProductItem) => {
    if (item.brand === brand) result++;
    return result;
  }, 0);
};
export const getMin = (data: ProductItem[], property: string): number => {
  return data.reduce((min: number, item: ProductItem) => {
    const current = (item as ProductItem)[property as keyof ProductItem] as number;
    if (current < min) min = current;
    return min;
  }, 1999);
};

export const DataCategory = data.products.reduce(
  (result: string[], x: ProductItem) => {
    if (result.indexOf(x.category) === -1) result.push(x.category);
    return result;
  },
  [data.products[0].category]
);

export const DataBrands = data.products.reduce(
  (result: string[], x: ProductItem) => {
    if (result.indexOf(x.brand) === -1) result.push(x.brand);
    return result;
  },
  [data.products[0].brand]
);

export const getRankingProducts = (products: ProductItem[], name: string): ProductItem[] => {
  if (name === 'raiting ASC') return products.sort((a, b) => a.rating - b.rating);
  if (name === 'raiting DESC') return products.sort((a, b) => b.rating - a.rating);
  if (name === 'price ASC') return products.sort((a, b) => a.price - b.price);
  if (name === 'price DESC') return products.sort((a, b) => b.price - a.price);
  return products;
};

export const setBackgroundImage = (element: HTMLElement | null, url: string) => {
  if (element) element.style.backgroundImage = `url(${url})`;
};

export const addSearchParams = (
  state: {
    defaultRange: {
      price: number[];
      stock: number[];
    };
    category: Set<unknown>;
    brands: Set<unknown>;
    search: string;
  },
  rangeValue: RangeValye,
  directionAndRank: {
    direction: string;
    rank: string;
  }
): SearchParams => {
  const result: SearchParams = {};
  if (state.category.size > 0) {
    result.category = Array.from(state.category).join('%');
  }
  if (state.brands.size > 0) {
    result.brand = Array.from(state.brands).join('%');
  }
  if (state.search !== '') result.search = state.search;
  if (Array.isArray(rangeValue.stock) && Array.isArray(rangeValue.price)) {
    if (rangeValue.price[0] !== state.defaultRange.price[0] || rangeValue.price[1] !== state.defaultRange.price[1]) {
      result.price = rangeValue.price[0] + '%' + rangeValue.price[1];
    }
    if (rangeValue.stock[0] !== state.defaultRange.stock[0] || rangeValue.stock[1] !== state.defaultRange.stock[1]) {
      result.stock = rangeValue.stock[0] + '%' + rangeValue.stock[1];
    }
  }
  if (directionAndRank.rank !== '') {
    result.rankBy = directionAndRank.rank;
  }
  if (directionAndRank.direction !== '') {
    result.direction = directionAndRank.direction;
  }
  return result;
};

export const getProductsForPage = (items: ItemForCart[], page: number, limit: number): IProductsForPage[] => {
  const start = (page - 1) * limit;
  let end = page * limit - 1;
  const res = [];
  if (items.length - 1 < end) end = items.length - 1;
  for (let i = start; i <= end; i += 1) {
    res.push({
      product: data.products.find((prod: ProductItem) => prod.id === items[i].id) as ProductItem,
      count: items[i].count,
      number: i + 1,
    });
  }
  return res;
};

export const addToCart = (id: number): ItemForCart[] => {
  const cartItems = localStorage.getItem('cart');
  let items = [] as ItemForCart[];
  if (cartItems === null) {
    localStorage.setItem('cart', JSON.stringify([{ id: id, count: 1 }]));
  } else {
    items = JSON.parse(cartItems);
    const index = items.indexOf(items.find((item) => item.id === id) as ItemForCart);
    if (index === -1) items.push({ id: id, count: 1 });
    else {
      items[index].count++;
    }
    localStorage.setItem('cart', JSON.stringify(items));
  }
  return items;
};

export const removeFromCart = (id?: number): void => {
  const cartItems = localStorage.getItem('cart');
  if (cartItems !== null) {
    const items = JSON.parse(cartItems) as ItemForCart[];
    const index = items.indexOf(items.find((item) => item.id === id) as ItemForCart);
    if (index !== -1) {
      items[index].count--;
      if (items[index].count === 0) {
        items.splice(index, 1);
      }
    }
    localStorage.setItem('cart', JSON.stringify(items));
  }
};

export const removeAllFromCart = (id?: number): ItemForCart[] => {
  if (id === undefined) {
    localStorage.removeItem('cart');
    return [] as ItemForCart[];
  }
  const cartItems = localStorage.getItem('cart');
  let items = [] as ItemForCart[];
  if (cartItems !== null) {
    items = JSON.parse(cartItems);
    const index = items.indexOf(items.find((item) => item.id === id) as ItemForCart);
    if (index !== -1) items.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(items));
  }
  return items;
};

export const isInCart = (id: number): boolean => {
  const cart = localStorage.getItem('cart');
  if (cart === null) return false;
  const items = JSON.parse(cart) as ItemForCart[];
  if ((items.filter((item) => item.id === id) as ItemForCart[]).length > 0) return true;
  return false;
};

export const getProductsDirection = (direction: string) => {
  if (direction === '' || direction === 'column') {
    return {
      container: {
        //margin: '0px auto',
        display: 'flex',
        flexWrap: 'wrap',
        //flexDirection: 'column',
        gap: '10px',
        justifyContent: 'flex-start',
      },
      card: {
        border: '1px solid rgb(204, 204, 204)',
        backgroundColor: 'rgb(248, 249, 250)',
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        borderRadius: '10px',
        boxSizing: 'border-box',
        flex: '0 0 31%',
        minWidth: '250px',
        gap: '5px',
      },
      button: {
        display: 'flex',
        gap: '5px',
      },
    } as const;
  }
  return {
    container: {
      //margin: '0px auto',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      justifyContent: 'flex-start',
    },
    card: {
      display: 'inline-flex',
      justifyContent: 'space-between',
      padding: '10px',
      borderRadius: '10px',
      boxSizing: 'border-box',
      flex: '0 0 90%',
      gap: '5px',
      border: '1px solid rgb(204, 204, 204)',
      backgroundColor: 'rgb(248, 249, 250)',
    },
    button: {
      display: 'flex',
      gap: '5px',
      flexDirection: 'column',
    },
  } as const;
};

export const getStateParams = (searchParams: URLSearchParams) => {
  const state = {} as {
    defaultRange: {
      price: number[];
      stock: number[];
    };
    category: Set<unknown>;
    brands: Set<unknown>;
    search: string;
  };
  if (searchParams.has('category')) {
    state.category = new Set(searchParams.getAll('category')[0].split('%'));
  } else {
    state.category = new Set();
  }
  if (searchParams.has('brand')) {
    state.brands = new Set(searchParams.getAll('brand')[0].split('%'));
  } else {
    state.brands = new Set();
  }
  if (searchParams.has('search')) {
    state.search = searchParams.get('search') as string;
  } else {
    state.search = '';
  }
  return state;
};

export const getDirectionAndRankParams = (searchParams: URLSearchParams) => {
  const directionAndRank = {} as {
    rank: string;
    direction: string;
  };
  if (searchParams.has('rankBy')) {
    directionAndRank.rank = searchParams.get('rankBy') as string;
  } else {
    directionAndRank.rank = '';
  }
  if (searchParams.has('direction')) {
    directionAndRank.direction = searchParams.get('direction') as string;
  } else {
    directionAndRank.direction = '';
  }
  return directionAndRank;
};

//! TO DO get Range Value Params!
export const getRangeValueParams = (searchParams: URLSearchParams): RangeValye => {
  const state = {
    price: [getMin(data.products, 'price'), getMax(data.products, 'price')],
    stock: [getMin(data.products, 'stock'), getMax(data.products, 'stock')],
  };
  if (searchParams.has('price'))
    state.price = (searchParams
      .get('price')
      ?.split('%')
      .map((value) => +value) as unknown) as number[];
  if (searchParams.has('stock'))
    state.stock = (searchParams
      .get('stock')
      ?.split('%')
      .map((value) => +value) as unknown) as number[];
  return state;
};
