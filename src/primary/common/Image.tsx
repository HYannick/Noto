import sampleAvatar from '../../assets/sample-avatar.png';
import {ImageBlob} from '../../domain/ImageBlob.ts';

export default function Image({src, alt}: {src: ImageBlob, alt: string}) {
  const imageURL = src ? URL.createObjectURL(src) : sampleAvatar;
  return (
    <img src={imageURL} alt={alt}/>
  )
}