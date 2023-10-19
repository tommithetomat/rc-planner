import React, { useState } from "react";
import { arrowLeft, arrowRight } from "../all-func";
import { Button } from "./Buttons";

interface CustomSliderProps {
	images: string[];
}

const BASE_URL = "https://planner.rdclr.ru";
const imageWidth = 16.7;

export const CustomSlider: React.FC<CustomSliderProps> = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleIndicatorClick = (index: number) => {
		setCurrentIndex(index);
	};

	const handlePrevClick = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	const handleNextClick = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<div className="relative w-full ml-16">
			<div className="slider-container relative overflow-hidden mt-14">
				<div className="flex flex-row justify-between items-center pr-24">
					<h3 className="text-2xl font-semibold mb-2 font-redcollar">
						Галерея
					</h3>
					{images.length > 3 && (
						<div className="flex flex-row items-center justify-center gap-2">
							<Button
								color="gray"
								label={arrowLeft}
								onClick={handlePrevClick}
								padding="px-4 py-2"
							></Button>
							<Button
								color="gray"
								label={arrowRight}
								onClick={handleNextClick}
								padding="px-4 py-2"
							></Button>
						</div>
					)}
				</div>

				<div className="slider flex transition-transform duration-300 ease-in-out gap-4 mt-8">
					{images.map((image, index) => (
						<div
							key={index}
							className="slide min-w-fit h-40"
							style={{
								transform: `translateX(-${
									currentIndex * (imageWidth + 1)
								}rem)`,
							}}
						>
							<img
								src={BASE_URL + image.url}
								alt={`Slide ${index + 1}`}
								className="w-[16.7rem] h-full rounded-xl object-cover"
							/>
						</div>
					))}
				</div>
				{images.length > 3 && (
					<div className="indicators flex justify-center mt-2 ml-[-8rem]">
						{images.map((_, index) => (
							<div
								key={index}
								className={`indicator w-8 h-1 mt-2 mx-1 cursor-pointer rounded-full ${
									index === currentIndex
										? "bg-red-600"
										: "bg-gray-200"
								}`}
								onClick={() => handleIndicatorClick(index)}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
};
