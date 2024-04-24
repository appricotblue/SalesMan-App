import React from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import PDFView from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';

const InvoiceScreen = () => {
  const samplePdfUrl = 'http://www.pdf995.com/samples/pdf.pdf'; // Sample PDF URL

  const downloadInvoice = async () => {
    try {
      const { config, fs } = RNFetchBlob;
      const pdfLocation = `${fs.dirs.DownloadDir}/invoice.pdf`;

      const res = await config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: pdfLocation,
        },
      }).fetch('GET', samplePdfUrl);

      Alert.alert('Download Complete', `Invoice downloaded to ${pdfLocation}`);
    } catch (error) {
      console.error('Error downloading invoice:', error);
      Alert.alert('Download Error', 'Failed to download invoice');
    }
  };

  return (
    <View style={styles.container}>
      <PDFView
        style={styles.pdf}
        fadeInDuration={250.0}
        resource={samplePdfUrl}
        resourceType="url"
      />
      <Button title="Download Invoice" onPress={downloadInvoice} />
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
