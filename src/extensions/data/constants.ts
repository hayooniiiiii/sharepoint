/**
 * =========================================================
 * TDK Korea Portal 공통 URL / 설정 상수
 * =========================================================
 *
 * 포털에서 사용하는 외부 시스템 URL,
 * Tableau Dashboard URL
 *
 * [유지보수 방법]
 *
 * - 실제 링크 주소가 변경되면 이 파일의 URL만 수정한다.
 * - productCards.ts에는 직접 URL을 작성하지 않고
 *   가능한 한 이 파일의 상수를 import해서 사용한다.
 * - 상수명은 가능한 한 아래 규칙을 사용한다.
 *
 *   제품_기능_URL
 *
 * 예)
 *
 * CORE_PRODUCTION_PERFORMANCE_URL
 * ACT45_PROFIT_URL
 * PEIS_DAILY_URL
 *
 *
 * 중요:
 * 준비중 메뉴는 URL로 판단하지 않는다.
 *
 * productCards.ts에서
 *
 * status: 'preparing'
 *
 * 으로 관리한다.
 */


/* =========================================================
   1. APPLICATION
   ========================================================= */

/**
 * SPFx Log에 사용되는 Source 이름
 */
export const LOG_SOURCE: string =
    'TdkSharepointApplicationCustomizer';


/* =========================================================
   2. 생산
   ========================================================= */

/**
 * CORE - 생산 실적
 */
export const CORE_PRODUCTION_PERFORMANCE_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/CORE_/sheet0?:iid=1';


/**
 * CORE - 코아제조부 공정현황
 * DR Grinding 투입 전 재공 현황
 */
export const CORE_WIP_IN_DR_GRINDING_URL: string =
    'http://10.22.41.192:5000/drstock';


/**
 * ACT45 - 생산 실적
 *
 */
export const ACT_PRODUCTION_PERFORMANCE_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/ACT_/sheet0?:iid=1';


/**
 * ADL2012 - 생산 실적
 *

 */
export const ADL_PRODUCTION_PERFORMANCE_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/COIL_ADL/sheet0?:iid=1';


/**
 * VLS-EX - 생산 실적
 *
 * TODO:
 * PERFORMACE → PERFORMANCE 오타 수정 예정
 */
export const VLSEX_PRODUCTION_PERFORMANCE_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/VLS-EX_/sheet0?:iid=3';


/**
 * VLS-CX - 생산 실적
 *
 * TODO:
 * PERFORMACE → PERFORMANCE 오타 수정 예정
 */
export const VLSCX_PRODUCTION_PERFORMANCE_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/VLS-CX_/sheet0?:iid=1';


/* =========================================================
   3. 설비 - CORE SCADA
   ========================================================= */

/**
 * CORE SCADA 기본 주소
 * 세부 SCADA URL을 사용한다.
 */
export const CORE_SCADA_URL: string =
    'http://admin.porta.kr.intdk';


/**
 * CORE SCADA - 성형
 */
export const PRESSING_SCADA_URL: string =
    'http://admin.porta.kr.intdk/workspace/74d8e5f5-4704-4a33-96dd-905d778b62ca/site/c91420a9-ca75-458b-8198-36e9bb4acaca/dashboard';


/**
 * CORE SCADA - DR Grinding
 */
export const DR_SCADA_URL: string =
    'http://admin.porta.kr.intdk/workspace/74d8e5f5-4704-4a33-96dd-905d778b62ca/site/fc71a971-7351-4654-8c59-9d03e0eaa256/dashboard';


/**
 * CORE SCADA - 소성
 */
export const SINTERING_SCADA_URL: string =
    'http://admin.porta.kr.intdk/workspace/74d8e5f5-4704-4a33-96dd-905d778b62ca/site/6e210c5c-a115-459d-9276-1b944767ccf7/dashboard';


/* =========================================================
   4. 설비 - ACT45 Logging System
   ========================================================= */

/**
 * 단자장착
 */
export const TANSI_URL: string =
    'https://tdk-tableau.tdk.biz/#/projects/2105';


/**
 * 권선
 */
export const MAKISEN_URL: string =
    'https://tdk-tableau.tdk.biz/#/projects/2109';


/**
 * 피막박리
 */
export const HAKURI_URL: string =
    'https://tdk-tableau.tdk.biz/#/projects/2102';


/**
 * 접합
 */
export const ALIGNMENT_URL: string =
    'https://tdk-tableau.tdk.biz/#/projects/1976';


/**
 * 전기적 특성
 */
export const TAPING_URL: string =
    'https://tdk-tableau.tdk.biz/#/projects/2132';


/**
 * 이전 Logging System 상수
 *
 * 현재 ALIGNMENT_URL과 동일한 주소를 사용한다.
 * 향후 사용 여부 확인 후 삭제 가능.
 */
export const ACT_LOGGINGN_URL: string =
    'https://tdk-tableau.tdk.biz/#/projects/1976';


/* =========================================================
   5. 설비 - PEIS
   ========================================================= */

