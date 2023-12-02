import {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import {useInject} from '@/domain/hooks/UseInject.ts';
import IconButton from '@/primary/common/buttons/IconButton.tsx';
import DefaultButton from '@/primary/common/buttons/DefaultButton.tsx';
import {useAppStore} from '@/primary/stores/app.store.ts';
import {useNoteStore} from '@/primary/stores/note.store.ts';
import {useTranslation} from 'react-i18next';
import {useCategoriesStore} from '@/primary/stores/categories.store.ts';
import {useHistory} from '@/domain/hooks/useHistory.ts';
import {createPortal} from 'react-dom';
import {IconName} from '@assets/svg/icons';
import {ActionModal} from '@/primary/category/ActionModal.tsx';
import {CategoryModalContainer} from './CategoryModal.styled';
import CategoryForm from '@/primary/category/CategoryForm.tsx';
import CategoryItem from './CategoryItem';
import ConfirmModal from '@/primary/common/ConfirmModal.tsx';
import {Category} from '@/domain/Category.ts';

type ActionOption = { icon: IconName, action: () => void };

export default function CategoryModal({onCategoryUpdate, onFilterByCategoryUpdate}: {
  onCategoryUpdate: () => void,
  onFilterByCategoryUpdate: (categoryId: string) => void
}) {
  const {t} = useTranslation();
  const noteService = useInject('noteService')
  const categoryService = useInject('categoryService');

  const {closeCategoryModal, categoryModalOpen} = useAppStore();
  const {currentNote, setCurrentNote} = useNoteStore();
  const {selectedCategory, categories, setCategories} = useCategoriesStore();

  const containerRef = useRef(null);

  const [formOpen, toggleForm] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [actionBarOpen, setActionBarOpen] = useState(false);
  const [confirmModalOpen, toggleConfirmModal] = useState<boolean>(false);
  const [editCategoryFormOpen, toggleEditCategoryForm] = useState<boolean>(false);

  const triggerEnterAnimation = () => {
    const tl = gsap.timeline();
    tl
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
      .to(containerRef.current, {
        duration: 0.5,
        autoAlpha: 1,
        x: '100vw',
        ease: 'expo.out',
      })

  }

  useHistory('categoryModalOpen', categoryModalOpen, beforeClose);

  const categoryAlreadyExist = (categoryName: string) => {
    return !!categories.find(category => category.name === categoryName)
  }

  const saveForm = async (e: any, categoryName: string) => {
    e.preventDefault();
    if (!categoryName) return;
    if (categoryAlreadyExist(categoryName)) return;
    await categoryService.createCategory({name: categoryName, notes: []})
    await fetchCategories();
    onCategoryUpdate();
    resetForm();
  }

  const resetForm = () => {
    toggleForm(false);
  }

  const bindCategoryToNote = async (categoryId: string) => {
    if (!currentNote) return;
    const note = await noteService.bindCategory(categoryId, currentNote.id);
    setCurrentNote(note);
  }

  const handleCategorySelection = async (categoryId: string) => {
    if (!currentNote) {
      onFilterByCategoryUpdate(categoryId);
      beforeClose();
    } else {
      await bindCategoryToNote(categoryId);
    }
  }

  const categoryItemSelected = (categoryId: string) => {
    return currentNote ? currentNote.categories?.includes(categoryId) : selectedCategory === categoryId
  }

  const matchCategories = (categoryId: string) => selectedCategories.map(category => category.id).includes(categoryId)

  const initSelectMode = useCallback((category: Category) => {
    setSelectMode(true);
    setActionBarOpen(true);
    setSelectedCategories([...selectedCategories, category]);
  }, []);

  const resetSelectMode = useCallback(() => {
    setSelectMode(false);
    setActionBarOpen(false);
    setSelectedCategories([]);
  }, []);

  const updateSelectedCategories = (category: Category) => {
    if (!selectMode) return;

    if (matchCategories(category.id)) {
      setSelectedCategories(selectedCategories.filter(c => c.id !== category.id));
      return;
    }
    setSelectedCategories([...selectedCategories, category]);
  }

  const selectCategory = (category: Category) => {
    console.log('???')
    if (selectMode) {
      return;
    }

    handleCategorySelection(category.id)
  }

  const deleteCategories = async () => {
    await categoryService.deleteCategoriesById(selectedCategories.map(category => category.id));
    onCategoryUpdate();
    toggleConfirmModal(false);
  }

  const updateCategory = async (e: FormEvent, categoryNameToEdit: string) => {
    e.preventDefault();
    const categoryToUpdate = selectedCategories[0];
    await categoryService.updateCategory(categoryToUpdate.id, {...categoryToUpdate, name: categoryNameToEdit});
    toggleEditCategoryForm(false);
    onCategoryUpdate();
  }

  const closeConfirmModal = () => {
    toggleConfirmModal(false);
  }

  const optionsList: ActionOption[] = [
    {
      icon: 'trash',
      action: () => {
        toggleConfirmModal(true);
      }
    },
    ...(selectedCategories.length === 1 ? [{
      icon: 'edit',
      action: () => {
        toggleEditCategoryForm(true);
      }
    }] as ActionOption[] : [])
  ];

  const categoryNameToEdit = selectedCategories[0]?.name;

  useEffect(() => {
    triggerEnterAnimation();
    fetchCategories();
  }, []);

  const ModalHeader = () => (
    <>
      <IconButton icon="close" onPress={resetSelectMode}/>
      <p>{t('categories.selected', {count: selectedCategories.length})}</p>
    </>
  )

  const EditModeHeader = () => (
    <>
      <IconButton icon="back" onPress={beforeClose}/>
      <p>{t('categories.title')}</p>
    </>
  )

  return (
    <>
      <CategoryModalContainer ref={containerRef}>
        <div className="categories-header">
          {actionBarOpen ? <ModalHeader/> : <EditModeHeader/>}
        </div>
        <div className="category-list">
          {categories.map(category => (
            <CategoryItem
              category={category}
              onLongPress={initSelectMode}
              onPressStart={updateSelectedCategories}
              onPressCancel={() => console.log('cancel')}
              onPress={selectCategory}
              selected={!selectMode && categoryItemSelected(category.id)}
              matchCategories={matchCategories(category.id)}
              key={category.id}
            />
          ))}
        </div>
        {
          formOpen ?
            <CategoryForm onSubmit={saveForm} onReset={resetForm}/> :
            <DefaultButton fullWidth textCentered label={t('categories.add')} onPress={() => toggleForm(true)}/>}
      </CategoryModalContainer>
      {
        actionBarOpen && (
          createPortal(
            <ActionModal options={optionsList} editMode={editCategoryFormOpen}>
              <CategoryForm categoryNameToEdit={categoryNameToEdit} onSubmit={updateCategory} onReset={() => toggleEditCategoryForm(false)}/>
            </ActionModal>,
            document.body)
        )
      }
      {
        confirmModalOpen && (
          createPortal(
            <ConfirmModal message={t('categories.confirm.message')} onConfirm={deleteCategories} onCancel={closeConfirmModal}
                          subMessage={t('categories.confirm.subMessage')}/>,
            document.body)
        )
      }
    </>
  )
}