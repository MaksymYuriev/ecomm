import {ImageEdge, Product as ShopifyProduct} from '../schema';
import {Product} from '@common/types/product';

type ImagesEdgesType = {
    edges: ImageEdge[]
}

const normalizeProductImages = ({edges}: ImagesEdgesType) => edges.map(({node: {originalSrc: src, ...rest}}) => ({url: `/images/${src}`, ...rest}))

export const normalizeProduct = (productNode: ShopifyProduct): Product => {
    const {id, title: name, handle, vendor, description, images: imageConnection, ...rest} = productNode

    const product = {
        id,
        name,
        vendor,
        description,
        images: normalizeProductImages(imageConnection),
        path: `/${handle}`,
        slug: handle.replace(/^\/+|\/+$/g, ""), // removing slashes from the beginning and end of the slug
        ...rest
    }

    return product;
}
