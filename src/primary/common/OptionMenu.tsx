import IconButton from './IconButton.tsx';
import {useState} from 'react';
import {useClickAway} from '@uidotdev/usehooks';
import styled from '@emotion/styled';

type OptionList = {
  label: string;
  action: (e: any) => any;
}

type OptionProps = {
  optionList: OptionList[],
}


export const ActionList = styled.ul`
  position: absolute;
  display: ${(props: { isOpen: boolean }) => props.isOpen ? 'block' : 'none'};
  right: 0;
  top: 0;
  background: var(--color-light);
  padding: 0;
  box-shadow: 0 0 0 0.1rem var(--color-dark);
  border-radius: 0.5rem;
  z-index: 1000;
  list-style: none;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  width: 15rem;
  li {
    padding: 1.5rem;
    cursor: pointer;
    &:hover {
      background: var(--color-primary);
    }
  }
`
export default function OptionMenu({optionList}: OptionProps) {
  const [actionOpen, setActionState] = useState(false)

  const ref = useClickAway(() => {
    setActionState(false);
  });

  const triggerAction = (e: any, action: any) => {
    action(e)
    setActionState(false)
  }
  return (
    <>
      <IconButton dataTestId="options-button" variant="borderless" icon="options" onPress={() => setActionState(true)}/>
      {
        actionOpen && (
          <ActionList ref={ref as any} isOpen={actionOpen}>
            {
              optionList.map((option, key) => (
                <li key={key}>
                  <div onClick={(e) => triggerAction(e, option.action)}>{option.label}</div>
                </li>
              ))
            }
          </ActionList>
        )
      }
    </>
  )
}