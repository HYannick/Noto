import {useLongPress} from 'use-long-press';
import Icon from '@/primary/common/Icon.tsx';
import {CategoryItemComp} from '@/primary/category/CategoryModal.styled.tsx';
import {Category} from '@/domain/Category.ts';

type CategoryItemProps = {
  category: Category,
  onLongPress: (category: Category) => void,
  onPressStart: (category: Category) => void,
  onPressCancel: (category: Category) => void,
  selected: boolean,
  matchCategories: boolean,
}
export default function CategoryItem({category, onLongPress, onPressStart, onPressCancel, selected, matchCategories,}: CategoryItemProps) {
  const bind = (category: Category) => useLongPress(() => onLongPress(category), {
    onStart: () => onPressStart(category),
    onCancel: () => onPressCancel(category),
    threshold: 500, // In milliseconds
  });
  return (
    <CategoryItemComp
      {...bind(category)()}
      selected={selected}
      matchCategories={matchCategories}
      className="category-item">
      {category.name}
      {matchCategories && <Icon icon='check' color='primary'/>}
    </CategoryItemComp>
  )
}