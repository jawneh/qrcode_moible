import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
import {Input, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import {fetchDepartmentsAction} from '../redux/department/Actions';
import {fetchFacultiesAction} from '../redux/faculty/Actions';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
} from 'react-native';

const Separator = () => <View style={styles.separator} />;

const RegisterationScreen = () => {
  const baseURL = 'https://umar-qrcode.herokuapp.com';
  const dispatch = useDispatch();

  const {faculties} = useSelector(state => state.fetchFaculties);
  const {departments} = useSelector(state => state.fetchDepartments);

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department_id, setDepartment] = useState('');
  const [faculty_id, setFaculty] = useState('');
  const [phone, setPhone] = useState('');
  const [university_id, setUniversityId] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchDepartmentsAction());
    dispatch(fetchFacultiesAction());
  }, [dispatch]);

  const handleRegister = async () => {
    setLoading(true);
    const mac_address = await DeviceInfo.getMacAddress();
    const user_data = {
      first_name,
      last_name,
      email,
      faculty_id,
      department_id,
      phone,
      mac_address,
      password,
      university_id,
    };
    console.log(user_data);
    try {
      // here place your signup logic
      const {data} = await axios.post(`${baseURL}/user/register`, user_data);
      if (data) {
        Alert.alert('Attendance', data, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      } else {
        setLoading(false);
        throw new Error('failed to mark attendance');
      }
    } catch (error) {
      setLoading(false);
      let message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      Alert.alert('Registration', message, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const form_arr = [
    {
      label: "What's your email address ?",
      placeholder: 'Email',
      value: email,
      type: 'text',
      handleFieldValue: setEmail,
      icon: <Icon type="fontawesome" size={24} name="at" />,
      error: 'Required',
      required: true,
    },
    {
      label: 'Tell us your first name ?',
      placeholder: 'First name',
      value: first_name,
      type: 'text',
      handleFieldValue: setFirstName,
      icon: <Icon type="fontawesome" size={24} name="user" />,
      error: 'Required',
      required: true,
    },
    {
      label: 'And your last name ?',
      placeholder: 'Last name',
      value: last_name,
      type: 'text',
      handleFieldValue: setLastName,
      icon: <Icon size={24} name="users" />,
      error: 'Required',
      required: true,
    },
    {
      label: 'Choose a faculty ?',
      placeholder: 'Choose one',
      value: faculty_id,
      options: faculties,
      type: 'picker',
      handleFieldValue: setFaculty,
      icon: <Icon size={24} name="institution" />,
      error: 'Required',
      required: true,
    },
    {
      label: 'Select your department ?',
      placeholder: 'Choose one',
      value: department_id,
      options: departments,
      type: 'picker',
      handleFieldValue: setDepartment,
      icon: <Icon size={24} name="home" />,
      error: 'Required',
      required: true,
    },
    {
      label: 'Phone number',
      placeholder: '08080',
      value: phone,
      type: 'text',
      handleFieldValue: setPhone,
      icon: <Icon size={24} name="phone" />,
      error: 'Required',
      required: true,
    },
    {
      label: 'Matric Number',
      placeholder: '14/03CS0009',
      value: university_id,
      type: 'text',
      handleFieldValue: setUniversityId,
      icon: <Icon size={24} name="graduation-cap" />,
      error: 'Required',
      required: true,
    },
    {
      label: 'Password',
      placeholder: 'xxxxxxx',
      value: password,
      type: 'text',
      handleFieldValue: setPassword,
      icon: <Icon size={24} name="lock" />,
      error: 'Required',
      required: true,
    },
    {
      label: 'Confirm Password',
      placeholder: '14/03CS0009',
      value: confirm_password,
      type: 'text',
      handleFieldValue: setConfirmPassword,
      icon: <Icon size={24} name="unlock" />,
      error: 'Required',
      required: true,
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <Card>
          <ScrollView>
            {loading ? (
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Loading </Text>
            ) : (
              <>
                {form_arr.map((item, index) =>
                  item.type === 'text' ? (
                    <Input
                      style={styles.input}
                      label={item.label}
                      placeholder={item.placeholder}
                      leftIcon={item.icon}
                      errorMessage={item.error}
                      value={item.value}
                      onChangeText={val => item.handleFieldValue(val)}
                      key={index}
                    />
                  ) : (
                    <Picker
                      style={styles.picker}
                      selectedValue={item.value}
                      onValueChange={(itemValue, itemIndex) =>
                        item.handleFieldValue(itemValue)
                      }
                      key={index}>
                      <Picker.Item label={item.label} value="" />
                      {item.options &&
                        item.options.map((unit, dex) => (
                          <Picker.Item
                            label={unit.name}
                            value={unit._id}
                            key={dex}
                          />
                        ))}
                    </Picker>
                  ),
                )}
                <Button
                  title="Register"
                  color="#2b1667"
                  onPress={handleRegister}
                />
              </>
            )}
          </ScrollView>
        </Card>
      </View>
    </>
  );
};

export default RegisterationScreen;
const primaryColor = '#2b1667';
const secondaryColor = '#cab992';

const styles = StyleSheet.create({
  input: {
    width: 350,
    // height: 35,
    // backgroundColor: '#fff',
    borderColor: '#f6f6f6',
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    margin: 5,
    padding: 8,
    color: primaryColor,
    borderRadius: 2,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,

    // backgroundColor: secondaryColor,
  },
  header: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    backgroundColor: primaryColor,
    border: 'none',
    color: ' #ffffff',
    transition: '0.3s',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  picker: {
    width: 350,
    // height: 30,
    backgroundColor: '#fff',
    borderColor: '#f6f6f6',
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
    margin: 5,
    padding: 5,
    color: primaryColor,
    fontSize: 18,
    fontWeight: '500',
  },
});
