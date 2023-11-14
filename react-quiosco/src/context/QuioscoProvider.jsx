import { createContext, useState } from "react"
import {categorias as categoriasDB}  from "../data/categorias"

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

  const [categorias, setCategorias] = useState(categoriasDB)
  const [categoriaActual, setcategoriaActual] = useState(categorias[0])

  const handleClickCategoria = id => {
    const categoria = categorias.filter(categoria=>categoria.id === id)[0]
    setcategoriaActual(categoria)
  };
  

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  )
}
export {
  QuioscoProvider
}
export default QuioscoContext