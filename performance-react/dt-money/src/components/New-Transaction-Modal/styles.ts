import styled from "styled-components";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";

export const Overlay = styled(AlertDialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(AlertDialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme["gray-800"]};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${(props) => props.theme["gray-900"]};
      color: ${(props) => props.theme["gray-300"]};
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme["gray-500"]};
      }
    }

    button[type="submit"] {
      cursor: pointer;
      border: 0;
      height: 58px;
      border-radius: 6px;
      color: ${(props) => props.theme["white"]};
      background-color: ${(props) => props.theme["green-500"]};
      font-weight: bold;
      padding: 0 1.25rem;
      margin-top: 1.5rem;
      transition: background-color 0.5s;

      &:hover {
        background-color: ${(props) => props.theme["green-700"]};
      }
    }
  }
`;

export const CloseButton = styled(AlertDialog.Cancel)`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  line-height: 0;

  cursor: pointer;

  color: ${(props) => props.theme["gray-500"]};
`;

export const TransactionType = styled(RadioGroup.Root)`

display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 1rem;
margin-top: .5rem;

`

interface TransactionTypeButtonProps {
    variant: "income" | "outcome"
}

export const TransactionTypeButton = styled(RadioGroup.Item)<TransactionTypeButtonProps>`

background-color: ${(props) => props.theme["gray-700"]};
padding: 1rem;
display: flex;
align-items: center;
justify-content: center;
gap: .5rem;
border-radius: 6px;
cursor: pointer;
border: 0;
transition: background-color .2s;
color: ${props => props.theme["gray-300"]};

svg{
    color: ${props => props.variant === "income" ? props.theme["green-300"] : props.theme["red-300"] };
}

&[data-state="checked"]{
    color: ${props => props.theme["white"]};
background-color: ${props => props.variant === "income" ? props.theme["green-500"] : props.theme["red-500"]};

svg{
    color: ${(props) => props.theme["white"]};
}
}

&[data-state="unchecked"]:hover{
    background: ${props => props.theme["gray-600"]};
}

`
