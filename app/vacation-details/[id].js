import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import { useCallback, useState, useEffect } from 'react';
import { useQuery, } from '@tanstack/react-query';

import { Vacation, Regions, Specifics, ScreenHeaderBtn } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
// import useFetch from '../../hook/useFetch';

const url = "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2023-2024?output=json";

let logo;
let regions = [];

const VacationDetails = () => {
  // const data = require('../../../../data/data.json');

  const router = useRouter();
  const global = useGlobalSearchParams();

  // const [data, setData] = useState([]);
  // const [isPending, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const [refreshing, setRefreshing] = useState(false);
  const [activeRegion, setActiveRegion] = useState(regions[0]);

  // const { data, isLoading, error } = useFetch();

  const { isPending, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: () =>
        fetch(url).then((res) =>
        res.json(),
    ),
  });

  // useEffect(() => {
  //   fetch(url)
  //       .then((response) => response.json())
  //       .then((json) => setData(json))
  //       .catch((error) => setError(error), console.log(error))
  //       .finally(() => setIsLoading(false));
  // }, []);

  const onRefresh = () => { };

  // console.log("TITLE 2 : ", data.content[0].title.trim());
  // console.log("DATA : ", data);

  // Set Region
  switch(global.id.trim()) {
    case "Herfstvakantie":
      logo = icons.leaves;
      regions = ["Noord", "Midden", "Zuid"];
      i = 0;
    break;
    case "Kerstvakantie":
      logo = icons.snowflake;
      regions = ["Heel Nederland"];
      i = 1;
    break;
    case "Voorjaarsvakantie":
      logo = icons.butterflies;
      regions = ["Noord", "Midden", "Zuid"];
      i = 2;
    break;
    case "Meivakantie":
      logo = icons.crocus;
      regions = ["Heel Nederland"];
      i = 3;
    break;
    case "Zomervakantie":
      logo = icons.sun;
      regions = ["Noord", "Midden", "Zuid"];
      i = 4;
    break;
  }
  
  const vacation = data.content[0].vacations[i];
  
  // console.log("VACATION : ", vacation);
  // console.log("REGION : ", data?.content[0]?.vacations[i]?.regions[0]?.region);

  const displayRegionContent = () => {
    switch(activeRegion) {
      case "Noord":
        return ( isPending ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Er is iets fout gegaan. . .</Text>
        ) : (
          <Specifics
            title={vacation?.regions[0]?.region}
            points={vacation?.regions[0]}
          />
        ))
      case "Midden":
        return ( isPending ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) ? error : (
          <Text>Er is iets fout gegaan. . .</Text>
        ) : (
          <Specifics
            title={vacation.regions[1].region}
            points={vacation.regions[1]}
          />
        ))
      case "Zuid":
        return ( isPending ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) ? error : (
          <Text>Er is iets fout gegaan. . .</Text>
        ) : (
          <Specifics
            title={vacation.regions[2].region}
            points={vacation.regions[2]}
          />
        ))
      case "Heel Nederland":
        return ( isPending ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) ? error : (
          <Text>Er is iets fout gegaan. . .</Text>
        ) : (
          <Specifics
            title={vacation.regions[0].region}
            points={vacation.regions[0]}
          />
        ))
      default:
        return ( isPending ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) ? error : (
          <Text>Er is iets fout gegaan. . .</Text>
        ) : (
          <Specifics
            title={data?.content[0]?.vacations[i]?.regions[0]?.region}
            points={data?.content[0]?.vacations[i]?.regions[0]}
          />
        ))
      ;
    }
  };

  return (
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
          options={{
            headerStyle: {backgroundColor: COLORS.lightWhite},
            headerShadowVisible: false,
            headerLeft: () => (
              <ScreenHeaderBtn
                iconUrl={icons.left}
                dimension="60%"
                handlePress={() => router.back()}
              />
            ),
            headerRight: () => (
              <ScreenHeaderBtn
                iconUrl={icons.share}
                dimension="60%"
              />
            ),
            headerTitle: ''
          }}
        />

        <>
          <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {isPending ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : error ? (
              <Text>Something went wrong. . .</Text>
            ) : (
              <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                <Vacation
                  vacationLogo={logo}
                  vacationTitle={data?.content[0]?.vacations[i]?.type?.trim()}
                />

                <Regions
                  regions={regions}
                  activeRegion={activeRegion}
                  setActiveRegion={setActiveRegion}
                />

                {displayRegionContent()}
              </View>
            )}
          </ScrollView>
        </>
      </SafeAreaView>
  );
};

export default VacationDetails;
