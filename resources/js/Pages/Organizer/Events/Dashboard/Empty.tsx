import { useEffect } from "react";
import Layout from "../../../../Layouts/Event";
import { router } from "@inertiajs/react";

const Empty = () => {
    useEffect(() => {
        const link = document.querySelector<HTMLAnchorElement>('#navbar-nav .nav-link:not([data-bs-toggle])')?.href;
        if (link && link !== '/') {
            router.visit(link);
        }
    }, []);
    return null;
};

Empty.layout = (page: any) => <Layout children={page} />;
export default Empty;
