import axios from 'axios';
import { Platform } from 'react-native';

const api = axios.create({
    // Se estiver no emulador Android: http://10.0.2.2:3000
    // Se estiver no celular físico: use o seu IP do ipconfig (ex: http://192.168.1.5:3000)
    baseURL: Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000',
});

export default api;