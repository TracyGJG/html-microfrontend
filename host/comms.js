export const sendToRemote = sendMessage("[title='remote']");

function sendMessage(target) {
	return data => {
		try {
			const payload = JSON.stringify(data);
			const destination = target
				? document.querySelector(target).contentWindow
				: window.parent;
			destination.postMessage(payload, '*');
		} catch (err) {
			console.error(err.message);
		}
	};
}

export const receiveFromRemote = receiveMessage('Remote');

function receiveMessage(target) {
	return eventHandler => {
		window.addEventListener('message', ({ data }) => {
			try {
				const payload = JSON.parse(data);
				if (payload.topic && payload.data) {
					eventHandler(payload.topic, payload.data);
				} else {
					throw Error(`Invalid message from ${target}`);
				}
			} catch (err) {
				console.error(err.message);
			}
		});
	};
}
