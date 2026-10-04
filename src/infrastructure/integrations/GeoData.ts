export interface RegionGisData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  participantsCount: number;
  enterprisesCount: number;
  loansDisbursedEtb: number;
  femaleParticipationPercent: number;
  status: 'High Performance' | 'On Track' | 'Needs Support';
}

export const ETHIOPIA_REGIONS_GIS: RegionGisData[] = [
  {
    id: 'reg-oromia',
    name: 'Oromia Region',
    lat: 8.5414,
    lng: 39.2689,
    participantsCount: 18,
    enterprisesCount: 12,
    loansDisbursedEtb: 950000,
    femaleParticipationPercent: 52.4,
    status: 'High Performance',
  },
  {
    id: 'reg-amhara',
    name: 'Amhara Region',
    lat: 11.5936,
    lng: 37.3908,
    participantsCount: 11,
    enterprisesCount: 7,
    loansDisbursedEtb: 540000,
    femaleParticipationPercent: 48.2,
    status: 'On Track',
  },
  {
    id: 'reg-sidama',
    name: 'Sidama Region',
    lat: 7.0504,
    lng: 38.4955,
    participantsCount: 8,
    enterprisesCount: 5,
    loansDisbursedEtb: 420000,
    femaleParticipationPercent: 58.0,
    status: 'High Performance',
  },
  {
    id: 'reg-addis',
    name: 'Addis Ababa City Admin',
    lat: 9.0320,
    lng: 38.7469,
    participantsCount: 6,
    enterprisesCount: 4,
    loansDisbursedEtb: 380000,
    femaleParticipationPercent: 54.0,
    status: 'On Track',
  },
  {
    id: 'reg-somali',
    name: 'Somali Region',
    lat: 9.3514,
    lng: 42.7956,
    participantsCount: 3,
    enterprisesCount: 2,
    loansDisbursedEtb: 140000,
    femaleParticipationPercent: 41.5,
    status: 'Needs Support',
  },
  {
    id: 'reg-central',
    name: 'Central Ethiopia',
    lat: 7.5500,
    lng: 37.8500,
    participantsCount: 2,
    enterprisesCount: 1,
    loansDisbursedEtb: 90000,
    femaleParticipationPercent: 62.0,
    status: 'On Track',
  },
  {
    id: 'reg-tigray',
    name: 'Tigray Region',
    lat: 13.4967,
    lng: 39.4700,
    participantsCount: 1,
    enterprisesCount: 1,
    loansDisbursedEtb: 150000,
    femaleParticipationPercent: 50.0,
    status: 'On Track',
  },
  {
    id: 'reg-diredawa',
    name: 'Dire Dawa Administration',
    lat: 9.5931,
    lng: 41.8661,
    participantsCount: 1,
    enterprisesCount: 1,
    loansDisbursedEtb: 80000,
    femaleParticipationPercent: 45.0,
    status: 'On Track',
  },
];
