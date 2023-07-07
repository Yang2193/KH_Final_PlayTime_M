import React, { useState } from 'react';
import { storage } from './firebase';
import styled from 'styled-components';

const UploadButton = styled.button`
  padding: 10px 20px;
  font-size: 13px;
  background-color: #800634;
  color: #fff;
  border: none;
  cursor: pointer;
  height: 40px;
  border-radius: 4px;
  margin-left: 10px;
`;

const UploadImg = styled.div`
  img {
    width: 100%;
  }
`;

const ImageUploader = ({ onChange }) => {
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);

  const handleFileInputChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUploadClick = () => {
    const uploadPromises = files.map((file) => {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      return fileRef.put(file).then(() => {
        console.log('File uploaded successfully!');
        return fileRef.getDownloadURL();
      });
    });

    Promise.all(uploadPromises)
      .then((downloadUrls) => {
        console.log('All files uploaded successfully!');
        setUrls(downloadUrls);
        onChange(downloadUrls); // 선택한 이미지 URL들을 상위 컴포넌트로 전달
      })
      .catch((error) => {
        console.error('Error uploading files', error);
      });
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileInputChange} />
      <UploadButton onClick={handleUploadClick}>Upload</UploadButton>
      <div>
        {urls.map((url) => (
          <UploadImg key={url}>
            <img src={url} alt="uploaded" />
          </UploadImg>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
