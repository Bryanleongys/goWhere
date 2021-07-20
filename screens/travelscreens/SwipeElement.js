// List of locations for each date
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";

import { SwipeListView } from "react-native-swipe-list-view";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const SwipeMemberElement = ({ inputArray }) => {
  GLOBAL = require("../global");
  var length = inputArray.length;
  const [listData, setListData] = useState(
    Array(length)
      .fill("")
      .map((_, i) => ({ key: `${i}`, text: inputArray[i].locationName }))
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
    let inputDelete = {
      locationName: inputArray[rowKey].locationName,
    };

    axios
      .patch(
        `${baseURL}cliques/removefavourite/${GLOBAL.USER.cliqueID}`,
        inputDelete
      )
      .then((res) => {
        if (res.status == 200) {
          console.log("Successful deletion!");
        }
        // else if (res.status == 400)
      })
      .catch((error) => {
        console.log("Failed");
      });
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => console.log("You touched me")}
      style={styles.rowFront}
      underlayColor={"#fff"}
    >
      <View>
        <Text style={{ fontFamily: "Avenir" }}>{data.item.text}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SwipeListView
      data={listData}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-150}
      previewRowKey={"0"}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      onRowDidOpen={onRowDidOpen}
      style={{ fontFamily: "Avenir" }}
    />
  );
};

const styles = StyleSheet.create({
  backTextWhite: {
    color: "#000",
  },
  rowFront: {
    paddingLeft: 20,
    backgroundColor: "#fff",
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 45,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#c8c8c8",
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
    width: 150,
  },
  backRightBtnLeft: {
    backgroundColor: "#c8c8c8",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});

export default SwipeMemberElement;
