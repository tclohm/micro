import { TextInput } from "grommet";
import styled from "styled-components";

const StyledFormInput = styled(TextInput)`
    border-radius: 0.3rem; 
    border: 1px solid lightgray;
    height: 2.3rem;
    background: lightgray;
    padding: 0 0 0 1rem;

    :hover {
        background: white;
        animation: focus 0.1s forwards;
        animation: hoverBoxShadow 0.3s forwards;
    }

    :focus {
        background: white;
        animation: focusBoxShadow 0.10s ease-in-out forwards;
    }

    @keyframes focus {
        0% {
            background: lightgray;
        }

        100% {
            background: white;
        }
    }

    @keyframes hoverBoxShadow {
        0% {
            box-shadow: 0rem;
        }

        100% {
            box-shadow: inset 0.2rem 0.2rem lightgray,
                    inset 0.2rem 0.2rem lightgray,
                    inset -0.2rem -0.2rem lightgray,
                    inset -0.2rem -0.2rem lightgray;
        }
    }

    @keyframes focusBoxShadow {
        0% {
            box-shadow: inset 0.3rem 0.3rem lightgray,
                    inset 0.3rem 0.3rem lightgray,
                    inset -0.3rem -0.3rem lightgray,
                    inset -0.3rem -0.3rem lightgray;
        }

        100% {
            box-shadow: inset 0.1rem 0.1rem lightgray,
                    inset 0.1rem 0.1rem lightgray,
                    inset -0.1rem -0.1rem lightgray,
                    inset -0.1rem -0.1rem lightgray;;
        }   
    }
`;

export default StyledFormInput;