import * as React from 'react';
import { useState } from 'react';
import { axiosInstance } from '../axios/axiosInstance';
import { backend } from '../constants/consts'

interface IUploadFormProps {
}

const UploadForm: React.FunctionComponent<IUploadFormProps> = () => {
    const [selectedFile, setSelectedFile] = useState<string | Blob>('');
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
        };
    const handleFormSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await axiosInstance.post(
            backend.sendFileRequest, 
            formData, 
            {
                timeout: 0,
            }
        )
        if (response.status === 201) {
            setUploadSuccess(true)
            setSelectedFile('')
        }
    };

  return (
    <div>
        <form onSubmit={handleFormSubmit}>
            <label className="input-file">
                <input type="file" name="file" onChange={handleFileChange}/>
                <span className="input-file-btn"></span>           
            </label>
            <button type='submit'>Загрузить файл</button>
            {uploadSuccess && <p>File uploaded successfully!</p>}
        </form>
    </div>
  );
};

export default UploadForm;
