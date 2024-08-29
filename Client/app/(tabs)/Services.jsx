// Assuming you are using a stack navigator
import { createStackNavigator } from '@react-navigation/stack';
import MainService from '../../components/Services/MainService';
import DigiGold from '../../components/Services/DigiGold ';
import GoldLoan from '../../components/Services/GoldLoan';
import Insurance from '../../components/Services/Insurance ';
import SellGold from '../../components/Services/SellGold';
import PludgedGold from '../../components/Services/PludgedGold';
import ViewAllBranches from '../../components/Services/ViewAllBranches';
import ClickHere from '../../components/Services/ClickHere';

const Stack = createStackNavigator();

const Services = () => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="MainService" component={MainService} />
    <Stack.Screen name="DigiGold" component={DigiGold} />
    <Stack.Screen name="GoldLoan" component={GoldLoan} />
    <Stack.Screen name="Insurance" component={Insurance} />
    <Stack.Screen name="SellGold" component={SellGold} />
    <Stack.Screen name="PludgedGold" component={PludgedGold} />
    <Stack.Screen name="ViewAllBranches" component={ViewAllBranches}/>
    <Stack.Screen name="ClickHere" component={ClickHere}/>
  </Stack.Navigator>
);

export default Services;

[]