import { safeParse, pipe, transform, number, string } from 'valibot';
//Es una función de Valibot que valida datos contra un esquema definido
import axios from "axios";
import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types";
import { toBoolean } from '../utils';

type ProductData = {
    [k: string]: FormDataEntryValue; //el custom type de react - cadena de strings
}

//Función asincrona que interactua y envia los datos a la REST API
export async function addProduct(data : ProductData) {
    try {
        //aqui comprobamos y validamos con el schema para mandarlo a la api - con valibot
        const result = safeParse(DraftProductSchema, {
            name: data.name, // se extrae la data de name, y se convierte a name
            price: +data.price // se extrae la data de price, y se convierte a price + numero
        }) //primero el schema, y después el objeto ya modificado
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, { //aqui axios envia los productor a la api
                // result.output contiene los datos validados despues de safeparse 
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no validos')
        }
    } catch (error) {
        console.log(error)
        
    }
}


export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success) {
            return result.output // aqui lo regresa hacia nuestro componente
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
    
}

export async function getProductById(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success) {
            return result.output // aqui lo regresa hacia nuestro componente
        } else {
            throw new Error('Hubo un error...')
        }
    } catch (error) {
        console.log(error)
    }
    
}

export async function updateProduct( data : ProductData, id : Product['id']) {

    try {
        const NumberSchema = pipe(
            string(),
            transform((input) => {
              const parsed = Number(input);
              if (isNaN(parsed)) {
                throw new Error('El valor no es un número válido');
              }
              return parsed;
            }),
            number()
          );

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: safeParse(NumberSchema, data.price).output,
            availability: toBoolean(data.availability.toString()),
        })
        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}` 
            await axios.put(url, result.output)
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id : Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}
