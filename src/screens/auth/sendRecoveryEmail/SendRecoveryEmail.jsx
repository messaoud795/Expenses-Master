import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const SendRecoveryEmail = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    // Dispatch or API call to send recovery email
    console.log('Reset link sent to:', email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Recovery</Text>

      {/* <Image
        source={require('../assets/email_icon.png')} // adjust path to your icon
        style={styles.icon}
        resizeMode="contain"
      /> */}

      <Text style={styles.heading}>Forgot your password?</Text>
      <Text style={styles.subheading}>
        Enter your email address and we will send you a link to reset your
        password
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>RESET PASSWORD</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backLink}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SendRecoveryEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    backgroundColor: '#2bb3b3',
    width: '100%',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    paddingVertical: 16,
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  subheading: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#2bb3b3',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  backLink: {
    fontSize: 16,
    color: '#2bb3b3',
    textDecorationLine: 'underline',
  },
});
