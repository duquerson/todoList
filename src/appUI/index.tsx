import React from 'react'
import { Layout } from '../components/Layout'
import { Header } from '../components/Header'
import { TodoList } from '../components/TodoList'
import { TodoActions } from '../components/TodoActions'
import { Footer } from '../components/Footer'
export const AppUI: React.FC = () => {
    return (
        <Layout>
            <Header />
            <TodoList />
            <TodoActions />
            <Footer />
        </Layout>
    )
}

