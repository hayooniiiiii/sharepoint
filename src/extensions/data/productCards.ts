import {
    ProductCard,
    ProductLink
} from '../models/types';

import {
    /* 생산 */
    CORE_PRODUCTION_PERFORMANCE_URL,
    CORE_WIP_IN_DR_GRINDING_URL,
    ACT_PRODUCTION_PERFORMANCE_URL,
    ADL_PRODUCTION_PERFORMANCE_URL,
    VLSEX_PRODUCTION_PERFORMANCE_URL,
    VLSCX_PRODUCTION_PERFORMANCE_URL,

    /* 설비 - CORE SCADA */
    PRESSING_SCADA_URL,
    DR_SCADA_URL,
    SINTERING_SCADA_URL,

    /* 설비 - ACT45 Logging */
    TANSI_URL,
    MAKISEN_URL,
    HAKURI_URL,
    ALIGNMENT_URL,
    TAPING_URL,

    /* 설비 - PEIS */
    PEIS_DAILY_URL,
    PEIS_MONTHLY_URL,

    /* 설비 - AOI */
    ACT45_AOI_OK_URL,
    ACT45_AOI_NG_URL,

    /* 품질 */
    TQT_CORE_RESULT_URL,
    DL_ILLUM_FOCUS_AUTO_MONITOR_TOOL,
    DL_DEFECT_MODE_AUTO_CLASSIFY_TOOL,

    /* 수주 */
    COIL_ORDER_INFORMATION_URL,
    ACT_CO_RO_FI_URL,
    ADL_CO_RO_FI_URL,
    VLSEX_CO_RO_FI_URL,
    VLSCX_CO_RO_FI_URL,

    /* 손익 */
    CORE_PROFIT_URL,
    ACT45_PROFIT_URL,
    ADL2012_PROFIT_URL,
    VLSEX_PROFIT_URL,
    VLSCX_PROFIT_URL,
    PID_PROFIT_URL,

    /* 시설 */
    POWER_SCADA_URL,
    DISTRIBUTION_PANEL_SCADA_URL,
    UTILITY_SCADA_URL

} from './constants';


/**
 * =========================================================
 * 대시보드 카드 데이터
 * =========================================================
 *
 * 메인 화면에 표시되는 대시보드 카드와
 * 카드 클릭 후 나타나는 상세 메뉴 구조를 관리한다.
 *
 * 현재 카드 구성
 *
 * 1. 생산
 * 2. 설비
 * 3. 품질
 * 4. 수주
 * 5. 손익
 * 6. 시설
 *
 *
 * [유지보수 방법]
 *
 * 실제 사용 가능한 메뉴
 * ---------------------------------------------------------
 *
 * constants.ts에 URL 상수를 등록한 뒤
 * 해당 상수를 url 속성에 연결한다.
 *
 * 예)
 *
 * {
 *     text: {
 *         ko: '실적',
 *         en: 'Production Results',
 *         ja: '実績'
 *     },
 *     url: CORE_PRODUCTION_PERFORMANCE_URL
 * }
 *
 *
 * 준비중 메뉴
 * ---------------------------------------------------------
 *
 * 아직 연결할 URL이 없는 경우
 * url을 임시로 넣지 않고 아래 상태값을 사용한다.
 *
 * status: 'preparing'
 *
 * detailPanel.ts에서 이 값을 확인하여
 * 클릭을 막고 '준비중입니다' 상태로 표시한다.
 */


/* =========================================================
   1. 공통 제품 이미지
   ========================================================= */

/**
 * CORE - Ferrite
 */
const FERRITE_IMAGE: string =
    'https://tdkgroup.sharepoint.com/:i:/r/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/Ferrite%20Core.png?csf=1&web=1&e=cFTbz0';


/**
 * COIL 제품군
 */
const ACT_IMAGE: string =
    'https://www.tdk.com/system/files/ACT45.png';

const ADL_IMAGE: string =
    'https://www.tdk.com/system/files/ADL2012.png';

