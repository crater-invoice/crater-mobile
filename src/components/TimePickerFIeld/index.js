import React, { Component } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import {colors} from "../../../src/styles/colors"
import { AnimateModal } from '../AnimateModal';
import moment from 'moment';
import { FakeInput } from '../FakeInput';
import Lng from '../../api/lang/i18n';
import { CtButton } from '../Button';
export class TimePickerFIeld extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,time:moment()
    .utcOffset('+05:30')
    .format('hh:mm a'),
    timeStamp:new Date()
  };
}

  onToggle= ()=>{
    this.setState((prevState) => {
      return { visible: !prevState.visible }
  });
  }

  onChange = (value1,value2) => {
      var temp=moment(value2).utcOffset('+05:30').
  format("hh:mm a")

      this.setState({
        timeStamp:new Date(value1?.nativeEvent?.timestamp),
        time:temp
      })
  }

  renderPicker=()=>{
      return (<AnimateModal visible={this.state.visible} onToggle={this.onToggle} style={{marginHorizontal:30,overflow:'hidden'}}>
      <DateTimePicker
        testID="dateTimePicker"
        style={{backgroundColor:colors.veryLightGray}}
        value={this.state.timeStamp}
        mode={"time"}
       is24Hour={true}
       onChange={this.onChange}
        display="default"
      // onChange={onChange}
       />       
       <CtButton onPress={this.onToggle}

                        btnTitle={Lng.t("button.change", { locale: this.props.language })}
                        containerStyle={{color:'black',marginTop:-5,marginHorizontal:-5,width:'110%'}}></CtButton>
    </AnimateModal>
    )
  }
  render() {
    return (
      <>
      <FakeInput
                    label={"Tine"}
                    icon={"clock"}
                    isRequired={true}
                    onChangeCallback={this.onToggle}
                    values={this.state.time}
                    placeholder={"Select Time"}
                />
             {this.renderPicker()}  
      </>
      
    )
  }
}
