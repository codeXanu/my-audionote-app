import { useState, useRef } from "react";
import { TbWriting } from "react-icons/tb";
import { FaYoutube } from "react-icons/fa";
import { IoImage } from "react-icons/io5";
import { GrFormUpload } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import RecorderModal from "./RecorderModel";
import AudioUploadDialog from "./AudioUplaodDialog";
import useStore from "../store/useStore";
import TextUploadDialog from "./TextUploadDialog";
import UpgradeDialog from "./UpgradeDialog";
import PdfHandleDialog from "./PdfHandleDialog";
import YtHandleDialog from "./YtHandleDialog";





export default function InputBox( {userId, setCardsData } ) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false)
  const recorderRef = useRef();

  const { isTextEditerOpen, setIsTextEditerOpen } = useStore.getState();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Set to true to show initially for premium feature 
  const [ isUploadingPdf, setIsUploadingPdf ] = useState(false);
  const [ isUploadingYt, setIsUploadingYt ] = useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  

  return (
    <div className="w-full max-w-3xl flex justify-center z-55 ">
      <div className="w-full max-w-4xl ">
        <div className="p-4 bg-white rounded-full border border-gray-100 mb-4 shadow-2xl">
          <div className="flex items-center justify-between">
            
            {/* Left-side icons (Desktop only) */}
            <div className="hidden lg:flex space-x-2">
              <ActionButton icon={<TbWriting className="w-6 h-6" />} label="Text Note" onClick={() => setIsTextEditerOpen(true)} />
              <ActionButton icon={<FaYoutube className="w-6 h-6" />} label="YouTube Link" onClick={()=>setIsUploadingYt(true)} />
              <ActionButton icon={<MdOutlinePictureAsPdf className="w-6 h-6" />} label="Upload pdf" onClick={()=>setIsUploadingPdf(true)} />
              <ActionButton icon={<GrFormUpload className="w-6 h-6" />} label="Upload Audio File" onClick={()=>setIsUploadingAudio(true)} />
            </div>
            {/* To upload the Audio file */}
            <AudioUploadDialog isUploadingAudio={isUploadingAudio} setIsUploadingAudio={setIsUploadingAudio} userId={userId} setCardsData={setCardsData} setIsDrawerOpen={setIsDrawerOpen}  />
            <PdfHandleDialog isUploadingPdf={isUploadingPdf}  setIsUploadingPdf={setIsUploadingPdf} userId={userId} setCardsData={setCardsData} setIsDrawerOpen={setIsDrawerOpen}  />
            <YtHandleDialog isUploadingYt={isUploadingYt} setIsUploadingYt={setIsUploadingYt} userId={userId} setCardsData={setCardsData} setIsDrawerOpen={setIsDrawerOpen} />
            <TextUploadDialog />
            {/* 3-dot button (Mobile/Tablet only) */}
            <button
              className="lg:hidden p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 transition-all"
              onClick={() => setIsDrawerOpen(true)}
            >
              <BsThreeDots className="w-6 h-6" />
            </button>

            {/* Record button */}
            {/* <RecorderButton /> */}

            <button className="p-3 px-6 rounded-full bg-red-500 text-white flex items-center font-medium shadow-lg hover:bg-red-600 transition-colors"
                onClick={() => recorderRef.current.openRecorder()}
            >
              <span className="w-2 h-2 rounded-full bg-white mr-2"></span>
             Start recording
            </button>


          </div>
        </div>
      </div>

      <RecorderModal ref={recorderRef} userId={userId} setCardsData={setCardsData} />

      {/* Bottom Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-t-2xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">More Options</h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setIsDrawerOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ActionButton icon={<TbWriting className="w-6 h-6" />} label="Text Note" isDrawerOpen={isDrawerOpen} onClick={() => setIsTextEditerOpen(true)} />
              <ActionButton icon={<FaYoutube className="w-6 h-6" />} label="YouTube Link" isDrawerOpen={isDrawerOpen}  onClick={()=>setIsUploadingYt(true)} />
              <ActionButton icon={<MdOutlinePictureAsPdf className="w-6 h-6" />} label="Upload pdf" isDrawerOpen={isDrawerOpen}  onClick={()=>setIsUploadingPdf(true)} />
              <ActionButton icon={<GrFormUpload className="w-6 h-6" />} label="Upload Audio" isDrawerOpen={isDrawerOpen} onClick={()=>setIsUploadingAudio(true)} />
            </div>
          </div>
        </div>
      )}

      {isDialogOpen && <UpgradeDialog onClose={handleCloseDialog} />}
    </div>
  );
}


function ActionButton({ icon, label, onClick, isDrawerOpen }) {
  return (
    <button className="flex items-center p-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 group transition-all" onClick={onClick}>
      {icon}
      {/* {label2} */}
      <span className= {` ${ isDrawerOpen? "ml-1" : "max-w-0"} max-h-6 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all`}>
        {label}
      </span>
    </button>
  );
}







