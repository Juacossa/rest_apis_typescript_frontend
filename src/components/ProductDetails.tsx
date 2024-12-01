import { Product } from "../types"
import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from "react-router-dom"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"


type ProductDetailsProps = {
    product: Product
}

export async function action({params} : ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteProduct(+params.id) //dnv el await es para esperar a que finalice para ejecutar el return

        return redirect('/')
    }

}
export default function ProductDetails({product} : ProductDetailsProps) {

    const fetcher = useFetcher()
    const  navigate = useNavigate()

    const isAvailable = product.availability !== false;

  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form method="POST">
                <button 
                    type="submit"
                    name="id"
                    value={product.id}
                    className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg
                        p-2 text-sm uppercase font-bold w-full border border-black hover:cursor-pointer `}
                >
                    {isAvailable ? 'Disponible' : 'No Disponible'}
                </button>
                <input type="hidden" name="id" />
            </fetcher.Form>


        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-2 items-center">
                <button
                    onClick={() => navigate(`/productos/${product.id}/editar`)}
                    className="bg-indigo-600 text-white rounded-lg p-2 w-full uppercase 
                    font-bold text-sm text-center"
                >Editar</button>

                <Form //se envia via action y cuadno se mande a llamar la URL de eliminar, lo elimina
                    className="w-full"
                    method="POST"
                    action={`productos/${product.id}/eliminar`}
                    onSubmit={(e) => { //se ejecuta antes que el action
                        if( !confirm('¿Eliminar?')) {
                            e.preventDefault()
                        }
                    }}
                >
                    <input 
                        type='submit'
                        value='Eliminar'
                        className="bg-red-600 text-white rounded-lg p-2 w-full uppercase 
                        font-bold text-sm text-center cursor-pointer"
                    />
                </Form>
            </div>
        </td>
    </tr> 
  )
}
