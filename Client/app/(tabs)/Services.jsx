// Assuming you are using a stack navigator
import { createStackNavigator } from '@react-navigation/stack';
import MainService from '../../components/Services/MainService';
import DigiGold from '../../components/Services/DigiGold ';
import GoldLoan from '../../components/Services/GoldLoan '
import Insurance from '../../components/Services/Insurance '

// import DigiGold from './screens/DigiGold';
// import GoldLoan from './screens/GoldLoan';
// import Insurance from './screens/Insurance';

const Stack = createStackNavigator();

const Services = () => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="MainService" component={MainService} />
    <Stack.Screen name="DigiGold" component={DigiGold} />
    <Stack.Screen name="GoldLoan" component={GoldLoan} />
    <Stack.Screen name="Insurance" component={Insurance} />
  </Stack.Navigator>
);

export default Services;



[]  