import { StyleSheet } from 'react-native';
import { bauhaus, futura } from '../../../../../constants/fonts_exports';

export const styles = StyleSheet.create({
  rowBetweenStart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rowBetweenCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  outline: {
    flex: 1,
    marginTop: 10,
  },
  grid: {
    padding: 10,
  },
  sectionTitile: {
    fontFamily: futura.bold,
    color: 'white',
    fontSize: 17,
  },
  sectionSecAddress:{
    fontFamily: futura.book,
    color: '#E4DAD7', 
    fontSize: 13,
  },
  viewAllText: {
    color: '#E4DAD7',
    fontFamily: futura.book,
    fontSize: 17,
    marginRight: 4,
  },
  viewAllIcon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginTop: 3,
  },
  cardsOutline: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  cafeCardsOutline: { 
  }
});
