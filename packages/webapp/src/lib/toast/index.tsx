import { v4 as uuid } from 'uuid';
import { render } from 'react-dom';
import Toasts from './Toasts';
import { Theme, Message, ToastPosition } from './types';

const positions = [
	'topLeft',
	'topRight',
	'topCenter',
	'bottomLeft',
	'bottomRight',
	'bottomCenter'
] as const;

class Toast {
	#rootElem: HTMLElement;

	#messages: Map<ToastPosition, Message[]>;

	#defaultDuration: number;

	#defaultMaxNumOfMessages: number;

	constructor() {
		this.#rootElem = document.getElementById('toast-root') as HTMLElement;
		this.#defaultDuration = 3000;
		this.#messages = new Map(positions.map(position => [position, []]));
		this.#defaultMaxNumOfMessages = 0;
	}

	#closeMessage(idToDelete: string, position: ToastPosition) {
		const indexToDelete = (this.#messages.get(position) as Message[]).findIndex(
			({ id }) => id === idToDelete
		);
		if (indexToDelete === -1) return;

		(this.#messages.get(position) as Message[]).splice(indexToDelete, 1);
		render(
			<>
				{positions.map(pos => (
					<Toasts
						position={pos}
						messages={this.#messages.get(pos) as Message[]}
						closeMessage={this.#closeMessage.bind(this)}
					/>
				))}
			</>,
			this.#rootElem
		);
	}

	#autoCloseMessage(duration: number, position: ToastPosition, id: string) {
		setTimeout(
			() => {
				this.#closeMessage(id, position);
			},
			duration,
			this
		);
	}

	#hasReachedMaximum(position: ToastPosition, maxNumOfMessages: number) {
		if (maxNumOfMessages <= 0) return false;
		return (this.#messages.get(position) as Message[]).length >= maxNumOfMessages;
	}

	#dequeueOldestMessage(position: ToastPosition) {
		(this.#messages.get(position) as Message[]).shift();
	}

	success(
		message: string,
		theme: Theme = 'light',
		position: ToastPosition = 'topCenter',
		duration = this.#defaultDuration,
		maxNumOfMessages = this.#defaultMaxNumOfMessages
	) {
		if (this.#hasReachedMaximum(position, maxNumOfMessages)) this.#dequeueOldestMessage(position);
		const id = uuid();
		(this.#messages.get(position) as Message[]).push({
			id,
			message,
			theme,
			type: 'success',
			duration
		});

		render(
			<>
				{positions.map(pos => (
					<Toasts
						position={pos}
						messages={this.#messages.get(pos) as Message[]}
						closeMessage={this.#closeMessage.bind(this)}
					/>
				))}
			</>,
			this.#rootElem
		);
		this.#autoCloseMessage(duration, position, id);
	}

	warning(
		message: string,
		theme: Theme = 'light',
		position: ToastPosition = 'topCenter',
		duration = this.#defaultDuration,
		maxNumOfMessages = this.#defaultMaxNumOfMessages
	) {
		if (this.#hasReachedMaximum(position, maxNumOfMessages)) this.#dequeueOldestMessage(position);
		const id = uuid();
		(this.#messages.get(position) as Message[]).push({
			id,
			message,
			theme,
			type: 'warning',
			duration
		});

		render(
			<>
				{positions.map(pos => (
					<Toasts
						position={pos}
						messages={this.#messages.get(pos) as Message[]}
						closeMessage={this.#closeMessage.bind(this)}
					/>
				))}
			</>,
			this.#rootElem
		);
		this.#autoCloseMessage(duration, position, id);
	}

	error(
		message: string,
		theme: Theme = 'light',
		position: ToastPosition = 'topCenter',
		duration = this.#defaultDuration,
		maxNumOfMessages = this.#defaultMaxNumOfMessages
	) {
		if (this.#hasReachedMaximum(position, maxNumOfMessages)) this.#dequeueOldestMessage(position);
		const id = uuid();
		(this.#messages.get(position) as Message[]).push({
			id,
			message,
			theme,
			type: 'error',
			duration
		});

		render(
			<>
				{positions.map(pos => (
					<Toasts
						position={pos}
						messages={this.#messages.get(pos) as Message[]}
						closeMessage={this.#closeMessage.bind(this)}
					/>
				))}
			</>,
			this.#rootElem
		);
		this.#autoCloseMessage(duration, position, id);
	}

	info(
		message: string,
		theme: Theme = 'light',
		position: ToastPosition = 'topCenter',
		duration = this.#defaultDuration,
		maxNumOfMessages = this.#defaultMaxNumOfMessages
	) {
		if (this.#hasReachedMaximum(position, maxNumOfMessages)) this.#dequeueOldestMessage(position);
		const id = uuid();
		(this.#messages.get(position) as Message[]).push({
			id,
			message,
			theme,
			type: 'info',
			duration
		});

		render(
			<>
				{positions.map(pos => (
					<Toasts
						position={pos}
						messages={this.#messages.get(pos) as Message[]}
						closeMessage={this.#closeMessage.bind(this)}
					/>
				))}
			</>,
			this.#rootElem
		);
		this.#autoCloseMessage(duration, position, id);
	}
}

export default new Toast();
