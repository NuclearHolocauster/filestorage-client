
interface IBackendConsts {
    baseUrl: string
    port: number
    getFilesRequest: string
    sendFileRequest: string
}

export const backend: IBackendConsts = {
    baseUrl: `http://${import.meta.env.VITE_REACT_APP_BACKEND_HOST}:${import.meta.env.VITE_REACT_APP_BACKEND_PORT}`,
    port: import.meta.env.VITE_REACT_APP_BACKEND_PORT,
    getFilesRequest: 'files',
    sendFileRequest: 'files/create'
}