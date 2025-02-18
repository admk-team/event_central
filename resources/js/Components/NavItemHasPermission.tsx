import HasAnyPermission from "./HasAnyPermission";
import HasPermission from "./HasPermission";

export default function NavItemHasPermission({ item, children }: { item: any, children: React.ReactNode }) {
    if (item.hasPermissions) {
        return (
            <HasPermission permission={item.hasPermissions}>{children}</HasPermission>
        )
    }

    if (item.hasAnyPermission) {
        return (
            <HasAnyPermission permission={item.hasAnyPermission}>{children}</HasAnyPermission>
        )
    }

    return children;
}