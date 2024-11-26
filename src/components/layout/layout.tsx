'use client'

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <div className="h-screen w-screen flex">
      <PanelGroup direction="horizontal" className="h-full">
        <Panel maxSize={90} defaultSize={20} minSize={15}>
          <div className="h-full flex flex-col">
            <div className="flex-grow bg-red-200">

            </div>
            <div className="h-20 bg-blue-500">

            </div>
          </div>
        </Panel>
        <PanelResizeHandle className="border-r border-gray-400" />
        <Panel className="">
          <PanelGroup direction="vertical">
            <div className="h-8 w-full bg-blue-500">
              
            </div>
            <Panel className="">
              {children}
            </Panel>
            <PanelResizeHandle className="border-b border-gray-400" />
            <Panel maxSize={90} minSize={10} defaultSize={15} className="" onResize={(size) => {console.log(size)}}>

            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  </>
}