// Assuming you are using a stack navigator
import { createStackNavigator } from '@react-navigation/stack';
import MainHome from '../../components/Home/MainHome';
import GoldLive from '../../components/Home/GoldLive';
import GoldRateNotification from '../../components/Home/GoldRateNotification';

const Stack = createStackNavigator();

const Services = () => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="MainHome" component={MainHome} />
    <Stack.Screen name="GoldLive" component={GoldLive} />
    <Stack.Screen name="GoldRateNotification" component={GoldRateNotification} />
  </Stack.Navigator>
);

export default Services;

[]