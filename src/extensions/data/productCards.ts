import { ProductCard } from '../models/types';
import {
    ACT_LOGGINGN_URL,
    ACT_PEIS_URL,
    ACT_PRODUCTION_PERFORMACE_URL,
    ADL_PRODUCTION_PERFORMACE_URL,
    COIL_ORDER_INFORMATION_URL,
    CORE_ORDER_INFORMATION_URL,
    CORE_PRODUCTION_PERFORMANCE_URL,
    TABLEAU_URL,
    VLSCX_PRODUCTION_PERFORMACE_URL,
    VLSEX_PRODUCTION_PERFORMACE_URL
} from './constants';

const FERRITE_IMAGE = 'https://product.tdk.com/system/files/dam/img/product/ferrite/ferrite/ferrite-core/100012_100002_elt_pqi_eir_ei_pi0101.png';
const ACT_IMAGE = 'https://www.tdk.com/system/files/ACT45.png';
const ADL_IMAGE = 'https://www.tdk.com/system/files/ADL2012.png';
const VLS_EX_IMAGE = 'https://www.tdk.com/system/files/VLS-EX%28Consumer%29.png';
const VLS_CX_IMAGE = 'https://www.tdk.com/system/files/VLS-CX_.png';
const PID_IMAGE = 'https://tdkgroup.sharepoint.com/:i:/r/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/PID120%20Product.png?csf=1&web=1&e=Zrebkf';

const PREPARING_LINK = [
    { text: { ko: '준비중입니다', en: 'Preparing', ja: '準備中です' }, url: TABLEAU_URL }
];

