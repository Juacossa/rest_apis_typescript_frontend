import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({request} : ActionFunctionArgs) {

  const data = Object.fromEntries(await request.formData())
  
  let error = ''
  if(Object.values(data).includes('')) {
    error = 'Todos lo campos son obligatorios...'
  }
  if(error.length) { //si error tiene algo retornamos el error, de lo contrario no
    return error // al momento de retorna algo en la acción ya se muestran disponibles en el componente con un hook
    // termina aqui si hay error, de lo contrario sigue en el otro 
  }

  // await es esperar a que termine de ejecutar addproduct para ejecutar lo resto
  await addProduct(data) //data se manda a la función addProduct para su uso en la rest api service
  // una vez terminado el bloque de await(hacer la validación y mandar a la info a la api) => continua el código

  return redirect('/')
}

export default function NewProducts() {

  const error = useActionData() as string


  return (
    <>
    <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
        <Link 
            to={'/'}
            className="rounded bg-indigo-600 p-3 font-bold text-white shadow-sm hover:bg-indigo-500"
        >
            Volver a Productos
        </Link>
    </div>  

    {error && <ErrorMessage> {error} </ErrorMessage>}

    <Form
      className="mt-10" 
      method="POST"
    >
 
        <ProductForm
          
        />

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>


  </>
  )
}
