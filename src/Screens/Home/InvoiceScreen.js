import React from 'react';
import { View, StyleSheet, Button, Alert, Text } from 'react-native';
// import PDFView from 'react-native-pdf';
// import RNFetchBlob from 'rn-fet
// import RNFetchBlob from 'rn-fetch-blob';


const InvoiceScreen = () => {
  const samplePdfUrl = 'http://www.pdf995.com/samples/pdf.pdf'; // Sample PDF URL



  return (
    <View style={styles.container}>
      <Text>hii</Text>
      {/* <PDFView
        style={styles.pdf}
        fadeInDuration={250.0}
        resource={samplePdfUrl}
        resourceType="url"
      />
      <Button title="Download Invoice" onPress={downloadInvoice} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
});

export default InvoiceScreen;
