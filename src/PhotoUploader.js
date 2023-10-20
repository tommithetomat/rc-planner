import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { uploadFile } from "./requests";
const PhotoUploader = ({ onUploadPhoto }) => {
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const userToken = localStorage.getItem("authToken") || "";
    const BASE_URL = "https://planner.rdclr.ru";
    const handlePhotoUpload = async (e) => {
        const formData = new FormData();
        [...e.target.files].forEach((file) => {
            formData.append("files", file);
        });
        try {
            const response = await uploadFile(formData, userToken);
            setUploadedPhotos((prevPhotos) => [...prevPhotos, ...response]);
            onUploadPhoto(response);
        }
        catch (error) {
            console.error("Ошибка при загрузке фотографии:", error);
        }
    };
    const handleDeletePhoto = (index) => {
        const updatedPhotos = [...uploadedPhotos];
        updatedPhotos.splice(index, 1);
        setUploadedPhotos(updatedPhotos);
    };
    return (_jsxs("div", { className: "flex flex-row gap-6", children: [_jsxs("div", { className: "flex w-[36.25rem] h-[10.625rem] p-0 justify-center items-end border rounded-xl border-dashed border-gray-300 bg-white overflow-hidden relative cursor-pointer", children: [_jsx("input", { type: "file", multiple: true, onChange: handlePhotoUpload, className: "w-full h-[12rem]" }), _jsx("p", { className: "text-gray-400 absolute text-xl text-center w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2", children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u043E\u0442\u043E \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0441\u044E\u0434\u0430" })] }), _jsx("div", { className: "flex flex-wrap gap-2 w-[18rem] h-[10.75rem] overflow-auto", children: uploadedPhotos.map((photo, index) => (_jsxs("div", { className: "relative w-[8.3925rem] h-[5.0625rem] rounded-xl overflow-hidden", children: [_jsx("img", { src: `${BASE_URL}${photo.url}`, alt: `Thumbnail ${index}`, className: "w-full h-full object-cover" }), _jsx("button", { className: "absolute top-1 right-1 p-1 text-white text-xs cursor-pointer", onClick: () => handleDeletePhoto(index), children: "\u2716" })] }, index))) })] }));
};
export default PhotoUploader;
