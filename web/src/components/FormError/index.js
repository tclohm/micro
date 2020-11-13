import React from "react";

const FormError = ({ text }) => (
	<span><i className="fas fa-exclamation-circle warning"></i> {text}</span>
);

export default FormError;