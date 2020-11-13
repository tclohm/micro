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
import { Heading } from "grommet";
import AuthenticationLayout from "../../layouts/AuthenticationLayout";
import Content from "../../components/Content";
import AuthNav from "../../components/AuthNav";
import AuthContent from "../../components/AuthContent";
import SocialAuth from "../../components/SocialAuth";
import AccentButton from "../../components/AccentButton";
import HRDivider from "../../components/HRDivider";
import AuthForm from "../../components/AuthForm";
import FormFieldGroup from "../../components/FormFieldGroup";
import FormField from "../../components/FormField";
import FormInput from "../../components/FormInput";
import FormSuccess from "../../components/FormSuccess";
import FormError from "../../components/FormError";

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
      {data && <ProcessSignup signupData={data} />}
      <Content>
        <AuthNav>
          <p>
            Already a member?{" "}
            <Link to="/session/new" className="auth">
              Sign In
            </Link>
          </p>
        </AuthNav>
        <AuthContent>
          <Heading level="3" size="small" margin="0 0 1rem 0">
            Sign up to Microfails
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
              Sign up with Google
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
                email: "",
                password: "",
                fullName: "",
                username: "",
              }}
              onSubmit={(values) => {
                const { email, password } = values;
                console.log(email, password);
              }}
              validationSchema={SignupSchema}
            >
              <Form>
                {data && <FormSuccess text={data.signup.message} />}
                {error && <FormError text={error.message} />}
                <input type="hidden" name="remember" value="true" />
                <FormFieldGroup>
                  <FormField>
                    <label for="user_name">Name</label>
                    <FormInput type="text" name="fullName" />
                  </FormField>
                  <FormField>
                    <label for="user_login">Username</label>
                    <FormInput type="text" name="username" />
                  </FormField>
                </FormFieldGroup>
                <FormField inputWidth="100%">
                  <label for="user_email">Email</label>
                  <FormInput type="email" name="email" />
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
                  Create Account
                </AccentButton>
              </Form>
            </Formik>
          </AuthForm>
        </AuthContent>
      </Content>
    </AuthenticationLayout>
  );
};

export default SignupPage;
