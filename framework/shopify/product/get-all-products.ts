
import {
    fetchApi,
    normalizeProduct,
    getAllProductsQuery
} from "../utils"

import { Product } from "@common/types/product";
import { ProductConnection } from '../schema'

type FetchApiReturnType = {
    products: ProductConnection
}

const getAllProducts = async (): Promise<Product[]> => {
    const {data} = await fetchApi<FetchApiReturnType>({ query: getAllProductsQuery })

    const products = data.products.edges.map(({node: product}) => normalizeProduct(product)) ?? []

    return products
}

export default getAllProducts