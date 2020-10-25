import { createWebHistory, createRouter } from 'vue-router';
import Inicio from '../components/Inicio.vue'
import Formulario from '../components/Formulario.vue'
import Usuarios from '../components/Usuarios.vue'

const routes = [
    { path: '/', name: 'Inicio', component: Inicio },
    { path: '/formulario', name: 'Formulario', component: Formulario },
    { path: '/usuarios', name: 'Usuarios', component: Usuarios },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router