export const PRODUCT_CARDS: ProductCard[] = [
    {
        id: 'production',
        title: { ko: '생산', en: 'Production', ja: '生産' },
        image: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/%EC%83%9D%EC%82%B03.png?csf=1&web=1&e=pSWX01',
        items: [
            {
                title: { ko: 'CORE', en: 'CORE', ja: 'CORE' },
                groups: [
                    {
                        title: { ko: 'Ferrite', en: 'Ferrite', ja: 'Ferrite' },
                        image: FERRITE_IMAGE,
                        links: [
                            { text: { ko: '실적', en: 'Performance', ja: '実績' }, url: CORE_PRODUCTION_PERFORMANCE_URL },
                            { text: { ko: '수율 추이', en: 'Yield Trend', ja: '歩留推移' }, url: TABLEAU_URL },
                            { text: { ko: '스크랩 비용', en: 'Scrap Cost', ja: 'スクラップコスト' }, url: TABLEAU_URL }
                        ]
                    }
                ]
            },
            {
                title: { ko: 'COIL', en: 'COIL', ja: 'COIL' },
                groups: [
                    {
                        title: { ko: 'ACT', en: 'ACT', ja: 'ACT' },
                        image: ACT_IMAGE,
                        links: [
                            {
                                text: { ko: '제품품질', en: 'Product Quality', ja: '製品品質' },
                                url: TABLEAU_URL,
                                children: [
                                    {
                                        text: { ko: '로깅시스템', en: 'Logging System', ja: 'ロギングシステム' },
                                        url: TABLEAU_URL,
                                        children: [
                                            { text: { ko: '단자장착', en: 'Terminal Mounting', ja: '端子装着' }, url: TABLEAU_URL },
                                            { text: { ko: '권선', en: 'Winding', ja: '巻線' }, url: TABLEAU_URL },
                                            { text: { ko: '피막박리', en: 'Coating Removal', ja: '被膜剥離' }, url: TABLEAU_URL },
                                            { text: { ko: '접합', en: 'Joining', ja: '接合' }, url: TABLEAU_URL },
                                            { text: { ko: 'SP접착', en: 'SP Bonding', ja: 'SP接着' }, url: TABLEAU_URL },
                                            { text: { ko: '마킹', en: 'Marking', ja: 'マーキング' }, url: TABLEAU_URL },
                                            { text: { ko: '6면AOI', en: '6-side AOI', ja: '6面AOI' }, url: TABLEAU_URL },
                                            { text: { ko: '전기적특성_로깅', en: 'Electrical Characteristics Logging', ja: '電気的特性_ロギング' }, url: TABLEAU_URL }
                                        ]
                                    },
                                    {
                                        text: { ko: 'PEIS', en: 'PEIS', ja: 'PEIS' },
                                        url: TABLEAU_URL,
                                        children: [
                                            { text: { ko: 'Daily', en: 'Daily', ja: 'Daily' }, url: TABLEAU_URL },
                                            { text: { ko: 'Monthly', en: 'Monthly', ja: 'Monthly' }, url: TABLEAU_URL }
                                        ]
                                    }
                                ]
                            },
                            { text: { ko: '실적', en: 'Performance', ja: '実績' }, url: ACT_PRODUCTION_PERFORMACE_URL },
                            { text: { ko: '수율 추이', en: 'Yield Trend', ja: '歩留推移' }, url: TABLEAU_URL },
                            { text: { ko: '스크랩 비용', en: 'Scrap Cost', ja: 'スクラップコスト' }, url: TABLEAU_URL }
                        ]
                    },
                    {
                        title: { ko: 'ADL', en: 'ADL', ja: 'ADL' },
                        image: ADL_IMAGE,
                        links: [
                            { text: { ko: '실적', en: 'Performance', ja: '実績' }, url: ADL_PRODUCTION_PERFORMACE_URL },
                            { text: { ko: '수율 추이', en: 'Yield Trend', ja: '歩留推移' }, url: TABLEAU_URL },
                            { text: { ko: '스크랩 비용', en: 'Scrap Cost', ja: 'スクラップコスト' }, url: TABLEAU_URL }
                        ]
                    },
                    {
                        title: { ko: 'VLS-EX', en: 'VLS-EX', ja: 'VLS-EX' },
                        image: VLS_EX_IMAGE,
                        links: [
                            { text: { ko: '실적', en: 'Performance', ja: '実績' }, url: VLSEX_PRODUCTION_PERFORMACE_URL },
                            { text: { ko: '수율 추이', en: 'Yield Trend', ja: '歩留推移' }, url: TABLEAU_URL }
                        ]
                    },
                    {
                        title: { ko: 'VLS-CX', en: 'VLS-CX', ja: 'VLS-CX' },
                        image: VLS_CX_IMAGE,
                        links: [
                            { text: { ko: '실적', en: 'Performance', ja: '実績' }, url: VLSCX_PRODUCTION_PERFORMACE_URL }
                        ]
                    },
                    {
                        title: { ko: 'PID', en: 'PID', ja: 'PID' },
                        image: PID_IMAGE,
                        links: [
                            { text: { ko: '실적', en: 'Performance', ja: '実績' }, url: TABLEAU_URL },
                            { text: { ko: '수율 추이', en: 'Yield Trend', ja: '歩留推移' }, url: TABLEAU_URL },
                            { text: { ko: '스크랩 비용', en: 'Scrap Cost', ja: 'スクラップコスト' }, url: TABLEAU_URL }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'facility',
        title: { ko: '설비', en: 'Facility', ja: '設備' },
        image: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/SitePages/TABEALU_CARD_IMAGE/%EC%84%A4%EB%B9%841.png?csf=1&web=1&e=JVeaeU',
        items: [
            {
                title: { ko: 'CORE', en: 'CORE', ja: 'CORE' },
                groups: [
                    {
                        title: { ko: 'Ferrite', en: 'Ferrite', ja: 'Ferrite' },
                        image: FERRITE_IMAGE,
                        links: [
                            { text: { ko: 'SCADA', en: 'SCADA', ja: 'SCADA' }, url: TABLEAU_URL },
                            { text: { ko: '수리 보고서', en: 'Repair Report', ja: '修理報告書' }, url: TABLEAU_URL },
                            { text: { ko: '소모품 관리', en: 'Consumables Management', ja: '消耗品管理' }, url: TABLEAU_URL }
                        ]
                    }
                ]
            },
            {
                title: { ko: 'COIL', en: 'COIL', ja: 'COIL' },
                groups: [
                    {
                        title: { ko: 'ACT', en: 'ACT', ja: 'ACT' },
                        image: ACT_IMAGE,
                        links: [
                            { text: { ko: 'PEIS', en: 'PEIS', ja: 'PEIS' }, url: ACT_PEIS_URL },
                            { text: { ko: '로깅시스템', en: 'LOGGING SYSTEM', ja: 'LOGGING SYSTEM' }, url: ACT_LOGGINGN_URL },
                            { text: { ko: '수리 보고서', en: 'Repair Report', ja: '修理報告書' }, url: TABLEAU_URL },
                            { text: { ko: '소모품 관리', en: 'Consumables Management', ja: '消耗品管理' }, url: TABLEAU_URL }
                        ]
                    },
                    { title: { ko: 'ADL', en: 'ADL', ja: 'ADL' }, image: ADL_IMAGE, links: PREPARING_LINK },
                    { title: { ko: 'VLS-EX', en: 'VLS-EX', ja: 'VLS-EX' }, image: VLS_EX_IMAGE, links: PREPARING_LINK },
                    { title: { ko: 'VLS-CX', en: 'VLS-CX', ja: 'VLS-CX' }, image: VLS_CX_IMAGE, links: PREPARING_LINK },
                    { title: { ko: 'PID', en: 'PID', ja: 'PID' }, image: PID_IMAGE, links: [] }
                ]
            }
        ]
    },
    {
        id: 'quality',
        title: { ko: '품질', en: 'Quality', ja: '品質' },
        image: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/%ED%92%88%EC%A7%882.png?csf=1&web=1&e=GQuh9c',
        items: [
            {
                title: { ko: 'CORE', en: 'CORE', ja: 'CORE' },
                groups: [
                    {
                        title: { ko: 'Ferrite', en: 'Ferrite', ja: 'Ferrite' },
                        image: FERRITE_IMAGE,
                        links: [
                            { text: { ko: '품질 정보', en: 'Quality Information', ja: '品質情報' }, url: TABLEAU_URL }
                        ]
                    }
                ]
            },
            {
                title: { ko: 'COIL', en: 'COIL', ja: 'COIL' },
                groups: [
                    { title: { ko: 'ACT', en: 'ACT', ja: 'ACT' }, image: ACT_IMAGE, links: [{ text: { ko: '품질 정보', en: 'Quality Information', ja: '品質情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'ADL', en: 'ADL', ja: 'ADL' }, image: ADL_IMAGE, links: [{ text: { ko: '품질 정보', en: 'Quality Information', ja: '品質情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'VLS-EX', en: 'VLS-EX', ja: 'VLS-EX' }, image: VLS_EX_IMAGE, links: [{ text: { ko: '품질 정보', en: 'Quality Information', ja: '品質情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'VLS-CX', en: 'VLS-CX', ja: 'VLS-CX' }, image: VLS_CX_IMAGE, links: [{ text: { ko: '품질 정보', en: 'Quality Information', ja: '品質情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'PID', en: 'PID', ja: 'PID' }, image: PID_IMAGE, links: [{ text: { ko: '품질 정보', en: 'Quality Information', ja: '品質情報' }, url: TABLEAU_URL }] }
                ]
            }
        ]
    },
    {
        id: 'order',
        title: { ko: '수주', en: 'Order', ja: '受注' },
        image: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/%EC%88%98%EC%A3%BC10.png?csf=1&web=1&e=FrBw91',
        items: [
            {
                title: { ko: 'CORE', en: 'CORE', ja: 'CORE' },
                groups: [
                    {
                        title: { ko: 'Ferrite', en: 'Ferrite', ja: 'Ferrite' },
                        image: FERRITE_IMAGE,
                        links: [
                            { text: { ko: '주문 정보', en: 'Order Information', ja: '注文情報' }, url: CORE_ORDER_INFORMATION_URL },
                            { text: { ko: '출하 정보', en: 'Shipment Information', ja: '出荷情報' }, url: TABLEAU_URL },
                            { text: { ko: '판매 정보', en: 'Sales Information', ja: '販売情報' }, url: TABLEAU_URL },
                            { text: { ko: '수주 잔량 정보', en: 'Backlog Information', ja: '注残情報' }, url: TABLEAU_URL },
                            { text: { ko: '고객 정보', en: 'Customer Information', ja: '顧客情報' }, url: TABLEAU_URL }
                        ]
                    }
                ]
            },
            {
                title: { ko: 'COIL', en: 'COIL', ja: 'COIL' },
                groups: [
                    {
                        title: { ko: 'ACT', en: 'ACT', ja: 'ACT' },
                        image: ACT_IMAGE,
                        links: [
                            { text: { ko: '주문 정보', en: 'Order Information', ja: '注文情報' }, url: COIL_ORDER_INFORMATION_URL },
                            { text: { ko: '출하 정보', en: 'Shipment Information', ja: '出荷情報' }, url: TABLEAU_URL },
                            { text: { ko: '판매 정보', en: 'Sales Information', ja: '販売情報' }, url: TABLEAU_URL }
                        ]
                    },
                    {
                        title: { ko: 'ADL', en: 'ADL', ja: 'ADL' },
                        image: ADL_IMAGE,
                        links: [
                            { text: { ko: '주문 정보', en: 'Order Information', ja: '注文情報' }, url: COIL_ORDER_INFORMATION_URL },
                            { text: { ko: '수주 잔량 정보', en: 'Backlog Information', ja: '注残情報' }, url: TABLEAU_URL },
                            { text: { ko: '고객 정보', en: 'Customer Information', ja: '顧客情報' }, url: TABLEAU_URL }
                        ]
                    },
                    {
                        title: { ko: 'VLS-EX', en: 'VLS-EX', ja: 'VLS-EX' },
                        image: VLS_EX_IMAGE,
                        links: [
                            { text: { ko: '주문 정보', en: 'Order Information', ja: '注文情報' }, url: COIL_ORDER_INFORMATION_URL }
                        ]
                    },
                    {
                        title: { ko: 'VLS-CX', en: 'VLS-CX', ja: 'VLS-CX' },
                        image: VLS_CX_IMAGE,
                        links: [
                            { text: { ko: '주문 정보', en: 'Order Information', ja: '注文情報' }, url: COIL_ORDER_INFORMATION_URL }
                        ]
                    },
                    {
                        title: { ko: 'PID', en: 'PID', ja: 'PID' },
                        image: PID_IMAGE,
                        links: []
                    }
                ]
            }
        ]
    },
    {
        id: 'profit',
        title: { ko: '손익', en: 'Profit', ja: '損益' },
        image: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/%EC%86%90%EC%9D%B53.png?csf=1&web=1&e=N1FQ6s',
        items: [
            {
                title: { ko: 'CORE', en: 'CORE', ja: 'CORE' },
                groups: [
                    {
                        title: { ko: 'Ferrite', en: 'Ferrite', ja: 'Ferrite' },
                        image: FERRITE_IMAGE,
                        links: [
                            { text: { ko: '손익 정보', en: 'Profit and Loss Information', ja: '損益情報' }, url: TABLEAU_URL }
                        ]
                    }
                ]
            },
            {
                title: { ko: 'COIL', en: 'COIL', ja: 'COIL' },
                groups: [
                    { title: { ko: 'ACT', en: 'ACT', ja: 'ACT' }, image: ACT_IMAGE, links: [{ text: { ko: '손익 정보', en: 'Profit and Loss Information', ja: '損益情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'ADL', en: 'ADL', ja: 'ADL' }, image: ADL_IMAGE, links: [{ text: { ko: '손익 정보', en: 'Profit and Loss Information', ja: '損益情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'VLS-EX', en: 'VLS-EX', ja: 'VLS-EX' }, image: VLS_EX_IMAGE, links: [{ text: { ko: '손익 정보', en: 'Profit and Loss Information', ja: '損益情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'VLS-CX', en: 'VLS-CX', ja: 'VLS-CX' }, image: VLS_CX_IMAGE, links: [{ text: { ko: '손익 정보', en: 'Profit and Loss Information', ja: '損益情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'PID', en: 'PID', ja: 'PID' }, image: PID_IMAGE, links: [{ text: { ko: '손익 정보', en: 'Profit and Loss Information', ja: '損益情報' }, url: TABLEAU_URL }] }
                ]
            }
        ]
    }
];