const VLS_EX_IMAGE: string =
    'https://www.tdk.com/system/files/VLS-EX%28Consumer%29.png';

const VLS_CX_IMAGE: string =
    'https://www.tdk.com/system/files/VLS-CX_.png';

const PID_IMAGE: string =
    'https://tdkgroup.sharepoint.com/:i:/r/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/icon/PID120%20Product.png?csf=1&web=1&e=Zrebkf';


/* =========================================================
   2. 메인 카드 이미지
   ========================================================= */

const PRODUCTION_CARD_IMAGE: string =
    'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/%EC%83%9D%EC%82%B03.png?csf=1&web=1&e=pSWX01';

const FACILITY_CARD_IMAGE: string =
    'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/SitePages/TABEALU_CARD_IMAGE/%EC%84%A4%EB%B9%841.png?csf=1&web=1&e=JVeaeU';

const QUALITY_CARD_IMAGE: string =
    'https://tdkgroup.sharepoint.com/:i:/r/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/%ED%92%88%EC%A7%884.png?csf=1&web=1&e=0rCLJ0';

const ORDER_CARD_IMAGE: string =
    'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/%EC%88%98%EC%A3%BC10.png?csf=1&web=1&e=FrBw91';

const PROFIT_CARD_IMAGE: string =
    'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/%EC%86%90%EC%9D%B53.png?csf=1&web=1&e=N1FQ6s';

const INFRASTRUCTURE_CARD_IMAGE: string =
    'https://tdkgroup.sharepoint.com/:i:/r/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/%EC%8B%9C%EC%84%A4.png?csf=1&web=1&e=xQ1kIG';


/* =========================================================
   3. 공통 준비중 메뉴
   ========================================================= */

/**
 * 제품 또는 메뉴 전체가 아직 준비되지 않은 경우 사용한다.
 *
 * 예)
 *
 * links: PREPARING_LINK
 */
const PREPARING_LINK: ProductLink[] = [
    {
        text: {
            ko: '준비중입니다',
            en: 'Preparing',
            ja: '準備中です'
        },
        status: 'preparing'
    }
];


/* =========================================================
   4. 생산
   ========================================================= */

