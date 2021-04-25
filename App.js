import React from 'react';
import {Text, ThemeProvider} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, EditTodo, Home, CreateTodo} from './src/screens/index';
import {useStore} from './src/store/user';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {Navigator, Screen} = createStackNavigator();

const Navigation = () => {
  const isUser = useStore(state => state.user !== undefined);
  const logout = useStore(state => state.logout);

  console.log(isUser);

  const headerRight = () => (
    <TouchableOpacity
      onPress={logout}
      style={{
        marginHorizontal: 10,
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#f1f1f1',
      }}>
      <Text style={{fontSize: 20}}>Logout</Text>
    </TouchableOpacity>
  );
  return (
    <NavigationContainer>
      <Navigator initialRouteName="LOGIN">
        {!isUser ? (
          <Screen
            name="LOGIN"
            component={Login}
            options={{headerShown: false}}
          />
        ) : (
          <>
            <Screen
              name="HOME"
              component={Home}
              options={{
                headerRight,
              }}
            />
            <Screen
              name="EDIT_TODO"
              component={EditTodo}
              options={{
                headerTitle: 'EDIT TODO',
                headerRight,
              }}
            />
            <Screen
              name="CREATE_TODO"
              component={CreateTodo}
              options={{
                headerTitle: 'CREATE TODO',
                headerRight,
              }}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
