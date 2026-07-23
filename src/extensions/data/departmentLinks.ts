import { DepartmentLinkSet } from '../models/types';

/**
 * 부문 채널 링크 데이터
 *
 * 기존 구조:
 * {
 *   ko: [],
 *   en: [],
 *   ja: []
 * }
 *
 * 변경 구조:
 * [
 *   {
 *     text: { ko, en, ja },
 *     url 또는 disabled
 *   }
 * ]
 *
 * 이유:
 * DepartmentLinkSet 타입을 DepartmentLink[]로 바꿨기 때문에
 * 언어별 배열이 아니라 text만 다국어로 관리해야 함.
 */
export const DEPARTMENT_LINKS: DepartmentLinkSet = [
    {
        text: {
            ko: 'TKR-정보시스템부',
            en: 'TKR-IT Department',
            ja: 'TKR-情報システム部'
        },
        url: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-tkritsection01-6499'
    },
    {
        text: {
            ko: 'TKR-DX팀',
            en: 'TKR-DX Team',
            ja: 'TKR-DXチーム'
        },
        url: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TEG-EMK-8690'
    },
    {
        text: {
            ko: 'TKR-경리부',
            en: 'TKR-Accounting Department',
            ja: 'TKR-經理部'
        },
        url: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-accounting-3944'
    },
    {
        text: {
            ko: 'TKR-기획부',
            en: 'TKR-Planning HQ',
            ja: 'TKR-企画部'
        },
        disabled: true
    },
    {
        text: {
            ko: 'TKR-CORE제조부',
            en: 'TKR-CORE Production Department',
            ja: 'TKR-CORE製造部'
        },
        disabled: true
    },
    {
        text: {
            ko: 'TKR-권선제조부',
            en: 'TKR-COIL Production Department',
            ja: 'TKR-巻線製造部'
        },
        disabled: true
    },
    {
        text: {
            ko: 'TKR-생산기술부',
            en: 'TKR-Production Engineering Department',
            ja: 'TKR-生産技術部'
        },
        disabled: true
    },
    {
        text: {
            ko: 'TKR-제조기술부',
            en: 'TKR-Manufacturing Technology Department',
            ja: 'TKR-製造技術部'
        },
        disabled: true
    },
    {
        text: {
            ko: 'TKR-경영지원부',
            en: 'TKR-General Administrative Department',
            ja: 'TKR-経営支援部'
        },
        disabled: true
    },
    {
        text: {
            ko: 'TKR-SCM부',
            en: 'TKR-SCM Department',
            ja: 'TKR-SCM部'
        },
        disabled: true
    },
    {
        text: {
            ko: 'TKR-품질보증부',
            en: 'TKR-Quality Assurance Department',
            ja: 'TKR-品質保証部'
        },
        disabled: true
    },
    {
        text: {
            ko: 'TKR-기술부',
            en: 'TKR-Technical Department',
            ja: 'TKR-技術部'
        },
        disabled: true
    },
    {
        text: {
            ko: 'TKR-영업촉진부',
            en: 'TKR-Product Marketing Department',
            ja: 'TKR-営業促進部'
        },
        disabled: true
    },
    {
        text: {
            ko: 'TKR-설비개발부',
            en: 'TKR-Machinery Development Department',
            ja: 'TKR-設備開発部'
        },
        url: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR_MDD-11303'
    },
    {
        text: {
            ko: 'TKR-ACT표준류',
            en: 'TKR-ACT standards',
            ja: 'TKR-ACT標準類'
        },
        url: 'https://tdkgroup.sharepoint.com/sites/TJP-TKR-TKR-TDK-7687/Shared%20Documents/Forms/AllItems.aspx?e=5%3A04dc74500db24e7eb1dcc2fca4bda8f5&sharingv2=true&fromShare=true&at=9&CID=3ca7d6cc%2D6fd2%2D4004%2D8653%2De8f5b11285b2&FolderCTID=0x01200014D5D1B453792C4090DEF6AE533EDD9D&id=%2Fsites%2FTJP%2DTKR%2DTKR%2DTDK%2D7687%2FShared%20Documents%2FACT%ED%91%9C%EC%A4%80%EB%A5%98&ovuser=7e452255%2D946f%2D4f17%2D800a%2Da0fb6835dc6c%2CHayoon%2EKang%40tdk%2Ecom&TeamsCID=43e411f5%2D1338%2D45fc%2Da98c%2Df46874929d22&OR=Teams%2DHL&CT=1780639456892&clickparams=eyJBcHBOYW1lIjoiVGVhbXMtRGVza3RvcCIsIkFwcFZlcnNpb24iOiI0OS8yNjA1MTQxNjcxMyIsIkhhc0ZlZGVyYXRlZFVzZXIiOmZhbHNlfQ%3D%3D'
    }
];