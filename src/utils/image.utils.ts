import {ImageBlob} from '../domain/ImageBlob.ts';
import sampleAvatar from '../assets/sample-avatar.png';

export const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<Blob> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx!.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob: ImageBlob) => {
          resolve(blob!);
        }, 'image/jpeg', 0.95);
      };
      img.src = e.target!.result as any;
    };
    reader.readAsDataURL(file);
  });
}


export const previewImage = (container: HTMLElement | null, blob?: Blob) => {
  if(!container) return;
  let src = sampleAvatar;
  if(blob) {
    src = URL.createObjectURL(blob);
  }
  container.style.background = `url(${src}) center center no-repeat`;
  container.style.backgroundSize = 'cover';
}