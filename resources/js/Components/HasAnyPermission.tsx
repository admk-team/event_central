import { usePage } from "@inertiajs/react";
import React from "react";

export default function HasAnyPermission({ 
    permission,
    children,
    elseRender
}: { 
    permission: string | string[]
    children: React.ReactNode
    elseRender?: React.ReactNode
}) {
    const userPermissions = usePage().props.permissions as string[] ?? [];

    let hasPermission = false;

    if (typeof permission === 'string') {
        hasPermission = userPermissions.includes(permission);
    } else {
        for (const p of permission) {
            hasPermission = userPermissions.includes(p);
            if (hasPermission) break;
        }
    }

    if (! hasPermission) return elseRender || null;

    return children;
}
