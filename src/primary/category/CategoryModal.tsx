import styled from '@emotion/styled';
import {Overlay} from '@/primary/common/SideBar.tsx';
import {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {useInject} from '@/domain/hooks/UseInject.ts';
import {Category} from '@/domain/Category.ts';
import InputField from '@/primary/common/InputField.tsx';
import IconButton from '@/primary/common/IconButton.tsx';
import DefaultButton from '@/primary/common/DefaultButton.tsx';
import {useAppStore} from '@/primary/stores/app.store.ts';
import {useNoteStore} from '@/primary/stores/note.store.ts';
import {useTranslation} from 'react-i18next';

export const CategoryModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--color-light);
  position: fixed;
  padding: 1.5rem;
  bottom: 0;
  left: 0;
  transform: translateX(100vw);
  z-index: 20;
  .category-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  .categories-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin: 0.5rem 0 1.5rem;
    p {
      font-size: 2rem;
      font-weight: 900;
      margin: 0;
    }
  }
`

export const CategoryItem = styled.div`
  display: flex;
  padding: 2rem;
  font-weight: 900;
  font-size: 1.5rem;
  box-shadow: 0 0 0 0.2rem var(--color-dark);
  background: var(--color-background);
  border-radius: 1rem;
  cursor: pointer;
  transition: background .05s ease;
  &:active {
    background: var(--color-dark);
    color: var(--color-light);
  }
  ${(props: { selected: boolean }) => props.selected && `
    background: var(--color-primary);
    color: var(--color-light);
      box-shadow: 0 0 0 0.2rem var(--color-primary-dark);
  `}
`

export const CategoryForm = styled.form`
  display: flex;
  gap: 1.5rem;
  .formInput {
    flex: 1;
  }
`
export default function CategoryModal() {
  const {closeCategoryModal}= useAppStore();
  const {currentNote, setCurrentNote} = useNoteStore();
  const noteService = useInject('noteService')
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const categoryService = useInject('categoryService');
  const [categories, setCategories] = useState<Category[]>([])
  const triggerEnterAnimation = () => {
    const tl = gsap.timeline();
    tl
      .to(overlayRef.current, {
        duration: 0.3,
        autoAlpha: 0.8,
        ease: 'expo.out',
      }, '-=0.3')
      .to(containerRef.current, {
        duration: 0.5,
        autoAlpha: 1,
        x: 0,
        ease: 'expo.out',
      })
  }

  const fetchCategories = async () => {
    const fetchedCategories = await categoryService.getAllCategories()
    setCategories(fetchedCategories)
  }
  const beforeClose = () => {
    const tl = gsap.timeline({
      onComplete: closeCategoryModal,
    });
    tl
      .to(overlayRef.current, {
        duration: 0.3,
        autoAlpha: 0,
        ease: 'expo.out',
      }, '-=0.3')
      .to(containerRef.current, {
        duration: 0.5,
        autoAlpha: 1,
        x: '100vw',
        ease: 'expo.out',
      })

  }
  useEffect(() => {
    triggerEnterAnimation();
    fetchCategories();
  }, []);

  const [categoryName, setCategoryName] = useState('')
  const [formOpen, toggleForm] = useState(false);
  const {t} = useTranslation();
  const categoryAlreadyExist = (categoryName: string) => {
    return !!categories.find(category => category.name === categoryName)
  }
  const saveForm = async (e: any) => {
    e.preventDefault();
    if(!categoryName) return;
    if(categoryAlreadyExist(categoryName)) return;
    await categoryService.createCategory({name: categoryName, notes: []})
    await fetchCategories();
    resetForm();
  }

  const resetForm = () => {
    toggleForm(false);
    setCategoryName('');
  }

  const bindCategoryToNote = async (categoryId: string) => {
    if(!currentNote) return;
    const note = await noteService.bindCategory(categoryId, currentNote.id);
    setCurrentNote(note);
  }

  useEffect(() => {
    console.log(currentNote)
  }, [currentNote]);

  return (
    <>
      <CategoryModalContainer ref={containerRef}>
        <div className="categories-header">
          <IconButton icon="back" onPress={beforeClose}/>
          <p>{t('categories.title')}</p>
        </div>
        <div className="category-list">
          {categories.map(category => (
            <CategoryItem selected={currentNote!.categories?.includes(category.id)} className="category-item" key={category.id} onClick={() => bindCategoryToNote(category.id)}> {category.name}</CategoryItem>
          ))}
        </div>
        {
          formOpen && (
            <CategoryForm onSubmit={saveForm}>
              <div className="formInput">
                <InputField value={categoryName} placeholder={t('categories.label')} type="text" onInput={(e) => setCategoryName(e.target.value)}/>
              </div>
              <IconButton icon="save"/>
              <IconButton icon="close" type="reset" onPress={resetForm} backgroundColor="alert" color="alert-dark" shadowColor="alert-dark" />
            </CategoryForm>
          )
        }
        {!formOpen && <DefaultButton fullWidth textCentered label={t('categories.add')} onPress={() => toggleForm(true)} />}
      </CategoryModalContainer>
      <Overlay ref={overlayRef} onClick={beforeClose}/>
    </>
  )
}