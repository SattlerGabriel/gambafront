import type { Round } from './round';

export type Guild = {
	id: string;
	name: string;
	round: Round[];
	requiredPlayers: string;
	creatorId: string;
	createdDate: Date;
	updatedDate: Date;
};
