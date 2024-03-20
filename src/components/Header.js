import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Ionicons for icons
import images from '../assets/Images';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor:'#003451',
        width:'100%'
      }}
    >
      {/* Back Arrow */}
      <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={() => navigation.goBack()}>
      <Image source={ images.ArrowLeft}style={{width:32,height:32,marginRight:15}} />
     <Text style={{ color: 'white', fontSize: 20 }}>{title}</Text> 
      
      </TouchableOpacity>

    
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginHorizontal: 10 ,width:90,borderRadius:15,flexDirection:'row',justifyContent:'center',alignItems:'center'}} onPress={() =>navigation.navigate('SuperHugs') }>
        <Image
                         style={{width:18,height:23,marginRight:6}}
                        source={images.Notification}
                    />
                     
        </TouchableOpacity>
       
      </View>
    </TouchableOpacity>
  );
};

export default Header;