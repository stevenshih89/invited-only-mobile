import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import auth from '@react-native-firebase/auth';
import {showToast} from 'helpers/showToast';
import {whiteColor} from 'constants/colors';
import {Satoshi500, Satoshi700} from 'constants/fonts';
import {RFValue} from 'react-native-responsive-fontsize';

import {AppSettingsQueries} from 'src/apiv2/queries/appSettingsQueries';

const FirestoreTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [writeLoading, setWriteLoading] = useState(false);
  const [readLoading, setReadLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [collection, setCollection] = useState<string>('');
  const [docId, setDocId] = useState<string>('');
  const [fieldName, setFieldName] = useState<string>('');
  const [fieldValue, setFieldValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const {data: firebaseCollections} = AppSettingsQueries.useFirebaseCollectionNameQuery();
  const currentUser = auth().currentUser;
  console.log('current user is', currentUser);

  const testConnection = async () => {
    setLoading(true);
    setError('');
    setResult('');

    try {
      await firestore()
        .collection('_test_connection')
        .doc('_test_doc')
        .set({
          timestamp: firestore.FieldValue.serverTimestamp(),
          testId: Math.random().toString(36).substring(7),
        });
      setResult('Firestore connection successful!');
      showToast('inviteMatch', 'Firestore connection successful!', 'Success');
    } catch (err: any) {
      console.error('Firestore connection test failed:', err);
      setError(`Connection error: ${err.message}`);
      showToast('inviteMatch', `Connection error: ${err.message}`, 'Error');
    } finally {
      setLoading(false);
    }
  };

  const readDocument = async () => {
    if (!collection) {
      setError('Please enter a collection name');
      return;
    }

    if (!docId) {
      setError('Please enter a document ID');
      return;
    }

    setReadLoading(true);
    setError('');
    setResult('');

    try {
      console.log('triggering call to', collection, docId);

      const docRef = await firestore().collection(collection).doc(docId).get();
      console.log('Complete call', collection, docId);
      if (docRef.exists) {
        const data = docRef.data();
        setResult(JSON.stringify(data, null, 2));
        showToast('inviteMatch', 'Document read successfully', 'Success');
      } else {
        setResult('Document does not exist');
        showToast('inviteMatch', 'Document does not exist', 'Warning');
      }
    } catch (err: any) {
      console.error('Error reading document:', err);
      setError(`Read error: ${err.message}`);
      showToast('inviteMatch', `Read error: ${err.message}`, 'Error');
    } finally {
      setReadLoading(false);
    }
  };

  const writeDocument = async () => {
    if (!collection) {
      setError('Please enter a collection name');
      return;
    }

    if (!docId) {
      setError('Please enter a document ID');
      return;
    }

    if (!fieldName) {
      setError('Please enter a field name');
      return;
    }

    setWriteLoading(true);
    setError('');
    setResult('');

    try {
      // Create an object with the field name and value
      const updateData: Record<string, any> = {};
      updateData[fieldName] = fieldValue;
      console.log('updating ', collection, docId, updateData);

      firestore()
        .collection(collection)
        .doc(docId)
        .update(updateData)
        .then(() => {
          setResult(`Successfully updated document ${docId} in collection ${collection}`);
        });

      showToast('inviteMatch', 'Document updated successfully', 'Success');
    } catch (err: any) {
      console.error('Error writing document:', err);
      setError(`Write error: ${err.message}`);
      showToast('inviteMatch', `Write error: ${err.message}`, 'Error');
    } finally {
      setWriteLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Firestore Test Tool</Text>

      {/* Connection Test */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Connection</Text>
        <TouchableOpacity style={styles.button} onPress={testConnection} disabled={loading}>
          {loading ? <ActivityIndicator color={whiteColor} /> : <Text style={styles.buttonText}>Test Firestore Connection</Text>}
        </TouchableOpacity>
      </View>

      {/* Available Collections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Collections</Text>
        <ScrollView style={styles.collectionsContainer}>
          {Object.entries(firebaseCollections || {}).map(([key, value], index) => (
            <TouchableOpacity key={index} style={styles.collectionItem} onPress={() => setCollection(value)}>
              <Text style={styles.collectionText}>
                {key}: {value}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Read Document */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Read Document</Text>

        <Text style={styles.label}>Collection:</Text>
        <TextInput
          style={styles.input}
          value={collection}
          onChangeText={setCollection}
          placeholder="Enter collection name"
          placeholderTextColor="rgba(255,255,255,0.5)"
        />

        <Text style={styles.label}>Document ID:</Text>
        <TextInput
          style={styles.input}
          value={docId}
          onChangeText={setDocId}
          placeholder="Enter document ID"
          placeholderTextColor="rgba(255,255,255,0.5)"
        />

        <TouchableOpacity style={styles.button} onPress={readDocument} disabled={readLoading}>
          {readLoading ? <ActivityIndicator color={whiteColor} /> : <Text style={styles.buttonText}>Read Document</Text>}
        </TouchableOpacity>
      </View>

      {/* Write Document */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Update Document</Text>

        <Text style={styles.label}>Collection:</Text>
        <TextInput
          style={styles.input}
          value={collection}
          onChangeText={setCollection}
          placeholder="Enter collection name"
          placeholderTextColor="rgba(255,255,255,0.5)"
        />

        <Text style={styles.label}>Document ID:</Text>
        <TextInput
          style={styles.input}
          value={docId}
          onChangeText={setDocId}
          placeholder="Enter document ID"
          placeholderTextColor="rgba(255,255,255,0.5)"
        />

        <Text style={styles.label}>Field Name:</Text>
        <TextInput
          style={styles.input}
          value={fieldName}
          onChangeText={setFieldName}
          placeholder="Enter field name"
          placeholderTextColor="rgba(255,255,255,0.5)"
        />

        <Text style={styles.label}>Field Value:</Text>
        <TextInput
          style={styles.input}
          value={fieldValue}
          onChangeText={setFieldValue}
          placeholder="Enter field value"
          placeholderTextColor="rgba(255,255,255,0.5)"
        />

        <TouchableOpacity style={styles.button} onPress={writeDocument} disabled={writeLoading}>
          {writeLoading ? <ActivityIndicator color={whiteColor} /> : <Text style={styles.buttonText}>Update Document</Text>}
        </TouchableOpacity>
      </View>

      {/* Results */}
      {(result || error) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Results</Text>

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <ScrollView style={styles.resultContainer}>
              <Text style={styles.resultText}>{result}</Text>
            </ScrollView>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 16,
  },
  title: {
    fontSize: RFValue(24, 812),
    fontFamily: Satoshi700,
    color: whiteColor,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: RFValue(18, 812),
    fontFamily: Satoshi700,
    color: whiteColor,
    marginBottom: 12,
  },
  label: {
    fontSize: RFValue(14, 812),
    fontFamily: Satoshi500,
    color: whiteColor,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 12,
    color: whiteColor,
    marginBottom: 16,
    fontFamily: Satoshi500,
  },
  button: {
    backgroundColor: '#977B4A',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: whiteColor,
    fontFamily: Satoshi700,
    fontSize: RFValue(16, 812),
  },
  resultContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
    padding: 12,
    maxHeight: 200,
  },
  resultText: {
    color: whiteColor,
    fontFamily: Satoshi500,
    fontSize: RFValue(14, 812),
  },
  errorText: {
    color: '#ff6b6b',
    fontFamily: Satoshi500,
    fontSize: RFValue(14, 812),
    padding: 12,
  },
  collectionsContainer: {
    maxHeight: 120,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    padding: 8,
  },
  collectionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  collectionText: {
    color: whiteColor,
    fontFamily: Satoshi500,
    fontSize: RFValue(14, 812),
  },
});

export default FirestoreTest;
