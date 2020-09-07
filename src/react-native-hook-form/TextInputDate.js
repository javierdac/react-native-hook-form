import React, {useState} from 'react';
import TextInput from './TextInput';
import {TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useFormContext} from 'react-hook-form';

export default function TextInputDate(props) {
  const context = useFormContext();

  const [value, setValue] = useState(props.value);
  const [type] = useState(props.type);
  const [format] = useState(props.format ? props.format : 'DD/MM/YYYY');
  const [visible, setVisible] = useState(false);

  const hideDialog = () => {
    setVisible(false);
  };

  const selectItem = (data) => {
    hideDialog();
    if (context?.control) {
      context.setValue(props.name, moment(data).format(format));
    }
    setValue(data);
    props.onChangeText && props.onChangeText(data);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <TextInput
          {...props}
          label={props.label}
          value={value && moment(value).format(format)}
          pointerEvents={'none'}
          editable={false}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={visible}
        mode={type}
        onConfirm={(data) => selectItem(data)}
        onCancel={() => hideDialog()}
        date={value ? new Date(value) : new Date()}
      />
    </>
  );
}
