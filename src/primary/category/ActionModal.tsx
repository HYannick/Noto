import styled from '@emotion/styled';
import {IconName} from '@assets/svg/icons';
import IconButton from '@/primary/common/buttons/IconButton.tsx';
import {Overlay} from '@/primary/common/drawers/SettingsDrawer.styled.tsx';

export const ActionModalComp = styled.div`
  position: fixed;
  z-index: 2000;
  bottom: 0;
  background-color: var(--color-grey-light);
  width: 100vw;
  padding: 2rem 1.5rem 1.5rem;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  .action-form {
   width: 100%;
  }
`

export const ActionEditOverlay = styled(Overlay)`
  z-index: 90;
  opacity: 0.8;
`
export const ActionModal = ({options, children, editMode}: { editMode: boolean, options: { icon: IconName, action: () => void }[] , children: any}) => {
  return (
   <>
     <ActionModalComp>
       {!editMode ? options.map((option, i) => (
         <IconButton key={i} icon={option.icon} onPress={option.action}/>
       )) : <div className="action-form">{children}</div>}
     </ActionModalComp>
     {editMode && <ActionEditOverlay />}
   </>
  )
}