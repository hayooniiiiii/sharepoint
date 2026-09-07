/**
 * =========================================================
 * 공통 데이터 타입 정의
 * =========================================================
 *
 * 데이터 구조(Type)를 한 곳에서 관리한다.
 *
 * 주요 사용 영역
 * - 대시보드 카드 (생산 / 설비 / 품질 / 수주 / 손익)
 * - Quick Links
 * - 부문 채널
 * - 다국어 처리
 *
 * 실제 데이터는 주로 아래 파일에서 관리한다.
 *
 * data/productCards.ts
 * data/quickLinks.ts
 * data/departmentLinks.ts
 *
 * 화면 출력 로직에서는 이 타입을 기준으로
 * 데이터를 읽어 HTML을 생성한다.
 */


/* =========================================================
   1. LANGUAGE
   ========================================================= */

/**
 * 포털에서 지원하는 언어
 *
 * ko : 한국어
 * en : 영어
 * ja : 일본어
 */
export type Locale =
    'ko' |
    'en' |
    'ja';


/**
 * 포털에서 사용하는 공통 다국어 문자열 구조
 *
 * 예)
 *
 * {
 *     ko: '생산',
 *     en: 'Production',
 *     ja: '生産'
 * }
 *
 * 메뉴명, 버튼명, 카드명 등
 * 사용자 화면에 표시되는 문자열은
 * 가능한 이 타입을 사용한다.
 */
export type LocalizedText = {
    ko: string;
    en: string;
    ja: string;
};


/* =========================================================
   2. PRODUCT DASHBOARD
   ========================================================= */

/**
 * 대시보드 링크 상태
 *
 * active
 * - 실제 URL이 연결되어 사용 가능한 메뉴
 *
 * preparing
 * - 아직 개발 중이거나 연결할 화면이 없는 메뉴
 * - detailPanel.ts에서 클릭을 막고
 * - '준비중입니다' 상태로 표시한다. 상태값으로 화면 표시를 명확하게 관리한다.
 */
export type ProductLinkStatus =
    'active' |
    'preparing';


/**
 * 대시보드 최하위 메뉴 링크
 *
 * 예)
 *
 * 생산
 *   └ CORE
 *      └ Ferrite
 *         └ 실적
 *
 * 또는 하위 메뉴를 가지는 형태
 *
 * 설비
 *   └ COIL
 *      └ ACT45
 *         └ PEIS
 *            ├ Daily
 *            └ Monthly
 *
 *
 * text
 * - 화면에 표시되는 다국어 메뉴명
 *
 * url
 * - 실제 이동할 URL
 * - URL이 없는 경우 생략 가능
 *
 * children
 * - 하위 메뉴가 존재할 경우 사용
 * - 재귀 구조이므로 여러 단계의 메뉴 생성 가능
 *
 * status
 * - 메뉴 사용 상태
 * - active     : 정상 사용
 * - preparing  : 준비중
 *
 * status를 생략하면 기본적으로 정상 메뉴로 취급한다.
 */
export type ProductLink = {
    text: LocalizedText;
    url?: string;
    children?: ProductLink[];
    status?: ProductLinkStatus;
};


/**
 * 제품별 중간 그룹
 *
 * 대시보드 구조 예)
 *
 * 생산
 *   └ CORE
 *      └ Ferrite
 *         ├ 실적
 *         ├ 공정현황
 *         └ 수율 추이
 *
 * 여기서 Ferrite가 ProductGroup에 해당한다.
 *
 *
 * title
 * - 그룹 이름
 *
 * image
 * - 그룹 옆에 표시할 제품 이미지
 *
 * url
 * - 그룹 자체를 클릭했을 때 바로 이동하는 URL
 * - links 대신 직접 링크를 사용하는 경우 사용
 *
 * links
 * - 그룹 내부에 표시할 상세 메뉴
 */
export type ProductGroup = {
    title: LocalizedText;
    image?: string;
    url?: string;
    links?: ProductLink[];
};


/**
 * 대시보드 카드 내부의 대분류
 *
 * 현재 기준
 *
 * CORE
 * COIL
 *
 * 예)
 *
 * 생산
 *   ├ CORE
 *   │  └ Ferrite
 *   │
 *   └ COIL
 *      ├ ACT45
 *      ├ ADL2012
 *      ├ VLS-EX
 *      ├ VLS-CX
 *      └ PID
 *
 *
 * title
 * - CORE / COIL 등의 명칭
 *
 * groups
 * - 해당 분류에 포함되는 제품 그룹
 */
export type ProductItem = {
    title: LocalizedText;
    groups: ProductGroup[];
};


/**
 * 메인 대시보드 카드
 *
 * 현재 사용 중인 카드
 *
 * production : 생산
 * facility   : 설비
 * quality    : 품질
 * order      : 수주
 * profit     : 손익
 *
 *
 * id
 * - 카드 식별값
 * - 카드 클릭 이벤트에서 사용하므로
 *   중복되지 않도록 관리한다.
 *
 * title
 * - 화면에 표시되는 카드 제목
 *
 * image
 * - 카드 배경 이미지
 *
 * items
 * - 카드 클릭 후 표시되는 CORE / COIL 등의 상세 데이터
 */
export type ProductCard = {
    id: string;
    title: LocalizedText;
    image: string;
    items: ProductItem[];
};


/* =========================================================
   3. QUICK LINKS
   ========================================================= */

/**
 * 메인 화면의 어플리케이션 바로가기 항목
 *
 * 예)
 *
 * MTS
 * MAPPS
 * 통합정보시스템
 * EPR
 * EPO
 * UID
 * ASSIST4
 * genAI
 * Tableau
 *
 *
 * text
 * - 바로가기 이름
 *
 * url
 * - 이동할 URL
 * - 아직 연결할 URL이 없는 경우 생략 가능
 *
 * icon
 * - 화면에 표시할 아이콘 이미지 URL
 */
export type QuickLink = {
    text: LocalizedText;
    url?: string;
    icon: string;
};


/* =========================================================
   4. DEPARTMENT CHANNEL
   ========================================================= */

/**
 * 부문 채널 버튼 데이터
 *
 * text
 * - 화면에 표시할 부문명
 *
 * url
 * - 이동할 SharePoint 또는 외부 페이지 URL
 *
 * disabled
 * - true인 경우 버튼 비활성화
 * - 아직 연결할 페이지가 없는 메뉴 등에 사용
 */
export type DepartmentLink = {
    text: LocalizedText;
    url?: string;
    disabled?: boolean;
};


/**
 * 부문 채널 전체 목록 타입
 *
 * 언어별 배열을 별도로 만들지 않고,
 * DepartmentLink 내부의 LocalizedText를 이용하여
 * 한 개의 배열에서 한국어 / 영어 / 일본어를 관리한다.
 */
export type DepartmentLinkSet =
    DepartmentLink[];