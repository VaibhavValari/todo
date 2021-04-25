import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import {useStore} from '../store/user';

export const Login = props => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const login = useStore(state => state.login);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        padding: 20,
      }}>
      <Text style={{fontSize: 40, marginBottom: 50, fontWeight: 'bold'}}>
        Todo App
      </Text>
      <Input
        value={email}
        onChangeText={e => setEmail(e)}
        label="Email"
        inputStyle={{borderWidth: 1}}
      />
      <Input
        value={name}
        onChangeText={e => setName(e)}
        label="Name"
        inputStyle={{borderWidth: 1}}
      />
      <Input
        value={password}
        onChangeText={e => setPassword(e)}
        label="Password"
        secureTextEntry
        inputStyle={{borderWidth: 1}}
      />
      <Button
        title="Login"
        buttonStyle={{width: 200, height: 50, borderRadius: 10}}
        onPress={() => {
          login(email, password, name);
        }}
      />
    </ScrollView>
  );
};
