// MARK: -- Routing
import { Link, Redirect } from "react-router-dom";
import history from "../../routes/history";

// MARK: -- React
import React, { useContext, useState, useEffect } from "react";

// MARK: -- Authentication
import { AuthContext } from "../../context/AuthContext";

// MARK: -- Third Party, checks
import { useMutation } from "@apollo/react-hooks";
import { Form, Formik } from "formik";
import * as Yup from "yup";

// MARK: -- Graphql
import { SIGNUP, CREATEPROFILE } from "../../graphql/mutations";

// MARK: -- Components
import AuthenticationLayout from "../../layouts/AuthenticationLayout";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  username: Yup.string().required("Unique username is required"),
  fullName: Yup.string().required("Name is required"),
});

const ProcessSignup = ({ signupData }) => {
  const authContext = useContext(AuthContext);
  const [redirectOnSignup, setRedirectOnSignup] = useState(false);

  useEffect(() => {
    const { signup } = signupData;
    authContext.setAuthState(signup);
    setRedirectOnSignup(true);
  }, [authContext, signupData]);

  return <>{redirectOnSignup && <Redirect to="/" />}</>;
};

const SignupPage = () => {
  const [signup, { loading, error, data }] = useMutation(
    SIGNUP, CREATEPROFILE
  );

  return (
    <AuthenticationLayout>
      {data && <p>{data}</p>}
      <div>
        <div>
          <p>
            Already a member?{" "}
            <Link to="/session/new" className="auth">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default SignupPage;
