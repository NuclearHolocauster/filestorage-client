import { FunctionComponent, useEffect, useState } from 'react';
import { axiosInstance } from '../axios/axiosInstance'
import { backend } from '../constants/consts'

interface IFileTableProps {
}

interface IFilesInterface {
    fileName: string,
    link: string
}

const FileTable: FunctionComponent<IFileTableProps> = () => {
    const [files, setFiles] = useState<IFilesInterface[]>([])

    const getFiles = async (): Promise<IFilesInterface[]> => {
        const files = await axiosInstance.get('files')
        return files.data['files']
    }

    useEffect(() => {
        getFiles().then((files) => {
            setFiles(files)
        })
    }, [])

    return (
        <div>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>
                        <a href={`${backend.baseUrl}${file.link}`} download>{file.fileName} </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileTable;
