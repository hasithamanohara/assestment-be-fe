import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  pickerContainer: { marginVertical: 8 },
  picker: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginVertical: 8, backgroundColor: '#fff' },
  label: {
    marginBottom: 4,
    color: '#333',
    fontWeight: '500'
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4
  }
});

export default styles;
