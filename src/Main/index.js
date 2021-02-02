import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Repository from '../components/Repository'

import {
    Container,
    Title,
    Form,
    Input,
    Submit,
    List
} from './styles'

import api from '../services/api'
import getRealm from '../services/realm'

export default () => {

    const [input, setInput] = useState('')
    const [error, setError] = useState(false)

    const [repositories, setRepositories] = useState([])

    useEffect(() => {
        async function loadRepositories() {
            const realm = await getRealm()

            const data = realm.objects('Repository').sorted('stars', true)

            setRepositories(data)
        }
        loadRepositories()
    }, [])

    async function saveRepository(repository) {

        const data = {
            id: repository.id,
            name: repository.name,
            fullName: repository.full_name,
            description: repository.description,
            stars: repository.stargazers_count,
            forks: repository.forks_count
        }

        const realm = await getRealm()

        realm.write(() => {
            realm.create('Repository', data, 'modified')
        })

        return data

    }

    async function handleAddRepository() {
        try {
            const response = await api.get(`/repos/${input}`)

            setInput('')
            await saveRepository(response.data)
            setError(false)
            Keyboard.dismiss()

        } catch (error) {
            setError(true)
            console.log(error)
        }
    }

    async function handleRefreshRepository(repository) {
        const response = await api.get(`/repos/${repository.fullName}`)

        const data = await saveRepository(response.data)

        setRepositories(repositories.map(repo => (repo.id === data.id ? data : repo)))
    }

    async function handleDeleteRepository(repository, index) {
        const realm = await getRealm()

        realm.write(() => {
            realm.delete(repository);
        });

        const arr = [...repositories]
        arr.splice(index, 1)
        setRepositories(arr)
    }

    return (
        <Container>
            <Title>Repositórios</Title>

            <Form>

                <Input
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={error}
                    placeholder="Procurar repositório..."
                    value={input}
                    onChangeText={text => setInput(text)}
                />

                <Submit onPress={handleAddRepository}>
                    <Icon name="add" size={22} color="#fff" />
                </Submit>

            </Form>

            <List
                keyboardShouldPersistTaps="handled"
                data={repositories}
                key={({ item }) => `${item.id}`}
                renderItem={({ item, index }) => (
                    <Repository data={item} onRefresh={() => handleRefreshRepository(item)} onDelete={() => handleDeleteRepository(item, index)} />
                )}
            >

            </List>
        </Container>
    )
}