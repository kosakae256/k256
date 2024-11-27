"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { isMobile as detectMobile } from "react-device-detect";
import { useEffect, useState } from "react";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState<null | boolean>(null);

  useEffect(() => {
    setIsMobile(detectMobile); // クライアントサイドでのみモバイル判定
  }, [isMobile]);

  if (isMobile == null) {
    return <div className="h-screen w-screen flex"></div>;
  } else if (isMobile) {
    return <div className="h-screen w-screen flex">{children}</div>;
  } else {
    return (
      <>
        <div className="h-screen w-screen flex">
          <PanelGroup direction="horizontal" className="h-full w-full">
            <Panel defaultSize={20} maxSize={90} minSize={15}>
              <div className="h-full flex flex-col">
                <div className="flex-grow bg-gray-100 border-b border-black"></div>
                <div className="h-20 bg-gray-100"></div>
              </div>
            </Panel>
            <PanelResizeHandle className="border-r border-black" />
            <Panel className="" defaultSize={80} maxSize={85} minSize={10}>
              <PanelGroup direction="vertical">
                <div className="h-8 w-full bg-gray-100 border-b border-black">
                  <div></div>
                </div>
                <Panel className="" defaultSize={85} maxSize={90} minSize={10}>
                  {children}
                </Panel>
                <PanelResizeHandle className="border-b border-black" />
                <Panel
                  defaultSize={15}
                  maxSize={90}
                  minSize={10}
                  className="bg-gray-100"
                  onResize={(size) => {
                    console.log(size);
                  }}
                ></Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </>
    );
  }
}
