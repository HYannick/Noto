import styled from '@emotion/styled';
import getIcon, {IconName} from '../../assets/svg/icons';

type ButtonVariant = 'default' | 'small';
type ButtonProps = {
  onPress?: () => any;
  icon?: IconName;
  label: string;
  color?: string;
  variant?: ButtonVariant;
  dataTestId?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export const IconContainer = styled.span`
  width: 3rem;
  height: 3rem;

  svg {
    width: 100%;
    height: 100%;
  }

  path {
    stroke: var(--color-${(props) => props.color})
  }
`

export const ButtonComp = styled.button`
  min-width: ${(props: { variant: string }) => props.variant === 'small' ? '10rem' : '15rem'};
  height: ${(props: { variant: string }) => props.variant === 'small' ? '3rem' : '4.5rem'};
  position: relative;
  z-index: 1;
  border-radius: 0.5rem;
  border: none;
  background: var(--color-dark);

  &:active {
    .icon-button-backdrop {
      transform: translateY(0);
    }
  }

  .icon-button-backdrop {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: absolute;
    padding: 1.5rem;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    border-radius: 0.5rem;
    border: none;
    background: var(--color-light);
    color: var(--color-dark);
    font-weight: bolder;
    font-size: 2rem;
    box-shadow: inset 0 0 0 0.1rem var(--color-dark);
    transform: translateY(-0.6rem);

  }
`
export default function DefaultButton({dataTestId, onPress, icon, type = 'submit', color = 'dark', variant = 'default', label}: ButtonProps) {
  return (
    <ButtonComp data-testid={dataTestId} onClick={onPress} variant={variant} type={type}>
      <span className="icon-button-backdrop">
        {icon && (<IconContainer color={color}>
          {getIcon(icon)}
        </IconContainer>)}
        {label}
      </span>
    </ButtonComp>
  )
}
