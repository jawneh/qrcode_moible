import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {Icon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FlatGrid} from 'react-native-super-grid';
const primaryColor = '#2b1667';
const secondaryColor = '#cab992';
const HomeScreen = ({navigation}) => {
  const [items, setItems] = React.useState([
    {name: 'Sign up device', navigate: 'Register', icon: 'mobile'},
    {name: 'QRCode Scanner', navigate: 'QRCodeScanner', icon: 'qrcode'},
    {name: 'Attendance', navigate: '', icon: 'check-square'},
    {name: 'Courses', navigate: '', icon: 'list'},
    {name: 'Faculty', navigate: '', icon: 'institution'},
    {name: 'Departments', navigate: '', icon: 'home'},
    {name: 'Profile', navigate: '', icon: 'user-circle'},
  ]);

  return (
    <FlatGrid
      itemDimension={130}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate(item.navigate)}>
          <View style={styles.itemContainer}>
            <Icon name={item.icon} size={50} color={primaryColor} />
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default HomeScreen;

// <Icon name="qrcode" type="font-awesome" size={24} color="black" />
// <Button title="Sign up" onPress={() => navigation.navigate('Register')} />

// <Text>or</Text>
// <Button
//   title="Scan Attendance"
//   onPress={() => navigation.navigate('QRCodeScanner')}
// />

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    backgroundColor: secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: primaryColor,
    justifyContent: 'center',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});
