import { Base } from './base.type';
import { Language } from './language.type';

export type User = Base & {
	username: string;
	language: Language;
	theme: 'auto' | 'light' | 'dark';
};
