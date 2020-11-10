import { Link } from "react-router-dom";
import history from "../../routes/history";
import React from "react";
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

const SigninPage = () => {
  return (
    <AuthenticationLayout sidebarColor='#FFFB7D' subtitleColor='black'>
      <Content>
        <AuthNav>
          <p>Not a member? <Link to='/signup' className='auth'>Sign Up</Link></p>
        </AuthNav>
        <AuthContent>
           <Heading 
            level="3" 
            size="small" 
            margin="0 0 1rem 0"
          >Sign in to Microfails</Heading>
          <SocialAuth>
            <AccentButton
              inputWidth='80%'
              inputMargin='0 1rem 1rem 0'
              inputBGColor='#4285f4'
              inputHoverColor='#fff'
              inputColor='white'
              inputBorder='2px solid #4285f4'
              inputHoverColor='rgb(0, 87, 255)'
            >
              Sign in with Google
              <i 
                className='fab fa-google' 
                style={{ 'margin-left': '0.5rem' }}
              >
              </i>
            </AccentButton>
            <AccentButton
              inputWidth='15%'
              inputMargin='0'
              inputHeight='2.5rem'
              inputHoverColor='#A0A0A0'
            >
              <i className='fab fa-twitter'></i>
            </AccentButton>
          </SocialAuth>
          <HRDivider/>
          <AuthForm>
            <form>
              <FormField
                inputWidth='100%'
              >
                <label for='user_email'>Email or Username</label>
                  <FormInput 
                    type="text"
                    name='input' 
                    id='email'  
                  />
              </FormField>
              <FormField
                inputWidth='100%'
              >
                <label for='user_login'>Password</label>
                  <FormInput
                    type="text"
                    name='input' 
                    id='password'  
                  />
              </FormField>
            </form>
            <AccentButton
              inputMargin='1rem 0'
              inputBGColor='#FFC843'
              inputColor='white'
              inputBorder='2px solid #FFC843'
              inputHoverColor='#F7D380'
            >
              Sign In
            </AccentButton>
          </AuthForm>
        </AuthContent>
      </Content>
    </AuthenticationLayout>
  )
}

 export default SigninPage