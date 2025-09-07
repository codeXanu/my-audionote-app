import { TbWriting } from "react-icons/tb";
import { FaYoutube } from "react-icons/fa";
import { IoImage } from "react-icons/io5";
import { GrFormUpload } from "react-icons/gr";

export default function InputBox() {
  return (
    <div className="w-full flex justify-center z-50">
      <div className="w-full max-w-4xl px-4">
        <div className="p-4 bg-white rounded-full border border-gray-100 mb-4 shadow-2xl">
          <div className="flex items-center justify-between">
            {/* Left-side icons */}
            <div className="flex space-x-2">
              <ActionButton icon={<TbWriting className="w-6 h-6" />} label="Text Note" />
              <ActionButton icon={<FaYoutube className="w-6 h-6" />} label="YouTube Link" />
              <ActionButton icon={<IoImage className="w-6 h-6" />} label="Upload Image" />
              <ActionButton icon={<GrFormUpload className="w-6 h-6" />} label="Upload Audio File" />
            </div>

            {/* Record button */}
            <button className="p-3 px-6 rounded-full bg-red-500 text-white flex items-center font-medium shadow-lg hover:bg-red-600 transition-colors">
              <span className="w-2 h-2 rounded-full bg-white mr-2"></span>
              Start recording
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label }) {
  return (
    <button className="flex items-center p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 group transition-all">
      {icon}
      <span className="max-w-0 max-h-6 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all">
        {label}
      </span>
    </button>
  );
}
