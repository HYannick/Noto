import styled from '@emotion/styled';
import getIcon, {IconName} from '../../assets/svg/icons';

type IconButtonVariant = 'default' | 'borderless';
type IconButtonProps = {
  onPress?: (e: Event) => any;
  icon: IconName;
  color?: string;
  backgroundColor?: string;
  variant?: IconButtonVariant;
  dataTestId?: string;
}
const variantStyles = (props: { variant: string }) => {
  if (props.variant === 'default') {
    return (
      `
        box-shadow: inset 0 0 0 0.1rem var(--color-dark);
        transform: translateY(-0.6rem);
      `
    )
  }
}

export const IconContainer = styled.span`
  width: 2rem;
  height: 2rem;
  svg {
    width: 100%;
    height: 100%;
  }
  path {
    stroke: var(--color-${(props) => props.color})
  }
`

export const IconButtonComp = styled.button`
  width: 5rem;
  height: 5rem;
  position: relative;
  z-index: 1;
  border-radius: 0.5rem;
  border: none;
  background: var(--color-dark);
  cursor: pointer;
  &:active {
    .icon-button-backdrop {
      transform: translateY(-0.2rem);
    }
  }
`

export const IconButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  border-radius: 0.5rem;
  border: none;
  background: var(--color-${(props) => props.backgroundColor});
  ${(props: { variant: IconButtonVariant }) => variantStyles(props)}
`
export default function IconButton({dataTestId, onPress, icon, color = 'dark',backgroundColor= 'light', variant = 'default'}: IconButtonProps) {
  return (
    <IconButtonComp data-testid={dataTestId} onClick={onPress}>
      <IconButtonContent className="icon-button-backdrop" variant={variant} backgroundColor={backgroundColor}>
         <IconContainer color={color}>
          {getIcon(icon)}
        </IconContainer>
      </IconButtonContent>
    </IconButtonComp>
  )
}
