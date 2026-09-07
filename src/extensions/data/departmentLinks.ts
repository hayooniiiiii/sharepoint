import { DepartmentLinkSet } from '../models/types';


/**
 * =========================================================
 * TDK Korea Portal - Department Channel
 * =========================================================
 *
 * 메인 포털의 '부문 채널' 영역에 표시되는
 * 부서별 SharePoint 링크를 관리한다.
 *
 *
 * [유지보수 방법]
 *
 * 새로운 부서 채널 추가
 * ---------------------------------------------------------
 *
 * DEPARTMENT_LINKS 배열에 아래 구조를 추가한다.
 *
 * {
 *     text: {
 *         ko: '한국어명',
 *         en: 'English Name',
 *         ja: '日本語名'
 *     },
 *     url: 'SharePoint URL'
 * }
 *
 *
 * 아직 채널이 없는 부서
 * ---------------------------------------------------------
 *
 * URL을 임시로 넣지 않고
 *
 * disabled: true
 *
 * 로 관리한다.
 *
 * 예)
 *
 * {
 *     text: {
 *         ko: 'TKR-기획부',
 *         en: 'TKR-Planning HQ',
 *         ja: 'TKR-企画部'
 *     },
 *     disabled: true
 * }
 *
 *
 * 채널이 생성된 경우
 * ---------------------------------------------------------
 *
 * disabled: true를 제거하고
 * url 속성에 실제 SharePoint 주소를 입력한다.
 *
 *
 * 표시 순서 변경
 * ---------------------------------------------------------
 *
 * DEPARTMENT_LINKS 배열의 순서를 변경하면 된다.
 *
 *
 * [작성 규칙]
 *
 * 1. text
 *    - 반드시 ko / en / ja 3개 언어를 작성한다.
 *
 * 2. url
 *    - 실제 연결 가능한 SharePoint 부문 채널 주소를 입력한다.
 *
 * 3. disabled
 *    - 아직 연결할 URL이 없는 경우 true로 설정한다.
 *
 * 4. url과 disabled는 동시에 사용하지 않는다.
 */


/* =========================================================
   Department Channel Links
   ========================================================= */

export const DEPARTMENT_LINKS: DepartmentLinkSet = [

    /* =====================================================
       정보시스템부
       ===================================================== */
    {
        text: {
            ko: 'TKR-정보시스템부',
            en: 'TKR-IT Department',
            ja: 'TKR-情報システム部'
        },

        url:
            'https://tdkgroup.sharepoint.com/sites/TJP-TKR-tkritsection01-6499'
    },


    /* =====================================================
       DX팀
       ===================================================== */
    {
        text: {
            ko: 'TKR-DX팀',
            en: 'TKR-DX Team',
            ja: 'TKR-DXチーム'
        },

        url:
            'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TEG-EMK-8690'
    },


    /* =====================================================
       경리부
       ===================================================== */
    {
        text: {
            ko: 'TKR-경리부',
            en: 'TKR-Accounting Department',
            ja: 'TKR-經理部'
        },

        url:
            'https://tdkgroup.sharepoint.com/sites/TJP-TKR-accounting-3944'
    },


    /* =====================================================
       기획부
       ===================================================== */
    {
        text: {
            ko: 'TKR-기획부',
            en: 'TKR-Planning HQ',
            ja: 'TKR-企画部'
        },

        disabled: true
    },


    /* =====================================================
       CORE제조부
       ===================================================== */
    {
        text: {
            ko: 'TKR-CORE제조부',
            en: 'TKR-CORE Production Department',
            ja: 'TKR-CORE製造部'
        },

        disabled: true
    },


    /* =====================================================
       권선제조부
       ===================================================== */
    {
        text: {
            ko: 'TKR-권선제조부',
            en: 'TKR-COIL Production Department',
            ja: 'TKR-巻線製造部'
        },

        disabled: true
    },


    /* =====================================================
       생산기술부
       ===================================================== */
    {
        text: {
            ko: 'TKR-생산기술부',
            en: 'TKR-Production Engineering Department',
            ja: 'TKR-生産技術部'
        },

        disabled: true
    },


    /* =====================================================
       제조기술부
       ===================================================== */
    {
        text: {
            ko: 'TKR-제조기술부',
            en: 'TKR-Manufacturing Technology Department',
            ja: 'TKR-製造技術部'
        },

        disabled: true
    },


    /* =====================================================
       경영지원부
       ===================================================== */
    {
        text: {
            ko: 'TKR-경영지원부',
            en: 'TKR-General Administrative Department',
            ja: 'TKR-経営支援部'
        },

        disabled: true
    },


    /* =====================================================
       SCM부
       ===================================================== */
    {
        text: {
            ko: 'TKR-SCM부',
            en: 'TKR-SCM Department',
            ja: 'TKR-SCM部'
        },

        disabled: true
    },


    /* =====================================================
       품질보증부
       ===================================================== */
    {
        text: {
            ko: 'TKR-품질보증부',
            en: 'TKR-Quality Assurance Department',
            ja: 'TKR-品質保証部'
        },

        disabled: true
    },


    /* =====================================================
       기술부
       ===================================================== */
    {
        text: {
            ko: 'TKR-기술부',
            en: 'TKR-Technical Department',
            ja: 'TKR-技術部'
        },

        disabled: true
    },


    /* =====================================================
       영업촉진부
       ===================================================== */
    {
        text: {
            ko: 'TKR-영업촉진부',
            en: 'TKR-Product Marketing Department',
            ja: 'TKR-営業促進部'
        },

        disabled: true
    },


    /* =====================================================
       설비개발부
       ===================================================== */
    {
        text: {
            ko: 'TKR-설비개발부',
            en: 'TKR-Machinery Development Department',
            ja: 'TKR-設備開発部'
        },

        url:
            'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR_MDD-11303'
    },


    /* =====================================================
       ACT 표준류
       ===================================================== */
    {
        text: {
            ko: 'TKR-ACT표준류',
            en: 'TKR-ACT standards',
            ja: 'TKR-ACT標準類'
        },

        url:
            'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDK-7687/Shared%20Documents/Forms/AllItems.aspx?e=5%3A04dc74500db24e7eb1dcc2fca4bda8f5&sharingv2=true&fromShare=true&at=9&CID=3ca7d6cc%2D6fd2%2D4004%2D8653%2De8f5b11285b2&FolderCTID=0x01200014D5D1B453792C4090DEF6AE533EDD9D&id=%2Fsites%2FTJP%2DTKR%2DTKR%2DTDK%2D7687%2FShared%20Documents%2FACT%ED%91%9C%EC%A4%80%EB%A5%98&ovuser=7e452255%2D946f%2D4f17%2D800a%2Da0fb6835dc6c%2CHayoon%2EKang%40tdk%2Ecom&TeamsCID=43e411f5%2D1338%2D45fc%2Da98c%2Df46874929d22&OR=Teams%2DHL&CT=1780639456892&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNjA1MTQxNjcxMyIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D'
    }
];