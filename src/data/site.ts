import { siteUrl } from './site-config.mjs';

const initialFare = { distanceKm: 2, priceFrom: 1800, currency: 'JPY' } as const;
const initialFareText = `${initialFare.distanceKm}km ${initialFare.priceFrom.toLocaleString('ja-JP')}円〜`;
const serviceAreas = ['都町', '西大分〜鶴崎方面'] as const;

export const site = {
  url: siteUrl,
  name: 'スピードチング',
  phone: '080-3957-6137',
  phoneHref: 'tel:08039576137',
  internationalPhone: '+81-80-3957-6137',
  postalCode: '870-0953',
  address: '大分県大分市下郡東',
  station: '牧駅から徒歩8分',
  businessDays: '金・土・日・祝',
  businessHours: '20:00〜翌3:00',
  closedDays: '月曜日〜木曜日',
  reservation: '事前予約にて年中受付しております。',
  payment: '現金',
  parking: 'あり',
  serviceAreas,
  serviceArea: serviceAreas.join('、'),
  initialFare,
  initialFareText,
  title: 'スピードチング｜大分市の運転代行・初乗り2km 1,800円〜',
  description:
    `大分市の運転代行「スピードチング」。即対応エリアは都町、西大分〜鶴崎方面。初乗り${initialFareText}。金・土・日・祝20:00〜翌3:00、事前予約にて年中受付。車のお預かりも。電話080-3957-6137。`,
} as const;
