import styled from '@emotion/styled';
import getIcon, {IconName} from '@assets/svg/icons';

type IconButtonProps = {
  icon: IconName;
  color?: string;
  dataTestId?: string;
  iconSize?: string;
}

export const IconContainer = styled.span`
  width: ${(props: { size: string }) => `${props.size}rem`};
  height: ${(props: { size: string }) => `${props.size}rem`};
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
  circle {
    stroke: var(--color-${(props) => props.color});
  }
`
export default function Icon({dataTestId, icon, iconSize = "2", color = 'dark'}: IconButtonProps) {
  return (
    <IconContainer data-testid={dataTestId} size={iconSize} color={color}>
      {getIcon(icon)}
    </IconContainer>
  )
}
