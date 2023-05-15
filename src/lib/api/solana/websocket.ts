const endpoint = 'wss://icarus.helius.xyz/?api-key=f8ec32a6-4f01-4345-afb5-d993bf50b77d';
const redirectEndpoint = 'https://typedwebhook.tools/webhook/11d0c334-10c1-45a7-98a0-cc131fa7b02a';

let socket: WebSocket;
let redirectSocket: WebSocket;

export function connect() {
  socket = new WebSocket(endpoint);

  socket.addEventListener('open', () => {
    console.log('WebSocket connection opened');
    redirectSocket = new WebSocket(redirectEndpoint);
  });

  socket.addEventListener('message', (event: { data: any; }) => {
    console.log(`Received message: ${event.data}`);
    if (redirectSocket.readyState === WebSocket.OPEN) {
      redirectSocket.send(event.data);
      console.log(event.data)
    }
  });

  socket.addEventListener('close', () => {
    console.log('WebSocket connection closed');
    if (redirectSocket) {
      redirectSocket.close();
    }
  });

  socket.addEventListener('error', (error: any) => {
    console.error('WebSocket connection error', error);
    if (redirectSocket) {
      redirectSocket.close();
    }
  });
 
}

export function disconnect() {
  if (socket) {
    socket.close();
    socket = null;
  }
  if (redirectSocket) {
    redirectSocket.close();
    redirectSocket = null;
  }
}

export function send(message: any) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.log('WebSocket connection not open');
  }
}