const PRODUCTION_CARD: ProductCard = {
    id: 'production',

    title: {
        ko: '생산',
        en: 'Production',
        ja: '生産'
    },

    image: PRODUCTION_CARD_IMAGE,

    items: [

        /* =========================
           CORE
           ========================= */

        {
            title: {
                ko: 'CORE',
                en: 'CORE',
                ja: 'CORE'
            },

            groups: [
                {
                    title: {
                        ko: 'Ferrite',
                        en: 'Ferrite',
                        ja: 'Ferrite'
                    },

                    image: FERRITE_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '실적&nbsp;&nbsp;Production Results',
                                en: 'Production Results',
                                ja: '実績'
                            },
                            url: CORE_PRODUCTION_PERFORMANCE_URL
                        },

                        {
                            text: {
                                ko: '코아제조부 공정현황&nbsp;&nbsp;WIP in the Ferrite Manufacturing Process',
                                en: 'WIP in the Ferrite Manufacturing Process',
                                ja: 'DRプロセス投入前の在庫状況'
                            },
                            url: CORE_WIP_IN_DR_GRINDING_URL
                        },

                        {
                            text: {
                                ko: '수율 추이&nbsp;&nbsp;Yield Trend',
                                en: 'Yield Trend',
                                ja: '歩留推移'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: '스크랩 비용&nbsp;&nbsp;Scrap Cost',
                                en: 'Scrap Cost',
                                ja: 'スクラップコスト'
                            },
                            status: 'preparing'
                        }
                    ]
                }
            ]
        },


        /* =========================
           COIL
           ========================= */

        {
            title: {
                ko: 'COIL',
                en: 'COIL',
                ja: 'COIL'
            },

            groups: [

                /* ACT45 */
                {
                    title: {
                        ko: 'ACT45',
                        en: 'ACT45',
                        ja: 'ACT45'
                    },

                    image: ACT_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '실적&nbsp;&nbsp;Production Results',
                                en: 'Production Results',
                                ja: '実績'
                            },
                            url: ACT_PRODUCTION_PERFORMANCE_URL
                        },

                        {
                            text: {
                                ko: '수율 추이&nbsp;&nbsp;Yield Trend',
                                en: 'Yield Trend',
                                ja: '歩留推移'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: '스크랩 비용&nbsp;&nbsp;Scrap Cost',
                                en: 'Scrap Cost',
                                ja: 'スクラップコスト'
                            },
                            status: 'preparing'
                        }
                    ]
                },


                /* ADL2012 */
                {
                    title: {
                        ko: 'ADL2012',
                        en: 'ADL2012',
                        ja: 'ADL2012'
                    },

                    image: ADL_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '실적&nbsp;&nbsp;Production Results',
                                en: 'Production Results',
                                ja: '実績'
                            },
                            url: ADL_PRODUCTION_PERFORMANCE_URL
                        },

                        {
                            text: {
                                ko: '수율 추이&nbsp;&nbsp;Yield Trend',
                                en: 'Yield Trend',
                                ja: '歩留推移'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: '스크랩 비용&nbsp;&nbsp;Scrap Cost',
                                en: 'Scrap Cost',
                                ja: 'スクラップコスト'
                            },
                            status: 'preparing'
                        }
                    ]
                },


                /* VLS-EX */
                {
                    title: {
                        ko: 'VLS-EX',
                        en: 'VLS-EX',
                        ja: 'VLS-EX'
                    },

                    image: VLS_EX_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '실적&nbsp;&nbsp;Production Results',
                                en: 'Production Results',
                                ja: '実績'
                            },
                            url: VLSEX_PRODUCTION_PERFORMANCE_URL
                        },

                        {
                            text: {
                                ko: '수율 추이&nbsp;&nbsp;Yield Trend',
                                en: 'Yield Trend',
                                ja: '歩留推移'
                            },
                            status: 'preparing'
                        }
                    ]
                },


                /* VLS-CX */
                {
                    title: {
                        ko: 'VLS-CX',
                        en: 'VLS-CX',
                        ja: 'VLS-CX'
                    },

                    image: VLS_CX_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '실적&nbsp;&nbsp;Production Results',
                                en: 'Production Results',
                                ja: '実績'
                            },
                            url: VLSCX_PRODUCTION_PERFORMANCE_URL
                        }
                    ]
                },


                /* PID */
                {
                    title: {
                        ko: 'PID',
                        en: 'PID',
                        ja: 'PID'
                    },

                    image: PID_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '실적&nbsp;&nbsp;Production Results',
                                en: 'Production Results',
                                ja: '実績'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: '수율 추이&nbsp;&nbsp;Yield Trend',
                                en: 'Yield Trend',
                                ja: '歩留推移'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: '스크랩 비용&nbsp;&nbsp;Scrap Cost',
                                en: 'Scrap Cost',
                                ja: 'スクラップコスト'
                            },
                            status: 'preparing'
                        }
                    ]
                }
            ]
        }
    ]
};


/* =========================================================
   5. 설비
   ========================================================= */

