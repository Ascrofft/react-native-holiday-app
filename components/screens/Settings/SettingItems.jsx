import { useState, useEffect } from 'react';
import { Text, View, Switch, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './settingitems.style';

// Region Data
let gemNoord = ['Noordenveld', 'Tynaarlo', 'Assen', 'Aa en Hunze', 'Midden-Drenthe', 'Borger-Odoorn', 'Westerveld', 'Meppel', 'De Wolden', 'Hoogeveen', 'Coevorden', 'Emmen', 'Almere', 'Dronten', 'Lelystad', 'Noordoostpolder', 'urk', 'Vlieland', 'Terschelling', 'Ameland', 'Schiermonnikoog', 'Noardeast-Fryslân', 'Waardehoek', 'Harlingen', 'Súdwest-Fryslân', 'De Fryske Marren', 'Leeuwarden', 'Duntumadiel', 'Tytsjerksteradiel', 'Achtkarspelen', 'Smallingerland', 'Opsterland', 'Heerenveen', 'Oosterstellingwerf', 'Weststellingwerf', 'Hattem', 'Eemsdelta', 'Groningen', 'Het Hogeland', 'Midden-Groningen', 'Oldambt', 'Pekela', 'Stadskanaal', 'Veendam', 'Westerkwartier', 'Westerwolde', 'Alkmaar', 'Bergen', 'Castricum', 'Dijk en Waard', 'Heiloo', 'Uitgeest', 'Aalsmeer', 'Amstelveen', 'Diemen', 'Haarlemmermeer', 'Ouder-Amstel', 'Uithoorn', 'Amsterdam', 'Blaricum', 'Gooise Meren', 'Hilversum', 'Huizen', 'Laren', 'Wijdemeren', 'Beverwijk', 'Heemskerk', 'Velsen', 'Den Heldern', 'Hollands Kroon', 'Schagen', 'Texel', 'Drechterland', 'Enkhuizen', 'hoorn', 'Koggenland', 'Opmeer', 'Medemblik', 'Stede Broec', 'Edam-Volendam', 'Landsmeer', 'Oostzaan', 'Puermerend', 'Waterland', 'Wormerland', 'Zaanstad', 'Bloemendaal', 'Haarlem', 'Heemstede', 'Zandvoort', 'Almelo', 'Borne', 'Dalfsen', 'Deventer', 'Dinkelland', 'Enschede', 'Haaksbergen', 'Hardenberg', 'Hellendoorn', 'Hengelo', 'Hof van Twente', 'Kampen', 'Losser', 'Oldenzaal', 'Olst-Wijhe', 'Ommen', 'Raalte', 'Rijssen-Holten', 'Staphorst', 'Steenwijkerland', 'Tubbergen', 'Twenterand', 'Wierden', 'Zwartewaterland', 'Zwolle', 'De Ronde Venen', 'Eemnes'];
let gemMidden = ['Zeewolde', 'Aalten', 'Apeldoorn', 'Barneveld', 'Berkelland', 'Bronckhorst', 'Brummen', 'Buren', 'Culemborg', 'Doetinchem', 'Ede', 'Elburg', 'Epe', 'Ermelo', 'Harderwijk', 'Heerde', 'Lochem', 'Montferland', 'Neder-Betuwe', 'Nijkerk', 'Nunspeet', 'Olderbroek', 'Oost-Gelre', 'Oude Ijsselstreek', 'Putten', 'Scherpenzeel', 'Tiel', 'Voorst', 'Wageningen', 'West Betuwe', 'Winterswijk', 'Zutphen', 'Altena', 'Amersfoort', 'Baarn', 'De Bilt', 'Bunnik', 'bunschoten', 'Houten', 'Ijsselstein', 'Leuden', 'Lopik', 'Montfoort', 'Nieuwegein', 'Oudewater', 'Renswoude', 'Rhenen', 'Soest', 'Stichtse Vecht', 'Utrecht', 'Utrechtse Heuvelrug', 'Veenendaal', 'Vijfheerenlanden', 'Wijk bij Duurstede', 'Woerden', 'Woudenberg', 'Zeist', 'Alblasserdam', 'Albrandswaard', 'Alphen aan den Rijn', 'Barendrecht', 'Bodegraven-Reeuwijk', 'Capella aan den IJssel', 'Delft', 'Den Haag', 'Dordrecht', 'Goeree-Overflakkee', 'Gorinchem', 'Gouda', 'Hardinxveld-Giessendam', 'Hendrik-Ido-Ambacht', 'Hillegom', 'Hoeksche Waard', 'Kaag en Braassem', 'Katwijk', 'Krimpen aan den IJssel', 'Krimpenerwaard', 'Lansingerland', 'Leiden', 'Leiderdorp', 'Leidschendam-Voorburg', 'Lisse', 'Maassluis', 'Midden-Delfland', 'Molendlanden', 'Nieuwkoop', 'Nissewaard', 'Noordwijk', 'Oegstgeest', 'Papendrecht', 'Pijnacker-Nootdorp', 'Ridderkerk', 'Rijswijk', 'Rotterdam', 'Schiedam', 'Sliedrecht', 'Teylingen', 'Vlaardingen', 'Voorne aan Zee', 'Voorschoten', 'Waddinxveen', 'Wassenaar', 'Westland', 'Zoetermeer', 'Zoeterwoude', 'Zuidplas', 'Zwijndrecht'];
let gemZuid = ['Arnhem', 'Berg en Dal', 'Beuningen', 'Doesburg', 'Druten', 'Duiven', 'Heumen', 'Neder-Betuwe', 'Nijmegen', 'Overbetuwe', 'Renkum', 'Rheden', 'Rozendaal', 'Rijnwaarden', 'Westervoort', 'West Maas en Waal', 'Wijchen', 'Zaltbommel en Zevenaar', 'Beek', 'Beekdaelen', 'Beesel', 'Bergen (L.)', 'Brunssum', 'Echt-Susteren', 'Eijsden-Margraten', 'Gennep', 'Gulpen-Wittem', 'Heerlen', 'Horst aan de Maas', 'Kerkrade', 'Landgraaf', 'Leudal', 'Maasgouw', 'Maastricht', 'Meerssen', 'Mook en Middelaar', 'Nederweert', 'Peel en Maas', 'Roerdalen', 'Roermond', 'Simpelveld', 'Sittard-Geleen', 'Stein', 'Vaals', 'Valkenburg aan de Geul', 'Venlo', 'Venray', 'Voerendaal', 'Weert', 'Alphen-Chaam', 'Asten', 'Baarle-Nassau', 'Bergeijk', 'Bergen op Zoom', 'Bernheze', 'Best', 'Bladel', 'Boekel', 'Boxtel', 'Breda', 'Cranendonck', 'Deurne', 'Dongen', 'Drimmelen', 'Eersel', 'Eindhoven', 'Etten-Leur', 'Geertruidenberg', 'Geldrop-Mierlo', 'Gemert-Bakel', 'Gilze en Rijen', 'Goirle', 'Halderberge', 'Heeze-Leende', 'Helmond', "'s-Hertogenbosch", 'Heusden', 'Hilvarenbeek', 'Laarbeek', 'Land van Cuijk', 'Loon op Zand', 'Maashorst', 'Meierijstad', 'Moerdijk',  'Neunen, Gerwen en Nederwetten', 'Oirschot', 'Oisterwijk', 'Oosterhout', 'Oss', 'Reusel-De Mierden', 'Roosendaal', 'Rucphen', 'Sint-Michielsgestel', 'Someren', 'Son en Breugel', 'Steenbergen', 'Tilburg', 'Valkenswaard', 'Veldhoven', 'Vught', 'Waalre', 'Waalwijk', 'Woensdrecht', 'Zundert'];

// Select Options
const selectListData = [
    { region: 'Noord', id: '0' },
    { region: 'Midden', id: '1' },
    { region: 'Zuid', id: '2' }
];

// Store Object Data
const storeObjectData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch(e) {
        console.log("storeObjectData ERROR : ", e);
    }
};

