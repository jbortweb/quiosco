import useSWR from "swr";
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useAuth = ({middleware, url}) => {

  const token = localStorage.getItem('AUTH_TOKEN')

  const navigate = useNavigate();

  const {data:user, error, mutate} = useSWR('/api/user,',() =>
  clienteAxios('/api/user', {
    headers: {
      authorization: `Bearer ${token}`,
    }
  })
  .then(res=> res.data)
  .catch(error =>{
    throw Error(error?.response?.data?.errors)
  })
  )

  const login = async (datos, setErrores) => {
    try {
      const {data} = await clienteAxios.post('/api/login',datos)
      localStorage.setItem('AUTH_TOKEN',data.token);
      setErrores([])
      await mutate()
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
    }
  };
  const register = async (datos, setErrores) => {

    try {
      const {data} = await clienteAxios.post('/api/registro',datos)
      localStorage.setItem('AUTH_TOKEN',data.token);
      setErrores([])
      await mutate()
    } catch (error) {
      setErrores(Object.values(error.response.data.errors));
    }
     
  };
  const logout = async () => {
     try {
      await clienteAxios.post('/api/logout', null, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      })
      localStorage.removeItem('AUTH_TOKEN')
      await mutate(undefined)
      
     } catch (error) {
       throw Error(error?.response?.data?.errors)
     }
  };

  useEffect(() => {
    if(user && middleware === 'guest' && url){
      navigate(url)
    }
    if(middleware === 'guest' && user && user.admin){
      navigate('/admin')
    }
    if(middleware === 'admin' && user && !user.admin){
      navigate('/')
    }
    if(middleware === 'auth' && error) {
      navigate('/auth/login')
    }
  }, [user, error])
  

  return {
    login,
    register,
    logout,
    user,
    error
  }
  
}
