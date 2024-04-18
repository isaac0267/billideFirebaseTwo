import { StatusBar } from "expo-status-bar";
import { app, database, storage } from "./firebase";
import { useState } from "react";
import {
  StyleSheet,
  FlatList,
  Button,
  View,
  TextInput,
  Text,
  Image
} from "react-native";
import *as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes,getDownloadURL } from 'firebase/storage';



export default function App() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [editObj, setEditObj] = useState(null);
  const [imagePath,setImagePath]=useState(null)

  function buttonHandler() {
    setNotes([...notes, { key: notes.length, name: text }]);
  }

   async function lunchImagePicker(){
    let result= await ImagePicker.launchImageLibraryAsync({
      // den kode betyder at vi kan tilføje noget
      allowsEditing:true
    })
    if(!result.canceled){
      setImagePath(result.assets[0].uri)

    }
  }
  async function uploadImage(){
    const res= await fetch(imagePath)
    // vigtig note, hvis man ikke lave (), så få man problem med kode
    const blob= await res.blob()

    const fileName=`image_${Date.now()}.jpg`;
    // nu vi skal lave en reference til database. 
    const storageRef=ref(storage,fileName);
    uploadBytes(storageRef,blob).then((snapshot)=>{
      alert("image uplod");
      setNotes((prevNotes)=>[...prevNotes,{key:notes.length,name:text,imagePath:fileName}]);
    })
  }
  async function DownloadImage(imageName){
    getDownloadURL(ref(storage,imageName))
    .then((url)=>{
      setImagePath(url)
    })
    .catch((error)=>{
      console.error("Error downlading the image: ",error);
      alert("Faild to downlad image");
    });
  }

  return (
    <View style={styles.container}>
      <Text>שָׁלוֹם shalom</Text>
      {editObj && (
        <View>
          <TextInput
            defaultValue={editObj.text}
            onChangeText={(txt) => setText(txt)}
          />
          <Text onPress={saveUpdate}>Save</Text>
        </View>
      )}

      <TextInput
        style={styles.textInput}
        onChangeText={(txt) => setText(txt)}
      />
      <Button title="Press Me" onPress={buttonHandler}></Button>
      <FlatList
        data={notes}
        renderItem={({item}) => (
          <View style={{flexDirection:"row",alignItems: "center"}}>
            <Text>{item.name}</Text>
            <Button title="Downlad" onPress={()=>DownloadImage(item.imagePath)}></Button>
          </View>
        )
      } 
      />
      <Image style={{width:200,height:200}} source={{uri:imagePath}}/>
      <Button title="Pick image" onPress={lunchImagePicker}/>
      <Button title="upload image" onPress={uploadImage}/>
      <Button title="Download Billede" onPress={DownloadImage}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
  },
  textInput: {
    backgroundColor: "lightblue",
    minWidth: 200,
  },
});