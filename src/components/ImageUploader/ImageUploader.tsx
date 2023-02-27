import {Upload} from "antd";
import React, {useContext} from "react";
import {RcFile} from "antd/es/upload";
import {MessageApiContext} from "../../context/messageApi-context";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import ImgCrop from 'antd-img-crop';

type ImageUploaderProps = {
    imageUrl: string | null,
    uploadCb: (formData: FormData) => void,
    children: JSX.Element | JSX.Element[],
    size: number,
    isLoading: boolean
}

const ImageUploader = ({imageUrl, uploadCb, children, size, isLoading}: ImageUploaderProps) => {
    const messageApi = useContext(MessageApiContext)

    const increasedSize = size + 2

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            messageApi.open({type: 'error', content: 'You can only upload JPG/PNG file!'})
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            messageApi.open({type: 'error', content: 'Image must smaller than 2MB!'})
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (file: string | boolean | void | File | Blob) => {
        let formData = new FormData()

        formData.append('image', file as File)

        uploadCb(formData)
    };

    const uploadButton = (
        <div style={{
            width: `${increasedSize}px`, height: `${increasedSize}px`,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center'
        }}>
            {isLoading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    )

    return (
        <div style={{width: `${increasedSize}px`, height: `${increasedSize}px`}}>
            <ImgCrop rotate onModalOk={handleChange} beforeCrop={beforeUpload}>
                <Upload
                    name="image"
                    accept="image/png, image/jpeg"
                    listType="picture-card"
                    showUploadList={false}
                    customRequest={() => {
                    }}
                    maxCount={1}
                >
                    {imageUrl
                        ? isLoading
                            ? uploadButton
                            : children
                        : uploadButton}
                </Upload>
            </ImgCrop>
        </div>

    )


}

export default ImageUploader