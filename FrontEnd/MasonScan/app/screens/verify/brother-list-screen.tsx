import React, { useEffect, FC } from "react"
import { TextStyle, View, ViewStyle, FlatList, ImageStyle, ActivityIndicator } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, GradientBackground, AutoImage as Image } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"

const BOLD: TextStyle = { fontWeight: "bold" }

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}

const TITLE: TextStyle = {
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
  marginBottom: spacing[5],
}

const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const IMAGE: ImageStyle = {
  borderRadius: 50,
  height: 150,
  width: 150,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

const LOADING_STYLE: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  paddingVertical: spacing[6]
}

export const BrotherListScreen: FC<StackScreenProps<NavigatorParamList, "brotherList">> = observer(
  ({ route, navigation }) => {
    const { brotherId } = route.params
    const goBack = () => navigation.goBack()

    const { brotherStore } = useStores()
    const { brothers } = brotherStore

    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
      brotherStore.clear()
      
      async function fetchData() {
        setIsLoading(true)
        await brotherStore.getBrother(brotherId)
        setIsLoading(false)
      }

      fetchData()

      return () => {
        setIsLoading(false)
      }
    }, [])

    return (
      <View testID="BrotherListScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="demoListScreen.title"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <Text style={TITLE} preset="header" tx="verifyScreen.verified" />

          <View> 
            {
              (isLoading)
                ?
                <View style={LOADING_STYLE}>
                  <ActivityIndicator size="large" color="#e8e8e8" />
                </View>
                :
                  <FlatList
                  contentContainerStyle={FLAT_LIST}
                  data={[...brothers]}
                  keyExtractor={(item) => String(item.cadastro)}
                  renderItem={({ item }) => (
                    <>
                      <View style={LIST_CONTAINER}>
                        <Image source={{ uri: item.foto }} style={IMAGE} />
                      </View>
                      <View>
                        <Text style={LIST_TEXT}>
                          Cadastro: {item.cadastro}
                        </Text>
                        <Text style={LIST_TEXT}>
                          Nome: {item.nome}
                        </Text>
                        <Text style={LIST_TEXT}>
                          Loja: {item.loja}
                        </Text>
                        <Text style={LIST_TEXT}>
                          Situação: {item.situacao}
                        </Text>
                      </View>
                    </>
                  )}
                />
            } 
          </View>
        </Screen>
      </View>
    )
  },
)
