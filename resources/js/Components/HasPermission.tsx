import { usePage } from "@inertiajs/react";
import React from "react";

export default function HasPermission({ 
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
        permission.map((p) => {
            hasPermission = userPermissions.includes(p);
        })
    }

    if (! hasPermission) return elseRender || null;

    return children;
}
