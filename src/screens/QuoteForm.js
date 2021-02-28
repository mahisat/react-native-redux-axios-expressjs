import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Form, Item, Input, Label, Textarea, Button} from 'native-base';
import {addQuote, updateQuote} from '../actions';
import {useDispatch, useSelector} from 'react-redux';
import {MyHeader} from '../components';

export const QuoteForm = (props) => {
  const navigation = useNavigation();
  const {quoteParams} = props.route.params;

  const [author, setAuthor] = useState(quoteParams ? quoteParams.author : '');
  const [quote, setQuote] = useState(quoteParams ? quoteParams.quote : '');
  const {isSubmitQuoteLoading} = useSelector((state) => state.QuoteReducer);
  const dispatch = useDispatch();
  const onSubmit = () => {
    let edit = quoteParams !== undefined;
    edit
      ? dispatch(
          updateQuote({
            quote: quote,
            author: author,
            id: quoteParams.id,
            navigation: navigation,
          }),
        )
      : dispatch(
          addQuote({
            quote: quote,
            author: author,
            navigation: navigation,
          }),
        );
  };
  return (
    <View style={styles.container}>
      <MyHeader title={'Add Quote'} back={() => navigation.goBack()} />
      <ScrollView style={{margin: 20}}>
        <Item stackedLabel>
          <Label>Author</Label>
          <Input value={author} onChangeText={(text) => setAuthor(text)} />
        </Item>
        <Textarea
          rowSpan={5}
          bordered
          placeholder="Quote"
          onChangeText={(text) => setQuote(text)}
          value={quote}
        />
        {isSubmitQuoteLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <Button style={styles.buttonCointainer} block onPress={onSubmit}>
            <Text style={styles.buttonText}> Save </Text>
          </Button>
        )}
      </ScrollView>
    </View>
  );
};
export default QuoteForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonCointainer: {
    backgroundColor: '#ff6347',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
  },
});
