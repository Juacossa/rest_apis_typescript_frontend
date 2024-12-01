import { boolean, number, object, string, InferOutput, array, optional} from 'valibot'

export const DraftProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object ({
    id: number(),
    name: string(),
    price: number(),
    availability: optional(boolean()),
})
export const ProductsSchema = array(ProductSchema)
export type Product = InferOutput<typeof ProductSchema>

// export const ProductSchema = object({
//     id: number(),
//     name: string(),
//     price: number(),
//     availability: boolean()
// })

// export const ProductsSchema = array(ProductSchema)

// //transformar de schema a type
// export type Product = InferOutput<typeof ProductSchema>