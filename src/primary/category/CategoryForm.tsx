import InputField from '@/primary/common/InputField.tsx';
import IconButton from '@/primary/common/buttons/IconButton.tsx';
import {CategoryFormComp} from '@/primary/category/CategoryModal.styled.tsx';
import {FormEvent, useState} from 'react';
import {useTranslation} from 'react-i18next';

export default function CategoryForm({onSubmit, onReset, categoryNameToEdit = ''}: { categoryNameToEdit?: string; onSubmit: (e: FormEvent, categoryName: string) => void, onReset: () => void }) {
  const [categoryName, setCategoryName] = useState(categoryNameToEdit);
  const {t} = useTranslation();
  const resetForm = () => {
    setCategoryName('');
    onReset();
  }
  return (
    <CategoryFormComp onSubmit={(e) => onSubmit(e, categoryName)}>
      <div className="formInput">
        <InputField value={categoryName} placeholder={t('categories.label')} type="text" onInput={(e) => setCategoryName(e.target.value)}/>
      </div>
      <IconButton icon="save" type='submit'/>
      <IconButton icon="close" type="reset" onPress={resetForm} backgroundColor="alert" color="alert-dark" shadowColor="alert-dark"/>
    </CategoryFormComp>
  )
}