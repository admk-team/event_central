import { createContext, useContext } from "react";

export const FormBuilderContext = createContext<any>({});

export const useFormBuilder = () => {
  return useContext(FormBuilderContext);
}