export type CategoryData = {
  _id: string; // unique identifier
  _rev: string; // revision string
  _type: "category"; // constant indicating the document type
  _createdAt: string; // ISO 8601 timestamp
  _updatedAt: string; // ISO 8601 timestamp
  title: string; // required
  description?: string; // optional description
  image?: {
    _type: "image";
    asset: {
      _type: "reference";
      _ref: string; // Reference to the image asset
    };
    crop?: {
      _type: "sanity.imageCrop";
      top?: number;
      bottom?: number;
      left?: number;
      right?: number;
    };
    hotspot?: {
      _type: "sanity.imageHotspot";
      x?: number;
      y?: number;
      height?: number;
      width?: number;
    };
  }; // optional image
};


export type ProductData = {
  _id: string;
  _rev: string;
  _type: "product";
  _createdAt: string; // ISO 8601 timestamp
  _updatedAt: string; // ISO 8601 timestamp
  title: string; // required
  slug: {
    _type: "slug";
    current: string; // required
  };
  description?: string; // optional
  image: {
    _type: "image";
    asset: {
      _type: "reference";
      _ref: string; // Image reference ID
    };
  }; // optional
  category: Array<CategoryData>; // array of Category types
  price: number; // required
  rowprice?: number; // optional
  ratings: number; // optional, should be <= 5
  isnew?: boolean; // optional
  position?: string; // optional
  brand?: string; // optional
  quantity?: number; // optional
};
