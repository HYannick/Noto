import {useLongPress} from 'use-long-press';
import Icon from '@/primary/common/Icon.tsx';
import {CategoryItemComp} from '@/primary/category/CategoryModal.styled.tsx';
import {Category} from '@/domain/Category.ts';

type CategoryItemProps = {
  category: Category,
  onLongPress: (category: Category) => void,
  onPressStart: (category: Category) => void,
  onPressCancel: (category: Category) => void,
  onPress: (category: Category) => void,
  selected: boolean,
  matchCategories: boolean,
}
export default function CategoryItem({category, onLongPress, onPressStart, onPress, onPressCancel, selected, matchCategories,}: CategoryItemProps) {
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
      onClick={() => onPress(category)}
      className="category-item">
      <span>{category.name}</span>
      {matchCategories && <Icon icon='check' color='primary' iconSize='1.8' />}
    </CategoryItemComp>
  )
}