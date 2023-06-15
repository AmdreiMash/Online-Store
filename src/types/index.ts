export type Tag = 'div' | 'section' | 'aside' | 'header' | 'footer' | 'main';
export type Categories = string[];
export type Brands = string[];
export type Range = [number, number];
export type ProductItem = {
  [key: string]: number | string | string[];
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};
export type Options = {
  categories: Categories;
  brands: Brands;
  price: Range;
  stock: Range;
};
export type FilteredNumbers = {
  categories: Range[];
  brands: Range[];
};

export type CountInCategories = {
  category: string;
  count: Range;
}[];

export type CountInBrands = {
  brand: string;
  count: Range;
}[];

export type CountInFilters = {
  categories: CountInCategories;
  brands: CountInBrands;
};

export type Borders<T> = {
  actual: T;
  total: T;
};

export type MinOrMax = 'min' | 'max';

export type DataForRender = {
  products: ProductItem[];
  categories: CountInCategories;
  brands: CountInBrands;
  price: Range;
  stock: Range;
};

export type Hendler = (e: React.MouseEvent<HTMLInputElement>) => void;
export interface BarProps {
  sliderColor: string;
  ProductItems: ProductItem[];
  switchBrands: Hendler;
  switchCategory: Hendler;
  brands: Set<string> | Set<unknown>;
  category: Set<string> | Set<unknown>;
  search: string;
  setSearch: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  range: {
    [key: string]: number[];
  };
  setRangeValue: (event: Event, labe: string, newValue: number[] | number) => void;
  rangeValue: {
    [key: string]: number[] | number;
  };
  drop: () => void;
}

export interface SliderProps {
  color: string;
  valueLable: string;
  max: number;
  min: number;
  setRangeValue: (event: Event, labe: string, newValue: number[] | number) => void;
  rangeValue: {
    [key: string]: number[] | number;
  };
}

export interface IHeaderProps {
  count: number;
  price: number;
  get: GetProps;
}

export type GetProps = (count: number, price: number) => void;

export interface IButtonProps {
  text: string;
  onclick: () => void;
}

export type RangeValye = { [price: string]: number[] | number; stock: number[] | number };

export type SearchParams = {
  [key: string]: string;
};

export type ItemForCart = {
  id: number;
  count: number;
};

export interface IProductsForPage {
  product: ProductItem;
  count: number;
  number: number;
}
export interface ICountChangerProps extends IProductsForPage {
  del: (id: number) => void;
  decCount: (id: number) => void;
  incCount: (id: number) => void;
}

export type FOnChange = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type FOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => void;

export type IsInputValid = {
  [key: string]: string;
};
