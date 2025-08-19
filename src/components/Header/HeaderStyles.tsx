import { StyleSheet } from 'react-native';
import { bauhaus, futura } from '../../constants/fonts_exports';

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
  addressBarOutline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationIcon: {
    height: 22,
    width: 22,
    resizeMode: 'cover',
    marginTop: 3,
  },
  locationName: {
    color: 'white',
    fontFamily: bauhaus.bold,
    fontSize: 18,
  },
  locationAddress: {
    color: 'lightgray',
    fontFamily: bauhaus.regular,
    fontSize: 12,
  },
  searchBarOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#221F20CC',
    borderRadius: 40,
    width: '90%',
    paddingHorizontal: 15,
  },
  searchIcon: {
    height: 17,
    width: 17,
    resizeMode: 'cover',
    marginTop: 3,
  },
  filterIcon: { 
    height: 28, 
    width: 28, 
    resizeMode: 'cover', 
    marginTop: 3 
    },
  searchInput: {
    marginLeft: 8,
    fontFamily: futura.medium,
    marginTop: 5,
    color: '#7A7778',
    paddingVertical: 10,
    paddingLeft: 5,
    fontSize: 15,
  },
  trailIcon: {
    backgroundColor: '#A83A42',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
    marginLeft: 8,
  },
});
