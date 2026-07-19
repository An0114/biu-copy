import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Button, useDisclosure } from "@heroui/react";
import clx from "classnames";


const SideNav = () => {
    // const sideMenuCollapsed = useSetings

    return (
        <>
            <div 
                className={clx("border-divider/30 relative flex h-full flex-none flex-col border-r-1", {

                })}
                style={{width:`${200}px`}}
            >
                <p>Sidebar</p>
            </div>
        </>
    )
};

export default SideNav