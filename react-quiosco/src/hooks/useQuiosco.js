import { useContext } from "react"
import QuioscoContex from '../context/QuioscoProvider'

const useQuiosco = () => {
  return useContext(QuioscoContex)
}
export default useQuiosco