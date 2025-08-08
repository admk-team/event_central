import "../scss/themes.scss";
import './bootstrap';
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";
import { configureEcho } from "@laravel/echo-react";

export const appName = import.meta.env.VITE_APP_NAME || "Event Central";

configureEcho({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  wsHost: import.meta.env.VITE_PUSHER_HOST || `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
  wsPort: import.meta.env.VITE_PUSHER_PORT || 80,
  wssPort: import.meta.env.VITE_PUSHER_PORT || 443,
  forceTLS: true,
  enabledTransports: ['ws', 'wss'],
});

const store = configureStore({
    reducer: rootReducer,
    devTools: import.meta.env.DEV,
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx", { eager: false })
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <Provider store={store}>
                <App {...props} />
            </Provider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
