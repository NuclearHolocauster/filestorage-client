import { LinearProgress } from '@mui/material';
import { AxiosError } from 'axios';
import * as React from 'react';
import { useState } from 'react';
import { axiosInstance } from '../axios/axiosInstance';
import { backend } from '../constants/consts'

interface IUploadFormProps {
}

const UploadForm: React.FunctionComponent<IUploadFormProps> = () => {
    const [selectedFile, setSelectedFile] = useState<string | Blob>('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadText, setUploadText] = useState('')

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
                onUploadProgress(progressEvent) {
                    setProgress(Number(progressEvent.progress?.toFixed(2)) * 100)
                },
            }
        ).catch((err: AxiosError) => {
            if (err.response?.status === 413) {
                setUploadSuccess(true)
                setUploadText('Файл слишком большой!')
                setSelectedFile('')
                setProgress(0)
            } else {
                setUploadSuccess(true)
                setUploadText('Опаньки... Что-то пошло не так(')
                setSelectedFile('')
                setProgress(0)
            }
        })
        
        if (response?.status === 201 || response?.status === 200) {
            setUploadSuccess(true)
            setUploadText('Файл успешно загружен!')
            setSelectedFile('')
            setProgress(0)
            event.target.reset();
        }
    };

  return (
    <div>
        <form onSubmit={handleFormSubmit}>
            <label className="input-file">
                <input type="file" name="file" onChange={handleFileChange}/>
                <span className="input-file-btn"></span>           
            </label>
            <button type='submit'>Загрузить файл (до 10 Гб)</button>
            {uploadSuccess && <p>{uploadText}</p>}
        </form>
        <LinearProgress variant='determinate' value={progress} />
    </div>
  );
};

export default UploadForm;
