import { ProductCard } from '../models/types';
import {
    ACT_PRODUCTION_PERFORMACE_URL,
    ADL_PRODUCTION_PERFORMACE_URL,
    CORE_PRODUCTION_PERFORMANCE_URL,
    CORE_WIP_IN_DR_GRINDING_URL,
    COIL_ORDER_INFORMATION_URL,
    TABLEAU_URL,
    VLSCX_PRODUCTION_PERFORMACE_URL,
    VLSEX_PRODUCTION_PERFORMACE_URL,
    TQT_CORE_RESULT_URL,
    TANSI_URL,
    MAKISEN_URL,
    TAPING_URL,
    ALIGNMENT_URL,
    HAKURI_URL,
    PEIS_MONTHLY_URL,
    PEIS_DAILY_URL,
    POWER_SCADA_URL,
    DistributionPanel_SCADA_URL,
    Utility_SCADA_URL,
    PRESSING_SCADA_URL,
    SINTERING_SCADA_URL,
    DR_SCADA_URL,
    DL_ILLUM_FOCUS_AUTO_MONITOR_TOOL,
    DL_DEFECT_MODE_AUTO_CLASSIFY_TOOL,
    ADL_CO_RO_FI_URL, ACT_CO_RO_FI_URL, VLSCX_CO_RO_FI_URL, VLSEX_CO_RO_FI_URL, AOI_OK_URL, AOI_NG_URL
} from './constants';

