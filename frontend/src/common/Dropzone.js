import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
export function MyDropzone({setImg, setPreviewImg, setAtFirst}) {
    const [msg, setMsg] = useState("파일을 드래그 앤 드롭하거나, 여기를 클릭하세요.")
    
    const onDrop = useCallback(acceptedFiles => {
        setAtFirst(false)
        setImg(acceptedFiles[0])
        setMsg("사진이 업로드되었습니다.")

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImg(reader.result);
        };
        reader.readAsDataURL(acceptedFiles[0]);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
    <div {...getRootProps()}
        style={{width: '100%', textAlign: 'center', border: '1px solid black', borderStyle: 'dashed', borderRadius: '10px', padding: '6px', cursor: 'pointer'}}
        // w={'100%'}
        // textAlign={'center'}
        // border={'dashed'}
        // borderColor={'gray.200'}
        // borderRadius={'3xl'}
        // p={6}
        // rounded={'md'}
    >
        <input {...getInputProps()} />
        {
            isDragActive ?
            <p>Drop the files here ...</p> :
            // <p>Drag 'n' drop some files here, or click to select files</p>
            <p>{msg}</p>
        }
    </div>
    )
}