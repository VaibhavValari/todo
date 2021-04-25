import {useRoute} from '@react-navigation/core';
import format from 'date-fns/format';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {useStore} from '../store/user';
import DateTimePicker from '@react-native-community/datetimepicker';

export const EditTodo = props => {
  const todo = useRoute().params.todo;
  const [title, setTitle] = useState(todo.title);
  const [des, setDesc] = useState(todo.description);
  const [date, setDate] = useState(todo.createdAt);
  const [show, setShow] = useState(false);
  const updateTodo = useStore(state => state.editTodo);

  return (
    <View style={{flex: 1, alignItems: 'center', padding: 20}}>
      <Text style={{fontSize: 30, marginBottom: 20}}>Edit Todo</Text>
      <Text style={{fontSize: 20}}>
        Date:- {format(new Date(date), 'dd/MM/yyyy')}
      </Text>
      <Input
        value={title}
        onChangeText={e => setTitle(e)}
        label="Title"
        inputStyle={{borderWidth: 1}}
      />
      <TouchableOpacity style={{width: '100%'}} onPress={() => setShow(true)}>
        <Input
          value={format(new Date(date), 'dd/MM/yyyy')}
          onChangeText={e => setTitle(e)}
          label="Date"
          inputStyle={{borderWidth: 1}}
          editable={false}
        />
      </TouchableOpacity>
      <Input
        value={des}
        onChangeText={e => setDesc(e)}
        label="Description"
        inputStyle={{borderWidth: 1, height: 150}}
        textAlignVertical="top"
      />
      <Button
        title="Update"
        buttonStyle={{width: 200, padding: 15, borderRadius: 10}}
        onPress={() => {
          updateTodo({
            id: todo.id,
            title,
            createdAt: date,
            description: des,
          });
          props.navigation.goBack();
        }}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(date)}
          mode="date"
          is24Hour={true}
          minimumDate={new Date(todo.createdAt)}
          display="default"
          dateFormat="day month year"
          onChange={(_, selectedDate) => {
            const currentDate = selectedDate || date;
            setShow(false);
            setDate(currentDate);
          }}
        />
      )}
    </View>
  );
};
