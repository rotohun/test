import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';

const items = [
  {
    name: 'Cafe Au Lait',
    waitTime: 4
  },
  {
    name: 'Cappuccino',
    waitTime: 10
  },
  {
    name: 'Expresso',
    waitTime: 15
  }
]


const MenuItems = ({ item, onPress }) => {
  return (
    <TouchableOpacity
       onPress={() => {
         onPress()
       }}
       style={{ marginVertical: 20 }}
      >
        <Text>{item.name}</Text>
    </TouchableOpacity>
  )
}

const Item = ({ name }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </View>
);


const renderItem = ({ item }) => {
  return (
    <Item title={item.title} />
  )
}



export default function App() {
  const [stack, setStack] = useState([])
  const [isTaskDone, setIsTaskDone] = useState(false)
  const [coffeeCounter, setCoffeeCounter] = useState([])
  const [isBusy, setIsBusy] = useState(false)
  const makeCoffee = () => {
    while (stack.length > 0) {
      if(!isBusy) {
        const currentItem = stack.pop()
        setTimeout(() => {
          setIsBusy(false)
          setCoffeeCounter([...coffeeCounter, currentItem])
          setIsTaskDone(true)
        }, currentItem.waitTime * 1000)
        setIsBusy(true)
      }
      break;
    }
  }
  const pickUp = () => {
    if(coffeeCounter.length > 0){
      setTimeout(() => {
        coffeeCounter.pop()
        console.log('picked up')
      }, 3 * 1000)
    }
    }
  const addItem = (item) => {
    const stackCopy = [...stack]
    stackCopy.unshift(item)
    setStack(stackCopy)
  }
  useEffect(() => {
    makeCoffee()
  }, [stack, isBusy, isTaskDone] )
  useEffect(() => {
    pickUp()
  }, [coffeeCounter])
  return (
    <View style={styles.container}>
        <FlatList 
          data={stack}
          extraData={stack}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      <View style={ { flex: 0.4 }}>
        <ScrollView
          style={{height: 200 }}
        >
        {items.map((item) => {
          return <MenuItems item={item} onPress={() => addItem(item)} />
        })} 
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
