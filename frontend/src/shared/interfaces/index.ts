import { ITranslationKeys } from 'services/translation';

export interface ITimeLeft {
  id: number,
  value: string,
}
export enum ESocial {
  Medium,
  Telegram,
  Twitter,
}
export interface ISocials {
  value: string | null;
  type: ESocial;
}
