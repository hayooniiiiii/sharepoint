export type Locale = 'ko' | 'en' | 'ja';

export type LocalizedText = {
    ko: string;
    en: string;
    ja: string;
};

export type ProductLink = {
    text: LocalizedText;
    url: string;
};

export type ProductGroup = {
    title: LocalizedText;
    links: ProductLink[];
};

export type ProductItem = {
    title: LocalizedText;
    groups: ProductGroup[];
};

export type ProductCard = {
    id: string;
    title: LocalizedText;
    image: string;
    items: ProductItem[];
};

export type QuickLink = {
    text: LocalizedText;
    url: string;
    icon: string;
};

export type DepartmentLink = {
    text: string;
    url?: string;
    disabled?: boolean;
};

export type DepartmentLinkSet = {
    ko: DepartmentLink[];
    en: DepartmentLink[];
    ja: DepartmentLink[];
};