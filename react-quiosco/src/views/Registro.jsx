import { Link } from "react-router-dom"

const Registro = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crea tu cuenta</h1>
      <p>Crea tu cuenta rellenando el formulario</p>
      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form action="">
          <div className="mb-4">
            <label
              className="text-slate-800"
              htmlFor="name"
            >Nombre:
            </label>
              <input 
                type="text"
                id="name"
                className="mt-2 w-full p-3 bg-gray-200"
                name="name"
                placeholder="Tu nombre"
              />
          </div>
          <div className="mb-4">
            <label
              className="text-slate-800"
              htmlFor="email"
            >Email:
            </label>
              <input 
                type="email"
                id="email"
                className="mt-2 w-full p-3 bg-gray-200"
                name="email"
                placeholder="Tu email"
              />
          </div>
          <div className="mb-4">
            <label
              className="text-slate-800"
              htmlFor="password"
            >Contraseña:
            </label>
              <input 
                type="password"
                id="password"
                className="mt-2 w-full p-3 bg-gray-200"
                name="password"
                placeholder="Tu contraseña"
              />
          </div>
          <div className="mb-4">
            <label
              className="text-slate-800"
              htmlFor="password_confirmation"
            >Confirmar contraseña:
            </label>
              <input 
                type="password"
                id="password_confirmation"
                className="mt-2 w-full p-3 bg-gray-200"
                name="password_confirmation"
                placeholder="Repetir contraseña"
              />
          </div>
          <input 
            type="submit"
            value="Crear cuenta"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-md" 
          />
        </form>
      </div>
      <nav className="mt-5">
        <Link to="/auth/login">
        Ya tienes cuenta? <span className="font-bold">Inicia sesión</span></Link>
      </nav>
    </>
  )
}
export default Registro