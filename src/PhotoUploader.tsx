import React, { useState } from "react";
import { uploadFile } from "./requests";

export const PhotoUploader = ({ onUploadPhoto }) => {
	const [uploadedPhotos, setUploadedPhotos] = useState([]);
	const userToken = localStorage.getItem("authToken");
	const BASE_URL = "https://planner.rdclr.ru";

	const handlePhotoUpload = async (e) => {
		const formData = new FormData();

		[...(e.target.files as FileList)].forEach((file) => {
			formData.append("files", file);
		});

		try {
			const response = await uploadFile(formData, userToken);

			setUploadedPhotos((prevPhotos) => [...prevPhotos, ...response]);
			onUploadPhoto(response);
			console.log(uploadedPhotos);
		} catch (error) {
			console.error("Ошибка при загрузке фотографии:", error);
		}
	};

	const handleDeletePhoto = (index) => {
		const updatedPhotos = [...uploadedPhotos];
		updatedPhotos.splice(index, 1);
		setUploadedPhotos(updatedPhotos);
	};

	return (
		<div className="flex flex-row gap-6">
			<div className="flex w-[36.25rem] h-[10.625rem] p-0 justify-center items-end border rounded-xl border-dashed border-gray-300 bg-white overflow-hidden relative cursor-pointer">
				<input
					type="file"
					multiple
					onChange={handlePhotoUpload}
					className="w-full h-[12rem]"
				/>
				<p className="text-gray-400 absolute text-xl text-center w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					Выберите фото или перетащите сюда
				</p>
			</div>
			<div className="flex flex-wrap gap-2 w-[18rem] h-[10.75rem] overflow-auto">
				{uploadedPhotos.map((photo, index) => (
					<div
						key={index}
						className="relative w-[8.3925rem] h-[5.0625rem] rounded-xl overflow-hidden"
					>
						<img
							src={`${BASE_URL}${photo.url}`}
							alt={`Thumbnail ${index}`}
							className="w-full h-full object-cover"
						/>
						<button
							className="absolute top-1 right-1 p-1 text-white text-xs cursor-pointer"
							onClick={() => handleDeletePhoto(index)}
						>
							&#10006;
						</button>
					</div>
				))}
			</div>
		</div>
	);
};