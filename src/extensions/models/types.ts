// 지원 언어 타입
export type Locale = 'ko' | 'en' | 'ja';

// 다국어 텍스트 공통 타입
export type LocalizedText = {
    ko: string;
    en: string;
    ja: string;
};

// 대시보드 최하위 링크
export type ProductLink = {
    text: LocalizedText;
    url: string;
    children?: ProductLink[];
};

// 대시보드 중간 그룹
// 예: CORE > Ferrite > 실적
export type ProductGroup = {
    title: LocalizedText;
    image?: string;
    links: ProductLink[];
};

// 대시보드 대분류 안의 품목
// 예: CORE, COIL
export type ProductItem = {
    title: LocalizedText;
    groups: ProductGroup[];
};

// 대시보드 카드
// 예: 생산, 설비, 품질, 수주, 손익
export type ProductCard = {
    id: string;
    title: LocalizedText;
    image: string;
    items: ProductItem[];
};

// Quick Links 항목
export type QuickLink = {
    text: LocalizedText;
    url: string;
    icon: string;
};

// 부문 링크 버튼
export type DepartmentLink = {
    text: LocalizedText;
    url?: string;
    disabled?: boolean;
};

// 언어별로 부문 링크를 따로 나누지 않고,
// 각 링크 텍스트만 다국어로 관리하는 구조
export type DepartmentLinkSet = DepartmentLink[];