const FACILITY_CARD: ProductCard = {
    id: 'facility',

    title: {
        ko: '설비',
        en: 'Facility',
        ja: '設備'
    },

    image: FACILITY_CARD_IMAGE,

    items: [

        /* =========================
           CORE
           ========================= */

        {
            title: {
                ko: 'CORE',
                en: 'CORE',
                ja: 'CORE'
            },

            groups: [
                {
                    title: {
                        ko: 'Ferrite',
                        en: 'Ferrite',
                        ja: 'Ferrite'
                    },

                    image: FERRITE_IMAGE,

                    links: [
                        {
                            text: {
                                ko: 'SCADA',
                                en: 'SCADA',
                                ja: 'SCADA'
                            },

                            children: [
                                {
                                    text: {
                                        ko: '성형&nbsp;&nbsp;Molding',
                                        en: 'Molding',
                                        ja: '成形'
                                    },
                                    url: PRESSING_SCADA_URL
                                },

                                {
                                    text: {
                                        ko: 'DR Grinding',
                                        en: 'DR Grinding',
                                        ja: 'DR Grinding'
                                    },
                                    url: DR_SCADA_URL
                                },

                                {
                                    text: {
                                        ko: '소성&nbsp;&nbsp;Sintering',
                                        en: 'Sintering',
                                        ja: '焼成'
                                    },
                                    url: SINTERING_SCADA_URL
                                }
                            ]
                        },

                        {
                            text: {
                                ko: '수리 보고서&nbsp;&nbsp;Repair Report',
                                en: 'Repair Report',
                                ja: '修理報告書'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: '소모품 관리&nbsp;&nbsp;Consumables Management',
                                en: 'Consumables Management',
                                ja: '消耗品管理'
                            },
                            status: 'preparing'
                        }
                    ]
                }
            ]
        },


        /* =========================
           COIL
           ========================= */

        {
            title: {
                ko: 'COIL',
                en: 'COIL',
                ja: 'COIL'
            },

            groups: [

                /* ACT45 */
                {
                    title: {
                        ko: 'ACT45',
                        en: 'ACT45',
                        ja: 'ACT45'
                    },

                    image: ACT_IMAGE,

                    links: [

                        /* Logging System */
                        {
                            text: {
                                ko: '로깅시스템&nbsp;&nbsp;Logging System',
                                en: 'Logging System',
                                ja: 'ロギングシステム'
                            },

                            children: [
                                {
                                    text: {
                                        ko: '단자장착&nbsp;&nbsp;Terminal Fitting',
                                        en: 'Terminal Fitting',
                                        ja: '端子装着'
                                    },
                                    url: TANSI_URL
                                },

                                {
                                    text: {
                                        ko: '권선&nbsp;&nbsp;Winding',
                                        en: 'Winding',
                                        ja: '巻線'
                                    },
                                    url: MAKISEN_URL
                                },

                                {
                                    text: {
                                        ko: '피막박리&nbsp;&nbsp;Wire Stripping',
                                        en: 'Wire Stripping',
                                        ja: '被膜剥離'
                                    },
                                    url: HAKURI_URL
                                },

                                {
                                    text: {
                                        ko: '접합&nbsp;&nbsp;Welding',
                                        en: 'Welding',
                                        ja: '接合'
                                    },
                                    url: ALIGNMENT_URL
                                },

                                {
                                    text: {
                                        ko: '전기적특성&nbsp;&nbsp;Electrical Characteristics',
                                        en: 'Electrical Characteristics',
                                        ja: '電気的特性_ロギング'
                                    },
                                    url: TAPING_URL
                                }
                            ]
                        },


                        /* PEIS */
                        {
                            text: {
                                ko: 'PEIS',
                                en: 'PEIS',
                                ja: 'PEIS'
                            },

                            children: [
                                {
                                    text: {
                                        ko: 'Daily',
                                        en: 'Daily',
                                        ja: 'Daily'
                                    },
                                    url: PEIS_DAILY_URL
                                },

                                {
                                    text: {
                                        ko: 'Monthly',
                                        en: 'Monthly',
                                        ja: 'Monthly'
                                    },
                                    url: PEIS_MONTHLY_URL
                                }
                            ]
                        },


                        /* Deep Learning AOI */
                        {
                            text: {
                                ko: '딥러닝 AOI 결과&nbsp;&nbsp;Deep Learning AOI Results',
                                en: 'Deep Learning AOI Results',
                                ja: 'ディープラーニングAOIの結果'
                            },

                            children: [
                                {
                                    text: {
                                        ko: 'OK',
                                        en: 'OK',
                                        ja: 'OK'
                                    },
                                    url: ACT45_AOI_OK_URL
                                },

                                {
                                    text: {
                                        ko: 'NG',
                                        en: 'NG',
                                        ja: 'NG'
                                    },
                                    url: ACT45_AOI_NG_URL
                                }
                            ]
                        },

                        {
                            text: {
                                ko: '6면AOI 결과&nbsp;&nbsp;6-sided AOI results',
                                en: '6-sided AOI results',
                                ja: '6面AOIの結果'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: '수리 보고서&nbsp;&nbsp;Repair Report',
                                en: 'Repair Report',
                                ja: '修理報告書'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: '소모품 관리&nbsp;&nbsp;Consumables Management',
                                en: 'Consumables Management',
                                ja: '消耗品管理'
                            },
                            status: 'preparing'
                        }
                    ]
                },


                /* ADL2012 */
                {
                    title: {
                        ko: 'ADL2012',
                        en: 'ADL2012',
                        ja: 'ADL2012'
                    },

                    image: ADL_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '6면AOI 결과&nbsp;&nbsp;6-sided AOI results',
                                en: '6-sided AOI results',
                                ja: '6面AOIの結果'
                            },
                            status: 'preparing'
                        }
                    ]
                },


                /* VLS-EX */
                {
                    title: {
                        ko: 'VLS-EX',
                        en: 'VLS-EX',
                        ja: 'VLS-EX'
                    },

                    image: VLS_EX_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '딥러닝 AOI 결과&nbsp;&nbsp;Deep Learning AOI Results',
                                en: 'Deep Learning AOI Results',
                                ja: 'ディープラーニングAOIの結果'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: '6면AOI 결과&nbsp;&nbsp;6-sided AOI results',
                                en: '6-sided AOI results',
                                ja: '6面AOIの結果'
                            },
                            status: 'preparing'
                        }
                    ]
                },


                /* VLS-CX */
                {
                    title: {
                        ko: 'VLS-CX',
                        en: 'VLS-CX',
                        ja: 'VLS-CX'
                    },

                    image: VLS_CX_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '계선AOI 결과&nbsp;&nbsp;Bonding AOI results',
                                en: 'Bonding AOI results',
                                ja: 'AOI結合結果'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: 'AOI T/P 결과&nbsp;&nbsp;AOI Taping results',
                                en: 'AOI Taping results',
                                ja: 'AOIテーピングの結果'
                            },
                            status: 'preparing'
                        }
                    ]
                },


                /* PID */
                {
                    title: {
                        ko: 'PID',
                        en: 'PID',
                        ja: 'PID'
                    },

                    image: PID_IMAGE,
                    links: PREPARING_LINK
                }
            ]
        }
    ]
};


