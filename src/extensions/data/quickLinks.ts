import { QuickLink } from '../models/types';

/**
 * =========================
 * QUICK LINKS (바로가기)
 * =========================
 *
 * - 포털 하단 빠른 접근 메뉴
 * - 모든 text는 다국어(LocalisedText)로 관리
 * - 아이콘은 SharePoint Asset 사용
 *
 * 규칙:
 * 1. text는 절대 string 금지 → 반드시 { ko, en, ja }
 * 2. url은 내부망 / 외부망 구분 없이 그대로 사용
 * 3. 아이콘은 동일한 스타일 유지
 */

export const QUICK_LINKS: QuickLink[] = [
    {
        text: { ko: 'MTS', en: 'MTS', ja: 'MTS' },
        url: 'http://10.22.1.227/MTS2/login.aspx',
        icon: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/MTS.png'
    },

    {
        text: { ko: 'MAPPS', en: 'MAPPS', ja: 'MAPPS' },
        url: 'http://wavesv151.jp.intdk/MAPPSTQTTKR/login.aspx?isAnother=1#/MAPPSTQTTKR/Setting/userManage.aspx',
        icon: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/MAPPS.png'
    },

    {
        text: {
            ko: '통합정보시스템',
            en: 'Integrated Information System',
            ja: '統合情報システム'
        },
        url: 'http://kstas01.tdk.biz/',
        icon: 'https://tdkgroup.sharepoint.com/:i:/r/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/river_icon.png?csf=1&web=1&e=TjuzCe'
    },

    {
        text: { ko: 'EPR', en: 'EPR', ja: 'EPR' },
        url: 'http://imtdk.tdk.biz/imart/login',
        icon: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/epr.ico.png'
    },

    {
        text: { ko: 'EPO', en: 'EPO', ja: 'EPO' },
        url: 'https://supplier.tdk.com.cn:8280/epo/admin/viewuser.do',
        icon: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/epo.png'
    },

    {
        text: { ko: 'UID', en: 'UID', ja: 'UID' },
        url: 'http://10.22.1.225/',
        icon: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/UID.png'
    },

    {
        text: { ko: 'ASSIST4', en: 'ASSIST4', ja: 'ASSIST4' },
        url: 'http://as4txm.tdk.biz/Citrix/Assist4Web/',
        icon: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/ASSIST4.png'
    },

    {
        text: { ko: 'genAI', en: 'genAI', ja: 'genAI' },
        url: 'https://aichat.tdk.com/login',
        icon: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/gen.png'
    },

    {
        text: { ko: '내부샘플신청서', en: 'Internal Sample Request Form', ja: '内部サンプル申請書' },
        url: 'https://apps.powerapps.com/play/e/default-7e452255-946f-4f17-800a-a0fb6835dc6c/a/87cfed7a-7eba-4c84-80c3-32b57dcb5658?tenantId=7e452255-946f-4f17-800a-a0fb6835dc6c&hint=4fa1ff96-e642-4042-ab79-5bf6e74b460c&sourcetime=1783042509852',
        icon: 'https://tdkgroup.sharepoint.com/:i:/r/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/%EB%82%B4%EB%B6%80%EC%83%98%ED%94%8C%EC%8B%A0%EC%B2%AD%EC%84%9C%EB%A1%9C%EA%B3%A0.png?csf=1&web=1&e=Z84igN'
    }
];