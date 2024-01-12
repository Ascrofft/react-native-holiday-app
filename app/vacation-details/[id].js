import { useQuery, } from '@tanstack/react-query';
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';

import { Vacation, Regions, Specifics, ScreenHeaderBtn } from '../../components';
import { COLORS, icons, SIZES } from '../../constants';
// import useFetch from '../../hook/useFetch';

const url = "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2023-2024?output=json";

let logo;
let regions = [];

const VacationDetails = () => {
  const router = useRouter();
  const global = useGlobalSearchParams();  

  const { isPending, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: () =>
        fetch(url).then((res) =>
        res.json(),
    ),
  });

  // Use States
  const [refreshing, setRefreshing] = useState(false);
  const [activeRegion, setActiveRegion] = useState(regions[0]);

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
  console.log("VACATION : ", vacation);

  // Fn
  const displayRegionContent = () => {
    switch(activeRegion) {
      case "Noord":
        return ( isPending ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Er is iets fout gegaan. . .</Text>
        ) : (
          <Specifics
            title="Regio Noord"
            points={vacation.regions[0]}
          />
        ))
      case "Midden":
        return ( isPending ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) ? error : (
          <Text>Er is iets fout gegaan. . .</Text>
        ) : (
          <Specifics
            title="Regio Midden"
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
            title="Regio Zuid"
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
            title="Heel Nederland"
            points={vacation.regions[0]}
          />
        ))
      default:
        break;
    }
  };

  return (
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Text>Hello</Text>
      </SafeAreaView>

    
    //   <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
    //     <Stack.Screen
    //       options={{
    //         headerStyle: {backgroundColor: COLORS.lightWhite},
    //         headerShadowVisible: false,
    //         headerbackVisible: false,
    //         headerLeft: () => (
    //           <ScreenHeaderBtn
    //             iconUrl={icons.left}
    //             dimension="60%"
    //             handlePress={() => router.back()}
    //           />
    //         ),
    //         headerRight: () => (
    //           <ScreenHeaderBtn
    //             iconUrl={icons.share}
    //             dimension="60%"
    //           />
    //         ),
    //         headerTitle: ''
    //       }}
    //     />

    //     <>
    //       <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
    //         {isPending ? (
    //           <ActivityIndicator size="large" color={COLORS.primary} />
    //         ) : error ? (
    //           <Text>Something went wrong. . .</Text>
    //         ) : (
    //           <View style={{padding: SIZES.medium, paddingBottom: 100}}>
    //             <Vacation
    //               vacationLogo={logo}
    //               vacationTitle={vacation.type.trim()}
    //             />

    //             <Regions
    //               regions={regions}
    //               activeRegion={activeRegion}
    //               setActiveRegion={setActiveRegion}
    //             />

    //             {/* {displayRegionContent()} */}
    //           </View>
    //         )}
    //       </ScrollView>
    //     </>

    //   </SafeAreaView>
    
  );
};

export default VacationDetails;
