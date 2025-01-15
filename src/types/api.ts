export type GenderEnum = {
  male: 1;
  female: 2;
};

type CheckIn = {
  childCheckinId: string | null;
  childId: string | null;
  institutionId: string | null;
  groupId: string | null;
  checkinTime: string | null;
  pickupTime: string | null;
  pickupRelationId: string | null;
  goHomeWithChildId: string | null;
  checkoutTime: string | null;
  checkinLoginId: string | null;
  checkoutLoginId: string | null;
  autoCheckedOut: boolean;
  deletedAt: string | null;
  hours: number | null;
  checkinStatements: string | null;
};

export type Child = {
  childId: string | null;
  institutionId: string | null;
  groupId: string | null;
  createdTime: string | null;
  name: {
    fullName: string | null;
    firstName: string | null;
    middleName: string | null;
    lastName: string | null;
  };
  birthday: string | null;
  homeAddress: string | null;
  extraInfo: string | null;
  language: string | null;
  nationality: string | null;
  birthplace: string | null;
  gender: GenderEnum | number;
  startDate: string | null;
  endDate: string | null;
  leavingReason: string | null;
  isTestChild: boolean;
  relations: string | null;
  image: {
    small: string | null;
    large: string | null;
    empty: boolean;
    colorCode: number | null;
  };
  isSleeping: boolean;
  naps: string[] | null;
  hasVacation: boolean;
  isSick: boolean;
  isAbsent: boolean;
  leaves: string[] | null;
  onBus: boolean;
  onTrip: boolean;
  statuses: string[] | null;
  statusRegistrations: string[] | null;
  checkins: CheckIn[];
  checkedIn: boolean;
  checkinTime: string | null; // "2025-01-13T11:26:55+00:00";
  pickupTime: string | null; // "2025-01-13T22:00:00+00:00";
  pickupRelationId: string | null;
  pickupName: string | null;
};

export type ChildrenApiResponse = {
  children: Child[];
};

export type ApiMutationResponse = {
  childCheckinId: string | null;
  childId: string | null;
  institutionId: string | null;
  groupId: string | null;
  checkinTime: string | null;
  pickupTime: string | null;
  pickupRelationId: string | null;
  goHomeWithChildId: string | null;
  checkoutTime: string | null;
  checkinLoginId: string | null;
  checkoutLoginId: string | null;
  autoCheckedOut: boolean;
  deletedAt: string | null;
  hours: number | null;
  checkinStatements: string | null;
};
