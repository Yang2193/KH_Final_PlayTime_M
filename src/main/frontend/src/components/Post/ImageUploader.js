import React, { useState } from 'react';
import { storage } from './firebase';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const UploadButton = styled.button`
  padding: 10px 20px;
  font-size: 13px;
  background-color: #800634;
  color: #fff;
  border: none;
  cursor: pointer;
  height: 40px;
  border-radius: 4px;
  margin-top: 10px;
`;

const UploadImg = styled.div`
  margin-top: 20px;

  img {
    width: 50%;
    margin: 5px;
  }
`;

const DropzoneContainer = styled.div`
  border: 2px dashed #ddd;
  border-radius: 4px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.isDragActive ? '#f7f7f7' : '#fff')};
  transition: background-color 0.3s ease;

  p {
    margin: 0;
    height: 50px;
    font-size: 14px;
    color: ${(props) => (props.isDragActive ? '#888' : '#333')};
  }
`;

const ImageUploader = ({ onChange }) => {
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);

  const handleUpload = (fileList) => {
    const storageRef = storage.ref();

    // Iterate through the selected files and upload them
    const uploadPromises = fileList.map((file) => {
      const fileRef = storageRef.child(file.name);
      return fileRef.put(file).then(() => fileRef.getDownloadURL());
    });

    // Wait for all the uploads to finish
    Promise.all(uploadPromises).then((downloadURLs) => {
      console.log('모든 파일이 성공적으로 업로드되었습니다!');
      setUrls(downloadURLs);
      onChange(downloadURLs);
    });
  };


  const onDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
    handleUpload([...files, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
        <div>
      <DropzoneContainer {...getRootProps()} isDragActive={isDragActive}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>파일을 여기에 놓아주세요...</p>
        ) : (
          <p>파일을 드래그하거나 클릭하여 선택하세요.</p>
        )}
      </DropzoneContainer>

      <UploadImg>
        {urls.map((url, index) => (
          <img key={index} src={url} alt={`uploaded-${index}`} />
        ))}
      </UploadImg>
    </div>
  );
};

export default ImageUploader;