/* =========================================================
   6. 품질
   ========================================================= */

const QUALITY_CARD: ProductCard = {
    id: 'quality',

    title: {
        ko: '품질',
        en: 'Quality',
        ja: '品質'
    },

    image: QUALITY_CARD_IMAGE,

    items: [
        {
            title: {
                ko: 'CORE',
                en: 'CORE',
                ja: 'CORE'
            },

            groups: [
                {
                    title: {
                        ko: 'Ferrite',
                        en: 'Ferrite',
                        ja: 'Ferrite'
                    },

                    image: FERRITE_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '코어선별실적(TQT)&nbsp;&nbsp;Ferrite Core Sorting Results(TQT)',
                                en: 'Ferrite Core Sorting Results(TQT)',
                                ja: 'コア選別実績(TQT)'
                            },
                            url: TQT_CORE_RESULT_URL
                        }
                    ]
                }
            ]
        },

        {
            title: {
                ko: 'COIL',
                en: 'COIL',
                ja: 'COIL'
            },

            groups: [
                {
                    title: {
                        ko: 'ACT45',
                        en: 'ACT45',
                        ja: 'ACT45'
                    },

                    image: ACT_IMAGE,

                    links: [
                        {
                            text: {
                                ko: 'D/L조도・핀트 자동감시툴 <br> Automatic Illumination & Focus Monitoring Tool for D/L',
                                en: 'Automatic Illumination & Focus Monitoring Tool for D/L',
                                ja: 'D/L照度・ピント自動監視ツール'
                            },
                            url: DL_ILLUM_FOCUS_AUTO_MONITOR_TOOL
                        },

                        {
                            text: {
                                ko: 'D/L불량모드 자동분류툴 <br> Automatic Defect Mode Classification tool for D/L',
                                en: 'Automatic Defect Mode Classification tool for D/L',
                                ja: 'D/L不良モード自動分類ツール'
                            },
                            url: DL_DEFECT_MODE_AUTO_CLASSIFY_TOOL
                        },

                        {
                            text: {
                                ko: '품질 정보&nbsp;&nbsp;Quality Information',
                                en: 'Quality Information',
                                ja: '品質情報'
                            },
                            status: 'preparing'
                        }
                    ]
                },

                {
                    title: {
                        ko: 'ADL2012',
                        en: 'ADL2012',
                        ja: 'ADL2012'
                    },

                    image: ADL_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '품질 정보&nbsp;&nbsp;Quality Information',
                                en: 'Quality Information',
                                ja: '品質情報'
                            },
                            status: 'preparing'
                        }
                    ]
                },

                {
                    title: {
                        ko: 'VLS-EX',
                        en: 'VLS-EX',
                        ja: 'VLS-EX'
                    },

                    image: VLS_EX_IMAGE,

                    links: [
                        {
                            text: {
                                ko: 'D/L조도・핀트 자동감시툴 <br> Automatic Illumination & Focus Monitoring Tool for D/L',
                                en: 'Automatic Illumination & Focus Monitoring Tool for D/L',
                                ja: 'D/L照度・ピント自動監視ツール'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: '품질 정보&nbsp;&nbsp;Quality Information',
                                en: 'Quality Information',
                                ja: '品質情報'
                            },
                            status: 'preparing'
                        }
                    ]
                },

                {
                    title: {
                        ko: 'VLS-CX',
                        en: 'VLS-CX',
                        ja: 'VLS-CX'
                    },

                    image: VLS_CX_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '품질 정보&nbsp;&nbsp;Quality Information',
                                en: 'Quality Information',
                                ja: '品質情報'
                            },
                            status: 'preparing'
                        }
                    ]
                },

                {
                    title: {
                        ko: 'PID',
                        en: 'PID',
                        ja: 'PID'
                    },

                    image: PID_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '품질 정보&nbsp;&nbsp;Quality Information',
                                en: 'Quality Information',
                                ja: '品質情報'
                            },
                            status: 'preparing'
                        }
                    ]
                }
            ]
        }
    ]
};


