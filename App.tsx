/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  ButtonGroup,
  Text,
  Button,
  Layout,
  Select,
  SelectItem,
  IndexPath,
  Datepicker,
  CheckBox,
} from '@ui-kitten/components';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  // TODO: enable user to toggle scheme and finish light theme
  // const isDarkMode = useColorScheme() === 'dark';
  const isDarkMode = true;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const agesOptions = [
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
    56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
    75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93,
    94, 95, 96, 97, 97, 99,
  ];

  const dietOptions = [
    'Vegan',
    'Vegetarian',
    'Pescatarian',
    'Keto',
    'Paleo',
    'Gluten Free',
    'Latose Free',
    'Tree Nut Free',
    'Diabetic',
    'None',
  ];

  const goalOptions = [
    'Lose Weight',
    'Gain Weight',
    'Maintain Weight',
    'Increase Flexibility',
    'Increase Endurance',
    'Practice Mindfulness',
  ];

  const [gender, setGender] = React.useState('');
  const [selectedAgeIndex, setSelectedAgeIndex] =
    React.useState<IndexPath | null>(null);
  const [selectedDietIndex, setSelectedDietIndex] =
    React.useState<IndexPath | null>(null);
  const [selectedGoalIndex, setSelectedGoalIndex] =
    React.useState<IndexPath | null>(null);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [daysOfTheWeek, setDaysOfTheWeek] = React.useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });
  // const [exercisePlan, setExercisePlan] = React.useState<
  //   {
  //     index: number;
  //     date: string;
  //     dayOfTheWeek: string;
  //     exercises: {
  //       name: string;
  //       sets: number;
  //       reps: number;
  //       weight: number;
  //       description: string;
  //     }[];
  //   }[]
  // >([]);
  const [exercisePlan, setExercisePlan] = React.useState<string>('');

  const generatePlan = async () => {
    console.log('Generating plan...');
    const planDetails = constructPlanMessage();
    console.log({planDetails});

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({planDetails}),
    };

    try {
      await fetch('http://localhost:3001', requestOptions).then(response => {
        response.json().then(data => {
          console.log({data});
          setExercisePlan(data.resp.firstChoice.message.content);
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const constructPlanMessage = () => {
    const planDetails = {
      gender: gender,
      age: selectedAgeIndex ? agesOptions[selectedAgeIndex.row] : null,
      diet: selectedDietIndex ? dietOptions[selectedDietIndex.row] : null,
      goal: selectedGoalIndex ? goalOptions[selectedGoalIndex.row] : null,
      date: selectedDate ? selectedDate.toDateString() : null,
      daysOfTheWeek: daysOfTheWeek,
    };

    return planDetails;
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={backgroundStyle}>
            <View
              style={{
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
              <Text
                category="h1"
                style={{
                  color: Colors.white,
                  textAlign: 'center',
                  marginVertical: 20,
                }}>
                Byte Bandits Concept App
              </Text>

              <Text
                category="h6"
                style={{
                  color: Colors.white,
                  textAlign: 'center',
                  marginHorizontal: 10,
                }}>
                Hey! Fill out some information about yourself and your desired
                exercise plan below and we'll generate a ✨perfect✨ plan for
                you!
              </Text>

              <Layout
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isDarkMode ? Colors.black : Colors.white,
                  marginTop: 20,
                }}>
                <ButtonGroup status="primary">
                  <Button
                    style={{
                      backgroundColor:
                        gender === 'male' ? '#3366ff' : 'lightgrey',
                      width: 100,
                    }}
                    onPress={() => setGender('male')}>
                    Male
                  </Button>
                  <Button
                    style={{
                      backgroundColor:
                        gender === 'female' ? '#3366ff' : 'lightgrey',
                      width: 100,
                    }}
                    onPress={() => setGender('female')}>
                    Female
                  </Button>
                  <Button
                    style={{
                      backgroundColor:
                        gender === 'other' ? '#3366ff' : 'lightgrey',
                      width: 100,
                    }}
                    onPress={() => setGender('other')}>
                    Other
                  </Button>
                </ButtonGroup>

                <Select
                  label="Age"
                  placeholder="Select your age"
                  value={
                    selectedAgeIndex
                      ? agesOptions[selectedAgeIndex.row]
                      : undefined
                  }
                  style={{width: 300, marginTop: 20}}
                  selectedIndex={selectedAgeIndex ?? undefined}
                  onSelect={index => setSelectedAgeIndex(index as IndexPath)}>
                  {agesOptions.map(age => {
                    return <SelectItem title={age} key={age} />;
                  })}
                </Select>

                <Select
                  label="Dietary Restrictions"
                  placeholder="Select your dietary restrictions"
                  value={
                    selectedDietIndex
                      ? dietOptions[selectedDietIndex.row]
                      : undefined
                  }
                  style={{width: 300, marginTop: 20}}
                  selectedIndex={selectedDietIndex ?? undefined}
                  onSelect={index => setSelectedDietIndex(index as IndexPath)}>
                  {dietOptions.map(diet => {
                    return <SelectItem title={diet} key={diet} />;
                  })}
                </Select>

                <Select
                  label="Exercise Goal"
                  placeholder="Select your exercise goal"
                  style={{width: 300, marginTop: 20}}
                  value={
                    selectedGoalIndex
                      ? goalOptions[selectedGoalIndex.row]
                      : undefined
                  }
                  selectedIndex={selectedGoalIndex ?? undefined}
                  onSelect={index => setSelectedGoalIndex(index as IndexPath)}>
                  <SelectItem title="Lose Weight" />
                  <SelectItem title="Gain Weight" />
                  <SelectItem title="Maintain Weight" />
                  <SelectItem title="Increase Flexibility" />
                  <SelectItem title="Improve Endurance" />
                  <SelectItem title="Practice Mindfulness" />
                </Select>

                <Datepicker
                  label="Start Date"
                  style={{width: 300, marginTop: 20}}
                  date={selectedDate}
                  onSelect={nextDate => setSelectedDate(nextDate)}
                />

                <Text
                  style={{
                    color: Colors.white,
                    textAlign: 'center',
                    marginHorizontal: 70,
                    marginTop: 20,
                  }}>
                  Select the days of the week you want to exercise on:
                </Text>

                <CheckBox
                  style={{
                    borderRadius: 4,
                    margin: 2,
                    padding: 6,
                    backgroundColor: 'white',
                  }}
                  checked={daysOfTheWeek.sunday}
                  onChange={nextChecked =>
                    setDaysOfTheWeek({
                      ...daysOfTheWeek,
                      sunday: nextChecked,
                    })
                  }>
                  {props => (
                    <Text style={{color: 'white'}} {...props}>
                      Sunday
                    </Text>
                  )}
                </CheckBox>
                <CheckBox
                  style={{
                    borderRadius: 4,
                    margin: 2,
                    padding: 6,
                    backgroundColor: 'white',
                  }}
                  checked={daysOfTheWeek.monday}
                  onChange={nextChecked =>
                    setDaysOfTheWeek({
                      ...daysOfTheWeek,
                      monday: nextChecked,
                    })
                  }>
                  Monday
                </CheckBox>

                <CheckBox
                  style={{
                    borderRadius: 4,
                    margin: 2,
                    padding: 6,
                    backgroundColor: 'white',
                  }}
                  checked={daysOfTheWeek.tuesday}
                  onChange={nextChecked =>
                    setDaysOfTheWeek({
                      ...daysOfTheWeek,
                      tuesday: nextChecked,
                    })
                  }>
                  Tuesday
                </CheckBox>
                <CheckBox
                  style={{
                    borderRadius: 4,
                    margin: 2,
                    padding: 6,
                    backgroundColor: 'white',
                  }}
                  checked={daysOfTheWeek.wednesday}
                  onChange={nextChecked =>
                    setDaysOfTheWeek({
                      ...daysOfTheWeek,
                      wednesday: nextChecked,
                    })
                  }>
                  Wednesday
                </CheckBox>
                <CheckBox
                  style={{
                    borderRadius: 4,
                    margin: 2,
                    padding: 6,
                    backgroundColor: 'white',
                  }}
                  checked={daysOfTheWeek.thursday}
                  onChange={nextChecked =>
                    setDaysOfTheWeek({
                      ...daysOfTheWeek,
                      thursday: nextChecked,
                    })
                  }>
                  Thursday
                </CheckBox>
                <CheckBox
                  style={{
                    borderRadius: 4,
                    margin: 2,
                    padding: 6,
                    backgroundColor: 'white',
                  }}
                  checked={daysOfTheWeek.friday}
                  onChange={nextChecked =>
                    setDaysOfTheWeek({
                      ...daysOfTheWeek,
                      friday: nextChecked,
                    })
                  }>
                  Friday
                </CheckBox>
                <CheckBox
                  style={{
                    borderRadius: 4,
                    margin: 2,
                    padding: 6,
                    backgroundColor: 'white',
                  }}
                  checked={daysOfTheWeek.saturday}
                  onChange={nextChecked =>
                    setDaysOfTheWeek({
                      ...daysOfTheWeek,
                      saturday: nextChecked,
                    })
                  }>
                  Saturday
                </CheckBox>

                <Button
                  style={{
                    width: 300,
                    marginVertical: 20,
                  }}
                  onPress={() => {
                    generatePlan();
                  }}>
                  Generate Plan 🚀
                </Button>
              </Layout>

              {exercisePlan.length > 0 && (
                <>
                  <Text
                    style={{
                      color: Colors.white,
                      textAlign: 'center',
                      marginHorizontal: 70,
                      marginTop: 20,
                    }}>
                    Your plan is ready! 🎉
                  </Text>

                  <Text
                    style={{
                      color: Colors.white,
                      textAlign: 'center',
                      marginHorizontal: 20,
                      marginTop: 20,
                    }}>
                    {exercisePlan}
                  </Text>

                  {/* {JSON.parse(JSON.stringify(exercisePlan)).map((day: any) => {
                    <>
                      <Text
                        style={{
                          color: Colors.white,
                          textAlign: 'center',
                          marginHorizontal: 70,
                          marginTop: 20,
                        }}>
                        {day.date}
                      </Text>
                      <Text
                        style={{
                          color: Colors.white,
                          textAlign: 'center',
                          marginHorizontal: 70,
                          marginTop: 20,
                        }}>
                        {day.dayOfTheWeek}
                      </Text>
                      {day.exercises.map((exercise: any) => {
                        <>
                          <Text>{exercise.name}</Text>
                          <Text>{exercise.description}</Text>
                          <Text>{exercise.sets}</Text>
                          <Text>{exercise.reps}</Text>
                          <Text>{exercise.weight}</Text>
                        </>;
                      })}
                    </>;
                  })} */}
                </>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </NavigationContainer>
    </ApplicationProvider>
  );
}

export default App;
