import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import Card from "./Card";

interface MiddleDataProps {
  data?: any[];
  heading?: string;
  musicType?: string;
}

const MiddleData: React.FC<MiddleDataProps> = ({
  data = [],
  heading,
  musicType,
}) => {
  return (
    <div className="container mx-auto">
      <h2 className="text-white text-2xl font-semibold mb-10 mt-2">{heading}</h2>
      <div className="relative overflow-x-scroll">
        <div className="grid grid-flow-col  auto-cols-[minmax(200px,_1fr)] gap-6 ">
          {data.map((item, index) => (
            <Card
              key={index}
              data={item}
              index={(index + 1).toString()}
              musicType={musicType || ""}
            />
          ))}

          <button className="left-0 top-1/2 rounded-full bg-black  items-center justify-center hover:opacity-75 transition hidden absolute md:flex">
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button className="right-0 top-1/2 rounded-full bg-black  items-center justify-center hover:opacity-75 transition absolute hidden md:flex">
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiddleData;