/**
 * ACT45 PEIS Daily
 */
export const PEIS_DAILY_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/Prep_Daily/ACT45B_DailyReport?:iid=2';


/**
 * ACT45 PEIS Monthly
 */
export const PEIS_MONTHLY_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/TKR_PEIS_Monthly/ACT45B_MonthlyReport';



/* =========================================================
   6. 설비 - AOI
   ========================================================= */

/**
 * ACT45 Deep Learning AOI - OK
 */
export const ACT45_AOI_OK_URL: string =
    'http://10.22.0.27/OK';


/**
 * ACT45 Deep Learning AOI - NG
 */
export const ACT45_AOI_NG_URL: string =
    'http://10.22.0.27/NG';


/* =========================================================
   7. 품질
   ========================================================= */

/**
 * CORE Ferrite
 * 코어 선별 실적 TQT 화면
 */
export const TQT_CORE_RESULT_URL: string =
    'http://10.22.0.25/TKR_Portal_QA_Fer/qa_fer.html';


/**
 * D/L 조도·핀트 자동 감시 Tool
 */
export const DL_ILLUM_FOCUS_AUTO_MONITOR_TOOL: string =
    'http://10.22.0.27:5002/auto';


/**
 * D/L 불량모드 자동 분류 Tool
 */
export const DL_DEFECT_MODE_AUTO_CLASSIFY_TOOL: string =
    'http://10.22.0.27:5001/';


/* =========================================================
   8. 수주
   ========================================================= */

/**
 * COIL 주문 정보
 *
 * 현재 ACT45 주문 정보에서 사용한다.
 */
export const COIL_ORDER_INFORMATION_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/_Coil_17761636494120/sheet0?:iid=1';


/**
 * CORE 주문 정보
 *
 * 현재 productCards.ts에서는 사용하지 않는 상수.
 * 실제 CORE용 URL인지 확인 필요.
 *
 * 현재 COIL_ORDER_INFORMATION_URL과 동일한 주소이다.
 */
export const CORE_ORDER_INFORMATION_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/_Coil_17761636494120/sheet0?:iid=1';


/**
 * ACT45 - CO / RO / FI
 */
export const ACT_CO_RO_FI_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/L2_COROFIACT/L2_COROFI_INPUTACT?:iid=1';


/**
 * ADL2012 - CO / RO / FI
 */
export const ADL_CO_RO_FI_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/L2_COROFIADL2012/L2_COROFI_INPUTVLS-CX?:iid=1';


/**
 * VLS-EX - CO / RO / FI
 */
export const VLSEX_CO_RO_FI_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/L2_COROFIVLS-EX/L2_COROFI_INPUTVLS-EX?:iid=3';


/**
 * VLS-CX - CO / RO / FI
 */
export const VLSCX_CO_RO_FI_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/L2_COROFIVLS-CX/L2_COROFI_INPUTVLS-CX?:iid=1';


/* =========================================================
   9. 손익
   ========================================================= */

/**
 * 현재 CORE / ACT45 / ADL2012 /
 * VLS-EX / VLS-CX / PID가
 * 동일한 손익 Tableau 화면을 사용한다.
 *
 */


/**
 * CORE 손익
 */
export const CORE_PROFIT_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/ProfitLossver02/1?:iid=1';


/**
 * ACT45 손익
 */
export const ACT45_PROFIT_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/ProfitLossver02/1?:iid=1';


/**
 * ADL2012 손익
 */
export const ADL2012_PROFIT_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/ProfitLossver02/1?:iid=1';


/**
 * VLS-EX 손익
 */
export const VLSEX_PROFIT_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/ProfitLossver02/1?:iid=1';


/**
 * VLS-CX 손익
 */
export const VLSCX_PROFIT_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/ProfitLossver02/1?:iid=1';


/**
 * PID 손익
 */
export const PID_PROFIT_URL: string =
    'https://tdk-tableau.tdk.biz/#/views/ProfitLossver02/1?:iid=1';


/* =========================================================
   10. 시설
   ========================================================= */

/**
 * 시설 - 전력
 */
export const POWER_SCADA_URL: string =
    'http://admin.porta.kr.intdk/workspace/74d8e5f5-4704-4a33-96dd-905d778b62ca/site/15be2669-a6d5-448b-afec-cf833d90f325/dashboard';


/**
 * 시설 - 배전반
 *
 *
 * DISTRIBUTION_PANEL_SCADA_URL
 */
export const DISTRIBUTION_PANEL_SCADA_URL: string =
    'http://admin.porta.kr.intdk/workspace/74d8e5f5-4704-4a33-96dd-905d778b62ca/site/d4fa3c72-8fce-41a0-9f49-4b2a2e11feea/dashboard';


/**
 * 시설 - 온습도 관리 시스템
 *
 */
export const UTILITY_SCADA_URL: string =
    'http://admin.porta.kr.intdk/workspace/74d8e5f5-4704-4a33-96dd-905d778b62ca/site/9a1101f5-14ea-46fa-a00e-667e24cf5b69/dashboard';


