import React, { FC } from "react"
import { Platform, TextStyle, View, ViewStyle, TextInput, StyleSheet } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Text,
  Screen,
  GradientBackground
} from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color, spacing } from "../../theme"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
}
const TAGLINE: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
}
const HINT: TextStyle = {
  color: "#BAB6C8",
  fontSize: 12,
  lineHeight: 15,
  marginVertical: spacing[2],
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 50,
    padding: 10,
    marginBottom: spacing[5],
  }
})


export const VerifyScreen: FC<StackScreenProps<NavigatorParamList, "verify">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    const [text, onChangeText] = React.useState('')

    return (
      <View testID="VerifyScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            headerTx="verifyScreen.pageTitle"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <Text style={TITLE} preset="header" tx="verifyScreen.title" />
          <Text style={TAGLINE} tx="verifyScreen.tagLine" />

          <View>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              value={text}
              placeholder="Exemplo: 0233629"
              keyboardType="number-pad"
            />
          </View>

          <View>

            <Button
              style={DEMO}
              textStyle={DEMO_TEXT}
              tx="verifyScreen.reactotron"
              onPress={() => navigation.navigate("brotherList", {
                brotherId: text
              })}
            />
            
            <Text style={HINT} tx={`verifyScreen.${Platform.OS}ReactotronHint` as const} />
          </View>
        </Screen>
      </View>
    )
  },
)
