import { Card } from "@heroui/react";
import { useEffect } from "react";



/**
 * 播放任务栏
 */
function PlayBar() {
    return (
        <Card
            radius="none"
            shadow="sm"
            className="bg-background grid h-full grid-cols-[minmax(o,1fr)_minmax(0,3fr)_minmax(0,1fr)] px-4"
        >
            <p>PlayBar</p>
        </Card>
    );
};

export default PlayBar;