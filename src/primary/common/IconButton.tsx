import styled from '@emotion/styled';
import getIcon, {IconName} from '@/assets/svg/icons';

type IconButtonVariant = 'default' | 'borderless';
type IconButtonProps = {
  onPress?: (e: any) => any;
  icon: IconName;
  color?: string;
  backgroundColor?: string;
  shadowColor?: string;
  variant?: IconButtonVariant;
  dataTestId?: string;
  type?: 'submit' | 'reset' | undefined;
}
const variantStyles = (props: { variant: string, backgroundColor: string, shadowColor: string }) => {
  if (props.variant === 'default') {
    return (
      `
        background: var(--color-${props.backgroundColor});
        box-shadow: inset 0 0 0 0.1rem var(--color-${props.shadowColor});
        transform: translateY(-0.6rem);
      `
    )
  }
  if (props.variant === 'borderless') {
    return (
      `
        background: transparent;
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
  rect {
    fill: var(--color-${(props) => props.color});
  }
`

export const IconButtonComp = styled.button`
  width: 5rem;
  height: 5rem;
  position: relative;
  z-index: 1;
  border-radius: 0.5rem;
  border: none;
  background: ${(props: { variant: string, shadowColor: string }) => props.variant === 'borderless' ? 'transparent' : `var(--color-${props.shadowColor})`};
  cursor: pointer;
  &:active {
    .icon-button-backdrop {
      transform: ${(props: any) => props.variant === 'borderless' ? 'none' : 'translateY(-0.2rem)'};
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
  ${(props: { variant: string, backgroundColor: string, shadowColor: string }) => variantStyles(props)}
`
export default function IconButton({dataTestId, onPress, icon, color = 'dark',backgroundColor= 'light', shadowColor ='dark', variant = 'default', type}: IconButtonProps) {
  return (
    <IconButtonComp data-testid={dataTestId} onClick={onPress} variant={variant} type={type} shadowColor={shadowColor}>
      <IconButtonContent className="icon-button-backdrop" variant={variant} backgroundColor={backgroundColor} shadowColor={shadowColor}>
         <IconContainer color={color}>
          {getIcon(icon)}
        </IconContainer>
      </IconButtonContent>
    </IconButtonComp>
  )
}
