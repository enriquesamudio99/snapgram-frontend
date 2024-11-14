import { getEnvVariables } from '../../helpers';
import { io } from 'socket.io-client';

const { VITE_BACKEND_URL } = getEnvVariables();

const socket = io(VITE_BACKEND_URL);

export default socket;