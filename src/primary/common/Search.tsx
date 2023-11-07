import styled from '@emotion/styled';
import IconButton from './IconButton.tsx';
import {useTranslation} from 'react-i18next';
import InputField from './InputField.tsx';
import {FormEvent, useState} from 'react';
import {useSearchStore} from '../stores/search.store.ts';

export const SearchContainer = styled.form`
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
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery)
  const [inputValue, setInputValue] = useState('')
  const initSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  }
  return (
    <SearchContainer onSubmit={initSearch}>
      <div className="input-field">
        <InputField type="text" placeholder={t('search.placeholder')} value={inputValue} onInput={(e: any) => setInputValue(e.target.value)}/>
      </div>
      <IconButton icon="search"/>
    </SearchContainer>
  )
}
