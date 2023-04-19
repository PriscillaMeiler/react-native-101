import React, {useState} from 'react'
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20, paddingRight: 20
  },
  title: {
    textAlign: 'center',
    marginBottom: 30
  },
  mainTitle: {
    fontSize: 25,
    marginTop: 30,
    marginBottom: 10
  },
  secondaryTitle: {
    fontWeight: 'bold',
  },
  highlightText: {
    color: 'blue',
    fontWeight: 'bold'
  },
});

const HomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20}}>
      <StatusBar style="auto" />
      <Text style={styles.mainTitle}>Informações Gerais</Text>
      <Text style={styles.secondaryTitle}>Diagnóstico da Bunny:</Text>
      <Text>- Linfoma de pequenas células.</Text>
      <Text style={styles.secondaryTitle}>Data de início:</Text>
      <Text>- 25/04/2023.</Text>
      <Text style={styles.secondaryTitle}>Data de término:</Text>
      <Text>- ???</Text>
      <Text style={styles.secondaryTitle}>Data do próximo exame de acompanhamento:</Text>
      <Text>- 25/07/2023</Text>
      <Text style={styles.secondaryTitle}>Protocolo:</Text>
      <Text style={styles.highlightText}>- PREDIDERM(5mg) a cada 24h (1x ao dia)</Text>
      <Text>    -- 1 e ½ comprimidos por 5 dias</Text>
      <Text>    -- 1 comprimidos por 5 dias</Text>
      <Text>    -- ½ comprimidos até novas recomendações</Text>
      <Text style={styles.highlightText}>- CLORAMBUCIL(4,2mg/cápsula) a cada 14 dias(1 cápsula)</Text>
      <Text>    -- 1 cápsula a cada 14 dias</Text>
      <Text>    -- Necessário jejum alimentar de 8 a 12 horas</Text>
      <Text>    -- Aguardar 30 minutos para após administração para fornecer o alimento</Text>
      <Text>    -- Não abrir as cápsulas</Text>
      <Text>    -- Usar luvas para administrar</Text>
      <Text style={{marginBottom: 30}}>    -- Manter em geladeira</Text>
      <Button
        title="Ver Calendário"
        style={{marginTop: 30}}
        onPress={() =>
          navigation.navigate('Calendar', {name: 'Bunny'})
        }
      />
    </View>
  );
};

const CalendarScreen = ({route}) => {
  const [datesCort, setDatesCort] = useState(['2023-04-11', '2023-04-12', '2023-04-13', '2023-04-23', '2023-04-24']);
  const [dates, setDates] = useState(['2023-04-11', '2023-04-18', '2023-04-25']);
  const [selectedDate, setSelecDate] = useState(null);

  const onDateChange = (date) => {
    setSelecDate(date);
  };

  let today = moment();
  let customDatesStyles = [];
  dates.forEach(dateElem => {
    if(moment(dateElem).isSameOrBefore(today)) {
      customDatesStyles.push({
        date: dateElem,
        style: {backgroundColor: '#000'},
        textStyle: {color: 'white'}, // sets the font color
        containerStyle: [], // extra styling for day container
        allowDisabled: true, // allow custom style to apply to disabled dates
      });
    } else {
      customDatesStyles.push({
        date: dateElem,
        // Random colors
        style: {backgroundColor: '#E49500'},
        textStyle: {color: 'white'}, // sets the font color
        containerStyle: [], // extra styling for day container
        allowDisabled: true, // allow custom style to apply to disabled dates
      });
    }
  });
  datesCort.forEach(dateElem => {
    if(moment(dateElem).isSameOrBefore(today)) {
      customDatesStyles.push({
        date: dateElem,
        style: {backgroundColor: '#EA789B'},
        textStyle: {color: 'white'}, // sets the font color
        containerStyle: [], // extra styling for day container
        allowDisabled: true, // allow custom style to apply to disabled dates
      });
    } else {
      customDatesStyles.push({
        date: dateElem,
        // Random colors
        style: {backgroundColor: '#028A0F'},
        textStyle: {color: 'white'}, // sets the font color
        containerStyle: [], // extra styling for day container
        allowDisabled: true, // allow custom style to apply to disabled dates
      });
    }
  });
  
  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Acompanhe no calendário as datas dos remédios da {route.params.name}.</Text>
      <CalendarPicker 
        todayBackgroundColor="#4169E1"
        todayTextStyle={{color: 'white'}}
        customDatesStyles={customDatesStyles}
        onDateChange={onDateChange}
      />
      <View style={{marginBottom: 20}}>
        <Text>{selectedDate ? datesCort.includes(selectedDate.format('YYYY-MM-DD')) ? (selectedDate.isBefore(today) ? 'PREDIDERM tomado!' : 'Dia de PREDIDERM') : (selectedDate.isAfter(today) ? 'Não é dia de PREDIDERM' : 'PREDIDERM não tomado :(') : ''}</Text>
        <Text>{selectedDate ? dates.includes(selectedDate.format('YYYY-MM-DD')) ? (selectedDate.isBefore(today) ? 'CLORAMBUCIL tomado!' : 'Dia de CLORAMBUCIL') : (selectedDate.isAfter(today) ? 'Não é dia de CLORAMBUCIL' : 'CLORAMBUCIL não tomado :(') : ''}</Text>
      </View>
      <View style={{marginBottom: 20}}>
        <Button
          title={datesCort.includes(moment().format('YYYY-MM-DD')) ? 'PREDIDERM tomado hoje!' : 'Marcar PREDIDERM tomado'}
          disabled={datesCort.includes(moment().format('YYYY-MM-DD'))}
          onPress={() => {
            setDatesCort([...datesCort, moment().format('YYYY-MM-DD')]);
          }}
          />
      </View>
      <Button
        title={dates.includes(moment().format('YYYY-MM-DD')) ? 'CLORAMBUCIL tomado hoje!' : 'Marcar CLORAMBUCIL tomado'}
        disabled={dates.includes(moment().format('YYYY-MM-DD'))}
        onPress={() => {
          setDates([...dates, moment().format('YYYY-MM-DD')]);
        }}
        />
    </View>
  );
};


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: '#87CEEB' } }}
      >
        <Stack.Group>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'Remédios da Bunny',
              headerRight: () => (
                <Button title="Calendário" onPress={() => navigation.navigate('Calendar', {name: 'Bunny'})} />
              ),
            })}
          />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