/* =========================================================
   7. 수주
   ========================================================= */

const ORDER_CARD: ProductCard = {
    id: 'order',

    title: {
        ko: '수주',
        en: 'Order',
        ja: '受注'
    },

    image: ORDER_CARD_IMAGE,

    items: [
        {
            title: {
                ko: 'CORE',
                en: 'CORE',
                ja: 'CORE'
            },

            groups: [
                {
                    title: {
                        ko: 'Ferrite',
                        en: 'Ferrite',
                        ja: 'Ferrite'
                    },

                    image: FERRITE_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '주문 정보&nbsp;&nbsp;PO Information',
                                en: 'PO Information',
                                ja: '注文情報'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: 'CO/RO/FI Information',
                                en: 'CO/RO/FI Information',
                                ja: 'CO/RO/FI Information'
                            },
                            status: 'preparing'
                        }
                    ]
                }
            ]
        },

        {
            title: {
                ko: 'COIL',
                en: 'COIL',
                ja: 'COIL'
            },

            groups: [
                {
                    title: {
                        ko: 'ACT45',
                        en: 'ACT45',
                        ja: 'ACT45'
                    },

                    image: ACT_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '주문 정보&nbsp;&nbsp;PO Information',
                                en: 'PO Information',
                                ja: '注文情報'
                            },
                            url: COIL_ORDER_INFORMATION_URL
                        },

                        {
                            text: {
                                ko: 'CO/RO/FI Information',
                                en: 'CO/RO/FI Information',
                                ja: 'CO/RO/FI Information'
                            },
                            url: ACT_CO_RO_FI_URL
                        }
                    ]
                },

                {
                    title: {
                        ko: 'ADL2012',
                        en: 'ADL2012',
                        ja: 'ADL2012'
                    },

                    image: ADL_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '주문 정보&nbsp;&nbsp;PO Information',
                                en: 'PO Information',
                                ja: '注文情報'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: 'CO/RO/FI Information',
                                en: 'CO/RO/FI Information',
                                ja: 'CO/RO/FI Information'
                            },
                            url: ADL_CO_RO_FI_URL
                        }
                    ]
                },

                {
                    title: {
                        ko: 'VLS-EX',
                        en: 'VLS-EX',
                        ja: 'VLS-EX'
                    },

                    image: VLS_EX_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '주문 정보&nbsp;&nbsp;PO Information',
                                en: 'PO Information',
                                ja: '注文情報'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: 'CO/RO/FI Information',
                                en: 'CO/RO/FI Information',
                                ja: 'CO/RO/FI Information'
                            },
                            url: VLSEX_CO_RO_FI_URL
                        }
                    ]
                },

                {
                    title: {
                        ko: 'VLS-CX',
                        en: 'VLS-CX',
                        ja: 'VLS-CX'
                    },

                    image: VLS_CX_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '주문 정보&nbsp;&nbsp;PO Information',
                                en: 'PO Information',
                                ja: '注文情報'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: 'CO/RO/FI Information',
                                en: 'CO/RO/FI Information',
                                ja: 'CO/RO/FI Information'
                            },
                            url: VLSCX_CO_RO_FI_URL
                        }
                    ]
                },

                {
                    title: {
                        ko: 'PID',
                        en: 'PID',
                        ja: 'PID'
                    },

                    image: PID_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '주문 정보&nbsp;&nbsp;PO Information',
                                en: 'PO Information',
                                ja: '注文情報'
                            },
                            status: 'preparing'
                        },

                        {
                            text: {
                                ko: 'CO/RO/FI Information',
                                en: 'CO/RO/FI Information',
                                ja: 'CO/RO/FI Information'
                            },
                            status: 'preparing'
                        }
                    ]
                }
            ]
        }
    ]
};


