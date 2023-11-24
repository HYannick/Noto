import styled from '@emotion/styled';

export type InputFieldProps = {
  value: string;
  type: string;
  placeholder?: string;
  variant?: 'default' | 'borderless',
  onInput: (e: any) => void;
  dataTestId?: string;
}

export const InputFieldStyle = styled.input`
  width: 100%;
  height: 5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: bold;
  box-shadow: ${(props: { variant: string }) => props.variant === 'borderless' ? 'none' : 'inset 0 0 0 0.1rem var(--color-dark)'};
  outline: transparent;
  background: ${(props) => props.variant === 'borderless' ? 'transparent' : ' var(--color-light);'};
  padding: 1.5rem ${(props: { variant: string }) => props.variant === 'borderless' ? '0' : '1.5rem'};;
  color: var(--color-dark);
`

export default function InputField({dataTestId, onInput, value, type = 'text', placeholder = 'placeholder', variant = 'default'}: InputFieldProps) {
  return (
    <InputFieldStyle data-testid={dataTestId} type={type} placeholder={placeholder} variant={variant} onInput={onInput} value={value}/>
  )
}