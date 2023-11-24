import IconButton from '@/primary/common/buttons/IconButton.tsx';
import styled from '@emotion/styled';
import {useAppStore} from '@/primary/stores/app.store.ts';
import {useCategoriesStore} from '@/primary/stores/categories.store.ts';

export const CategoryListWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1.5rem 0 0;
`
export const CategoryListBloc = styled.div`
  overflow-x: scroll;
  border-radius: 0.5rem;
  flex: 1;
  
  &::-webkit-scrollbar {
    display: none;
  }

  > div {
    width: max-content;
    display: flex;
    gap: 1.5rem;
  }
`
export const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  flex: 0 0 1;
  border-radius: 0.5rem;
  background: var(--color-primary-light);
  cursor: pointer;
  transition: background .05s ease;
  font-weight: 900;

  &:active {
    background: var(--color-dark);
    color: var(--color-light);
  }

  ${(props: { selected: boolean }) => props.selected && `
    background: var(--color-primary);
    color: var(--color-light);
  `}
`
export default function CategoryList({onCategorySelected}: { onCategorySelected: (categoryId: string) => void }) {
  const {openCategoryModal} = useAppStore()
  const {categories, selectedCategory, setSelectedCategory} = useCategoriesStore();
  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onCategorySelected(categoryId)
  }

  return (
    <CategoryListWrapper>
      <CategoryListBloc>
        <div>
          <CategoryItem selected={selectedCategory === 'all'} className="category-item" onClick={() => selectCategory('all')}>All</CategoryItem>
          {categories.map(category => (
            <CategoryItem selected={category.id === selectedCategory} className="category-item" key={category.id}
                          onClick={() => selectCategory(category.id)}>{category.name}</CategoryItem>
          ))}
        </div>
      </CategoryListBloc>
      <IconButton icon="folder" small color="primary" backgroundColor="light" shadowColor="primary" onPress={openCategoryModal}/>
    </CategoryListWrapper>
  )
}