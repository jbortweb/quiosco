import { createContext, useEffect, useState } from "react"
import {toast } from 'react-toastify'
import clienteAxios from "../config/axios";


const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {

  const [categorias, setCategorias] = useState([])
  const [categoriaActual, setcategoriaActual] = useState({})
  const [modal, setModal] = useState(false)
  const [producto, setProducto] = useState({})
  const [pedido, setPedido] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad)+ total,0)
    setTotal(nuevoTotal)
  },[pedido])
  
  const obtenerCategorias = async () => {
    const token = localStorage.getItem('AUTH_TOKEN')
    try {
      const {data} = await clienteAxios('/api/categorias', {
        headers: {
          authorization: `Bearer ${token}`,
        }
      })
      setCategorias(data.data);
      setcategoriaActual(data.data[0])
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    obtenerCategorias();
  }, [])

  const handleClickCategoria = id => {
    const categoria = categorias.filter(categoria=>categoria.id === id)[0]
    setcategoriaActual(categoria)
  };

  
  const handleClickModal = () => {
    setModal(!modal)
  }

  const handleSetProducto = (producto) => {
     setProducto(producto)
  };

  const handleAgregarPedido = ({categoria_id, ...producto}) => {

    if(pedido.some(pedidoState => pedidoState.id === producto.id)){
      const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto: pedidoState)
      setPedido(pedidoActualizado)
      toast.success('Pedido actualizado')
      
    }else{
      setPedido([...pedido, producto]);
      toast.success('Agregado el pedido')
    }
    setModal(!modal);
  }
  
  const handleEditarCantidad = id => {
    const productoActualizar = pedido.filter(producto => producto.id === id)[0]
    setProducto(productoActualizar)
    setModal(!modal)
  }

  const handleEliminarProducto = id => {
    const productoActualizado = pedido.filter(producto => producto.id !== id)
    setPedido(productoActualizado)
    toast.success('Pedido eliminado')
  }

  const handleSubmitNuevaOrden = async () => {
    const token = localStorage.getItem('AUTH_TOKEN')

    try {
      const{data} = await clienteAxios.post('/api/pedidos',{
        total,
        productos: pedido.map(producto => {
          return {
            id: producto.id,
          cantidad: producto.cantidad
          }
        })
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        }
      })
      toast.success(data.message)
      setTimeout(()=> {
        setPedido([])
      }, 1000)
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickCompletarPedido = async(id) => {
    const token = localStorage.getItem('AUTH_TOKEN')
     try {
      await clienteAxios.put(`/api/pedidos/${id}`, null, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
     } catch (error) {
      console.log(error);
     }
  };
  
  const handleClickProductoAgotado = async(id) => {
    const token = localStorage.getItem('AUTH_TOKEN')
     try {
      await clienteAxios.put(`/api/productos/${id}`, null, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
     } catch (error) {
      console.log(error);
     }
  };
  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        modal,
        handleClickModal,
        producto,
        handleSetProducto,
        pedido,
        handleAgregarPedido,
        handleEditarCantidad,
        handleEliminarProducto,
        total,
        handleSubmitNuevaOrden,
        handleClickCompletarPedido,
        handleClickProductoAgotado
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