const FERRITE_IMAGE = 'https://tdkgroup.sharepoint.com/:i:/r/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/Ferrite%20Core.png?csf=1&web=1&e=cFTbz0';
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
                            { text: { ko: '실적&nbsp;&nbsp;Production Results', en: 'Production Results', ja: '実績' }, url: CORE_PRODUCTION_PERFORMANCE_URL },
                            { text: { ko: '코아제조부 공정현황&nbsp;&nbsp;WIP in the Ferrite Manufacturing Process', en: 'WIP in the Ferrite Manufacturing Process', ja: 'DRプロセス投入前の在庫状況' }, url: CORE_WIP_IN_DR_GRINDING_URL },
                            { text: { ko: '수율 추이&nbsp;&nbsp;Yield Trend', en: 'Yield Trend', ja: '歩留推移' }, url: TABLEAU_URL },
                            { text: { ko: '스크랩 비용&nbsp;&nbsp;Scrap Cost', en: 'Scrap Cost', ja: 'スクラップコスト' }, url: TABLEAU_URL }
                        ]
                    }
                ]
            },
            {
                title: { ko: 'COIL', en: 'COIL', ja: 'COIL' },
                groups: [
                    {
                        title: { ko: 'ACT45', en: 'ACT45', ja: 'ACT45' },
                        image: ACT_IMAGE,
                        links: [
                            { text: { ko: '실적&nbsp;&nbsp;Production Results', en: 'Production Results', ja: '実績' }, url: ACT_PRODUCTION_PERFORMACE_URL },
                            { text: { ko: '수율 추이&nbsp;&nbsp;Yield Trend', en: 'Yield Trend', ja: '歩留推移' }, url: TABLEAU_URL },
                            { text: { ko: '스크랩 비용&nbsp;&nbsp;Scrap Cost', en: 'Scrap Cost', ja: 'スクラップコスト' }, url: TABLEAU_URL }
                        ]
                    },
                    {
                        title: { ko: 'ADL2012', en: 'ADL2012', ja: 'ADL2012' },
                        image: ADL_IMAGE,
                        links: [
                            { text: { ko: '실적&nbsp;&nbsp;Production Results', en: 'Production Results', ja: '実績' }, url: ADL_PRODUCTION_PERFORMACE_URL },
                            { text: { ko: '수율 추이&nbsp;&nbsp;Yield Trend', en: 'Yield Trend', ja: '歩留推移' }, url: TABLEAU_URL },
                            { text: { ko: '스크랩 비용&nbsp;&nbsp;Scrap Cost', en: 'Scrap Cost', ja: 'スクラップコスト' }, url: TABLEAU_URL }
                        ]
                    },
                    {
                        title: { ko: 'VLS-EX', en: 'VLS-EX', ja: 'VLS-EX' },
                        image: VLS_EX_IMAGE,
                        links: [
                            { text: { ko: '실적&nbsp;&nbsp;Production Results', en: 'Production Results', ja: '実績' }, url: VLSEX_PRODUCTION_PERFORMACE_URL },
                            { text: { ko: '수율 추이&nbsp;&nbsp;Yield Trend', en: 'Yield Trend', ja: '歩留推移' }, url: TABLEAU_URL }
                        ]
                    },
                    {
                        title: { ko: 'VLS-CX', en: 'VLS-CX', ja: 'VLS-CX' },
                        image: VLS_CX_IMAGE,
                        links: [
                            { text: { ko: '실적&nbsp;&nbsp;Production Results', en: 'Production Results', ja: '実績' }, url: VLSCX_PRODUCTION_PERFORMACE_URL }
                        ]
                    },
                    {
                        title: { ko: 'PID', en: 'PID', ja: 'PID' },
                        image: PID_IMAGE,
                        links: [
                            { text: { ko: '실적&nbsp;&nbsp;Production Results', en: 'Production Results', ja: '実績' }, url: TABLEAU_URL },
                            { text: { ko: '수율 추이&nbsp;&nbsp;Yield Trend', en: 'Yield Trend', ja: '歩留推移' }, url: TABLEAU_URL },
                            { text: { ko: '스크랩 비용&nbsp;&nbsp;Scrap Cost', en: 'Scrap Cost', ja: 'スクラップコスト' }, url: TABLEAU_URL }
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
                            {
                                text: { ko: 'SCADA', en: 'SCADA', ja: 'SCADA' },
                                children: [
                                    { text: { ko: '성형&nbsp;&nbsp;Molding', en: 'Molding', ja: '成形' }, url: PRESSING_SCADA_URL },
                                    { text: { ko: 'DR Grinding', en: 'DR Grinding', ja: 'DR Grinding' }, url: DR_SCADA_URL },
                                    { text: { ko: '소성&nbsp;&nbsp;Sintering', en: 'Sintering', ja: '焼成' }, url: SINTERING_SCADA_URL }
                                ]
                            },
                            { text: { ko: '수리 보고서&nbsp;&nbsp;Repair Report', en: 'Repair Report', ja: '修理報告書' }, url: TABLEAU_URL },
                            { text: { ko: '소모품 관리&nbsp;&nbsp;Consumables Management', en: 'Consumables Management', ja: '消耗品管理' }, url: TABLEAU_URL }
                        ]
                    }
                ]
            },
            {
                title: { ko: 'COIL', en: 'COIL', ja: 'COIL' },
                groups: [
                    {
                        title: { ko: 'ACT45', en: 'ACT45', ja: 'ACT45' },
                        image: ACT_IMAGE,
                        links: [
                            {
                                text: { ko: '로깅시스템&nbsp;&nbsp;Logging System', en: 'Logging System', ja: 'ロギングシステム' },
                                children: [
                                    { text: { ko: '단자장착&nbsp;&nbsp;Terminal Fitting', en: 'Terminal Fitting', ja: '端子装着' }, url: TANSI_URL },
                                    { text: { ko: '권선&nbsp;&nbsp;Winding', en: 'Winding', ja: '巻線' }, url: MAKISEN_URL },
                                    { text: { ko: '피막박리&nbsp;&nbsp;Wire Stripping', en: 'Wire Stripping', ja: '被膜剥離' }, url: HAKURI_URL },
                                    { text: { ko: '접합&nbsp;&nbsp;Welding', en: 'Welding', ja: '接合' }, url: ALIGNMENT_URL },
                                    { text: { ko: '전기적특성&nbsp;&nbsp;Electrical Characteristics', en: 'Electrical Characteristics', ja: '電気的特性_ロギング' }, url: TAPING_URL }
                                ]
                            },
                            {
                                text: { ko: 'PEIS', en: 'PEIS', ja: 'PEIS' },
                                children: [
                                    { text: { ko: 'Daily', en: 'Daily', ja: 'Daily' }, url: PEIS_DAILY_URL },
                                    { text: { ko: 'Monthly', en: 'Monthly', ja: 'Monthly' }, url: PEIS_MONTHLY_URL }
                                ]
                            },
                            {
                                text: { ko: '딥러닝 AOI 결과&nbsp;&nbsp;Deep Learning AOI Result', en: 'Deep Learning AOI Result', ja: 'ディープラーニングAOIの結果' },
                                children: [
                                    { text: { ko: 'OK', en: 'OK', ja: 'OK' }, url: AOI_OK_URL },
                                    { text: { ko: 'NG', en: 'NG', ja: 'NG' }, url: AOI_NG_URL }
                                ]
                            },
                            { text: { ko: '수리 보고서&nbsp;&nbsp;Repair Report', en: 'Repair Report', ja: '修理報告書' }, url: TABLEAU_URL },
                            { text: { ko: '소모품 관리&nbsp;&nbsp;Consumables Management', en: 'Consumables Management', ja: '消耗品管理' }, url: TABLEAU_URL }
                        ]
                    },
                    { title: { ko: 'ADL2012', en: 'ADL2012', ja: 'ADL2012' }, image: ADL_IMAGE, links: PREPARING_LINK },
                    { title: { ko: 'VLS-EX', en: 'VLS-EX', ja: 'VLS-EX' }, image: VLS_EX_IMAGE, links: PREPARING_LINK },
                    { title: { ko: 'VLS-CX', en: 'VLS-CX', ja: 'VLS-CX' }, image: VLS_CX_IMAGE, links: PREPARING_LINK },
                    { title: { ko: 'PID', en: 'PID', ja: 'PID' }, image: PID_IMAGE, links: PREPARING_LINK }
                ]
            }
        ]
    },
    {
        id: 'quality',
        title: { ko: '품질', en: 'Quality', ja: '品質' },
        image: 'https://tdkgroup.sharepoint.com/:i:/r/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/%ED%92%88%EC%A7%884.png?csf=1&web=1&e=0rCLJ0',
        items: [
            {
                title: { ko: 'CORE', en: 'CORE', ja: 'CORE' },
                groups: [
                    {
                        title: { ko: 'Ferrite', en: 'Ferrite', ja: 'Ferrite' },
                        image: FERRITE_IMAGE,
                        links: [
                            { text: { ko: '코어선별실적(TQT)&nbsp;&nbsp;Ferrite Core Sorting Results(TQT)', en: 'Ferrite Core Sorting Results(TQT)', ja: 'コア選別実績(TQT)' }, url: TQT_CORE_RESULT_URL }
                        ]
                    }
                ]
            },
            {
                title: { ko: 'COIL', en: 'COIL', ja: 'COIL' },
                groups: [
                    { title: { ko: 'ACT45', en: 'ACT45', ja: 'ACT45' }, image: ACT_IMAGE, links: [
                            { text: { ko: 'D/L조도・핀트 자동감시툴 <br> Automatic Illumination & Focus Monitoring Tool for D/L', en: 'Automatic Illumination & Focus Monitoring Tool for D/L', ja: 'D/L照度・ピント自動監視ツール' }, url: DL_ILLUM_FOCUS_AUTO_MONITOR_TOOL },
                            { text: { ko: 'D/L불량모드 자동분류툴 <br> Automatic Defect Mode Classification tool for D/L', en: 'Automatic Defect Mode Classification tool for D/L', ja: 'D/L不良モード自動分類ツール' }, url: DL_DEFECT_MODE_AUTO_CLASSIFY_TOOL },
                            { text: { ko: '품질 정보&nbsp;&nbsp;Quality Information', en: 'Quality Information', ja: '品質情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'ADL2012', en: 'ADL2012', ja: 'ADL2012' }, image: ADL_IMAGE, links: [{ text: { ko: '품질 정보&nbsp;&nbsp;Quality Information', en: 'Quality Information', ja: '品質情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'VLS-EX', en: 'VLS-EX', ja: 'VLS-EX' }, image: VLS_EX_IMAGE, links: [{ text: { ko: '품질 정보&nbsp;&nbsp;Quality Information', en: 'Quality Information', ja: '品質情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'VLS-CX', en: 'VLS-CX', ja: 'VLS-CX' }, image: VLS_CX_IMAGE, links: [{ text: { ko: '품질 정보&nbsp;&nbsp;Quality Information', en: 'Quality Information', ja: '品質情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'PID', en: 'PID', ja: 'PID' }, image: PID_IMAGE, links: [{ text: { ko: '품질 정보&nbsp;&nbsp;Quality Information', en: 'Quality Information', ja: '品質情報' }, url: TABLEAU_URL }] }
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
                            { text: { ko: '주문 정보&nbsp;&nbsp;PO Information', en: 'PO Information', ja: '注文情報' }, url: TABLEAU_URL },
                            { text: { ko: 'CO/RO/FI Information', en: 'CO/RO/FI Information', ja: 'CO/RO/FI Information' }, url: TABLEAU_URL }
                        ]
                    }
                ]
            },
            {
                title: { ko: 'COIL', en: 'COIL', ja: 'COIL' },
                groups: [
                    {
                        title: { ko: 'ACT45', en: 'ACT45', ja: 'ACT45' },
                        image: ACT_IMAGE,
                        links: [
                            { text: { ko: '주문 정보&nbsp;&nbsp;PO Information', en: 'PO Information', ja: '注文情報' }, url: COIL_ORDER_INFORMATION_URL },
                            { text: { ko: 'CO/RO/FI Information', en: 'CO/RO/FI Information', ja: 'CO/RO/FI Information' }, url: ACT_CO_RO_FI_URL }
                        ]
                    },
                    {
                        title: { ko: 'ADL2012', en: 'ADL2012', ja: 'ADL2012' },
                        image: ADL_IMAGE,
                        links: [
                            { text: { ko: '주문 정보&nbsp;&nbsp;PO Information', en: 'PO Information', ja: '注文情報' }, url: TABLEAU_URL },
                            { text: { ko: 'CO/RO/FI Information', en: 'CO/RO/FI Information', ja: 'CO/RO/FI Information' }, url: ADL_CO_RO_FI_URL }
                        ]
                    },
                    {
                        title: { ko: 'VLS-EX', en: 'VLS-EX', ja: 'VLS-EX' },
                        image: VLS_EX_IMAGE,
                        links: [
                            { text: { ko: '주문 정보&nbsp;&nbsp;PO Information', en: 'PO Information', ja: '注文情報' }, url: TABLEAU_URL },
                            { text: { ko: 'CO/RO/FI Information', en: 'CO/RO/FI Information', ja: 'CO/RO/FI Information' }, url: VLSEX_CO_RO_FI_URL }
                        ]
                    },
                    {
                        title: { ko: 'VLS-CX', en: 'VLS-CX', ja: 'VLS-CX' },
                        image: VLS_CX_IMAGE,
                        links: [
                            { text: { ko: '주문 정보&nbsp;&nbsp;PO Information', en: 'PO Information', ja: '注文情報' }, url: TABLEAU_URL},
                            { text: { ko: 'CO/RO/FI Information', en: 'CO/RO/FI Information', ja: 'CO/RO/FI Information' }, url: VLSCX_CO_RO_FI_URL }
                        ]
                    },
                    {
                        title: { ko: 'PID', en: 'PID', ja: 'PID' },
                        image: PID_IMAGE,
                        links: [ { text: { ko: '주문 정보&nbsp;&nbsp;PO Information', en: 'PO Information', ja: '注文情報' }, url: TABLEAU_URL},
                                 { text: { ko: 'CO/RO/FI Information', en: 'CO/RO/FI Information', ja: 'CO/RO/FI Information' }, url: TABLEAU_URL }]
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
                            { text: { ko: '손익 정보&nbsp;&nbsp;Profit & Loss', en: 'Profit & Loss', ja: '損益情報' }, url: TABLEAU_URL }
                        ]
                    }
                ]
            },
            {
                title: { ko: 'COIL', en: 'COIL', ja: 'COIL' },
                groups: [
                    { title: { ko: 'ACT45', en: 'ACT45', ja: 'ACT45' }, image: ACT_IMAGE, links: [{ text: { ko: '손익 정보&nbsp;&nbsp;Profit & Loss', en: 'Profit and Loss Information', ja: '損益情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'ADL2012', en: 'ADL2012', ja: 'ADL2012' }, image: ADL_IMAGE, links: [{ text: { ko: '손익 정보&nbsp;&nbsp;Profit & Loss', en: 'Profit and Loss Information', ja: '損益情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'VLS-EX', en: 'VLS-EX', ja: 'VLS-EX' }, image: VLS_EX_IMAGE, links: [{ text: { ko: '손익 정보&nbsp;&nbsp;Profit & Loss', en: 'Profit and Loss Information', ja: '損益情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'VLS-CX', en: 'VLS-CX', ja: 'VLS-CX' }, image: VLS_CX_IMAGE, links: [{ text: { ko: '손익 정보&nbsp;&nbsp;Profit & Loss', en: 'Profit and Loss Information', ja: '損益情報' }, url: TABLEAU_URL }] },
                    { title: { ko: 'PID', en: 'PID', ja: 'PID' }, image: PID_IMAGE, links: [{ text: { ko: '손익 정보&nbsp;&nbsp;Profit & Loss', en: 'Profit and Loss Information', ja: '損益情報' }, url: TABLEAU_URL }] }
                ]
            }
        ]
    },
    {
        id: 'facilities',
        title: { ko: '시설', en: 'Infrastructure', ja: '施設' },
        image: 'https://tdkgroup.sharepoint.com/:i:/r/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/%EC%8B%9C%EC%84%A4.png?csf=1&web=1&e=xQ1kIG',
        items: [
            {
                title: { ko: '시설', en: 'Facilities', ja: '設備' },
                groups: [
                    {
                        title: { ko: '전력&nbsp;&nbsp;Power Status', en: 'Power Status', ja: '電力' },
                        url: POWER_SCADA_URL
                    },
                    {
                        title: { ko: '배전반&nbsp;&nbsp;Switchboard', en: 'Switchboard', ja: '配電盤' },
                        url: DistributionPanel_SCADA_URL
                    },
                    {
                        title: { ko: '온습도관리시스템&nbsp;&nbsp;Temp & Humidity Control', en: 'Temp & Humidity Control', ja: '温湿度管理システム' },
                        url: Utility_SCADA_URL
                    }
                ]
            }
        ]
    }
];