import React from 'react';
import { View, StyleSheet, Button, Alert, Text, Linking, Platform } from 'react-native';
// import PDFView from 'react-native-pdf';
// import RNFetchBlob from 'rn-fet
// import RNFetchBlob from 'rn-fetch-blob';
// import RNFetchBlob from 'react-native-fetch-blob';
import { WebView } from 'react-native-webview';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import images from '../../assets/Images';
import CommonButton from '../../components/CommonButton';
import { height, width } from '../../Theme/Constants';
import RNFS from 'react-native-fs';


const InvoiceScreen = () => {
  const samplePdfUrl = 'http://www.pdf995.com/samples/pdf.pdf'; // Sample PDF URL
  const { orders, orderdetails, loading, error } = useSelector((state) => state.global);

  const invoiceImageUrl = 'https://salesman.aindriya.co.in/invoice/1713939124213_hotel.jpg';

  const downloadInvoice = async () => {
    console.log('here down')
    try {
      // Use Fetch API to download the image
      const response = await fetch(invoiceImageUrl);
      const blob = await response.blob();

      // Save the image to the device's storage
      const filename = invoiceImageUrl.substring(invoiceImageUrl.lastIndexOf('/') + 1);
      const pathToSave = `${RNFS.DocumentDirectoryPath}/${filename}`;
      await RNFS.writeFile(pathToSave, blob, 'base64');

      // Open the downloaded image
      if (Platform.OS === 'ios') {
        // On iOS, open the image in a new window
        RNFS.readFile(pathToSave, 'base64')
          .then((fileContent) => {
            const url = `data:image/jpeg;base64,${fileContent}`;
            // Open the image in a new window
            window.open(url, '_blank');
          })
          .catch((error) => {
            console.error('Error opening downloaded image: ', error);
          });
      } else if (Platform.OS === 'android') {
        // On Android, show a toast or notification that the image was downloaded
        console.log('Invoice downloaded to:', pathToSave);
      }
    } catch (error) {
      console.error('Error downloading image: ', error);
    }
  };

  // const downloadInvoice = async () => {
  //   try {
  //     // Use Fetch API to download the image
  //     const response = await fetch(invoiceImageUrl);
  //     const blob = await response.blob();

  //     // Save the image to the device's storage
  //     const filename = invoiceImageUrl.substring(invoiceImageUrl.lastIndexOf('/') + 1);
  //     const pathToSave = `${RNFS.DownloadDirectoryPath}/${filename}`;
  //     await RNFS.writeFile(pathToSave, blob, 'base64');

  //     // Open the downloaded image (optional)
  //     // This code snippet opens the downloaded image using the default viewer on Android
  //     if (Platform.OS === 'android') {
  //       await RNFS.readFile(pathToSave, 'base64')
  //         .then((fileContent) => {
  //           const uri = `file://${pathToSave}`;
  //           const mimeType = 'image/jpeg';
  //           const contentBase64 = fileContent;
  //           const extras = {
  //             'Content-Disposition': 'attachment; filename="invoice.jpg"',
  //           };
  //           return RNFS.downloadFile({ fromUrl: uri, toFile: uri, mimeType, contentBase64, extras });
  //         })
  //         .then(() => {
  //           console.log('File downloaded successfully');
  //         })
  //         .catch((error) => {
  //           console.error('Error opening downloaded image: ', error);
  //         });
  //     }
  //   } catch (error) {
  //     console.error('Error downloading image: ', error);
  //   }
  // };


  // const downloadInvoice = () => {
  //   console.log('here down', orderdetails?.invoice)
  //   // You can use any method to download the PDF here, for example:
  //   // Linking.openURL(samplePdfUrl); // Opens in browser
  //   // Or use a library like RNFetchBlob to download the PDF
  //   // Example: RNFetchBlob.config({ fileCache: true }).fetch('GET', samplePdfUrl).then(...)
  //   // For simplicity, I'll just open the PDF in the browser for demonstration:
  //   Linking.openURL(orderdetails?.invoice);
  // };

  return (
    <View style={styles.container}>
      <Header title={'Orders Details'} isBackArrow={true} />
      <View style={styles.pdfContainer}>
        <WebView
          source={{ uri: orderdetails?.invoice }}
          style={styles.pdf}
          originWhitelist={['*']}
        />

      </View>
      {/* <PDFView
        style={styles.pdf}
        fadeInDuration={250.0}
        resource={samplePdfUrl}
        resourceType="url"
      /> */}
      {/* <Button title="Download Invoice" onPress={() => downloadInvoice()} /> */}
      <CommonButton
        onPress={() => downloadInvoice()}
        color={'white'}
        title={'Download Invoice'}
        width={width * 0.9}
        texttitle={'#005A8D'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdfContainer: {
    flex: 1,
    width: '100%',
  },
  pdf: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'red'
  },
});

export default InvoiceScreen;
