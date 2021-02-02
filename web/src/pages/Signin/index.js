// MARK: -- Routing
import { Link, Redirect } from "react-router-dom";

// MARK: -- React
import React, { useContext, useState, useEffect } from "react";

// MARK: -- Authentication
import { AuthContext } from "../../context/AuthContext";

// MARK: -- Third Party, checks
import { useMutation } from "@apollo/react-hooks";
import { Form, Formik } from "formik";
import * as Yup from "yup";

// MARK: -- Graphql
import { SIGNIN } from "../../graphql/mutations";

// MARK: -- Components
import AuthenticationLayout from "../../layouts/AuthenticationLayout";

const SigninSchema = Yup.object().shape({
  auth: Yup.string().required("Email or username required"),
  password: Yup.string().required("Password is required"),
});

const ProcessSignin = ({ signinData }) => {
  const authContext = useContext(AuthContext);
  const [redirectOnSignin, setRedirectOnSignin] = useState(false);

  useEffect(() => {
    const { authenticate } = signinData;
    authContext.setAuthState(authenticate);
    setRedirectOnSignin(true);
  }, [signinData, authContext]);

  return <>{redirectOnSignin && <Redirect to="/" />}</>;
};

const SigninPage = () => {
  const [signin, { loading, error, data }] = useMutation(
    SIGNIN
  );

  return (
    <AuthenticationLayout>
      {data && <ProcessSignin signinData={data} />}
      <div>
        <div>
          <p>
            Not a member?{" "}
            <Link to="/signup/new" className="auth">
              Sign Up
            </Link>
          </p>
        </div>
          <h1>
            Sign in to Microfails
          </h1>
          <div>
            <button>
              Sign in with Google
              <i
                className="fab fa-google"
                style={{ "margin-left": "0.5rem" }}
              ></i>
            </button>
            <button>
              <i className="fab fa-twitter"></i>
            </button>
            <Formik
              initialValues={{
                auth: "",
                password: "",
              }}
              onSubmit={(values) => {
                const { auth, password } = values;
                signin({
                  variables: { 
                    data: {
                      email: auth, password: password
                    }
                  }
                })
              }}
              validationSchema={SigninSchema}
            >
              {() => (
              <Form>
                {data && ( <p>data.authenticate.message </p> ) }
                {error && ( <p>{error.message}</p> ) }
                <input type="hidden" name="remember" value="true" />
                <div>
                  <label for="user_email">Email or Username</label>
                  <input type="text" name="auth" />
                </div>
                <div>
                  <label for="user_login">Password</label>
                  <input type="password" name="password" />
                </div>
                <button>
                  Sign In
                </button>
              </Form>
              )}
            </Formik>
        </div>
      </div>
    </AuthenticationLayout>
  );
};

export default SigninPage;
