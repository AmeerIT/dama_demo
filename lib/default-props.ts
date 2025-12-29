import { Dictionary, Locale } from "./i18n/dictionaries";

export interface DefaultProps {
    dictionary: Dictionary;
    lang: Locale;
}



export interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}
