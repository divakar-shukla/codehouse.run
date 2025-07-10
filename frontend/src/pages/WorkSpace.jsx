import React, { useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {Copy, BookmarkCheck, RotateCcw, SquareCode, Send, Play, CircleCheckBig, NotebookText } from "lucide-react";
import Select from 'react-select';
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import Editor from '@monaco-editor/react';

const languageOption = [
  { value: 'javascript', label: 'Export' },
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' }
]
const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: 'var(--background)',
    borderColor: state.isFocused ? 'var(--primary)' : '#333',
    color: 'var(--detail-font-color)',
    boxShadow: 'none',
    borderRadius: '5px',
    padding: '2px',
    '&:hover': {
      borderColor: '#333',
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? 'var(--primary)'
      : state.isFocused
      ? '#333'
      : 'var(--background)',
    color: state.isSelected ? '#000' : '#fff',
    cursor: 'pointer',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: 'var(--background)',
    borderRadius: '8px',
    marginTop: '4px',
    zIndex: 10,
  }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--detail-font-color)',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: 'var(--foreground)',
    borderRadius: '4px',
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: 'var(--detail-font-color)',
    fontSize: '0.85rem',
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: 'var(--primary)',
    ':hover': {
      backgroundColor: 'var(--primary)',
      color: '#000',
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: '#888',
  }),
  input: (base) => ({
    ...base,
    color: '#fff',
  }),
};
export function WorkSpace() {
const [isActiveProblemNav, setIsActiveProblemNav] = useState("Description")
const [isActiveResultNav, setIsActiveResultNav] = useState("testcase")
  return (
    
  <div className="p-4 mt-25">
     <div className="flex justify-between mb-4 border-b bg-[var(--card)] px-4 py-2 rounded">
      <div className='flex items-center'><h2 className="text-2xl text-[var(--primary)]">Problem</h2></div>
      <div className="flex gap-5 items-center">
        <div className='bg-[var(--background)] p-2 rounded cursor-pointer'>
            <Tooltip>
              <TooltipTrigger asChild>
                 <Copy size={18} className='text-[var(--primary)] hover:text-[var(--detail-font-color)]'/>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy Code</p>
              </TooltipContent>
            </Tooltip>
        </div>
        <div className='bg-[var(--background)] p-2 rounded cursor-pointer'>
            <Tooltip>
              <TooltipTrigger asChild>
                 <BookmarkCheck size={18} className='text-[var(--primary)] hover:text-[var(--detail-font-color)]'/>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save in Playlist</p>
              </TooltipContent>
            </Tooltip>
        </div>
        <div className='bg-[var(--background)] p-2 rounded cursor-pointer'>
            <Tooltip>
              <TooltipTrigger asChild>
                 <RotateCcw size={18} className='text-[var(--primary)] hover:text-[var(--detail-font-color)]'/>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reset</p>
              </TooltipContent>
            </Tooltip>
        </div>
        <div className='min-w-[150px]'>
          <Select
           className="basic-single bg-(var(--card))"
           classNamePrefix="select"
           styles={customStyles}
           defaultValue={languageOption[0]}
           isDisabled={false}
           isLoading={false}
           isClearable={false}
           isRtl={false}
           isSearchable={false}
           name="language"
           options={languageOption}
           
         />
        </div>
      </div>
     </div>
     <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded border md:min-w-[450px]">
      <ResizablePanel defaultSize={45}>
        <div className="flex items-start flex-col">
          <div className='flex justify-around px-3 py-3 border-b-2 w-full gap-3 h-14'>
            <div className={`text-[var(--primary)] text-sm px-2 py-1 border-b-2 cursor-pointer ${isActiveProblemNav =="Description" ? "border-[var(--foreground)]" : "border-transparent"}`} onClick={()=>{
              setIsActiveProblemNav("Description")
            }}>
              Description
            </div>
            <div className={`text-[var(--primary)] text-sm px-2 py-1 border-b-2 cursor-pointer ${isActiveProblemNav == "Submission" ? "border-[var(--foreground)]" : "border-transparent"}`} onClick={()=>{
              setIsActiveProblemNav("Submission")
            }}>
              Submission
            </div>
            <div className={`text-[var(--primary)] text-sm px-2 py-1 border-b-2 cursor-pointer ${isActiveProblemNav == "Editorials" ? "border-[var(--foreground)]" : "border-transparent"}`} onClick={()=>{
              setIsActiveProblemNav("Editorials")
            }}>
              Editorials
            </div>
            <div className={`text-[var(--primary)] text-sm px-2 py-1 border-b-2 cursor-pointer ${isActiveProblemNav == "Hints" ? "border-[var(--foreground)]" : "border-transparent"}`} onClick={()=>{
              setIsActiveProblemNav("Hints")
            }}>
              Hints
            </div>
          
          </div>
          <div className='h-[650px] overflow-y-auto w-full' style={{scrollbarWidth: "none"}}>
            <div className='h-[800px] w-full'>erfwerfe</div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={55}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-start flex-col" >
              <div className='flex justify-between px-3 py-3 border-b-2 w-full gap-3 h-14'>
                <div className='flex gap-1 items-center'>
                  <SquareCode className="size-7 mr-3 "/> 
                  <div className='text-sm text-[var(--primary)]'>Code Editer</div>
                </div>
                <div className='flex gap-4'>
                  <button className='bg-[var(--foreground)] text-[var(--background)] py-2 px-3 text-sm rounded flex items-center cursor-pointer'>
                      <Play className='mr-2 size-4'/>Run
                  </button>
                  <button className='bg-[var(--foreground)] text-[var(--background)] py-2 px-3 text-sm rounded flex items-center cursor-pointer'>
                      <Send className='mr-2 size-4'/>Submit
                  </button>
                </div>
              </div>
              <div className='h-[500px] overflow-y-auto w-full' style={{scrollbarWidth: "none"}}>
                <Editor
                  height="100%"
                  theme="vs-dark"
                  options={{ fontSize: 18, minimap: { enabled: false } }}
                />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={25}>
            <div className="flex flex-col h-full w-full">
              <div className="flex gap-6 p-3 border-b">
                <div className={`text-sm px-2 py-1 border-b-2 cursor-pointer flex items-center gap-2 ${isActiveResultNav =="testcase" ? "border-[var(--foreground)] text-[var(--foreground)]" : "border-transparent text-[var(--primary)]"}`} onClick={()=>{
                     setIsActiveResultNav("testcase")
                   }}>
                      <CircleCheckBig className={`${isActiveResultNav =="testcase" ? "text-[var(--foreground)]" : "text-[var(--primary)]"} `} size='15'/>Test Case
                </div>
                <div className={`text-sm px-2 py-1 border-b-2 cursor-pointer flex items-center gap-2 ${isActiveResultNav =="result" ? "border-[var(--foreground)] text-[var(--foreground)]" : "border-transparent text-[var(--primary)]"}`} onClick={()=>{
                     setIsActiveResultNav("result")
                   }}>
                      <NotebookText className={`${isActiveResultNav =="result" ? "text-[var(--foreground)]" : "text-[var(--primary)]"} `} size='15'/>Result
                </div>
              </div>  
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
  )
}

export default WorkSpace;
