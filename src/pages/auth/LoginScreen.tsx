import {Text, TextInputComponent, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../components/Container';
import SectionComponent from '../../components/SectionComponent';
import RowComponents from '../../components/RowComponent';
import TitleComponent from '../../components/TitleComponent';
import InputComponent from '../../components/InputComponent';
import {Lock, Sms} from 'iconsax-react-native';
import {colors} from '../../constants/colors';
import {globalStyles} from '../../styles/globalStyles';
import ButtonComponent from '../../components/ButtonComponent';

// Firebase
import auth from '@react-native-firebase/auth';
// Validation
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {EMAIL_REG, PASSWORD_REG} from '../../constants/regex';
import TextComponent from '../../components/TextComponent';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(EMAIL_REG, 'Email Format Error'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      PASSWORD_REG,
      'Invalid password. Please ensure the password meets all required criteria.',
    ),
});

const LoginScreen = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: {errors},
    setError,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'trankyhung225@gmail.com',
      password: 'Admin123@@',
    },
  });

  const onSubmit = ({email, password}: {email: string; password: string}) => {
    console.log('Click log');
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Congrats! this is toast notification success',
        });
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: 'Invalid Credentials',
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <SectionComponent
        styles={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <RowComponents stylesCustom={{marginBottom: 16}}>
          <TitleComponent text="LOGIN" size={32} flex={0} />
        </RowComponents>
        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputComponent
                title="Email"
                value={value}
                onChange={onChange}
                placeholder="Email"
                prefix={<Sms size={22} color={colors.gray2} />}
                allowClear
                type="email-address"
              />
            )}
            name="email"
          />
          {errors?.email && errors?.email.message && (
            <TextComponent
              text={errors.email.message}
              styles={{marginBottom: 16}}
              color="red"></TextComponent>
          )}
        </View>

        <View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <InputComponent
                title="Password"
                isPassword
                value={value}
                onChange={onChange}
                placeholder="Password"
                prefix={<Lock size={22} color={colors.gray2} />}
              />
            )}
            name="password"
          />
          {errors?.password && errors?.password.message && (
            <TextComponent
              text={errors.password.message}
              styles={{marginBottom: 16}}
              color="red"></TextComponent>
          )}
        </View>

        <ButtonComponent
          isLoading={isLoading}
          title="Login"
          onPress={handleSubmit(onSubmit)}
        />

        <RowComponents stylesCustom={{marginTop: 20}}>
          <Text style={[globalStyles.text]}>
            You don't have an account?{' '}
            <Text
              style={{color: 'coral'}}
              onPress={() => navigation.navigate('RegisterScreen')}>
              Create an account
            </Text>
          </Text>
        </RowComponents>
      </SectionComponent>
    </Container>
  );
};

export default LoginScreen;
