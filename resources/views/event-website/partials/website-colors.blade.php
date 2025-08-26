<style>
    :root {
        /* Base colors */
        @switch($event->custom_theme)
            @case('default')
                --color-background: #ffffff;
                --color-foreground: #111827;
            @break
            @default
                --color-background: {{ $colors['light']['primary']['primary_dark'] }};
                --color-foreground: {{ $colors['light']['primary']['primary_foreground'] }};
        @endswitch

        /* Brand colors */
        --color-primary: {{ $colors['light']['primary']['primary'] }};
        --color-primary-light: {{ $colors['light']['primary']['primary_light'] }};
        --color-primary-dark: {{ $colors['light']['primary']['primary_dark'] }};
        --color-primary-foreground: {{ $colors['light']['primary']['primary_foreground'] }};

        /* Accent colors */
        --color-accent: {{ $colors['light']['primary']['primary_light'] }};
        --color-accent-light: #fb7185;
        --color-accent-dark: #e11d48;
        --color-accent-foreground: #ffffff;

        /* Neutral colors */
        --color-neutral-50: #f9fafb;
        --color-neutral-100: #f3f4f6;
        --color-neutral-200: #e5e7eb;
        --color-neutral-300: #d1d5db;
        --color-neutral-400: #9ca3af;
        --color-neutral-500: #6b7280;
        --color-neutral-600: #4b5563;
        --color-neutral-700: #374151;
        --color-neutral-800: #1f2937;
        --color-neutral-900: #111827;

        /* State colors */
        --color-success: #10b981;
        --color-error: #ef4444;
        --color-warning: #f59e0b;
        --color-info: #3b82f6;

        /* Typography */
        --font-family: "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

        --font-size-xs: 0.75rem;
        --font-size-sm: 0.875rem;
        --font-size-base: 1rem;
        --font-size-lg: 1.125rem;
        --font-size-xl: 1.25rem;
        --font-size-2xl: 1.5rem;
        --font-size-3xl: 1.875rem;
        --font-size-4xl: 2.25rem;
        --font-size-5xl: 3rem;
        --font-size-6xl: 3.75rem;
        --font-size-7xl: 4.5rem;
        --font-size-8xl: 6rem;

        /* Font weights */
        --font-weight-light: 300;
        --font-weight-normal: 400;
        --font-weight-medium: 500;
        --font-weight-semibold: 600;
        --font-weight-bold: 700;
        --font-weight-extrabold: 800;

        /* Line heights */
        --line-height-none: 1;
        --line-height-tight: 1.25;
        --line-height-snug: 1.375;
        --line-height-normal: 1.5;
        --line-height-relaxed: 1.625;
        --line-height-loose: 2;

        /* Spacing */
        --spacing-0: 0;
        --spacing-1: 0.25rem;
        --spacing-2: 0.5rem;
        --spacing-3: 0.75rem;
        --spacing-4: 1rem;
        --spacing-5: 1.25rem;
        --spacing-6: 1.5rem;
        --spacing-8: 2rem;
        --spacing-10: 2.5rem;
        --spacing-12: 3rem;
        --spacing-16: 4rem;
        --spacing-20: 5rem;
        --spacing-24: 6rem;
        --spacing-32: 8rem;
        --spacing-40: 10rem;
        --spacing-48: 12rem;
        --spacing-56: 14rem;
        --spacing-64: 16rem;

        /* Border radius */
        --radius-none: 0;
        --radius-sm: 0.125rem;
        --radius-md: 0.25rem;
        --radius-lg: 0.5rem;
        --radius-xl: 0.75rem;
        --radius-2xl: 1rem;
        --radius-3xl: 1.5rem;
        --radius-full: 9999px;

        /* Shadows */
        --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                     0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                     0 4px 6px -2px rgba(0, 0, 0, 0.05);
        --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                     0 10px 10px -5px rgba(0, 0, 0, 0.04);
        --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

        /* Transitions */
        --transition-fast: 150ms;
        --transition-normal: 250ms;
        --transition-slow: 350ms;

        /* Z-index */
        --z-0: 0;
        --z-10: 10;
        --z-20: 20;
        --z-30: 30;
        --z-40: 40;
        --z-50: 50;
        --z-auto: auto;

        /* Container */
        --container-padding: 1.5rem;
        --container-max-width: 1280px;
    }
</style>
