import React from "react";
import { useField } from "formik";
import FormError from "../FormError";
import FormSuccess from "../FormSuccess";

import StyledFormInput from "./styles";

const FormInput = ({
	name, type, placeholder
}) => {
    // MARK: -- field, (name: String, 
    //                  onBlur: Function, 
    //                  onChange: Function, 
    //                  value: String)
    // MARK: -- meta, (error: String, 
    //                 initialError: String?, 
    //                 initialTouched: Boolean, 
    //                 initialValue: String, 
    //                 touched: Boolean, 
    //                 value: String)
	const [field, meta] = useField(name);
    
    return (
        <>
            <StyledFormInput
            	{...field}
            	name={name}
            	type={type}
            />
            {(() => {
                if (meta.touched && meta.error) {
                    return <FormError text={meta.error}></FormError>
                } else if (meta.touched && meta.name !== "") {
                    return <FormSuccess />
                } else {
                    return null
                }
            })()}
        </>
    )
}

export default FormInput;