import styled from '@emotion/styled';
import {useEffect, useRef} from 'react';
import sampleAvatar from '../../assets/sample-avatar.png';
import {previewImage, resizeImage} from '../../utils/image.utils.ts';


export const Uploader = styled.div`
  width: 100%;
  height: 100%;
  label {
    display: flex;
    width: 100%;
    height: 100%;
  }
  input {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
  }

  input:is(:focus, :focus-within) + label {
    outline: thin dotted;
  }
`

export default function ImageUploader({value = sampleAvatar, onImageUploaded}: any) {
  const  labelRef = useRef(null);
  const saveAvatar = async (e: any) => {
    const resizedBlob = await resizeImage(e.target.files[0], 500, 500);
    previewImage(labelRef.current, resizedBlob);
    onImageUploaded(resizedBlob);
  }

  useEffect(() => {
    previewImage(labelRef.current, value);
  }, [value]);
  return (
    <Uploader className="uploader">
      <input id="uploader" type="file" onChange={saveAvatar} accept="image/*" />
      <label htmlFor="uploader" ref={labelRef}></label>
    </Uploader>

  )
}