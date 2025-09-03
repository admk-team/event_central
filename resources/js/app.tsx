import "../scss/themes.scss";
import './bootstrap';
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";
import { configureEcho } from "@laravel/echo-react";

// 👇 i18n provider
import { LaravelReactI18nProvider } from 'laravel-react-i18n'

// Tip: this glob reads your lang JSON files at build/dev time.
// If your Vite setup doesn’t resolve `/lang/*.json`, use '../../lang/*.json'
const langFiles = import.meta.glob('/lang/*.json') 
// Alternative path if needed: import.meta.glob('../../lang/*.json')

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
        <LaravelReactI18nProvider
          files={langFiles}
          // If omitted, it reads <html lang="..."> automatically:
          locale={document?.documentElement?.lang || 'en'}
          fallbackLocale="en"
        >
          <App {...props} />
        </LaravelReactI18nProvider>
      </Provider>
    );
  },
  progress: { color: "#4B5563" },
});
