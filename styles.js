import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '2%',
    paddingBottom: 20,
  },
  resultMOA: {
    fontSize: 24,
    fontWeight: '700',
    color: 'darkolivegreen',
    textAlign: 'center',
  },
  resultClicks: {
    fontSize: 24,
    fontWeight: '700',
    color: 'coral',
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    color: '#fff',
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: 13,
  },
  offsetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  inputOffset: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    color: '#fff',
    marginHorizontal: 10,
    paddingHorizontal: 15,
    fontSize: 13,
    textAlign: 'center',
  },
  directionButton: {
    padding: 10,
    backgroundColor: '#222',
    borderRadius: 5,
  },
  directionText: {
    color: '#aaa',
    fontSize: 24,
    fontWeight: 'bold',
  },
  activeDirection: {
    color: 'coral',
  },
  button: {
    backgroundColor: 'coral',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 8,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#eee',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  resultRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  resultHeaderCell: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultCell: {
    fontSize: 16,
    color: '#ccc',
    paddingVertical: 2,
  },
  resultCellLabel: {
    flex: 1.5,
    fontWeight: 'bold',
    color: '#ddd',
  },
  resultCellValue: {
    flex: 1,
    textAlign: 'center',
  },
  resultCellDirection: {
    flex: 1.5,
    textAlign: 'right',
    fontWeight: 'bold',
    color: 'coral',
  },
});
