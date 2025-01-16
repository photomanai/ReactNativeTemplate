import React, { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  FlatList,
  Alert,
} from "react-native";
import {
  Button,
  Card,
  Provider as PaperProvider,
  useTheme,
} from "react-native-paper";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import ColorPicker from "react-native-wheel-color-picker";
import { useSelector, useDispatch } from "react-redux";
import {
  setText,
  setSelectedTemplate,
  setTextColor,
  setFontSize,
  setFontFamily,
  setIsSaving,
  setIsSharing,
} from "../store/slice/templateSclice";

const TemplateScreen = () => {
  const dispatch = useDispatch();
  const {
    text,
    selectedTemplate,
    textColor,
    fontSize,
    fontFamily,
    templates,
    isSaving,
    isSharing,
  } = useSelector((state) => state.template);

  const cardRef = useRef();
  const theme = useTheme();

  const handleTemplateSelect = (template) => {
    dispatch(setSelectedTemplate(template));
  };

  const saveCard = async () => {
    dispatch(setIsSaving(true));
    try {
      const uri = await cardRef.current.capture();
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert("Kartvizit kaydedildi!");
      } else {
        Alert.alert("Galeri erişimi reddedildi.");
      }
    } catch (error) {
      Alert.alert("Kaydetme hatası:", error.message);
    } finally {
      dispatch(setIsSaving(false));
    }
  };

  const shareCard = async () => {
    dispatch(setIsSharing(true));
    try {
      const uri = await cardRef.current.capture();
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert("Paylaşma hatası:", error.message);
    } finally {
      dispatch(setIsSharing(false));
    }
  };

  return (
    <PaperProvider theme={theme}>
      <FlatList
        data={templates}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.container}>
            <Text style={styles.title}>Kartvizit Oluşturma</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Metin girin..."
              onChangeText={(text) => dispatch(setText(text))}
              value={text}
            />
            {selectedTemplate && (
              <ViewShot ref={cardRef} options={{ format: "png", quality: 1 }}>
                <ImageBackground
                  source={selectedTemplate.image}
                  style={styles.cardBackground}
                >
                  <Text
                    style={[styles.secondaryCardText, { color: textColor }]}
                  >
                    Zahid & Larisa
                  </Text>
                  <Text
                    style={[
                      styles.secondaryCardText,
                      { color: textColor, fontSize: 15 },
                    ]}
                  >
                    [name]
                  </Text>
                  <Text
                    style={[
                      styles.cardText,
                      { color: textColor, fontSize, fontFamily },
                    ]}
                  >
                    {text}
                  </Text>
                </ImageBackground>
              </ViewShot>
            )}
            <View style={styles.customizationContainer}>
              <Text style={styles.sectionTitle}>Metin Özelleştirme</Text>
              <Text style={styles.label}>Yazı Rengi</Text>
              <ColorPicker
                color={textColor}
                onColorChange={(color) => dispatch(setTextColor(color))}
                thumbSize={20}
                sliderSize={20}
                noSnap={true}
                row={false}
              />
              <Text style={styles.label}>Yazı Boyutu</Text>
              <Slider
                style={styles.slider}
                minimumValue={12}
                maximumValue={36}
                value={fontSize}
                onValueChange={(value) => dispatch(setFontSize(value))}
              />
              <Text style={styles.label}>Yazı Tipi</Text>
              <Picker
                selectedValue={fontFamily}
                style={styles.picker}
                onValueChange={(value) => dispatch(setFontFamily(value))}
              >
                <Picker.Item label="Arial" value="Arial" />
                <Picker.Item label="Courier New" value="Courier New" />
                <Picker.Item label="Georgia" value="Georgia" />
                <Picker.Item label="Times New Roman" value="Times New Roman" />
              </Picker>
            </View>
            <Button
              mode="contained"
              onPress={saveCard}
              style={styles.actionButton}
              labelStyle={styles.buttonLabel}
              disabled={isSaving}
            >
              {isSaving ? "Kaydediliyor..." : "Kartviziti Kaydet"}
            </Button>
            <Button
              mode="contained"
              onPress={shareCard}
              style={styles.actionButton}
              labelStyle={styles.buttonLabel}
              disabled={isSharing}
            >
              {isSharing ? "Paylaşılıyor..." : "Kartviziti Paylaş"}
            </Button>
          </View>
        }
        renderItem={({ item }) => (
          <Card
            style={styles.templateCard}
            onPress={() => handleTemplateSelect(item)}
          >
            <Card.Cover source={item.image} style={styles.templateImage} />
          </Card>
        )}
        numColumns={2}
        contentContainerStyle={styles.templateList}
      />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  templateList: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  templateCard: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  templateImage: {
    height: 150,
  },
  cardBackground: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  textInput: {
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cardText: {
    fontWeight: "thin",
    textAlign: "center",
  },
  secondaryCardText: { fontSize: 22, fontWeight: "bold" },
  customizationContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  slider: {
    width: "100%",
    height: 40,
    marginVertical: 10,
  },
  picker: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  actionButton: {
    marginBottom: 10,
    backgroundColor: "#FFC107",
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TemplateScreen;
