'use client';

import { LuPanelLeft } from 'react-icons/lu';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { isMobile as detectMobile } from 'react-device-detect';
import { useEffect, useState } from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import Filelist from './filelist';
import Terminal from './terminal';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState<null | boolean>(null);
  const [showLeftContainer, setShowLeftContainer] = useState<boolean>(true);
  const [showTerminal, setshowTerminal] = useState<boolean>(true);
  const defaultLeftContainerSize = 20;
  const defaultTerminalSize = 20;

  useEffect(() => {
    setIsMobile(detectMobile); // クライアントサイドでのみモバイル判定
  }, [isMobile]);

  const switchShowLeftContainer = () => {
    setShowLeftContainer((prev) => !prev);
  };

  const switchShowTerminal = () => {
    setshowTerminal((prev) => !prev);
  };

  // 読み込み中
  if (isMobile == null) {
    return <div className="h-screen w-screen flex"></div>;

    // スマホ類の画面
  } else if (isMobile) {
    return (
      <div className="h-screen w-screen flex flex-col">
        <div className="flex-1 bg-gray-100">{children}</div>
        <div className="h-48 w-full bg-white border-t border-gray-200"></div>
      </div>
    );

    // PC類の画面
  } else {
    return (
      <>
        <div className="h-screen w-screen flex">
          <PanelGroup direction="horizontal" className="h-full w-full">
            {/* 左のコンテナ */}
            <Panel
              defaultSize={defaultLeftContainerSize}
              maxSize={90}
              minSize={15}
              className={showLeftContainer ? '' : 'hidden'}
            >
              <div className="h-full flex flex-col">
                <div className="flex-grow bg-white border-b border-gray-200">
                  <Filelist switchShowLeftContainer={switchShowLeftContainer} />
                </div>
                <div className="h-20 bg-white"></div>
              </div>
            </Panel>
            <PanelResizeHandle className="border-r border-gray-200" />
            <Panel
              className=""
              defaultSize={100 - defaultLeftContainerSize}
              maxSize={85}
              minSize={10}
            >
              <PanelGroup direction="vertical">
                <div className="h-8 w-full bg-white border-b border-gray-200">
                  <div></div>
                </div>
                <Panel
                  className=""
                  defaultSize={100 - defaultTerminalSize}
                  maxSize={90}
                  minSize={10}
                >
                  <div className="h-full w-full flex relative bg-gray-100">
                    {showLeftContainer || (
                      <div className="absolute top-4 left-4">
                        <FloatLeftUpButton
                          switchShowLeftContainer={switchShowLeftContainer}
                        />
                      </div>
                    )}
                    {showTerminal || (
                      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 h-8">
                        <TerminalButton
                          switchShowTerminal={switchShowTerminal}
                        />
                      </div>
                    )}
                    {children}
                  </div>
                </Panel>
                {showTerminal && (
                  <PanelResizeHandle className="border-b border-gray-200" />
                )}
                {/* コンソール */}
                <Panel
                  defaultSize={defaultTerminalSize}
                  maxSize={90}
                  minSize={10}
                  className={showTerminal ? 'bg-white' : 'hidden'}
                  onResize={(size) => {
                    console.log(size);
                  }}
                >
                  <Terminal switchShowTerminal={switchShowTerminal} />
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </div>
      </>
    );
  }
}

type FloatLeftUpButtonProp = {
  switchShowLeftContainer: () => void;
};

function FloatLeftUpButton({ switchShowLeftContainer }: FloatLeftUpButtonProp) {
  return (
    <button
      onClick={() => switchShowLeftContainer()}
      className="h-12 bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 transition-shadow px-10"
    >
      <span className="flex items-center space-x-2">
        <span>portfolio.k256.dev</span>
        <LuPanelLeft size={20} />
      </span>
    </button>
  );
}

type TerminalButtonProp = {
  switchShowTerminal: () => void;
};

function TerminalButton({ switchShowTerminal }: TerminalButtonProp) {
  return (
    <button
      onClick={() => switchShowTerminal()}
      className="h-8 w-48 bg-white rounded-t-full flex items-center justify-center"
    >
      <IoIosArrowUp size={20} />
    </button>
  );
}
