import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Button, useDisclosure } from "@heroui/react";
import clx from "classnames";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "@remixicon/react";
import { useSettings } from "@/store/settings";
import FavoritesEditModal from "@/components/favorites-edit-modal";
import ScrollContainer from "@/components/scroll-container";
import Logo from "./logo";
import Collection from "./collection";
import DefaultMenus from "./default-menu";

const COLLAPSED_WIDTH = 72;
const MIN_WIDTH = 160;
const MAX_WIDTH = 480;

const SideNav = () => {
    const sideMenuCollapsed = useSettings(state => state.sideMenuCollapsed);
    const sideMenuWidth = useSettings(state => state.sideMenuWidth);
    const updateSettings = useSettings(state => state.update);

    const {
        isOpen: isFavoritesEditModalOpen,
        onOpen: onOpenFavoritesEditModal,
        onOpenChange: onOpenChangeFavoritesEditModal,
    } = useDisclosure();

    const [editingFavoriteId, setEditingFavoriteId] = useState<number>();

    const handleOpenAddFavorite = () => {
        setEditingFavoriteId(undefined);
        onOpenFavoritesEditModal();
    };

    const handleOpenEditFavorite = (id: number) => {
        setEditingFavoriteId(id);
        onOpenFavoritesEditModal();
    };

    const handleFavoritesEditModalChange = (isOpen: boolean) => {
        if (!isOpen) {
        setEditingFavoriteId(undefined);
        }

        onOpenChangeFavoritesEditModal();
    };

    const sidebarWidth = (() => {
        if (sideMenuCollapsed) return COLLAPSED_WIDTH;
        const width = sideMenuWidth ?? 200;
        if (width < MIN_WIDTH) return MIN_WIDTH;
        if (width > MAX_WIDTH) return MAX_WIDTH;
        return width;
    })();

    const [renderWidth] = useState(sidebarWidth);
    const [isDragging, setIsDragging] = useState(false);
    const isCollapsedVisual = isDragging ? renderWidth < MIN_WIDTH : sideMenuCollapsed;

    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const startWidthRef = useRef(sidebarWidth);
    const prevUserSelectRef = useRef<string | null>(null);

    const onToggleCollapsed = () => {
        updateSettings({ sideMenuCollapsed: !sideMenuCollapsed });
    };

    const onStartResize = (event: ReactMouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        isDraggingRef.current = true;
        setIsDragging(true);
        startXRef.current = event.clientX;
        startWidthRef.current = sidebarWidth;
        prevUserSelectRef.current = document.body.style.userSelect;
        document.body.style.userSelect = "none";
    };

    return (
        <>
            <div 
                className={clx("border-divider/30 relative flex h-full flex-none flex-col border-r-1", {

                })}
                style={{width:`${200}px`}}
            >
                <Logo isCollapsed={isCollapsedVisual} />
                <ScrollContainer
                  className={clx("min-h-0 flex-1 pb-2", {
                    "px-4": !isCollapsedVisual,
                    "overflow-hidden": isDragging,
                  })}
                >
                  <DefaultMenus isCollapsed={isCollapsedVisual} onOpenAddFavorite={handleOpenAddFavorite} />
                  <Collection
                    isCollapsed={isCollapsedVisual}
                    onOpenAddFavorite={handleOpenAddFavorite}
                    onOpenEditFavorite={handleOpenEditFavorite}
                  />
                </ScrollContainer>
                <Button
                    size="sm"
                    isIconOnly
                    fullWidth
                    radius="none"
                    onPress={onToggleCollapsed}
                    className="bg-background border-divider/30 h-auto w-full flex-none border-y py-1"
                >
                    {isCollapsedVisual ? <RiArrowRightDoubleLine size={16}/> : <RiArrowLeftDoubleLine size={16} />}
                </Button>
                <div
                    className="hover:bg-foreground/10 absolute top-0 right-0 h-full w-2 cursor-col-resize bg-transparent"
                    onMouseDown={onStartResize}
                />
            </div>
            <FavoritesEditModal
                    mid={editingFavoriteId}
                    isOpen={isFavoritesEditModalOpen}
                    onOpenChange={handleFavoritesEditModalChange}
            />
        </>
    )
};

export default SideNav