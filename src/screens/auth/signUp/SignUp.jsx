import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../actions/authActions';
import {signUpStyle} from './SignUp.style';

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (key, value) => {
    setFormData(prev => ({...prev, [key]: value}));
  };

  const handleSubmit = () => {
    dispatch(registerUser(formData));
  };

  return (
    <View style={signUpStyle.container}>
      <Text style={signUpStyle.title}>Sign Up</Text>

      <TextInput
        placeholder="Name"
        placeholderTextColor="#888"
        style={signUpStyle.input}
        value={formData.name}
        onChangeText={text => handleChange('name', text)}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={signUpStyle.input}
        value={formData.email}
        onChangeText={text => handleChange('email', text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        style={signUpStyle.input}
        value={formData.password}
        onChangeText={text => handleChange('password', text)}
        secureTextEntry
      />

      <TouchableOpacity style={signUpStyle.button} onPress={handleSubmit}>
        <Text style={signUpStyle.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={signUpStyle.loginLink}>Have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
