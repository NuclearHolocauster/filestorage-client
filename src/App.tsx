import { useState } from 'react'
import './App.css'
import FileTable from './components/FileTable'
import UploadForm from './components/UploadForm'


function App() {
  
  return (
    <>
      <UploadForm />
      <FileTable />
    </>
  )
}

export default App
