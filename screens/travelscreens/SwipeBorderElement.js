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

import { SwipeListView } from "react-native-swipe-list-view";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const SwipeListElement = ({ inputArray, date }) => {
  // console.log(inputArray);
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

  const addFavourite = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    // if (!GLOBAL.FAVOURITEPLACES.includes(GLOBAL.TRAVELHISTORY[date][rowKey])) {
    //   GLOBAL.FAVOURITEPLACES.push(GLOBAL.TRAVELHISTORY[date][rowKey]);
    // }
    // console.log(GLOBAL.FAVOURITEPLACES);
    let inputFavourite = {
      locationName: inputArray[rowKey].locationName,
      postalCode: "439947",
    };

    axios
      .patch(
        `${baseURL}cliques/addfavourite/60cba472c5923607e63bacd7`,
        inputFavourite
      )
      .then((res) => {
        if (res.status == 200) {
          console.log("Successful addition!");
        }
      })
      .catch((error) => {
        if (error.message == "Request failed with status code 404") {
          return console.log("Location has been favourited before");
        }
        console.log("Failed");
      });
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);

    let inputDelete = {
      date: date,
      locationName: inputArray[rowKey].locationName,
    };

    axios
      .patch(
        `${baseURL}cliques/removelog/60cba472c5923607e63bacd7`,
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
    setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => console.log("You touched me")}
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
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => addFavourite(rowMap, data.item.key)}
      >
        <Icon style={{ fontSize: 18 }} name="ios-star" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Content>
      <Separator bordered style={{ height: 35 }}>
        <Text style={{ color: "#646464", fontSize: 12 }}>{date}</Text>
      </Separator>
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
      />
    </Content>
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

export default SwipeListElement;
