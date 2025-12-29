import api from './api';

// Mude para 'export default' aqui
const taskService = {
    async getTasks(userId: string) {
        const response = await api.get(`/tasks/user/${userId}`);
        return response.data;
    },

    async createTask(title: string, duration: number, userId: string) {
        const response = await api.post('/tasks', { title, duration, userId });
        return response.data;
    },

    async completeTask(taskId: string, userId: string) {
        const response = await api.patch(`/tasks/${taskId}/complete`, { userId });
        return response.data;
    }
};

export default taskService;