import type { Payment } from './payment';

export type Round = {
	id: string;
	roundStarter: string;
	payments: Payment[];
	guildId: string;
	timestamp: Date;
	createdDate: Date;
	updatedDate: Date;
};
