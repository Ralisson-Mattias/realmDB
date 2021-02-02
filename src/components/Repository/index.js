import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
    Container,
    Name,
    Description,
    Stats,
    Stat,
    StatCount,
    Refresh,
    RefreshText,
    Trash,
    TrashText,
    ButtonsHandle
} from './styles'

const Repository = ({ data, onRefresh, onDelete }) => {
    return (
        <Container>
            <Name>{data.name}</Name>

            <Description>{data.description}</Description>

            <Stats>
                <Stat>
                    <Icon name="star" size={16} color="#333" />
                    <StatCount>{data.stars}</StatCount>
                </Stat>

                <Stat>
                    <Icon name="code-fork" size={16} color="#333" />
                    <StatCount>{data.forks}</StatCount>
                </Stat>
            </Stats>

            <ButtonsHandle>
                <Refresh onPress={onRefresh}>
                    <Icon name="refresh" color="#7159c1" size={16} />
                    <RefreshText>Atualizar</RefreshText>
                </Refresh>

                <Trash onPress={onDelete}>
                    <Icon name="trash" color="#ff7272" size={16} />
                    <TrashText>Excluir</TrashText>
                </Trash>
            </ButtonsHandle>

        </Container>
    )
}

export default Repository