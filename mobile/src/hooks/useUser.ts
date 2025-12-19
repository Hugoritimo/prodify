import { useState, useEffect } from 'react';
import api from '../services/api';

export function useUser(username: string) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const response = await api.get(`/user/${username}`);
            setData(response.data);
        } catch (error) {
            console.error("Erro ao buscar usuário", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (username) fetchUser();
    }, [username]);

    return { data, loading, refresh: fetchUser };
}