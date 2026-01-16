'use client'

import { cn } from "@/lib/utils";
import { Grip } from "lucide-react";

const AppMenu = ({className}: {className: string}) => {

    return (
        <div className={cn(className)}>
            <Grip />
        </div>
    )
}


export default AppMenu;