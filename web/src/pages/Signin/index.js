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
import { SIGNIN } from "../../graphql/mutations";

// MARK: -- Components
import { Heading } from "grommet";
import AuthenticationLayout from "../../layouts/AuthenticationLayout";
import Content from "../../components/Content";
import AuthNav from "../../components/AuthNav";
import AuthContent from "../../components/AuthContent";
import SocialAuth from "../../components/SocialAuth";
import AccentButton from "../../components/AccentButton";
import HRDivider from "../../components/HRDivider";
import AuthForm from "../../components/AuthForm";
import FormField from "../../components/FormField";
import FormInput from "../../components/FormInput";
import FormSuccess from "../../components/FormSuccess";
import FormError from "../../components/FormError";

const SigninSchema = Yup.object().shape({
  emailOrUsername: Yup.string().required("Email or username required"),
  password: Yup.string().required("Password is required"),
});

const ProcessSignin = ({ signinData }) => {
  const authContext = useContext(AuthContext);
  const [redirectOnSignin, setRedirectOnSignin] = useState(false);

  useEffect(() => {
    const { signin } = signinData;
    authContext.setAuthState(signin);
    setRedirectOnSignin(true);
  }, [authContext, signinData]);

  return <>{redirectOnSignin && <Redirect to="/" />}</>;
};

const SigninPage = () => {
  const [signin, { loading, error, data }] = useMutation(
    SIGNIN
  );

  return (
    <AuthenticationLayout sidebarColor="#FFFB7D" subtitleColor="black">
      {data && <ProcessSignin signinData={data} />}
      <Content>
        <AuthNav>
          <p>
            Not a member?{" "}
            <Link to="/signup/new" className="auth">
              Sign Up
            </Link>
          </p>
        </AuthNav>
        <AuthContent>
          <Heading level="3" size="small" margin="0 0 1rem 0">
            Sign in to Microfails
          </Heading>
          <SocialAuth>
            <AccentButton
              inputWidth="80%"
              inputMargin="0 1rem 1rem 0"
              inputBGColor="#4285f4"
              inputColor="white"
              inputBorder="2px solid #4285f4"
              inputHoverColor="rgb(0, 87, 255)"
            >
              Sign in with Google
              <i
                className="fab fa-google"
                style={{ "margin-left": "0.5rem" }}
              ></i>
            </AccentButton>
            <AccentButton
              inputWidth="15%"
              inputMargin="0"
              inputHeight="2.5rem"
              inputHoverColor="#A0A0A0"
            >
              <i className="fab fa-twitter"></i>
            </AccentButton>
          </SocialAuth>
          <HRDivider />
          <AuthForm>
            <Formik
              initialValues={{
                authName: "",
                password: "",
              }}
              onSubmit={(values) => {
                const { authName, password } = values;
                console.log(authName, password);
              }}
              validationSchema={SigninSchema}
            >
              <Form>
                {data && <FormSuccess text={data.signin.message} />}
                {error && <FormError text={error.message} />}
                <input type="hidden" name="remember" value="true" />
                <FormField inputWidth="100%">
                  <label for="user_email">Email or Username</label>
                  <FormInput type="text" name="authName" />
                </FormField>
                <FormField inputWidth="100%">
                  <label for="user_login">Password</label>
                  <FormInput type="password" name="password" />
                </FormField>
                <AccentButton
                  inputMargin="1rem 0"
                  inputBGColor="#FFC843"
                  inputColor="white"
                  inputBorder="2px solid #FFC843"
                  inputHoverColor="#F7D380"
                  type="submit"
                >
                  Sign In
                </AccentButton>
              </Form>
            </Formik>
          </AuthForm>
        </AuthContent>
      </Content>
    </AuthenticationLayout>
  );
};

export default SigninPage;