// Read Async Storage Data
const readAsyncStorageData = async (key) => {
    try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("readAsyncStorageData ERROR : ", e);
    }
};

const SettingItems = () => {
    const [address, setAddress] = useState();
    const [region, setRegion] = useState(0);

    const [value, setValue] = useState(selectListData[region]);
    const [isFocus, setIsFocus] = useState(false);

    const locate = async () => {
        // console.log(address);
        console.log("LOCATE() HAS BEEN CALLED ! ! !");
        

        if(gemNoord.includes(address?.subregion)) {
            setValue(selectListData[0]);
            storeObjectData("Region", region);
            console.log("NOORD!!!");
        } else if(gemMidden.includes(address?.subregion)) {
            setValue(selectListData[1]);
            storeObjectData("Region", region);
            console.log("MIDDEN!!!!");
        } else if(gemZuid.includes(address?.subregion)) {
            setValue(selectListData[2]);
            storeObjectData("Region", region);
            console.log("ZUID!!");
        } else {
            console.log("NONE");
        }

        // console.log("REGION : ", region);
    };

    const getAddress = async () => {
        const data = await readAsyncStorageData('Address');
        setAddress(data);
        // console.log("Address : ", address);
    };

    useEffect(() => {
        getAddress();
        if(address) locate();
    }, []);

    // console.log("ADDRESS : ", address);
    // console.log("VALUE : ", value);
    // console.log("REGION : ", region);
    
    return (
        <View style={styles.container}>
            <View style={{ width: "100%", marginBottom: 20 }}>
                <Text style={styles.primaryText}>Instellingen</Text>
                <Text style={styles.secondaryText}>Je bevind je in regio: {value?.region}</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <Dropdown
                        style={[styles.searchInput, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={selectListData}
                        maxHeight={300}
                        labelField="region"
                        valueField="id"
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                            setValue(item);
                            setRegion(item.id);
                            storeObjectData("Region", item.id);
                            // console.log("setRegion : ", region);
                            setIsFocus(false);
                        }}
                    />
                </View>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TouchableOpacity style={styles.searchBtn} onPress={locate}>
                        <Text style={{ color: "#FFF", fontWeight: "bold" }}>Huidige locatie ophalen</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SettingItems;
