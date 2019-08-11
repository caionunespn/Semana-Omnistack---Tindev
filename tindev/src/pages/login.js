import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Logo from '../assets/logo.png';
import api from '../services/api';

export default function Login({navigation}) {

  const [user, setUser] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('user').then(user =>{
      if(user){
        navigation.navigate('Main', {user});
      }
    });
  }, []);
  async function handleLogin(){
    const response = await api.post('/devs',{username: user})
    const {_id} = response.data;

    await AsyncStorage.setItem('user', _id);
    navigation.navigate('Main', {user: _id});
  }

  return (
    <View style={styles.container}>
      <Image source={Logo}></Image>
      <TextInput 
        autoCapitalize='none'
        autoCorrect={false}
        placeholder='Digite aqui seu usuário no Github'
        placeholderTextColor='#999'
        style={styles.input}
        value = {user}
        onChangeText = {setUser}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.text}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5f5f5',
    padding: 30

  }, 
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    alignSelf:'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 10,
    paddingHorizontal: 15
  },
  text:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
  },
  input:{
    height: 46,
    alignSelf:'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15
  }
});

