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

export const CategoryModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--color-light);
  position: fixed;
  padding: 1.5rem;
  bottom: 0;
  left: 0;
  z-index: 20;
  transition: transform .3s cubic-bezier(0, 0.55, 0.45, 1);
  .category-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  .category {
    display: flex;
    padding: 1.5rem;
    font-weight: bold;
    font-size: 1.5rem;
    border: 0.1rem solid var(--color-primary);
    border-radius: 1rem;
  }
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
        y: 0,
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
        y: '100vh',
        ease: 'expo.out',
      })

  }
  useEffect(() => {
    triggerEnterAnimation();
    fetchCategories();
  }, []);

  const [categoryName, setCategoryName] = useState('')
  const [formOpen, toggleForm] = useState(false);
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
  return (
    <>
      <CategoryModalContainer ref={containerRef}>
        <div className="category-list">
          {categories.map(category => (
            <DefaultButton label= {category.name} key={category.id} />
          ))}
        </div>
        {
          formOpen && (
            <CategoryForm onSubmit={saveForm}>
              <IconButton icon="close" />
              <div className="formInput">

                <InputField value={categoryName} placeholder="Label" type="text" onInput={(e) => setCategoryName(e.target.value)}/>
              </div>
              <IconButton icon="save"/>
            </CategoryForm>
          )
        }
        {!formOpen && <DefaultButton fullWidth  label="Create a category" onPress={() => toggleForm(true)} />}
      </CategoryModalContainer>
      <Overlay ref={overlayRef} onClick={beforeClose}/>
    </>
  )
}