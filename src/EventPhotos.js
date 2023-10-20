import { jsx as _jsx } from "react/jsx-runtime";
import { CustomSlider } from "./components/Carousel";
const EventPhotos = ({ photos }) => {
    return (_jsx("div", { className: "mt-4 w-full overflow-hidden", children: photos && photos.length > 0 && _jsx(CustomSlider, { images: photos }) }));
};
export default EventPhotos;
