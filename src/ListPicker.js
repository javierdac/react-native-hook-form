import React, {Component, useState} from 'react';
import {
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {TextInput} from 'react-native-paper';
import {Picker} from '@react-native-community/picker';

// Screen Dimensions
const {height, width} = Dimensions.get('window');

export default class ListPicker extends Component {
  //
  // // React Hooks: State
  // const [ modalVisible, toggle ] = useState(props.isVisible);
  // const [ tempItem, setTempItem ] = useState();
  // const [ item, setItem ] = useState();

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: this.props.isVisible,
      tempItem: undefined,
      item: this.props.name,
    };

    this.androidPicker = React.createRef(); // make the ref
  }

  // Toggle Modal
  toggleModal = () => {
    // Check Platform (iOS)
    if (Platform.OS === 'ios') {
      // React Hook: Toggle Modal
      //this.toggle((modalVisible: boolean) => !modalVisible);
      this.setState({
        modalVisible: !this.state.modalVisible,
      });
    } else {
      if (this.androidPicker.current) {
        this.androidPicker.current.show();
      }
    }
  };

  // Select Item
  selectItem = (item) => {
    try {
      // Check Platform (iOS)
      if (Platform.OS === 'ios') {
        // React Hook: Set Temp State
        this.setState({
          tempItem: item,
        });
      }
      // Check Platform (Android)
      else if (Platform.OS === 'android') {
        // React Hook: Set Item
        this.setState({
          item: item,
        });

        // React Props: onChange
        if (this.props.onChange) {
          this.props.onChange(item);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Render iOS Picker
  renderIOSPicker = () => {
    try {
      return (
        <Picker
          selectedValue={
            this.state.tempItem !== undefined
              ? this.state.tempItem
              : this.state.item
          }
          onValueChange={(item) => this.selectItem(item)}>
          {this.props.items.map((item) => {
            return (
              <Picker.Item
                label={item.label}
                value={item.value}
                key={item.key || item.label}
              />
            );
          })}
        </Picker>
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Press Cancel
  pressCancel = () => {
    try {
      // Set Temp Item
      this.setState({
        tempItem: this.state.item,
      });

      // Toggle Modal
      this.toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  // Press Done
  pressDone = () => {
    try {
      // React Hook: Set Item
      this.setState({
        item: this.state.tempItem
          ? this.state.tempItem
          : this.props.items[0].value,
      });

      // Props: onChange
      if (this.props.onChange) {
        this.props.onChange(
          this.state.tempItem ? this.state.tempItem : this.props.items[0].value,
        );
      }

      // Toggle Modal
      this.toggleModal();
    } catch (error) {
      console.log(error);
    }
  };

  showItemLabel = () => {
    let result = '';

    let item = this.props.items.find(
      (element) => element.value === this.state.item,
    );
    if (item !== undefined) {
      result = item.label;
    }

    return result;
  };

  // Render Platform
  renderPlatform = () => {
    try {
      // Check Platform (iOS)
      if (Platform.OS === 'ios') {
        return (
          <>
            <TouchableOpacity onPress={() => this.toggleModal()}>
              <TextInput
                label={this.props.label}
                value={this.showItemLabel()}
                style={this.props.style}
                pointerEvents="none"
                editable={false}
              />
            </TouchableOpacity>

            <Modal
              isVisible={this.state.modalVisible}
              style={styles.modal}
              backdropOpacity={0.3}>
              <View style={styles.modalContainer}>
                <View style={styles.pickerHeaderContainer}>
                  <TouchableOpacity onPress={() => this.pressCancel()}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                  </TouchableOpacity>

                  <View style={styles.doneButton}>
                    <TouchableOpacity onPress={() => this.pressDone()}>
                      <Text style={styles.acceptText}>Aceptar</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.pickerContainer}>
                  {this.renderIOSPicker()}
                </View>
              </View>
            </Modal>
          </>
        );
      }

      // Check Platform (Android)
      if (Platform.OS === 'android') {
        return (
          <View style={this.props.style}>
            <Text style={styles.placeholder}>{this.props.label}</Text>
            <Picker
              style={styles.pickerAndroid}
              ref={this.androidPicker}
              placeholder={this.props.label}
              selectedValue={this.state.item}
              onValueChange={this.selectItem}
              mode="dialog">
              {this.props.items.map((item) => {
                return (
                  <Picker.Item
                    label={item.label}
                    value={item.value}
                    key={item.key || item.label}
                  />
                );
              })}
            </Picker>
            <View style={{height: 1, backgroundColor: '#a0a0a0'}}></View>
          </View>
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return <>{this.renderPlatform()}</>;
  }
}

// Styles
const styles = StyleSheet.create({
  container: {},
  modal: {
    margin: 0,
  },
  button: {
    // color: colors.primary,
  },
  modalContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  pickerHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    width: width,
    backgroundColor: '#FAFAF8',
    borderColor: '#7D7D7D',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pickerContainer: {
    height: 250,
    width: width,
    backgroundColor: 'white',
  },
  doneButton: {
    marginRight: 7,
  },
  doneText: {
    fontFamily: 'System',
    // color: colors.primary,
    fontWeight: '600',
    fontSize: 17,
    marginRight: 16,
  },
  cancelText: {
    fontFamily: 'System',
    // color: colors.primary,
    fontWeight: '400',
    fontSize: 17,
    marginLeft: 16,
  },
  acceptText: {
    fontFamily: 'System',
    // color: colors.primary,
    fontWeight: '400',
    fontSize: 17,
    marginRight: 10,
  },
  stateContainer: {
    alignItems: 'center',
    width: 75,
    borderColor: '#7D7D7D',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputTitleContainer: {
    width: 75,
    marginBottom: 4,
  },
  inputTitle: {
    color: '#7D7D7D',
    borderColor: '#7D7D7D',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  fieldTextContainer: {
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderColor: '#7D7D7D',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  fieldText: {
    width: width - 32 - 20,
    fontFamily: 'System',
    fontSize: 17,
    fontWeight: '400',
    color: '#000000',
    alignSelf: 'center',
  },
  arrowForward: {
    color: 'black',
    opacity: 0.3,
    marginRight: 7,
  },
  pickerAndroid: {
    marginLeft: 5,
  },
  placeholder: {
    fontSize: 12,
    marginLeft: 11,
    color: '#757575',
  },
});
