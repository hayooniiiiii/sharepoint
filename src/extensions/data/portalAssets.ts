/**
 * =========================================================
 * 포털 화면 이미지 자원
 * =========================================================
 *
 * 메인 배너, 공지 팝업 등
 * 화면에 표시되는 이미지 URL을 관리한다.
 *
 *
 * [역할]
 *
 * BANNER_URLS
 * → 메인 Hero Banner 이미지
 *
 * NOTICE_POPUP_IMAGE_URL
 * → MX 공지 팝업 Poster 이미지
 *
 *
 * 이미지 변경 시
 * components/heroBanner.ts 또는 noticePopup.ts가 아니라
 * 이 파일의 URL만 수정한다.
 */


/* =========================================================
   1. 메인 배너
   ========================================================= */

/**
 * 메인 Hero Banner 이미지 목록
 *
 * 배열 순서대로 Banner가 표시된다.
 *
 * 첫 번째 이미지
 * → 최초 화면에 표시
 *
 * 이후 이미지는
 * TdkSharepointApplicationCustomizer.ts에서
 * 자동 슬라이드로 순환한다.
 */
export const BANNER_URLS: string[] = [

    'https://tdkgroup.sharepoint.com/:i:/r/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/banner6.png?csf=1&web=1&e=x2f4DQ',

    'https://tdkgroup.sharepoint.com/:i:/r/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/BANNER12.png?csf=1&web=1&e=ocpJ9M'

];


/* =========================================================
   2. 공지 팝업
   ========================================================= */

/**
 * 메인 화면 진입 시 표시되는
 * MX Poster 이미지
 */
export const NOTICE_POPUP_IMAGE_URL: string =
    'https://tdkgroup.sharepoint.com/:i:/r/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/Banner/MX_poster_Korean_page-0001.jpg?csf=1&web=1&e=DsZc6T';