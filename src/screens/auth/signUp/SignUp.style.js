import {StyleSheet} from 'react-native';

export const signUpStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2bb3b3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#fffb00',
    padding: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  loginLink: {
    fontSize: 16,
    color: '#000',
  },
});
