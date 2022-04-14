import { Server } from 'socket.io';
import {
	ServerToClientEvents,
	ClientToServerEvents,
	InterServerEvents,
	SocketData,
	RealtimeData
} from '@portbullio/shared/src/types';
import getAllMajorIndicesDataSubscribers from './getAllMajorIndicesDataSubscribers';
import transformMajorIndexData from './transformMajorIndexData';

export default async function broadcastMajorIndicesData(
	io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
	majorIndicesData: RealtimeData[]
) {
	const allSubscribers = await getAllMajorIndicesDataSubscribers();

	allSubscribers.forEach(subscriberId => {
		io.to(subscriberId).emit('MAJOR_INDICES_DATA', transformMajorIndexData(majorIndicesData));
	});
}
