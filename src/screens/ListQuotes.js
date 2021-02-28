import React, {useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Button, Fab, Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {deleteQuote, listQuotes} from '../actions';
import {MyHeader} from '../components';

export const ListQuotes = () => {
  const navigation = useNavigation();
  const {quotes, isListQuoteLoading} = useSelector(
    (state) => state.QuoteReducer,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listQuotes());
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: index % 2 == 0 ? 'red' : 'violet',
          elevation: 3,
          borderRadius: 10,
        }}>
        <Text style={{color: '#fff'}}>{item.quote}</Text>
        <Text style={{color: '#fff', textAlign: 'right'}}>- {item.author}</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button
            style={styles.buttonCointainer}
            block
            onPress={() =>
              navigation.navigate('QuoteForm', {quoteParams: item})
            }>
            <Text style={styles.buttonText}> Update </Text>
          </Button>
          <Button
            style={styles.buttonCointainer}
            block
            onPress={() => dispatch(deleteQuote({id: item.id}))}>
            <Text style={styles.buttonText}> Delete </Text>
          </Button>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <MyHeader title="List Quotes" />
      {isListQuoteLoading && <ActivityIndicator size="large" color="blue" />}

      {quotes && quotes.length > 0 ? (
        <FlatList
          data={quotes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{fontSize: 20}}>No data found</Text>
        </View>
      )}
      <Fab
        direction="up"
        style={{backgroundColor: 'red'}}
        position="bottomRight"
        onPress={() =>
          navigation.navigate('QuoteForm', {quoteParams: undefined})
        }>
        <Icon name="add" type="MaterialIcons" />
      </Fab>
    </View>
  );
};

export default ListQuotes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonCointainer: {
    backgroundColor: '#fff',
    margin: 10,
  },
  buttonText: {
    color: '#000',
  },
});
