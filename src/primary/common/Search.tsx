import styled from '@emotion/styled';
import IconButton from './IconButton.tsx';
import {useTranslation} from 'react-i18next';
import InputField from './InputField.tsx';

export const SearchContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 3rem;
  .input-field {
    flex: 1;
    height: 5rem;
    input {
      width: 100%;
      height: 5rem;
      border-radius: 0.5rem;
      border: none;
      font-weight: bold;
      box-shadow: inset 0 0 0 0.1rem var(--color-dark);
      outline: transparent;
      background: var(--color-light);
      padding: 1.5rem;
      color: var(--color-dark);
    }
  }
`
export default function Search() {
  const {t} = useTranslation();
  return (
    <SearchContainer>
      <div className="input-field">
        <InputField type="text" placeholder={t('search.placeholder')}/>
      </div>
      <IconButton onPress={() => console.log('init search...')} icon="search" />
    </SearchContainer>
  )
}
