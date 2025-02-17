import { usePage } from "@inertiajs/react";
import React from "react";

export default function HasPermission({ 
    permission, 
    children,
    elseRender
}: { 
    permission: string 
    children: React.ReactNode
    elseRender?: React.ReactNode
}) {
    const can = usePage().props.can as Record<string, boolean>;

    if (!can || typeof can !== 'object') return null;

    if (can[permission] !== true) return elseRender || null;

    return children;
}
