import { Link } from "react-router";
import AuthenticationLayout from "src/layouts/AuthenticationLayout"
import Content from "../../components/Content";
import AuthNav from "../../components/AuthNav";
import AuthContent from "../../components/AuthContent";
import AccentButton from "../../components/AccentButton";
import HRDivider from "../../components/HRDivider";
import AuthForm from "../../components/AuthForm";
import FormFieldGroup from "../../components/FormFieldGroup";
import FormField from "../../components/FormField";

const SignupPage = () => {

  return (
    <AuthenticationLayout>
      <Content>
        <AuthNav>
          <p>Already a member? <Link to="signin" className='auth'>Sign In</Link></p>
        </AuthNav>
        <AuthContent>
          <h2>Sign up to Microfails</h2>
          <AccentButton
            inputWidth='74.7%'
            inputMargin='0 1rem 1rem 0'
            inputBGColor='#4285f4'
            inputHoverColor='#fff'
            inputColor='white'
            inputBorder='2px solid #4285f4'
            inputHoverColor='rgb(0, 87, 255)'
          >Sign up with Google<i className='fab fa-google' style={{ 'margin-left': '0.5rem' }}></i></AccentButton>
          <AccentButton
            inputWidth='20%'
            inputMargin='0'
            inputHoverColor='#A0A0A0'
          ><i className='fab fa-twitter'></i></AccentButton>
          <HRDivider/>
          <AuthFormSignupForm>
            <form>
              <FormFieldGroup>
                <FormField>
                  <label for='user_name'>Name</label>
                  <input
                    type='text' 
                    name='input' 
                    className='form' 
                    id='name' 
                  />
                </FormField>
                <FormField>
                  <label for='user_login'>Username</label>
                  <input
                    type='text' 
                    name='input' 
                    className='form' 
                    id='username'  
                  />
                </FormField>
              </FormFieldGroup>
              <FormField
                inputWidth='100%'
              >
                <label for='user_email'>Email</label>
                  <input
                    type='text' 
                    name='input' 
                    className='form' 
                    id='email'  
                  />
              </FormField>
              <FormField
                inputWidth='100%'
              >
                <label for='user_login'>Password</label>
                  <input
                    type='text' 
                    name='input' 
                    className='form' 
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
              Create Account
            </AccentButton>
          </AuthFormSignupForm>
        </AuthContent>
      </Content>
    </AuthenticationLayout>
  )
}

export default SignupPage
