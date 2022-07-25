import { normalizeProduct, getAllProductsQuery } from "../utils";

import { Product } from "@common/types/product";
import { ApiConfig } from "@common/types/api";
import { ProductConnection } from "../schema";

type FetchApiReturnType = {
  products: ProductConnection;
};

const getAllProducts = async (config: ApiConfig): Promise<Product[]> => {
  const { data } = await config.fetch<FetchApiReturnType>({
    url: config.apiUrl,
    query: getAllProductsQuery,
  });

  const products =
    data.products.edges.map(({ node: product }) => normalizeProduct(product)) ??
    [];

  return products;
};

export default getAllProducts;
