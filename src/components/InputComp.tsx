import React, { useState } from "react";
import closeEye from "../img/closeEye.png";
import openEye from "../img/openEye.png";

interface InputProps {
	label: string;
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	error: string | null;
	maxLength?: number;
	size: "small" | "big" | "medium" | "";
	typeOf: "password" | "description";
	width: string | null;
	showhide: true | false | null;
	right: string | null;
}

export const Input: React.FC<InputProps> = ({
	label,
	value,
	onChange,
	error,
	maxLength,
	typeOf,
	placeholder,
	width,
	showhide,
	right,
}) => {
	const [showPassword, setShowPassword] = useState(true);

	const handleTogglePassword = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	return (
		<div className="flex-col justify-start items-start inline-flex">
			<div
				className={`self-stretch ${
					typeOf === "description" ? "h-[9.5625rem]" : "h-full"
				} pt-2.5 pb-2 bg-white rounded-xl border ${
					typeOf === "password"
						? "border-stone-950"
						: "border-gray-400"
				} justify-start gap-1 flex flex-col`}
			>
				<div className="self-stretch justify-start items-center inline-flex">
					<div className="text-gray-400 text-sm font-normal font-ttcommons leading-none pl-4">
						{label}
					</div>
				</div>
				{typeOf === "description" ? (
					<textarea
						rows="4"
						cols="50"
						value={value}
						onChange={onChange}
                        className='w-full h-full focus:outline-none px-4 resize-none'
					/>
				) : (
					<input
						type={showPassword && showhide ? "password" : "text"}
						value={value}
						placeholder={placeholder}
						onChange={onChange}
						className={`${width} h-full bg-transparent rounded text-stone-950 placeholder-stone-600 focus:outline-none focus:ring-0 pl-4`}
						maxLength={maxLength}
					/>
				)}
				{showhide && (
					<button
						type="button"
						className={`mt-2 absolute ${
							right ? right : "right-48"
						} cursor-pointer text-gray-400 text-sm`}
						onClick={handleTogglePassword}
					>
						{showPassword ? (
							<img src={closeEye} alt="hide password eye" />
						) : (
							<img src={openEye} alt="show password eye" />
						)}
					</button>
				)}
			</div>
			{error && <div className="text-red-600 text-sm mt-1">{error}</div>}
		</div>
	);
};