/* =========================================================
   8. 손익
   ========================================================= */

const PROFIT_CARD: ProductCard = {
    id: 'profit',

    title: {
        ko: '손익',
        en: 'Profit',
        ja: '損益'
    },

    image: PROFIT_CARD_IMAGE,

    items: [
        {
            title: {
                ko: 'CORE',
                en: 'CORE',
                ja: 'CORE'
            },

            groups: [
                {
                    title: {
                        ko: 'Ferrite',
                        en: 'Ferrite',
                        ja: 'Ferrite'
                    },

                    image: FERRITE_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '손익 정보&nbsp;&nbsp;Profit & Loss',
                                en: 'Profit & Loss',
                                ja: '損益情報'
                            },
                            url: CORE_PROFIT_URL
                        }
                    ]
                }
            ]
        },

        {
            title: {
                ko: 'COIL',
                en: 'COIL',
                ja: 'COIL'
            },

            groups: [
                {
                    title: {
                        ko: 'ACT45',
                        en: 'ACT45',
                        ja: 'ACT45'
                    },

                    image: ACT_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '손익 정보&nbsp;&nbsp;Profit & Loss',
                                en: 'Profit and Loss Information',
                                ja: '損益情報'
                            },
                            url: ACT45_PROFIT_URL
                        }
                    ]
                },

                {
                    title: {
                        ko: 'ADL2012',
                        en: 'ADL2012',
                        ja: 'ADL2012'
                    },

                    image: ADL_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '손익 정보&nbsp;&nbsp;Profit & Loss',
                                en: 'Profit and Loss Information',
                                ja: '損益情報'
                            },
                            url: ADL2012_PROFIT_URL
                        }
                    ]
                },

                {
                    title: {
                        ko: 'VLS-EX',
                        en: 'VLS-EX',
                        ja: 'VLS-EX'
                    },

                    image: VLS_EX_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '손익 정보&nbsp;&nbsp;Profit & Loss',
                                en: 'Profit and Loss Information',
                                ja: '損益情報'
                            },
                            url: VLSEX_PROFIT_URL
                        }
                    ]
                },

                {
                    title: {
                        ko: 'VLS-CX',
                        en: 'VLS-CX',
                        ja: 'VLS-CX'
                    },

                    image: VLS_CX_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '손익 정보&nbsp;&nbsp;Profit & Loss',
                                en: 'Profit and Loss Information',
                                ja: '損益情報'
                            },
                            url: VLSCX_PROFIT_URL
                        }
                    ]
                },

                {
                    title: {
                        ko: 'PID',
                        en: 'PID',
                        ja: 'PID'
                    },

                    image: PID_IMAGE,

                    links: [
                        {
                            text: {
                                ko: '손익 정보&nbsp;&nbsp;Profit & Loss',
                                en: 'Profit and Loss Information',
                                ja: '損益情報'
                            },
                            url: PID_PROFIT_URL
                        }
                    ]
                }
            ]
        }
    ]
};


