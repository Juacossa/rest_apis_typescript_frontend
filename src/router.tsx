import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, { loader as productsLoader, action as updateAvailabilityAction} from './views/Products'
import NewProducts, { action as newProductAction } from './views/NewProducts'
import EditProduct, { loader as editProductLoader, action as editProductAction} from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        // children son los hijos del layout
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path:'productos/nuevo',
                element: <NewProducts />,
                action: newProductAction
            },
            {
                path:'productos/:id/editar', // ROA Patter - Resource-oriented design
                element: <EditProduct/>,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path:'productos/:id/eliminar',
                action: deleteProductAction,
            }
        ]
    }

]) 