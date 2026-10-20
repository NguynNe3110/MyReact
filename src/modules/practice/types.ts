export interface Category {
  id: string;
  name: string;
  slug?: string;
}

export interface Price {
  amount: number;
  currency: string;
}

export interface Inventory {
  quantity: number;
  inStock: boolean;
}

export interface Media {
  thumbnail?: string | null;
  images?: string[];
}

export interface Attributes {
  brand?: string;
  warranty?: string;
  [key: string]: any;
}

export interface Options {
  color: string;
  size: string;
  [key: string]: string;
}

export interface Variant {
  sku: string;
  options: Options;
}

export interface Rating {
  average: number;
  count: number;
}

export type Tag = string;

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: Price;
  category: Category;
  inventory: Inventory;
  media: Media;
  attributes?: Attributes;
  variants: Variant[];
  rating?: Rating;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
    items: Product[];
}

// Dữ liệu mẫu từ server:
// {
//   "data": {
//     "items": [
//       {
//         "id": "prd_001",
//         "name": "Tai nghe Bluetooth",
//         "description": null,
//         "price": {
//           "amount": 50000,
//           "currency": "VND"
//         },
//         "category": {
//           "id": "cat_electronics",
//           "name": "Điện tử",
//           "slug": "electronics"
//         },
//         "inventory": {
//           "quantity": 0,
//           "inStock": false
//         },
//         "media": {
//           "thumbnail": null,
//           "images": []
//         },
//         "attributes": {
//           "brand": "Demo",
//           "warranty": "12 months"
//         },
//         "variants": [
//           {
//             "sku": "DEMO-001-BLACK",
//             "options": {
//               "color": "black",
//               "size": "M"
//             }
//           },
//           {
//             "sku": "DEMO-001-WHITE",
//             "options": {
//               "color": "white",
//               "size": "L"
//             }
//           }
//         ],
//         "rating": {
//           "average": 3.5,
//           "count": 0
//         },
//         "tags": [
//           "demo",
//           "featured"
//         ],
//         "createdAt": "2026-10-20T07:34:11.211453661Z",
//         "updatedAt": "2026-10-20T07:34:11.211453661Z"
//       }
//     ]
//   }
// }