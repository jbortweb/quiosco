import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"
import { useAuth } from "../hooks/useAuth"

function Sidebar() {

  const {categorias} = useQuiosco()

  const {logout, user} = useAuth({middleware:'auth'})

  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img
          className="w-40"
          src="img/logo.svg" 
          alt="Imagen logotipo" 
        />
        <p className="p-10 text-center text-xl">Hola {user?.name}</p>
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
          onClick={logout}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
export default Sidebar