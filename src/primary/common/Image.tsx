import sampleAvatar from '@/assets/sample-avatar.png';
import {ImageBlob} from '@/domain/ImageBlob.ts';

type ImageProps = {
  src: ImageBlob,
  alt: string
}
export default function Image({src, alt}: ImageProps) {
  const imageURL = src ? URL.createObjectURL(src) : sampleAvatar;
  return (
    <img src={imageURL} alt={alt}/>
  )
}