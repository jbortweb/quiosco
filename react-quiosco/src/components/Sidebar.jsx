import {categorias} from "../data/categorias"
import Categoria from "./Categoria"

function Sidebar() {
  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img
          className="w-40"
          src="img/logo.svg" 
          alt="Imagen logotipo" 
        />
      </div>
      <div className="mt-10">
        {categorias.map( categoria => (
          <Categoria 
            key={categoria.id}
            categoria={categoria}
          />
        ))}
      </div>
      <div className="my-5 px-5">
        <button
          type="button"
          className="text-center bg-red-500 w-full p-3 font-bold text-white truncate rounded-md"
        >
          Cancelar orden
        </button>
      </div>
    </aside>
  )
}
export default Sidebar