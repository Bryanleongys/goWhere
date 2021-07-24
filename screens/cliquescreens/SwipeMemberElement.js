// List of locations for each date
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";

import { Content, Separator, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { SwipeListView } from "react-native-swipe-list-view";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const SwipeMemberElement = ({ inputArray, navi }) => {
  GLOBAL = require("../global");
  // console.log(inputArray);
  var length = inputArray.length;
  const [listData, setListData] = useState(
    Array(length)
      .fill("")
      .map((_, i) => ({ key: `${i}`, text: inputArray[i] }))
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);

    //console.log(inputArray[0])
    let inputDelete = {
      name: inputArray[rowKey],
    };

    axios
      .patch(
        `${baseURL}cliques/removemember/${GLOBAL.USER.cliqueID}`,
        inputDelete
      )
      .then((res) => {
        if (res.status == 200) {
          console.log("Successful login!");
        }
        // else if (res.status == 400)
      })
      .catch((error) => {
        console.log("Failed");
      });

    // GLOBAL.TRAVELHISTORY[date].splice(prevIndex, 1);
    // if (GLOBAL.TRAVELHISTORY[date].length == 0) {
    //   delete GLOBAL.TRAVELHISTORY[date];
    // }
    console.log("New set data");
    setListData(newData);
  };

  // const editRow = (rowMap, rowKey) => {
  //   closeRow(rowMap, rowKey);
  //   navi.navigate("CliqueScreen3", { paramKey: inputArray[rowKey] });
  // };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() =>
        navi.navigate("CliqueScreen3", { paramKey: inputArray[data.item.key] })
      }
      style={styles.rowFront}
      underlayColor={"#00c6bb"}
    >
      <View>
        <Text>{data.item.text}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <Text></Text>
      {/* <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => editRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  //console.log(inputArray);
  return (
    <SwipeListView
      data={listData}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-75}
      // rightOpenValue={-75}
      previewRowKey={"0"}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      onRowDidOpen={onRowDidOpen}
    />
  );
};

const styles = StyleSheet.create({
  backTextWhite: {
    color: "#000",
  },
  rowFront: {
    paddingLeft: 20,
    backgroundColor: "#bff6eb",
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 45,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#00c6bb",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "#00c6bb",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});

export default SwipeMemberElement;
