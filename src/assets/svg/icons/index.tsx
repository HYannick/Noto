import TrashIcon from './TrashIcon.tsx';
import ShareIcon from './ShareIcon.tsx';
import StarIcon from './StarIcon.tsx';
import BackIcon from './BackIcon.tsx';
import FolderIcon from './FolderIcon.tsx';
import SaveIcon from './SaveIcon.tsx';
import OptionDotsIcon from './OptionDotsIcon.tsx';
import MoonIcon from './MoonIcon.tsx';
import SearchIcon from './SearchIcon.tsx';
import PlusIcon from './PlusIcon.tsx';
import CheckIcon from './CheckIcon.tsx';
import MenuIcon from './MenuIcon.tsx';
import DropIcon from './DropIcon.tsx';
import FRFlagIcon from './FRFlagIcon.tsx';
import ENFlagIcon from './ENFlagIcon.tsx';
import DEFlagIcon from './DEFlagIcon.tsx';
import CloseIcon from './CloseIcon.tsx';
import SunIcon from './SunIcon.tsx';

export type IconName =
  'fr-flag'
  | 'en-flag'
  | 'de-flag'
  | 'trash'
  | 'share'
  | 'star'
  | 'back'
  | 'folder'
  | 'save'
  | 'options'
  | 'moon'
  | 'sun'
  | 'search'
  | 'add'
  | 'check'
  | 'menu'
  | 'close'
  | 'drop';

export default function getIcon(name: IconName) {
  switch (name) {
    case 'fr-flag':
      return FRFlagIcon();
    case 'en-flag':
      return ENFlagIcon();
    case 'de-flag':
      return DEFlagIcon();
    case 'trash' :
      return TrashIcon();
    case 'share' :
      return ShareIcon();
    case 'star' :
      return StarIcon();
    case 'back' :
      return BackIcon();
    case 'folder' :
      return FolderIcon();
    case 'save' :
      return SaveIcon();
    case 'options' :
      return OptionDotsIcon();
    case 'moon' :
      return MoonIcon();
    case 'search' :
      return SearchIcon();
    case 'add' :
      return PlusIcon();
    case 'check' :
      return CheckIcon();
    case 'menu' :
      return MenuIcon();
    case 'drop' :
      return DropIcon();
    case 'close' :
      return CloseIcon();
    case 'sun' :
      return SunIcon();
    default:
      return <>Icon Placeholder</>
  }

}