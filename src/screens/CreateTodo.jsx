import {useRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {useStore} from '../store/user';
import {format} from 'date-fns';

export const CreateTodo = props => {
  const [title, setTitle] = useState('');
  const [des, setDesc] = useState('');
  const date = useRoute().params.date;
  const createTodo = useStore(state => state.addTodo);

  return (
    <View style={{flex: 1, alignItems: 'center', padding: 20}}>
      <Text style={{fontSize: 30, marginBottom: 20}}>Create Todo</Text>
      <Text style={{fontSize: 20}}>
        Date:- {format(new Date(date), 'dd/MM/yyyy')}
      </Text>
      <Input
        value={title}
        onChangeText={e => setTitle(e)}
        label="Title"
        inputStyle={{borderWidth: 1}}
      />
      <Input
        value={des}
        onChangeText={e => setDesc(e)}
        label="Description"
        inputStyle={{borderWidth: 1, height: 150}}
        textAlignVertical="top"
      />
      <Button
        title="Create"
        buttonStyle={{width: 200, padding: 15, borderRadius: 10}}
        onPress={() => {
          createTodo({
            id: Date.now(),
            title,
            createdAt: date,
            description: des,
          });
          props.navigation.goBack();
        }}
      />
    </View>
  );
};
