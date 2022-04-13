import { useEffect, useState } from 'react';
import { MajorIndices } from '@portbullio/shared/src/types';
import { useSocketIo } from '@hooks/index';

export default function useMajorIndicesData(): MajorIndices | undefined {
	const [majorIndicesData, setMajorIndicesData] = useState<MajorIndices>();
	const socket = useSocketIo();

	useEffect(() => {
		socket.emit('REQ_MAJOR_INDICES_DATA');
		socket.on('MAJOR_INDICES_DATA', data => setMajorIndicesData(data));
	}, [socket]);

	return majorIndicesData;
}
