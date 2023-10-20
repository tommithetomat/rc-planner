const genClasses =
  "h-8 px-1.5 py-0.5 rounded-lg justify-start items-center gap-2 inline-flex text-left text-8 font-medium leading-7 mb-1 cursor-pointer";

const propertyComp = {
  past: "bg-zinc-100 text-gray-400",
  future: "bg-zinc-100 text-stone-950",
  accede: "bg-zinc-100 gap-1 text-stone-950",
  created: "bg-red-600 gap-1 text-white",
};

const whatFigure = {
  circle: <div className="p-px text-red-600 justify-center items-center flex">●</div>,
  star: <div className="p-px text-white justify-center items-center flex">✦</div>,
  default: ''
}

export interface EventComponentProps {
  dateStart: string;
  label: string;
  onEvent: 'accede' | 'created' | 'default' ;
  figure: 'circle' | 'star' | 'default';
  onClick: () => void
}

export const EventComponent: React.FC<EventComponentProps> = ({ dateStart, label, onEvent, figure, ...props }) => {
  const currentDate = new Date();
  const eventDate = new Date(dateStart);
  const pastDate = eventDate < currentDate;
  const property = onEvent === 'accede' && !pastDate ? 'accede' : onEvent === 'created' && !pastDate ? 'created' : pastDate ? 'past' : 'future';

  const compClass = propertyComp[property];

  const fig = whatFigure[figure];

  const allClasses = [compClass, genClasses].join(" ");

  return (
    <div className={`${allClasses} max-w-[100%] w-fit`} {...props} >
      {fig}
      <span className='truncate'>{label}</span>
    </div>
  );
};
