import { QuickLink } from '../models/types';


/**
 * =========================================================
 * TDK Korea Portal - Application Quick Links
 * =========================================================
 *
 * 메인 포털의 '어플리케이션' 영역에 표시되는
 * 사내 / 외부 시스템 바로가기 목록을 관리한다.
 *
 *
 * [유지보수 방법]
 *
 * 새로운 어플리케이션 추가
 * ---------------------------------------------------------
 *
 * QUICK_LINKS 배열에 아래 구조를 추가한다.
 *
 * {
 *     text: {
 *         ko: '한국어명',
 *         en: 'English Name',
 *         ja: '日本語名'
 *     },
 *     url: '시스템 URL',
 *     icon: '아이콘 이미지 URL'
 * }
 *
 *
 * 어플리케이션 삭제
 * ---------------------------------------------------------
 *
 * QUICK_LINKS 배열에서 해당 항목을 삭제한다.
 *
 *
 * 표시 순서 변경
 * ---------------------------------------------------------
 *
 * QUICK_LINKS 배열의 순서를 변경한다.
 *
 *
 * [작성 규칙]
 *
 * 1. text
 *    - 반드시 ko / en / ja 3개 언어를 작성한다.
 *
 * 2. url
 *    - 실제 이동할 시스템 URL을 입력한다.
 *
 * 3. icon
 *    - Application 카드에 표시할 아이콘 URL을 입력한다.
 *
 * 4. URL과 이미지 주소는 Markdown 형식이 아닌
 *    일반 문자열 URL로 작성한다.
 *
 * 잘못된 예)
 *
 * '[https://example.com](https://example.com)'
 *
 * 올바른 예)
 *
 * 'https://example.com'
 */


/* =========================================================
   Application Quick Links
   ========================================================= */

export const QUICK_LINKS: QuickLink[] = [

    /* =====================================================
       MTS
       ===================================================== */
    {
        text: {
            ko: 'MTS',
            en: 'MTS',
            ja: 'MTS'
        },

        url:
            'http://10.22.1.227/MTS2/login.aspx',

        icon:
            'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/MTS.png'
    },


    /* =====================================================
       MAPPS
       ===================================================== */
    {
        text: {
            ko: 'MAPPS',
            en: 'MAPPS',
            ja: 'MAPPS'
        },

        url:
            'http://wavesv151.jp.intdk/MAPPSTQTTKR/login.aspx?isAnother=1#/MAPPSTQTTKR/Setting/userManage.aspx',

        icon:
            'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/MAPPS.png'
    },


    /* =====================================================
       통합정보시스템
       ===================================================== */
    {
        text: {
            ko: '통합정보시스템',
            en: 'Integrated Information System',
            ja: '統合情報システム'
        },

        url:
            'http://kstas01.tdk.biz/',

        icon:
            'https://tdkgroup.sharepoint.com/:i:/r/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/river_icon.png?csf=1&web=1&e=TjuzCe'
    },


    /* =====================================================
       EPR
       ===================================================== */
    {
        text: {
            ko: 'EPR',
            en: 'EPR',
            ja: 'EPR'
        },

        url:
            'http://imtdk.tdk.biz/imart/login',

        icon:
            'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/epr.ico.png'
    },


    /* =====================================================
       EPO
       ===================================================== */
    {
        text: {
            ko: 'EPO',
            en: 'EPO',
            ja: 'EPO'
        },

        url:
            'https://supplier.tdk.com.cn:8280/epo/admin/viewuser.do',

        icon:
            'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/epo.png'
    },


    /* =====================================================
       UID
       ===================================================== */
    {
        text: {
            ko: 'UID',
            en: 'UID',
            ja: 'UID'
        },

        url:
            'http://10.22.1.225/',

        icon:
            'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/UID.png'
    },


    /* =====================================================
       ASSIST4
       ===================================================== */
    {
        text: {
            ko: 'ASSIST4',
            en: 'ASSIST4',
            ja: 'ASSIST4'
        },

        url:
            'http://as4txm.tdk.biz/Citrix/Assist4Web/',

        icon:
            'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/ASSIST4.png'
    },


    /* =====================================================
       genAI
       ===================================================== */
    {
        text: {
            ko: 'genAI',
            en: 'genAI',
            ja: 'genAI'
        },

        url:
            'https://aichat.tdk.com/login',

        icon:
            'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/gen.png'
    },


    /* =====================================================
       내부샘플신청서
       ===================================================== */
    {
        text: {
            ko: '내부샘플신청서',
            en: 'Internal Sample Request Form',
            ja: '内部サンプル申請書'
        },

        url:
            'https://apps.powerapps.com/play/e/default-7e452255-946f-4f17-800a-a0fb6835dc6c/a/87cfed7a-7eba-4c84-80c3-32b57dcb5658?tenantId=7e452255-946f-4f17-800a-a0fb6835dc6c&hint=4fa1ff96-e642-4042-ab79-5bf6e74b460c&sourcetime=1783042509852',

        icon:
            'https://tdkgroup.sharepoint.com/:i:/r/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/%EB%82%B4%EB%B6%80%EC%83%98%ED%94%8C%EC%8B%A0%EC%B2%AD%EC%84%9C%EB%A1%9C%EA%B3%A0.png?csf=1&web=1&e=Z84igN'
    }
];