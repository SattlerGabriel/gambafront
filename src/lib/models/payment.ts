import type { User } from './user';

export type Payment = {
	id: string;
	amount: number;
	sender: User;
	receiver: User;
	timestamp: Date;
	createdAt: Date;
	updatedAt: Date;
};
