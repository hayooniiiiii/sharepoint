import { ProductCard } from '../models/types';
import {
    ACT_LOGGINGN_URL,
    ACT_PEIS_URL,
    ACT_PRODUCTION_PERFORMACE_URL, ADL_PRODUCTION_PERFORMACE_URL,
    COIL_ORDER_INFORMATION_URL, CORE_ORDER_INFORMATION_URL,
    CORE_PRODUCTION_PERFORMANCE_URL, CORE_PROFIT_URL,
    TABLEAU_URL, VLSCX_PRODUCTION_PERFORMACE_URL, VLSEX_PRODUCTION_PERFORMACE_URL
} from './constants';

export const PRODUCT_CARDS: ProductCard[] = [
    {
        id: 'production',
        title: {
            ko: '생산',
            en: 'Production',
            ja: '生産'
        },
        image: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/%EC%83%9D%EC%82%B03.png?csf=1&web=1&e=pSWX01',
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
                        links: [
                            {
                                text: {
                                    ko: '실적',
                                    en: 'Performance',
                                    ja: '実績'
                                },
                                url: CORE_PRODUCTION_PERFORMANCE_URL
                            },
                            {
                                text: {
                                    ko: '수율 추이',
                                    en: 'Yield Trend',
                                    ja: '歩留推移'
                                },
                                url: TABLEAU_URL
                            },
                            {
                                text: {
                                    ko: '스크랩 비용',
                                    en: 'Scrap Cost',
                                    ja: 'スクラップコスト'
                                },
                                url: TABLEAU_URL
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
                            ko: 'ACT',
                            en: 'ACT',
                            ja: 'ACT'
                        },
                        links: [
                            {
                                text: {
                                    ko: '실적',
                                    en: 'Performance',
                                    ja: '実績'
                                },
                                url: ACT_PRODUCTION_PERFORMACE_URL
                            },
                            {
                                text: {
                                    ko: '수율 추이',
                                    en: 'Yield Trend',
                                    ja: '歩留推移'
                                },
                                url: TABLEAU_URL
                            },
                            {
                                text: {
                                    ko: '스크랩 비용',
                                    en: 'Scrap Cost',
                                    ja: 'スクラップコスト'
                                },
                                url: TABLEAU_URL
                            }
                        ]
                    },
                    {
                        title: {
                            ko: 'ADL',
                            en: 'ADL',
                            ja: 'ADL'
                        },
                        links: [
                            {
                                text: {
                                    ko: '실적',
                                    en: 'Performance',
                                    ja: '実績'
                                },
                                url: ADL_PRODUCTION_PERFORMACE_URL
                            },
                            {
                                text: {
                                    ko: '수율 추이',
                                    en: 'Yield Trend',
                                    ja: '歩留推移'
                                },
                                url: TABLEAU_URL
                            },
                            {
                                text: {
                                    ko: '스크랩 비용',
                                    en: 'Scrap Cost',
                                    ja: 'スクラップコスト'
                                },
                                url: TABLEAU_URL
                            }
                        ]
                    },
                    {
                        title: {
                            ko: 'VLS-EX',
                            en: 'VLS-EX',
                            ja: 'VLS-EX'
                        },
                        links: [
                            {
                                text: {
                                    ko: '실적',
                                    en: 'Performance',
                                    ja: '実績'
                                },
                                url: VLSEX_PRODUCTION_PERFORMACE_URL
                            },
                            {
                                text: {
                                    ko: '수율 추이',
                                    en: 'Yield Trend',
                                    ja: '歩留推移'
                                },
                                url: TABLEAU_URL
                            }
                        ]
                    },
                    {
                        title: {
                            ko: 'VLS-CX',
                            en: 'VLS-CX',
                            ja: 'VLS-CX'
                        },
                        links: [
                            {
                                text: {
                                    ko: '실적',
                                    en: 'Performance',
                                    ja: '実績'
                                },
                                url: VLSCX_PRODUCTION_PERFORMACE_URL
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'facility',
        title: {
            ko: '설비',
            en: 'Facility',
            ja: '設備'
        },
        image: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/SitePages/TABEALU_CARD_IMAGE/%EC%84%A4%EB%B9%841.png?csf=1&web=1&e=JVeaeU',
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
                        links: [
                            {
                                text: {
                                    ko: 'SCADA',
                                    en: 'SCADA',
                                    ja: 'SCADA'
                                },
                                url: TABLEAU_URL
                            },
                            {
                                text: {
                                    ko: '수리 보고서',
                                    en: 'Repair Report',
                                    ja: '修理報告書'
                                },
                                url: TABLEAU_URL
                            },
                            {
                                text: {
                                    ko: '소모품 관리',
                                    en: 'Consumables Management',
                                    ja: '消耗品管理'
                                },
                                url: TABLEAU_URL
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
                            ko: 'ACT',
                            en: 'ACT',
                            ja: 'ACT'
                        },
                        links: [
                            {
                                text: {
                                    ko: 'PEIS',
                                    en: 'PEIS',
                                    ja: 'PEIS'
                                },
                                url: ACT_PEIS_URL
                            },
                            {
                                text: {
                                    ko: '로깅시스템',
                                    en: 'LOGGING SYSTEM',
                                    ja: 'LOGGING SYSTEM'
                                },
                                url: ACT_LOGGINGN_URL
                            },
                            {
                                text: {
                                    ko: '수리 보고서',
                                    en: 'Repair Report',
                                    ja: '修理報告書'
                                },
                                url: TABLEAU_URL
                            },
                            {
                                text: {
                                    ko: '소모품 관리',
                                    en: 'Consumables Management',
                                    ja: '消耗品管理'
                                },
                                url: TABLEAU_URL
                            }
                        ]
                    },
                    {
                        title: {
                            ko: 'ADL',
                            en: 'ADL',
                            ja: 'ADL'
                        },
                        links: [
                            {
                                text: {
                                    ko: 'PEIS',
                                    en: 'PEIS',
                                    ja: 'PEIS'
                                },
                                url: ACT_PEIS_URL
                            },
                            {
                                text: {
                                    ko: '로깅시스템',
                                    en: 'LOGGING SYSTEM',
                                    ja: 'LOGGING SYSTEM'
                                },
                                url: ACT_LOGGINGN_URL
                            },
                            {
                                text: {
                                    ko: '수리 보고서',
                                    en: 'Repair Report',
                                    ja: '修理報告書'
                                },
                                url: TABLEAU_URL
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'quality',
        title: {
            ko: '품질',
            en: 'Quality',
            ja: '品質'
        },
        image: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/%ED%92%88%EC%A7%882.png?csf=1&web=1&e=GQuh9c',
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
                        links: [
                            {
                                text: {
                                    ko: '품질 정보',
                                    en: 'Quality Information',
                                    ja: '品質情報'
                                },
                                url: TABLEAU_URL
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
                            ko: 'ACT',
                            en: 'ACT',
                            ja: 'ACT'
                        },
                        links: [
                            {
                                text: {
                                    ko: '품질 정보',
                                    en: 'Quality Information',
                                    ja: '品質情報'
                                },
                                url: TABLEAU_URL
                            }
                        ]
                    },
                    {
                        title: {
                            ko: 'ADL',
                            en: 'ADL',
                            ja: 'ADL'
                        },
                        links: [
                            {
                                text: {
                                    ko: '품질 정보',
                                    en: 'Quality Information',
                                    ja: '品質情報'
                                },
                                url: TABLEAU_URL
                            }
                        ]
                    },
                    {
                        title: {
                            ko: 'VLS-EX',
                            en: 'VLS-EX',
                            ja: 'VLS-EX'
                        },
                        links: [
                            {
                                text: {
                                    ko: '품질 정보',
                                    en: 'Quality Information',
                                    ja: '品質情報'
                                },
                                url: TABLEAU_URL
                            }
                        ]
                    },
                    {
                        title: {
                            ko: 'VLS-CX',
                            en: 'VLS-CX',
                            ja: 'VLS-CX'
                        },
                        links: [
                            {
                                text: {
                                    ko: '품질 정보',
                                    en: 'Quality Information',
                                    ja: '品質情報'
                                },
                                url: TABLEAU_URL
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'order',
        title: {
            ko: '수주',
            en: 'Order',
            ja: '受注'
        },
        image: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/%EC%88%98%EC%A3%BC10.png?csf=1&web=1&e=FrBw91',
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
                        links: [
                            {
                                text: {
                                    ko: '주문 정보',
                                    en: 'Order Information',
                                    ja: '注文情報'
                                },
                                url: CORE_ORDER_INFORMATION_URL
                            },
                            {
                                text: {
                                    ko: '출하 정보',
                                    en: 'Shipment Information',
                                    ja: '出荷情報'
                                },
                                url: TABLEAU_URL
                            },
                            {
                                text: {
                                    ko: '판매 정보',
                                    en: 'Sales Information',
                                    ja: '販売情報'
                                },
                                url: TABLEAU_URL
                            },
                            {
                                text: {
                                    ko: '수주 잔량 정보',
                                    en: 'Backlog Information',
                                    ja: '注残情報'
                                },
                                url: TABLEAU_URL
                            },
                            {
                                text: {
                                    ko: '고객 정보',
                                    en: 'Customer Information',
                                    ja: '顧客情報'
                                },
                                url: TABLEAU_URL
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
                            ko: 'ACT',
                            en: 'ACT',
                            ja: 'ACT'
                        },
                        links: [
                            {
                                text: {
                                    ko: '주문 정보',
                                    en: 'Order Information',
                                    ja: '注文情報'
                                },
                                url: COIL_ORDER_INFORMATION_URL
                            },
                            {
                                text: {
                                    ko: '출하 정보',
                                    en: 'Shipment Information',
                                    ja: '出荷情報'
                                },
                                url: TABLEAU_URL
                            },
                            {
                                text: {
                                    ko: '판매 정보',
                                    en: 'Sales Information',
                                    ja: '販売情報'
                                },
                                url: TABLEAU_URL
                            }
                        ]
                    },
                    {
                        title: {
                            ko: 'ADL',
                            en: 'ADL',
                            ja: 'ADL'
                        },
                        links: [
                            {
                                text: {
                                    ko: '주문 정보',
                                    en: 'Order Information',
                                    ja: '注文情報'
                                },
                                url: COIL_ORDER_INFORMATION_URL
                            },
                            {
                                text: {
                                    ko: '수주 잔량 정보',
                                    en: 'Backlog Information',
                                    ja: '注残情報'
                                },
                                url: TABLEAU_URL
                            },
                            {
                                text: {
                                    ko: '고객 정보',
                                    en: 'Customer Information',
                                    ja: '顧客情報'
                                },
                                url: TABLEAU_URL
                            }
                        ]
                    },
                    {
                        title: {
                            ko: 'VLS-EX',
                            en: 'VLS-EX',
                            ja: 'VLS-EX'
                        },
                        links: [
                            {
                                text: {
                                    ko: '주문 정보',
                                    en: 'Order Information',
                                    ja: '注文情報'
                                },
                                url: COIL_ORDER_INFORMATION_URL
                            }
                        ]
                    },
                    {
                        title: {
                            ko: 'VLS-CX',
                            en: 'VLS-CX',
                            ja: 'VLS-CX'
                        },
                        links: [
                            {
                                text: {
                                    ko: '주문 정보',
                                    en: 'Order Information',
                                    ja: '注文情報'
                                },
                                url: COIL_ORDER_INFORMATION_URL
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 'profit',
        title: {
            ko: '손익',
            en: 'Profit',
            ja: '損益'
        },
        image: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDKKorea_Portal-12350/SiteAssets/card/%EC%86%90%EC%9D%B53.png?csf=1&web=1&e=N1FQ6s',
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
                        links: [
                            {
                                text: {
                                    ko: '품질 정보',
                                    en: 'Quality Information',
                                    ja: '品質情報'
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
                            ko: 'ACT',
                            en: 'ACT',
                            ja: 'ACT'
                        },
                        links: [
                            {
                                text: {
                                    ko: '품질 정보',
                                    en: 'Quality Information',
                                    ja: '品質情報'
                                },
                                url: CORE_PROFIT_URL
                            }
                        ]
                    }
                ]
            }
        ]
    }
];