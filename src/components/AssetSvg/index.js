import React, {Component} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {DOUBLE_RIGHT_ICON, PENCIL_ICON, EYE_ICON} from '@/assets';
import {
  CancelIcon,
  CheckIcon,
  CloseIcon,
  CloseIcon2,
  FaceIcon,
  FingerPressIcon,
  FingerprintIcon,
  PercentageIcon,
  RectangleIcon,
  SettingIcon
} from '@/icons';

interface IProps {
  name: String;
  fill?: String;
  width?: Number | String;
  height?: Number | String;
  style?: StyleProp<ViewStyle>;
}

export class AssetSvg extends Component<IProps> {
  static icons = {
    cancel: CancelIcon,
    check: CheckIcon,
    close: CloseIcon,
    close2: CloseIcon2,
    face: FaceIcon,
    finger_press: FingerPressIcon,
    finger: FingerprintIcon,
    percent: PercentageIcon,
    rectangle: RectangleIcon,
    setting: SettingIcon,
    double_right: DOUBLE_RIGHT_ICON,
    pencil: PENCIL_ICON,
    eye: EYE_ICON
  };

  render() {
    const {name, fill, width = '22', height = '22', style} = this.props;
    return (
      <SvgXml
        xml={name}
        width={width}
        height={height}
        fill={fill}
        style={style}
      />
    );
  }
}

export default AssetSvg;
