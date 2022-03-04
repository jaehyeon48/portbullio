import { Worker } from 'worker_threads';

export default function calculateAvgCost(transactions: any) {
	return new Promise((resolve, reject) => {
		const worker = new Worker('./src/worker/worker.js', { workerData: transactions });
		worker.once('message', resolve);
		worker.on('error', reject);
		worker.on('exit', code => {
			if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
		});
	});
}