/* =========================================================
   9. 시설
   ========================================================= */

/**
 * 시설 카드는 제품군 카드와 달리
 * 하위 메뉴를 펼치지 않고 각 시설 항목을 클릭하면
 * SCADA 화면으로 바로 이동한다.
 *
 * ProductGroup.url을 사용하므로
 * detailPanel.ts에서 직접 링크 형태로 출력된다.
 */
const INFRASTRUCTURE_CARD: ProductCard = {
    id: 'facilities',

    title: {
        ko: '시설',
        en: 'Infrastructure',
        ja: '施設'
    },

    image: INFRASTRUCTURE_CARD_IMAGE,

    items: [
        {
            title: {
                ko: '시설',
                en: 'Facilities',
                ja: '設備'
            },

            groups: [
                {
                    title: {
                        ko: '전력&nbsp;&nbsp;Power Status',
                        en: 'Power Status',
                        ja: '電力'
                    },
                    url: POWER_SCADA_URL
                },

                {
                    title: {
                        ko: '배전반&nbsp;&nbsp;Switchboard',
                        en: 'Switchboard',
                        ja: '配電盤'
                    },
                    url: DISTRIBUTION_PANEL_SCADA_URL
                },

                {
                    title: {
                        ko: '온습도관리시스템&nbsp;&nbsp;Temp & Humidity Control',
                        en: 'Temp & Humidity Control',
                        ja: '温湿度管理システム'
                    },
                    url: UTILITY_SCADA_URL
                }
            ]
        }
    ]
};


/* =========================================================
   10. 최종 대시보드 카드 목록
   ========================================================= */

/**
 * 메인 화면의 카드 표시 순서는
 * 아래 배열의 순서대로 결정된다.
 *
 * 카드 순서를 변경할 경우
 * 아래 배열의 위치만 변경하면 된다.
 *
 * 각 카드의 상세 메뉴는
 * 위의 개별 CARD 상수에서 관리한다.
 */
export const PRODUCT_CARDS: ProductCard[] = [
    PRODUCTION_CARD,
    FACILITY_CARD,
    QUALITY_CARD,
    ORDER_CARD,
    PROFIT_CARD,
    INFRASTRUCTURE_CARD
];