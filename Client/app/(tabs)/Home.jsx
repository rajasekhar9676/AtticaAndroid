// Assuming you are using a stack navigator
import { createStackNavigator } from '@react-navigation/stack';
import MainHome from '../../components/Home/MainHome';
import GoldLive from '../../components/Home/GoldLive';
import GoldRateNotification from '../../components/Home/GoldRateNotification';
import UserLocation from '../../components/Home/UserLocation';
import News from '../../components/Home/News';
import Aboutcomp from '../../components/Home/Aboutcomp';
import OurServices from '../../components/Home/OurServices';
import OurCollections from '../../components/Home/OurCollections';
import NewsMore from '../../components/Home/NewsMore';
import OTPService from '../../components/Home/OTPService';

const Stack = createStackNavigator();

const Home = () => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="MainHome" component={MainHome} />
    <Stack.Screen name="GoldLive" component={GoldLive} />
    <Stack.Screen name="GoldRateNotification" component={GoldRateNotification} />
    <Stack.Screen name="UserLocation" component={UserLocation}/>
    <Stack.Screen name="News" component={News} />
    <Stack.Screen name="NewsMore" component={NewsMore} />
    <Stack.Screen name="Aboutcomp" component={Aboutcomp} />
    <Stack.Screen name="OurServices" component={OurServices} />
    <Stack.Screen name="OurCollections" component={OurCollections} />
    <Stack.Screen name="OTPService" component={OTPService} />
  </Stack.Navigator>
);

export default Home;

[]