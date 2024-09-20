import { deleteProduct } from "../services/ProductService";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom";

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
    //elimiena el productos
    if(params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }

}

export const ProductDetails = ({ product }: ProductDetailsProps) => {

    const fetcher = useFetcher()
    const navigate = useNavigate();
    const isAvailable = product.availability

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-center text-gray-800">
        {product.name}
      </td>
      <td className="p-3 text-lg text-center text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-center text-gray-800">
        <fetcher.Form method="POST">
            <button
                type="submit"
                name="id"
                value={product.id}
                className={`${isAvailable ? 'text-black' : 'text-red-500'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black cursor-pointer`}
            >
                {isAvailable ? "Disponible" : "No Disponible"}
            </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-center text-gray-800 flex gap-2 items-center">
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-600"
            onClick={() => navigate(`/productos/editar/${product.id}`, 
                { state: 
                        product 
                }
            )}
        >
          Editar
        </button>
        <Form 
            method="post"
            action={`/productos/eliminar/${product.id}`}
            onSubmit={(e) => {
                if(confirm('¿Estas seguro de eliminar este producto?')){
                    return true
                } else {
                    e.preventDefault()
                }
            }}
        >
            <input 
                type="submit"
                value='eliminar'
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 cursor-pointer" 
            />
        </Form>
      </td>
    </tr>
  );
};
