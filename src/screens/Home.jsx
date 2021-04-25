import React, {useState} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useStore} from '../store/user';
import DateTimePicker from '@react-native-community/datetimepicker';
import format from 'date-fns/format';
import {isToday} from 'date-fns';

const {width} = Dimensions.get('window');

export const Home = props => {
  const {name} = useStore(state => state.user ?? {name: ''});
  const todos = useStore(state => state.todos);
  const deleteTodo = useStore(state => state.deleteTodo);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        padding: 20,
      }}>
      <Text style={{fontSize: 30}}>Hello {name} </Text>
      <View style={{flex: 1}}>
        {todos.filter(i => isToday(new Date(i.createdAt))).length > 0 ? (
          <ScrollView style={{marginVertical: 10, width: '100%'}}>
            <Text style={{width: '100%', fontSize: 18}}>Today's Todos</Text>
            {todos
              .filter(i => isToday(new Date(i.createdAt)))
              .map((i, index) => {
                return (
                  <View
                    key={`${i.id}-${index}`}
                    style={{
                      borderRadius: 5,
                      margin: 10,
                      padding: 10,
                      backgroundColor: '#faf',
                      width: width - 40,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        style={{width: '100%'}}
                        onPress={() =>
                          props.navigation.navigate('EDIT_TODO', {todo: i})
                        }>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                          {i.title}
                        </Text>
                        <Text>
                          Created At :-{' '}
                          {format(new Date(i.createdAt), 'dd/MM/yyyy')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => deleteTodo(i)}>
                      <Icon
                        name="trash"
                        type="font-awesome"
                        color="black"
                        size={25}
                        containerStyle={{
                          backgroundColor: 'white',
                          alignSelf: 'center',
                          padding: 5,
                          borderRadius: 5,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
          </ScrollView>
        ) : (
          <View style={{flex: 1, marginTop: 30}}>
            <Text style={{fontSize: 18}}>No todos for today</Text>
          </View>
        )}
      </View>
      <View style={{flex: 1}}>
        {todos.filter(i => !isToday(new Date(i.createdAt))).length > 0 ? (
          <ScrollView style={{marginVertical: 10, width: '100%'}}>
            <Text style={{width: '100%', fontSize: 18}}>All Todos</Text>
            {todos
              .filter(i => !isToday(new Date(i.createdAt)))
              .map((i, index) => {
                return (
                  <View
                    key={`${i.id}-${index}`}
                    style={{
                      borderRadius: 5,
                      margin: 10,
                      padding: 10,
                      backgroundColor: '#faf',
                      width: width - 40,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View style={{flex: 1}}>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('EDIT_TODO', {todo: i})
                        }
                        style={{width: '100%'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                          {i.title}
                        </Text>
                        <Text>
                          Created At :-{' '}
                          {format(new Date(i.createdAt), 'dd/MM/yyyy')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => deleteTodo(i)}>
                      <Icon
                        name="trash"
                        type="font-awesome"
                        color="black"
                        size={25}
                        containerStyle={{
                          backgroundColor: 'white',
                          alignSelf: 'center',
                          padding: 5,
                          borderRadius: 5,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
          </ScrollView>
        ) : (
          <View style={{flex: 1, marginTop: 30}}>
            <Text style={{fontSize: 18}}>No todos</Text>
          </View>
        )}
      </View>
      <View style={{width: '100%', justifyContent: 'flex-end'}}>
        <Icon
          raised
          name="plus"
          type="font-awesome"
          color="#f50"
          size={30}
          containerStyle={{backgroundColor: 'white', alignSelf: 'flex-end'}}
          onPress={() => setShow(true)}
        />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          minimumDate={new Date()}
          display="default"
          dateFormat="day month year"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShow(false);
            setDate(currentDate);
            if (event.type === 'set') {
              props.navigation.navigate('CREATE_TODO', {
                date: currentDate.toString(),
              });
            }
          }}
        />
      )}
    </View>
  );
};
